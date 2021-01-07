import React, {useEffect, useState} from 'react'
import api from '../../../services/api'
import './style.css'

function FormCadContract({contract, saveCallback=((c)=>{})}){

	const [customerId, setCustomerId] = useState(contract?contract.customerId:'')
	const [dueDay, setDueDay] = useState(contract?contract.dueDay:'')
	const [installationDate, setInstallationDate] = useState(contract?contract.installationDate:1)
	const [status, setStatus] = useState(contract?contract.status:1)
	const [customers, setCustomers] = useState([])

	const auth = localStorage.getItem('authToken')

	const days = new Array()

	for(let i=0; i<30; i++){
		days.push(i)
	}

	useEffect(()=>{
		api.get('/customer/', {
			headers: {
				auth
			}
		})
		.then(({data})=>{
			setCustomers(data)
		})
		.catch(()=>{
			setCustomers([])
		})
		.finally()
	}, [auth])

	useEffect(()=>{
		if(contract){
			setCustomerId(contract.customerId)
			setStatus(contract.status)
			setDueDay(contract.dueDay)
			setInstallationDate(contract.installationDate)
		}
		else{
			setCustomerId('')
			setStatus(1)
			setDueDay(1)
			setInstallationDate('')
		}
	}, [contract])

	function handleSave(event){
		event.preventDefault()

		api.post('contract',
		{
			customerId,
			dueDay,
			installationDate,
			status
		},
		{
			headers: {auth}
		}
		)
		.then(({data})=>{
			setCustomerId('')
			setStatus(1)
			setDueDay(1)
			setInstallationDate('')
			saveCallback(data)
		})
	}

	return (
		<>
			<form action="" className="formContract" onSubmit={handleSave}>
				<div className="input-line" id="lineOneContract">
					<div className="input-group">
						<label htmlFor="id">Id</label>
						<input type="text" id value={contract?contract.id:''} disabled/>
					</div>
					<div className="input-group">
						<label htmlFor="customer">Cliente</label>
						<select name="customer" id="customer" value={customerId} onChange={event=>setCustomerId(
								event
								.target
								.value
							)} required >
							<option value="">Selecione um cliente</option>
							{customers.map(c=>{
								return <option key={c.id} value={c.id}>{c.name}</option>
							})}
						</select>
					</div>
				</div>
				<div className="input-line" id="lineTwoContract">
					<div className="input-group">
						<label htmlFor="dueDay">Dia de cobrança</label>
						<select name="dueDay" id="dueDay" value={dueDay} onChange={event=>setDueDay(event.target.value)} required>
							{days.map((d,i)=>{
								return <option value={i+1}>{i+1}</option>
							})}
						</select>						
					</div>
					<div className="input-group">
						<label htmlFor="status">Status</label>
						<select name="status" id="status" value={status} onChange={event=>setStatus(event.target.value)} required>
							<option value={1}>Ativo</option>
							<option value={0}>Inativo</option>
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="installationDate">Data de instalação</label>
						<input type="date" name="installationDate" id="installationDate"
						value={installationDate}
						onChange={event=>setInstallationDate(
								event
								.target
								.value
							)} required/>
					</div>
				</div>
				<button type="submit" className="btnSave color-secondary-dark">Salvar</button>
			</form>
		</>
	)
}

export default FormCadContract