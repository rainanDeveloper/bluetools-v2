import React, {useEffect, useState} from 'react'
import './style.css'

function FormCadContract({contract, saveCallback=((c)=>{})}){

	const [customer, setCustomer] = useState(contract?contract.customerId:'')
	const [dueDay, setDueDay] = useState(contract?contract.dueDay:'')
	const [installationDate, setInstallationDate] = useState(contract?contract.installationDate:'')
	const [status, setStatus] = useState(contract?contract.status:'')

	return (
		<>
			
		</>
	)
}

export default FormCadContract