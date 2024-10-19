import React from 'react';
import Mission from './Missions';

function MissionList({ missions, onDelete, onEdit }) {
    return (
        <table id="missions">
            <caption>Add and Edit Missions</caption>
            <thead>
                <tr>
                    <th>Mission Name</th>
                    <th>Launch Date</th>
                    <th>Distance</th>
                    <th>Unit</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {missions.map((mission, i) => 
                    <Mission 
                        mission={mission} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default MissionList;
