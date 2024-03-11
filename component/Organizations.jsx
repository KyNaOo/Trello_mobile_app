import React, {useEffect, useState} from 'react';
import Organization from "./Organization";

const Organizations = props => {
    const [dataWorkspace, setDataWorkspace] = useState([]);
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
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
                return <Organization organization={workspace} endUrl={props.endUrl} />
            })}
        </>
    );
};

export default Organizations;