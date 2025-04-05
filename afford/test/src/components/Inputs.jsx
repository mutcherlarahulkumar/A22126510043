import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './inputs.css'
import { useContext, useState } from 'react';
import { userContext } from '../context';


export default function Inputs(){

    const [name,setName] = useState('');
    const [amount,setAmount]= useState('');

    const {data,setData} = useContext(userContext);
    
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
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e)=>{
                        setName(e.target.value);
                    }} />
                    <TextField id="filled-basic" label="Amount" variant="outlined" onChange={(e)=>{
                        setAmount(e.target.value);
                    }} />
                    <Button variant="outlined" onClick={()=>{
                        setData([...data,{name,date:"ttt",amount}]);
                        setName('');
                        setAmount('');
                    }}>Create Expense</Button>
                </div>
                </Box>
            </div>
        </div>
    )
}