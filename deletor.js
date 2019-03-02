// require('./server-assets/db/gearhost-config')
// let users = require('./server-assets/models/user')
// let comments = require('./server-assets/models/comment')
// let posts = require('./server-assets/models/post')


// function deleteAll() {
//     Promise.all([comments.deleteMany({}), posts.deleteMany({}), users.deleteMany({})])
//         .then(res => console.log(res))
//         .catch(err => console.error(err))
// }


// deleteAll()


//this route very simply adds a grade to the student's grades array. modify the logic to fit your needs

// router.put('/:id', (req, res, next) => {
//     Students.findById(req.params.id)
//         .then(student => {
//             student.grades.push(req.body)
//             return student.save()
//         })
//         .then(() => res.send("Student Updated"))
//         .catch(next)
// })



// let mongoose = require('mongoose')
// let Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId
// let name = "Student"

// //grade schema will be a subDoc on the Student schema
// //mongodb will provide _id's for each grade
// let grade = new Schema({
//     score: { type: String, enum: ["A", "B", "C", "D", "F"], required },
//     assignment: { type: String, required }
// })

// let schema = new Schema({
//     name: { type: String, required: true },
//     school: { type: ObjectId, ref: "School", required: true },
//     favoriteSubject: { type: String, enum: ["Art", "Math", "History", "Computer Science"] },
//     classrooms: [{ type: ObjectId, ref: "Classroom" }],
//     grades: [grade] //every element in the grades array must be a grade
// })