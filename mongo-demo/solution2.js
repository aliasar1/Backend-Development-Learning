const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mongo-exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
    // .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
    // .sort({price:-1})
    // .select({name: 1, author: 1});
    .find({isPublished: true})
    .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort('-price')
    .select('name author price');
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();