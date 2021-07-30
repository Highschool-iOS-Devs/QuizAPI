const express = require('express')
const multer = require('multer')
const fs = require('fs')
const { promisify } = require('util')
const { json } = require('body-parser')

const unlinkAsync = promisify(fs.unlink)
const app = express()
const port = process.env.PORT || 3001
var result = {};
//const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
      callback(null, file.originalname)
  }
});
const upload = multer({ storage: storage })
var text = "...";
var quiz = "...";

app.post('/postText', function(req, res) {
    text = req.query.text
    res.send(text)
    return 'hello'
})
app.get('/getText', function(req, res) {
    res.send(text)
    return 'hello'
})
app.get('/postQuiz', function(req, res) {
    result = req.query;
    console.log(result)
    console.log(req.query)
    console.log(JSON.stringify(req.query))

    //print(quiz)
    //print(req.query.quiz)
    text = "..."
    res.send(quiz)
    return 'hello'
})
app.get('/getQuiz', function(req, res) {
    //res.sendFile(__dirname + "/uploads/" + "quiz.txt");
    console.log(result);
    res.send(result)
    result = {}
    return 'hello'
})
app.post('/upload', upload.single('uploadedImage'), (req, res) => {
    
    if (req.file) {
        console.log(req.file)
        console.log(req.body)
        
        //ids.push(req.file.originalname)
        return res.sendFile(__dirname + "/uploads/" + "quiz.txt");
        ready = true
} else {
        return res.sendFile(__dirname + "/uploads/" + "quiz.txt");
}

})
app.listen(port)
console.log('Server started successfully on port ' + port + "!")