import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";

export const EditMissionPageTable = ({ missionToEdit }) => {
 
    const [missionName, setMissionName]       = useState(missionToEdit.missionName);
    const [launchDate, setLaunchDate]         = useState(missionToEdit.launchDate.slice(0,10));
    const [distance, setDistance] = useState(missionToEdit.distance);
    const [unit, setUnit] = useState(missionToEdit.unit);
    
    const redirect = useNavigate();

    const editMission = async () => {
        const response = await fetch(`/missions/${missionToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                missionName: missionName, 
                launchDate: launchDate,
                distance: distance,
                unit: unit
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert(`Your request was successful and the response body has the neccessary information`);
        } else {
            const errMessage = await response.json();
            alert(`Your request was unsuccessful and the response body is missing neccessary information ${response.status}. ${errMessage.Error}`);
        }
        redirect("/log");
    }

    return (
        <>
        <article>
            <h2>Edit a mission</h2>
            <p>Paragraph about this page.</p>
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
                    <label for="submit"></label>
                        <button
                            type="submit"
                            onClick={editMission}
                            id="submit"
                        >Submit Edit</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </article>
        </>
    );
}
export default EditMissionPageTable;