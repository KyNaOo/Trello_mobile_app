import { StatusBar } from 'expo-status-bar';
import {Button, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {userService} from "../services/userService";
import Organizations from "../component/Organizations";

export default function Workspaces() {

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
    const endUrl = `?key=${apiKey}&token=${apiToken}`
    const [user, setUser] = useState(null);
    const [dataBoard, setDataBoard] = useState([]);
    const [dataWorkspace, setDataWorkspace] = useState([]);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    const getUser = async () => {
        setUser(await userService.getUser())
        // await getWorkspaces();
    }
    // const addOrga = () => {
    //     const addOrgaUrl = `https://api.trello.com/1/members/me/organizations${endUrl}`
    // }
    useEffect(() => {
        getUser();
    }, []);

    if (null === user) {
        return user;
    }
    return (
        <ScrollView>
            <Text>Bonjour {user.username}</Text>
            <Button title={"New Workspace"} />
            {
                dataBoard ?
                    <Organizations endUrl={endUrl}/>

                    :
                    <Text>Vous n'avez pas de tableau</Text>
            }
            <StatusBar style="auto" />
        </ScrollView>
    );
}