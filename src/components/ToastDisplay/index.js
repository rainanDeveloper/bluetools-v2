import React, {useState, useEffect} from 'react'
import './style.css'

function ToastDisplay({children, fontColor="white",colorClass="color-primary-shade",toastId='toast1',changer}){

	const [visible, setVisible] = useState(false)
	const [invisible, setInvisible] = useState(true)

	useEffect(()=>{
		if(children.length>0){
			setVisible(true)
			setInvisible(false)

			setTimeout(()=>{
				setVisible(false)
			}, 2000)
			
			setTimeout(()=>{
				setInvisible(true)
			}, 3000)
		}
	}, [children, changer])

	return (
		<div className={`defaultToastDisplay ${colorClass} ${visible?'active':'fadeOut'} ${invisible?'notShowed':''}`} id={toastId} style={{color: fontColor}}>
			{children}
		</div>
	)
}

export default ToastDisplay