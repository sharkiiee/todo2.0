const zod = require("zod");

const createTodo = zod.object({
    title:zod.string(),
    description:zod.string(),
    completed:{
        type:Boolean,
        default:false
    }
})

const updateTodo = zod.object({
    _id:zod.string()
})

module.exports = {
    createTodo,
    updateTodo
}