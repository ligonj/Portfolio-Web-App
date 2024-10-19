import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AddMissionPageTable = () => {

    const [missionName, setMissionName]       = useState('');
    const [launchDate, setLaunchDate]         = useState();
    const [distance, setDistance] = useState('');
    const [unit, setUnit] = useState('');
    
    const redirect = useNavigate();

    const addMission = async () => {
        const newMission = { missionName, launchDate, distance, unit };
        const response = await fetch('/missions', {
            method: 'post',
            body: JSON.stringify(newMission),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`The request was successful and your mission was added as a resource.`);
        } else {
            alert(`The request to add your mission as a resource was unsuccessful. = ${response.status}`);
        }
        redirect("/log");
    };


    return (
        <>
        <article>
            <h2>Add a mission</h2>
            <p>On this page you may add a space mission with its launch date, distance from Earth and the units that the distance is logged in.</p>
            
            <table id="missions">
                <caption>Which mission are you adding?</caption>
                <thead>
                    <tr>
                        <th>Mission Name</th>
                        <th>Launch Date</th>
                        <th>Distance</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                <td><label for="missionName">Mission Name</label>
                        <input
                            type="text"
                            placeholder="name of mission"
                            value={missionName}
                            onChange={e => setMissionName(e.target.value)} 
                            id="missionName" />
                    </td>

                    <td><label for="launchDate">Launch Date</label>
                        <input
                            type="date"
                            value={launchDate}
                            onChange={e => setLaunchDate(e.target.value)} 
                            pattern = "\d{2}-\d{2}-\d{2}"
                            id="launchDate" />
                    </td>

                    <td><label for="distance">Distance from Earth</label>
                        <input
                            type="number"
                            placeholder="distance from Earth"
                            value={distance}
                            onChange={e => setDistance(e.target.value)} 
                            id="distance" />
                    </td>

                    <td><label for="unit">Unit for Distance</label>
                        <input
                            type="text"
                            placeholder="unit for distance"
                            value={unit}
                            onChange={e => setUnit(e.target.value)} 
                            id="unit" />
                    </td>
            

                    <td>
                    <label for="submit">Submit</label>
                        <button
                            type="submit"
                            onClick={addMission}
                            id="add"
                        >Add</button>
                    </td>
            
                </tr>
                </tbody>
            </table>
        </article>
    </>
);
}

export default AddMissionPageTable;