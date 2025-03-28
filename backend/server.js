const express = require('express');
const cors = require('cors');
const {rootRouter} = require('./routes/index');

const PORT = 3000;


const app = express();
app.use(cors());
app.use(express.json());

app.use('/',rootRouter);

app.use((err,req,res,next)=>{
    console.error(err);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: "Internal Server Error.. We are working on it..."
    });
});


app.listen(PORT,()=>{
    console.log(`The Server is running on Port ${PORT}`);
})