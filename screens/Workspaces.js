import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {userService} from "../services/userService";
import StickyButtonComponent from "../component/StickyButton";
import {useNavigation} from "@react-navigation/native";
import Organization from "../component/Organization";

export default function Workspaces() {

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
    const endUrl = `key=${apiKey}&token=${apiToken}`
    const [user, setUser] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [tokenRefresh, setTokenRefresh] = useState(false)
    const navigation = useNavigation();
    const [dataWorkspace, setDataWorkspace] = useState([]);

    const getOrga = async ()=> {
        const urlWorkspaces = `https://api.trello.com/1/members/me/organizations?${endUrl}`;
        const fetchRespOrga = await fetch(urlWorkspaces);
        return await fetchRespOrga.json();
    }
    const getUser = async () => {
        setUser(await userService.getUser());
    }
    const addOrga = async (orgaName) => {
        try {
            const response = await fetch(
                `https://api.trello.com/1/organizations?displayName=${orgaName}&${endUrl}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );

            if (response.ok) {
                setFormValid(!formValid);
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error making POST request:', error.message);
        }
    }

    const updateOrga = async (idOrga, newName) => {
        let url = `https://api.trello.com/1/organizations/${idOrga}?displayName=${newName}&${endUrl}`
        let response = await fetch(url,{
            method: 'PUT'
        });
        if (response.ok){
            setFormValid(!formValid);
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    }

    const addBoard = async (idOrga, name) => {
        const url = `https://api.trello.com/1/boards/?name=${name}&idOrganization=${idOrga}&${endUrl}`
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        )
        if (response.ok){
            setFormValid(!formValid)
        } else {
            console.warn("Error occurred when adding board");
        }
    }

    navigation.addListener('focus', () => {
        setTokenRefresh(!tokenRefresh);
    } )

    useEffect(() => {
        getUser();
        getOrga().then(r => {
            setDataWorkspace(r)
        });
    }, [tokenRefresh, formValid]);

    if (null === user) {
        return user;
    }
    return (
        <View>
        <StickyButtonComponent addOrga={addOrga} endUrl={endUrl}/>
        <ScrollView contentContainerStyle={styles.container}
                    contentInset={{ bottom: 150 }}
                    contentOffset={{ y: -20 }}
        >

            {dataWorkspace && dataWorkspace.map((workspace) => {
                return(
                    <View>
                        <Organization setFormValid={setFormValid} tokenRefresh={tokenRefresh} organization={workspace} endUrl={endUrl} formValid={formValid} getOrga={getOrga} update={updateOrga} add={addBoard}/>
                    </View>
                )
            })}
            <StatusBar style="auto" />
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({


});