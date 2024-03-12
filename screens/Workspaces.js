import { StatusBar } from 'expo-status-bar';
import {Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {userService} from "../services/userService";
import Organizations from "../component/Organizations";
import StickyButton from "../component/StickyButton";
import StickyButtonComponent from "../component/StickyButton";

export default function Workspaces() {

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
    const endUrl = `key=${apiKey}&token=${apiToken}`
    const [user, setUser] = useState(null);
    const [dataBoard, setDataBoard] = useState([]);
    // const [addWorkspaceName, setAddWorkspaceName] = useState('');
    const [formValid, setFormValid] = useState(false);

    const getUser = async () => {
        setUser(await userService.getUser())
        // await getWorkspaces();
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
                    // Add any additional headers or body data as needed
                    // body: JSON.stringify({ key: 'value' }),
                }
            );

            if (!response.ok) {
                console.error(`Error: ${response.status} ${response.statusText}`);
            } else {
                setFormValid(!formValid);
            }
        } catch (error) {
            console.error('Error making POST request:', error.message);
        }
    }

    const updateOrga = async (idOrga, newName) => {
        // console.warn(updateWorkspaceName)
        let url = `https://api.trello.com/1/organizations/${idOrga}?displayName=${newName}&${endUrl}`
        let response = await fetch(url,{
            method: 'PUT'
        });
        console.warn("you are updating the name")
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


    useEffect(() => {
        getUser();
    }, []);

    if (null === user) {
        return user;
    }
    return (

        <ScrollView contentContainerStyle={styles.container}
                    contentInset={{ bottom: 150 }} // Customize the bottom inset
                    contentOffset={{ y: -20 }}
        >
            <StickyButtonComponent addOrga={addOrga} endUrl={endUrl}/>
            {
                dataBoard ?
                    <Organizations endUrl={endUrl} formValid={formValid} update={updateOrga} add={addBoard}/>

                    :
                    <Text>Vous n'avez pas de tableau</Text>
            }
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({


});