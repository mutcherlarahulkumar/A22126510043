import express from "express";
import cors from "cors";
import zod from "zod";

const app = express();
const PORT = 3000;

const data = []

const objSchema = zod.object({
    name : zod.string(),
    description : zod.string(),
    category : zod.enum('travel','food'),
    subCategory : zod.array(zod.string())
})

function createObject(name,description,category,subCategory,date){
    data.push({
        id : data.length+1,
        name,
        description,
        category,    
        subCategory, 
        date,    // DD-MM-YYYY
        active : true
    });


}



app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send('dljb');
})

app.get('/getData',(req,res)=>{
    const resData = data.filter((item)=>{
        if(item.active){
            return item;
        }else{
            return false;
        }

    })
    res.status(200).json({
        resData
    })
})

app.get('/getData/:category',(req,res)=>{
    const cat = req.params.category;
    if(!cat){
        return  res.status(500).json({
            msg:"Send an Valid Id"
        })
    }
    const resData = data.filter((item)=>{
        if(item.active && item.category === cat){
            return item;
        }else{
            return false;
        }
    })
    res.status(200).json({
        resData
    })
})


app.get(`/getDatabySub/:subCategory`,(req,res)=>{
    const subCat = req.params.subCategory;
    if(!subCat){
        return  res.status(500).json({
            msg:"Send an Valid  and subcat"
        })
    }
    const resData = data.filter((item)=>{
        if(item.active){
            const subCategories = item.subCategory;
            // console.log(subCategories[0]);
            for(let i=0;i<subCategories.length;i++){
                if(subCategories[i]===subCat){
                    return item;
                }else{
                    return false;
                }
            }
            
        }else{
            return false;
        }
    })
    res.status(200).json({
        resData
    })
})

app.get('/filter/month/:monthNo',(req,res)=>{
    const monthNo = req.params.monthNo;
    if(!monthNo){
        return res.status(500);
    }
    const resData = data.filter((item)=>{
        const reqDate = item.date;
        if(monthNo === reqDate.slice(3,5)){
            return true;
        }
        else{
            return false;
        }
    })

    res.status(200).json({
        resData
    })
})


app.post('/create',(req,res)=>{
    const {name,description,category,subCategory,date} = req.body;
    createObject(name,description,category,subCategory,date);
    res.status(200).json({
        msg:"The data is added Successfully"
    })
});

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    if(!id){
        return res.status(500).json({
            msg:"Send an Valid Id"
        })
    }
    const currentData = data[id-1];
    const {name,description,category,subCategory} = req.body;
    currentData = {
        id : data.length+1,
        name,
        description,
        category,
        subCategory
    }
    res.status(200).json({
        msg:"The object is updated"
    })
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    if(!id){
        return res.status(500).json({
            msg:"Send an Valid Id"
        })
    }

    data[id-1].active = false;
    res.status(200).json({
        msg:"the object is deleted"
    })
})


app.listen(PORT,()=>{
    console.log(`The Server is Running on port ${PORT}`);
})