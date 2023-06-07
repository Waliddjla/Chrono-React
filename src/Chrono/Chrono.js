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

    const handelsession = (e) => {
        const el = e.target;
        if(el.classList.contains('minus')) {
            if (sessionTime / 60 > 1) {
                setsessionTime(sessionTime - 60)
                setsessionFixed(sessionFixed - 60)
                
            }
        }else if (el.classList.contains('plus')) {
            
                setsessionTime(sessionTime + 60)
                setsessionFixed(sessionFixed + 60)
            
        }

    }
    const handelbreak = (e) => {
        const el = e.target;
        if(el.classList.contains('minus')) {
            if (breakTime / 60 > 1) {
                setbreakTime(breakTime - 60)
                setbreakFixed(breakFixed - 60)
                
            }
        }else if (el.classList.contains('plus')) {
            setbreakTime(breakTime + 60)
                setbreakFixed(breakFixed + 60)
            
        }
    }
    const restFunc = () => {
        if (workingChrno) { 
            setworkingChrono(!workingChrno)
        }
        setsessionTime(sessionFixed)
        setbreakTime(breakFixed)
    }

  return (
    <div className={workingChrno ? 'container-chrono anim-glow' : 'container-chrono' }>
        <div className="container-config">
            <div className="box-btns session">
                <button onClick={handelsession}
                className='minus'>-</button>
                <span>{sessionFixed / 60}</span>
                <button onClick={handelsession}
                className='plus'>+</button>
            </div>
            <div className="box-btns break">
                <button onClick={handelbreak}
                className='minus'>-</button>
                <span>{breakFixed / 60}</span>
                <button onClick={handelbreak}
                className='plus'>+</button>
            </div>
        </div>
        <h1>
            {sessionTime >= 0 ? (
                <span>
                    {`${Math.trunc(sessionTime / 60)} : ${sessionTime % 60 < 10 ? `0${sessionTime % 60}`: `${sessionTime % 60}`}`}
                </span>
            ) : 
            <span>
                {`${Math.trunc(breakTime / 60)} : ${breakTime % 60 < 10 ? `0${breakTime % 60}`: `${breakTime % 60}`}`}
            </span>
            }

        </h1>
        <div className="container-controllers">
            <button 
            onClick={playpause}>
                <img src={workingChrno? PauseImg: PlayImg }/>
            </button>
            <button onClick={restFunc}>
                <img src={ResetImg}/>
            </button>
        </div>
    
    </div>
  )
}
