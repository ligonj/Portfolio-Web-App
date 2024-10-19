import React from 'react';

import { GoXCircleFill, GoPencil } from 'react-icons/go';


function Mission({ mission, onEdit, onDelete }) {
    return (
        <tr>
            <td>{mission.missionName}</td>
            <td>{mission.launchDate.slice(0,10)}</td>
            <td>{mission.distance}</td>
            <td>{mission.unit}</td>

            <td><GoXCircleFill onClick={() => onDelete(mission._id)} /></td>
            <td><GoPencil onClick={() => onEdit(mission)} /></td>
        </tr>
    );
}

export default Mission;