import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { userContext } from "../context";


export default function UpdatePage(){
    const navigate =  useNavigate();
    const {data,setData,currentData} = useContext(userContext);
    const [name,setName] = useState(currentData.name);
    const [amount,setAmount]= useState(currentData.amount);
    
    return (
        <div>
            <div>Expense Tracker</div>
            <div>
                <Box 
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                <div className='inputs'>
                    <TextField id="outlined-basic" label="" variant="outlined" value={name} onChange={(e)=>{
                        setName(e.target.value);
                    }} />
                    <TextField id="filled-basic" label="" value={amount} variant="outlined" onChange={(e)=>{
                        setAmount(e.target.value);
                    }} />
                    <Button variant="outlined" onClick={() => {
                    const updatedItem = { ...currentData, name, amount };
                    const newData = data.map(item =>
                        item.name === currentData.name ? updatedItem : item
                    );
                    setData(newData);
                    navigate('/home');
                    }}>
                    Update Expense
                    </Button>
                </div>
                </Box>
            </div>
        </div>
    )
}