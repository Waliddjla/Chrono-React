import React, {useState, useEffect, useReducer} from 'react'
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

    const[state, dispatch] = useReducer(reducer);

    function reducer(state, action) {
        switch (action.type) {
            case 'TICK':
                if (sessionTime >= 0) {
                    setsessionTime(sessionTime - 1)
                }else if(breakTime >= 1) {
                    setbreakTime(breakTime - 1)
                }else if(breakTime <= 0 && breakTime <= 0) {
                    setsessionTime(sessionFixed)
                    setbreakTime(breakFixed)
                } 
                
                break;
        
            default:
                break;
        }
    }

    useEffect(() => {
        let id; 
        if(workingChrno){
            id= window.setInterval(() => {
              dispatch({type: 'TICK'})
            }, 1000)
        }
        return () => {
            window.clearInterval(id)
        }
    }, [workingChrno])

    const playpause = () => {
        setworkingChrono(!workingChrno)
    }

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
            {sessionTime >= 0 ? (
                <span>
                    {`${Math.trunc(sessionTime / 60)} : ${sessionTime % 60 < 10 ? `0${sessionTime % 60}`: `${sessionTime % 60}`}`}
                </span>
            ) : ""}

        </h1>
        <div className="container-controllers">
            <button 
            onClick={playpause}>
                <img src={workingChrno? PauseImg: PlayImg }/>
            </button>
            <button>
                <img src={ResetImg}/>
            </button>
        </div>
    
    </div>
  )
}
