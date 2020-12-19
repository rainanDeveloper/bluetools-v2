import React from 'react'
import './style.css'


function Loader({loading}){

	return <div className={`loaderContainer ${loading?'loading':''}`}>
		<div className="loader"></div>
	</div>

}

export default Loader