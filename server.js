const express = require('express')
const app = express();
const PORT = 4000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(express.json())

app.get('/', async (request, response) =>{
    const todoItems = await db.collection('toDo').find().toArray()
    const itemsLeft = await db.collection('toDo').countDocuments({completed: false})
    response.render('index.ejs', { info: todoItems, left: itemsLeft })
    // db.collection('toDo').find().toArray()
    // .then(data => {
    //     response.render('index.ejs', { info: data })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTask',(request,response) => {
    db.collection('toDo').insertOne({taskName: request.body.taskName, dueDate: request.body.dueDate, taskType: request.body.taskType, completed: false })
    .then(result => {
        console.log('Task Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})


app.put('/checkTodo', (request, response)=>{
    db.collection('toDo').updateOne({taskName:request.body.toDoNameS},{
        $set: {
            completed: true
        }
    })
    .then(result =>{
        console.log('Completed Todo')
        response.json('Completed It')
    })
    .catch(err => console.log(err))
})

app.put('/uncheckTodo', (request, response)=>{
    db.collection('toDo').updateOne({taskName:request.body.toDoNameS},{
        $set: {
            completed: false
        }
    })
    .then(result =>{
        console.log('Unchecked Todo')
        response.json('No Longer It')
    })
    .catch(err => console.log(err))
})


app.delete('/deleteTodo', (request, response)=>{
    db.collection('toDo').deleteOne({taskName:request.body.toDoNameS})
    .then(result =>{
        console.log('Deleted Todo')
        response.json('Deleted It')
    })
    .catch(err => console.log(err))
})



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})


//brainstorm the to-do list
//add individual things to our to do list
//we have a form with an input so we're making a post request
//what on server hears the post -> the api
//app.post('/route')<- the route that goes here is the action on the form
//when it hears that post we want to go to database
//db.collection('todos').insertOne({text:req})
//once done putting that document in we'll tell our app to reload which triggers a get request
//in docs storing whether or not its been completed
// what triggers our get...refreshing or url
// go to database
// app.get(/)
// db.collection('todo').find().toArray()
//pass our arry to our ejs and our ejs spits out html. we respond with it
 