
import Inputs from './Inputs'
import Display from './Display'
import './home.css'

export default function Home(){
    return (
        <div className='content'>
            <div className='inputDiv'><Inputs /></div>
            <div className='displayDiv'><Display  /></div>
        </div>
    )
}