import React, {useState, useEffect} from 'react'
import SupMenuAdmin from '../../components/SupMenuAdmin'

import api from '../../services/api'

function CadUser(){
	
	const [users, setUsers] = useState([])
	const [q, setQ] =  useState('')
	
	return (
	<>
		<SupMenuAdmin/>
	</>
	)
}

export default CadUser