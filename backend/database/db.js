const mongoose = require("mongoose");

mongoose.connect("URL");

const todo = new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const Todos = mongoose.model('Todo',todo);

module.exports = {
    Todos
}

