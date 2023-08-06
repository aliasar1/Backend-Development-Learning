const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{
    family: 4
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(id){

  // Method 1 where we find first
  // const course = await Course.findById(id);
  // course.author.name = "Ali Asar";
  // course.save();

  // Method 2
  const course = await Course.updateOne({ _id : id }, {
    $set: {
      'author.name': 'Ali Asar Khowaja'
    }
  });
}

async function removeSubDoc(id){

  const course = await Course.updateOne({ _id : id }, {
    $unset: {
      'author': '' //also can do author.name to remove a property
    }
  });
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
}

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Ali' })
// ]);

// listCourses();

// removeSubDoc('64cfbb79588bb76e45cc8a40');

// updateAuthor('64cfbb79588bb76e45cc8a40');

// addAuthor('64cfbfae0fcfcac6b3e7e62c',  new Author({ name: 'Sarim' }),);

removeAuthor('64cfbfae0fcfcac6b3e7e62c', '64cfc0974387f09fd2a8c735');