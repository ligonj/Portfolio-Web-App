// Controllers for the Space Mission Collection

import 'dotenv/config';
import express from 'express';
import * as missions from './space-mission-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/missions', (req,res) => { 
    missions.createMission(
        req.body.missionName, 
        req.body.launchDate, 
        req.body.distance,
        req.body.unit
        )
        .then(mission => {
            console.log(`"${mission.missionName}" was created and added to the collection successfully.`);
            res.status(201).json(mission);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'There was a client error and the server cannot process your request to create the mission.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/missions', (req, res) => {
    missions.retrieveMissions()
        .then(missions => { 
            if (missions !== null) {
                console.log(`All missions were retrieved successfully from the collection.`);
                res.json(missions);
            } else {
                res.status(404).json({ Error: 'The mission you requested cannot be found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'There was a client error and the server cannot process your request to retrieve the mission.' });
        });
});


// RETRIEVE by ID controller
app.get('/missions/:_id', (req, res) => {
    missions.retrieveMissionByID(req.params._id)
    .then(mission => { 
        if (mission !== null) {
            console.log(`"${mission.missionName}" was retrieved successfully, based on its ID.`);
            res.json(mission);
        } else {
            res.status(404).json({ Error: 'The mission you requested cannot be found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'There was a client error and the server cannot process your request to retrieve the mission.' });
    });

});


// UPDATE controller ************************************
app.put('/missions/:_id', (req, res) => {
    missions.updateMission(
        req.params._id, 
        req.body.missionName, 
        req.body.launchDate, 
        req.body.distance,
        req.body.unit
    )
    .then(mission => {
        console.log(`"${mission.missionName}" was updated.`);
        res.json(mission);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'There was a client error and the server cannot process your request to update the mission.' });
    });
});


// DELETE Controller ******************************
app.delete('/missions/:_id', (req, res) => {
    missions.deleteMissionById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} mission was deleted.`);
                res.status(200).send({ Success: 'The request was successful and the mission was deleted.' });
            } else {
                res.status(404).json({ Error: 'The mission you requested to delete cannot be found.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'There was an error with the deletion of the mission.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});