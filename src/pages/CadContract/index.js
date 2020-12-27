import React, {useState} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'


function CadContract(){

	const [contracts, setContracts] = useState([])
	
	return (
		<>
			<SupMenuAdmin/>

			<div className="listContainer">

			</div>
		</>
	)
}

export default CadContract