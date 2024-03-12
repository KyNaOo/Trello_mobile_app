import React, {useEffect, useState} from 'react';
import Organization from "./Organization";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Container from "@react-navigation/native-stack/src/views/DebugContainer";
import Edit from "./edit";

const Organizations = props => {
    const [dataWorkspace, setDataWorkspace] = useState([]);
    const getOrga = async ()=> {
        const urlWorkspaces = `https://api.trello.com/1/members/me/organizations?${props.endUrl}`;
        const fetchRespOrga = await fetch(urlWorkspaces);
        const organizations = await fetchRespOrga.json();
        setDataWorkspace(await organizations);
    }
    useEffect(() => {
        getOrga();
    }, [props.formValid]);
    return (
        <>
            {dataWorkspace && dataWorkspace.map((workspace) => {
                return(
                    <View>
                    <Organization organization={workspace} endUrl={props.endUrl} formValid={props.formValid} getOrga={getOrga} />
                    </View>
                )
            })}
        </>
    );
};



export default Organizations;