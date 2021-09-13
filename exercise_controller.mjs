import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000; 
const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.post('/exercises', (req,res)=>{
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise =>{
        res.status(201).json(exercise);
    })
    .catch(error=>{
        console.error(error);
        res.status(400).json({ Error: 'Request failed'});
    });
});
app.get('/exercises', (req,res)=>{
    exercises.findExercise()
        .then(exercise => {
            res.json(exercise);                    
        })
        .catch(error => {
            res.status(400).json({Error:'Request to retrieve document failed'});
        });
});


app.get('/exercises/:id', (req,res)=>{
    const exerciseId = req.params.id;
    exercises.findExercise(exerciseId)
        .then(exercise => {
            if (exercise!== null){
                res.json(exercise);                    
            } else {
                res.status(404).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            res.status(400).json({Error:'Request to retrieve document failed'});
        });
});

app.put('/exercises/:id', (req, res)=> {
    exercises.replaceExercise(req.params.id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.json(exercise)
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error:'Request to replace document failed'});
        });
});

app.delete('/exercises/:id', (req, res) => {
    exercises.deletebyId(req.params.id)
        .then(deleteCount => {
            if(deleteCount === 1){
                res.status(204).send();
            } else {
                res.status(404).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.send({error:'Request to delete document failed'});
        });
});

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}...`);
});