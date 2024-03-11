import { StatusBar } from 'expo-status-bar';
import {Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {userService} from "../services/userService";
import Organizations from "../component/Organizations";

export default function Workspaces() {

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
    const endUrl = `key=${apiKey}&token=${apiToken}`
    const [user, setUser] = useState(null);
    const [dataBoard, setDataBoard] = useState([]);
    const [addWorkspaceName, setAddWorkspaceName] = useState('');
    const [formValid, setFormValid] = useState(false);

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
    const addOrga = async () => {
        try {
            const response = await fetch(
                `https://api.trello.com/1/organizations?displayName=${addWorkspaceName}&${endUrl}`,
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
    useEffect(() => {
        getUser();
    }, []);

    if (null === user) {
        return user;
    }
    return (
        <ScrollView>
            <Text>Bonjour {user.username}</Text>
            <TextInput
                placeholder="Enter workspace name"
                value={addWorkspaceName}
                onChangeText={(text) => setAddWorkspaceName(text)}
            />
            <Button title="New Workspace" onPress={addOrga} />
            {
                dataBoard ?
                    <Organizations endUrl={endUrl} formValid={formValid} />

                    :
                    <Text>Vous n'avez pas de tableau</Text>
            }
            <StatusBar style="auto" />
        </ScrollView>
    );
}