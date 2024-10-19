// Models for the Space Mission Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'There was an internal server error and connection to cluster0 database did not execute successfully.' });
    } else  {
        console.log('Success: The cluster0 database was connected successfully');
    }
});

// SCHEMA: Define the collection's schema.
const spaceMissionSchema = mongoose.Schema({
	missionName:    { type: String, required: true },
    launchDate: { type: Date, required: true, default: Date.now },
	distance:     { type: Number, required: true },
    unit:       { type: String, required: true }
});

// Compile the model from the schema 
// by defining the collection name "missions".
const missions = mongoose.model('Missions', spaceMissionSchema);


// CREATE model *****************************************
const createMission = async (missionName, launchDate, distance, unit) => {
    const mission = new missions({ 
        missionName: missionName, 
        launchDate: launchDate, 
        distance: distance,
        unit: unit
    });
    return mission.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveMissions = async () => {
    const query = missions.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveMissionByID = async (_id) => {
    const query = missions.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteMissionById = async (_id) => {
    const result = await missions.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateMission = async (_id, missionName, launchDate, distance, unit) => {
    const result = await missions.replaceOne({_id: _id }, {
        missionName: missionName,
        launchDate: launchDate,
        distance: distance,
        unit: unit
    });
    return { 
        _id: _id, 
        missionName: missionName,
        launchDate: launchDate,
        distance: distance, 
        unit: unit
    }
}

// EXPORT the variables for use in the controller file.
export { createMission, retrieveMissions, retrieveMissionByID, updateMission, deleteMissionById }