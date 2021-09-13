import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    {useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", ()=> {
    console.log("Sucessfully connected to MongoDB using Mongoose!");
});

mongoose.set("useCreateIndex", true);

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async(name, reps, weight, unit, date)=>{
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date:date});
    return exercise.save();
}

const findExercise = async(filter, projection, limit)=> {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

const findExerciseById = async(_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

const replaceExercise= async(id, name, reps, weight, unit, date)=>{
    const result = await Exercise.replaceOne({_id: id}, {name: name, reps: reps, weight:weight, unit: unit, date: date})
    return {_id: id, name: name, reps: reps, weight:weight, unit: unit, date: date};
}

const deletebyId = async (id) =>{
    const result = await Exercise.deleteOne({_id:id})
    return result.deletedCount
}

export {createExercise, findExercise, findExerciseById, replaceExercise, deletebyId}