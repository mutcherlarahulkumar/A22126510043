import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography variant="h5" component="div">
//         Name of the Expense
//       </Typography>
//       <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Date</Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Update</Button>
//       <Button size="small">Delete</Button>
//     </CardActions>
//   </React.Fragment>
// );

export default function ExpenseCard({key,name,date,amount}) {
  const naviagate = useNavigate();
  const {setCurrentData} = React.useContext(userContext);
  return (
    <Box sx={{ minWidth: 275 }}>
          <React.Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{date}</Typography>
          <Typography sx={{ color: 'text.primary', mb: 1.5 }}>{amount}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{
            setCurrentData({name,date,amount});
            naviagate('/update')
          }}>Update</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </React.Fragment>
    </Box>
  );
}
