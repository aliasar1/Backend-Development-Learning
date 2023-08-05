const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mongo-exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Cound not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    }, // we can add require validation using mongoose like this.
    catergory: {
        type: String,
        enum: ['mobile', 'web', 'networking'],
        required: true,
        lowercase: true,
        // uppercase: true,
        trim: true,
    },
    author: String,
    // Async Validator
    tags: {
        type: Array,
        validate: {
            validator: async function(v) {
                const res = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(v && v.length > 0);
                    }, 4000);
                });
                return res;
            },
            message: 'A course should have at least one tag.',
        },
    },
    //     // Custom Validator
    // tags: {
    //     type: Array,
    //     validate:{
    //         validator: function(v){
    //             return v && v.length > 0;
    //         },
    //         message: 'A course should have atleast one tag.',
    //     }
    // },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    // if course is published, price cannot be null.
    price: {
        type: Number, 
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

const Course = mongoose.model('Course', courseSchema); 

async function createCourse(){
    const course = new Course({
        // name: 'Flutter Course', // this would give error as it is required
        name: 'Flutter',
        catergory: 'web', // this gives error of not matching enum array
        author: 'Sarim',
        tags: [],
        isPublished: true, // This will throw exception as if course is published price can not be null.
        price: 20
    });

    try{
        await course.validate(); // this gives exception
    }
    catch(e){
        console.log(e.message);
    }
}

createCourse();

