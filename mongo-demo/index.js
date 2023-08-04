const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/playground', {
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
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); 

async function createCourse(){
    const course = new Course({
        name: 'Flutter Course',
        author: 'Sarim',
        tags: ['Dart', 'Firebase'],
        isPublished: false
    });

    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses(){
    const courses = await Course
    .find({author: 'Ali Asar', isPublished: true})
    .limit(10)
    .sort({name:1}) //1 = asc, -1 = desc
    .select({name:1, tags:1}); // 1 flag = yes
    console.log(courses);
}

getCourses();
