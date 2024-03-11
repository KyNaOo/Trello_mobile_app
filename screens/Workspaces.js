import { StatusBar } from 'expo-status-bar';
import {Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {userService} from "../services/userService";
import Organizations from "../component/Organizations";
import StickyButton from "../component/StickyButton";

export default function Workspaces() {

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
    const endUrl = `key=${apiKey}&token=${apiToken}`
    const [user, setUser] = useState(null);
    const [dataBoard, setDataBoard] = useState([]);
    const [addWorkspaceName, setAddWorkspaceName] = useState('');
    const [formValid, setFormValid] = useState(false);

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
        <ScrollView contentContainerStyle={styles.container}
                    contentInset={{ bottom: 150 }} // Customize the bottom inset
                    contentOffset={{ y: -20 }}
        >
            <View style={styles.container}>
            <Text>Bonjour {user.username}</Text>
            <TextInput
                placeholder="Enter workspace name"
                value={addWorkspaceName}
                onChangeText={(text) => setAddWorkspaceName(text)}
            />
            <Button title="New Workspace" onPress={addOrga} />
            </View>
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

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },

});