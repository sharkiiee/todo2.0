const express = require("express");
const cors = require("cors");
const { Todos } = require("./database/db");
const { createTodo, updateTodo } = require("./validation/types");

const app = express();

app.use(express.json());

//restricting only the specific frontend connect to the backend.
app.use(cors({
    origin:"http://localhost:5173/"
}))

// It means your backend is allowing anyfrontend to connect to itself
// app.use(cors())

// Create todo in the database
app.post("/addTodo",async function(req,res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    try {
        if(!parsePayload.success)
            {
                res.status(400).json({
                    message:"Inputs are incorrect"
                })
                return;
            }else{
                await Todos.create({
                    title:createPayload.title,
                    description:createPayload.description,
                    completed:false
                })
            
                res.json({
                    message: "todo created"
                })
            }
    } catch (error) {
        res.status(500).json({
            message: "something is wrong with the /addTodo handler"
        })
    }
})

// see all your todos
app.get("/todos",async function(req,res){
    const todos = await Todos.find({});

    res.json({
        Todos:todos
    })
})

// update todo as mark as completed.
app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload)

    if(!parsePayload.success)
    {
        res.status(400).json({
            message: "_id is incorrect"
        })
        return ;
    }else{
        const id = updatePayload._id;
        await Todos.updateOne({
            _id:id
        },{
            completed:true
        })

        res.json({
            message:"Todo marked as completed"
        })
    }
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`todo is running on PORT ${PORT}`);
})