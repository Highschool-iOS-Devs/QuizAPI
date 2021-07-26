const express = require('express')
const multer = require('multer')
const fs = require('fs')
const { promisify } = require('util')
const { json } = require('body-parser')

const unlinkAsync = promisify(fs.unlink)
const app = express()
const port = process.env.PORT || 3001

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
    quiz = req.query.quiz
    text = "..."
    res.send({"quiz": quiz})
    return 'hello'
})
app.get('/getQuiz', function(req, res) {
    res.sendFile(__dirname + "/uploads/" + "quiz.json");
    
    return 'hello'
})
app.post('/upload', upload.single('uploadedFile'), (req, res) => {
    
    if (req.file) {
        console.log(req.file)
        console.log(req.body)
        printed = '...'
        //ids.push(req.file.originalname)
        return res.send({ id: "", "savedImg": "", "process": printed })
        ready = true
} else {
        return res.send({ id: "", "savedImg": "", "process": printed })
}

})
app.listen(port)
console.log('Server started successfully on port ' + port + "!")