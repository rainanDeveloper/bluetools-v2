import React, {useEffect, useState} from 'react'
import './style.css'

function FormCadContract({contract, saveCallback=((c)=>{})}){

	const [customer, setCustomer] = useState(contract?contract.customerId:'')
	const [dueDay, setDueDay] = useState(contract?contract.dueDay:'')
	const [installationDate, setInstallationDate] = useState(contract?contract.installationDate:'')
	const [status, setStatus] = useState(contract?contract.status:'')
	const [customers, setCustomers] = useState([])

	return (
		<>
			<form action="" className="formContract">
				<div className="input-line" id="lineOneContract">
					<div className="input-group">
						<label htmlFor="id">Id</label>
						<input type="text" id value={contract?contract.id:''} disabled/>
					</div>
					<div className="input-group">
						<label htmlFor="customer">Cliente</label>
						<select name="" id=""></select>
					</div>
				</div>
			</form>
		</>
	)
}

export default FormCadContract