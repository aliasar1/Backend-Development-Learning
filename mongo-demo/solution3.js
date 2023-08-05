const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mongo-exercises', {
        family: 4,
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Cound not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema); 

async function getCourses(){
    return await Course
    .find({isPublished: true})
    .or([{price : {$gte : 15}}, {name: /.*by.*/i}])
    .select();
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();