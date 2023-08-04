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
    // REGEX
    // Starts with Ali
    // .find({author: /^Ali/})

    // Ends with Asar  (i denotes not case senstive)
    // .find({author: /Ali$/i})

    // Contains Asar
    // .find({author: /.*Ali.*/i})

    const courses = await Course
    .find({author: 'Ali Asar', isPublished: true})
    // .find({ price: {$qt:10, $lt: 20}})  =>  this is comparison for greater than or less than.
    // .find({ price : { $in : [10, 20, 50] }})  => This is same as OR
    // This is logical operators below : OR AND 
    // .find()
    // .or( [{author: 'Ali Asar'}, {isPublished: false} ]) // same for AND
    .limit(10)
    .sort({name:1}) //1 = asc, -1 = desc
    .select({name:1, tags:1}); // 1 flag = yes
    // .count(); // returns number of documents
    console.log(courses);
}

getCourses();
