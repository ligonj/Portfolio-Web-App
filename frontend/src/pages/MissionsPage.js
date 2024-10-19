import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MissionList from '../components/MissionsList';
import { Link } from 'react-router-dom';

import { GoPlusCircle } from 'react-icons/go';

function MissionsPage({ setMission }) {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [missions, setMissions] = useState([]);

    // RETRIEVE the entire list of space missions
    const loadMissions = async () => {
        const response = await fetch('/missions');
        const missions = await response.json();
        setMissions(missions);
    } 
    

    // UPDATE space missions
    const onEditMission = async mission => {
        setMission(mission);
        redirect("/update");
    }


    // DELETE space missions  
    const onDeleteMission = async _id => {
        const response = await fetch(`/missions/${_id}`, { method: 'DELETE' });
        if (response.status === 200) {
            const getResponse = await fetch('/missions');
            const missions = await getResponse.json();
            setMissions(missions);
        } else {
            console.error(`Your request was unsuccessful and the response body is missing neccessary information = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD space missions
    useEffect(() => {
        loadMissions();
    }, []);

    // DISPLAY space missions
    return (
        <>
            <h2>Space Missions</h2>
            <p>This page displays NASA Space Missions, the date the spacecraft launched, the distance of the spacecraft from Earth, and the units that the distance from Earth are logged in. This data may be edited and deleted. Additional space missions can be added as well.</p>
            <Link to="/create"><i><GoPlusCircle/></i>Add Space Mission</Link>
            <MissionList 
                missions={missions} 
                onEdit={onEditMission} 
                onDelete={onDeleteMission} 
            />
        </>
    );
}

export default MissionsPage;