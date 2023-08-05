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

// getCourses();

// Query First Method
// Good for conditional updates like checking if is published as we cant update the author if course is published in real world
async function updateCourse(id){
    const course = await Course.findById(id);

    if(!course) return;

    // Method 1
    course.author = 'Ali Asar Khowaja';
    course.isPublished = false;

    // Method 2
    // course.set({
    //     author: 'Ali Asar',
    //     isPublished: true;
    // });

    const result = await course.save();
    console.log(result);
}

// updateCourse('64cd188fd2042eb424988add');

// Query First Method
// Good for updating multiple docs
async function updateCourse2(id){

    // This will return result object:
    // {
    //     acknowledged: true,
    //     modifiedCount: 1,
    //     upsertedId: null,
    //     upsertedCount: 0,
    //     matchedCount: 1
    //   }
    // const result = await Course.updateOne({_id: id}, {
    //     $set: {
    //         author: 'Amy Ali',
    //         isPublished: false
    //     }
    // });
    // console.log(result);


    // TO fetch the old course also
    // const course = await Course.findByIdAndUpdate({_id: id}, {
    //     $set: {
    //         author: 'Amy Khan',
    //         isPublished: true
    //     }
    // });
    // console.log(course);

    // This will return the updated course
    const course = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Amy Ali',
            isPublished: false
        }
    }, {new: true});
    console.log(course);
}

// updateCourse2('64cd188fd2042eb424988add');

async function deleteCourse(id){
    // This deletes the first course it gets of same id
    // const result = await Course.deleteOne({_id: id});
    // console.log(result);

    // This delete multiple courses that are not published
    // const result = await Course.deleteMany({isPublished: false});
    // console.log(result);

    // Returns the course that is deleted
    /*
    findByIdAndRemove = It returns the deleted doc
    findByIdAndDelete = It does not return deleted doc thus its more faster
    */
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

deleteCourse('64cd19fb69cd8723f1c887d5');