import React, {useState, useEffect} from 'react'
import './style.css'

function ToastDisplay({children, fontColor="white",colorClass="color-primary-shade"}){

    const [active, setActive] = useState('')

    useEffect(()=>{
        if(children.length>0){
            fadeEffect()
        }
    }, [children])

    function fadeEffect(){
        setActive('active')

        setTimeout(()=>{
            setActive('fadeOut')
        }, 2000)

        setTimeout(()=>{
            setActive('')
        }, 3000)
    }

    return (
        <div className={`defaultToastDisplay ${colorClass} ${active}`} style={{color: fontColor}}>
            {children}
        </div>
    )
}

export default ToastDisplay