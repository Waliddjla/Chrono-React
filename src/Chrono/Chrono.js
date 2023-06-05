import React, {useState} from 'react'
import './Chrono.css'
import PauseImg from '../Images/pause.svg'
import PlayImg from '../Images/play.svg'
import ResetImg from '../Images/reset.svg'



export default function Chrono() {

    const[sessionTime, setsessionTime] = useState(1500);
    const[sessionFixed, setsessionFixed] = useState(1500);

    const[breakTime, setbreakTime] = useState(300);
    const[breakFixed, setbreakFixed] = useState(300);

    const[workingChrno, setworkingChrono]= useState(false);

  return (
    <div className='container-chrono'>
        <div className="container-config">
            <div className="box-btns session">
                <button className='minus'>-</button>
                <span>{sessionFixed / 60}</span>
                <button className='plus'>+</button>
            </div>
            <div className="box-btns break">
                <button className='minus'>-</button>
                <span>{breakFixed / 60}</span>
                <button className='plus'>+</button>
            </div>
        </div>
        <h1>
            <span>chrono</span>
        </h1>
        <div className="container-controllers">
            <button>
                <img src={workingChrno? PauseImg: PlayImg }/>
            </button>
            <button>
                <img src={ResetImg}/>
            </button>
        </div>
    
    </div>
  )
}
