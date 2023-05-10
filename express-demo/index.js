const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [{id: 1, name: 'Maths'}, {id: 2, name: 'Chemistry'}, {id: 3, name: 'Physics'}];

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Request not found!');
    }
    else{
        res.send(course);
    }
});

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });

    // const result = schema.validate(req.body);
    // if (result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send("Name is required with minimum 3 characters.");
    //     return;
    // }

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing. return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course not found");
        return;
    }

    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update Course
    // Return the update course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course not found");
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

// PORT
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening to port ${port}`));