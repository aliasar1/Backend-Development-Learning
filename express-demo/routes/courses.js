const express = require('express');
const router = express.Router();

const courses = [{id: 1, name: 'Maths'}, {id: 2, name: 'Chemistry'}, {id: 3, name: 'Physics'}];



router.get('/api/courses', (req, res) => {
    res.send(courses);
});

// /api/courses/1
router.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Request not found!');
    }
    else{
        res.send(course);
    }
});

router.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});

router.post('/api/courses', (req, res) => {
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

router.put('/api/courses/:id', (req, res) => {
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

router.delete('/api/courses/:id', (req, res) => {
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

module.exports = router;
