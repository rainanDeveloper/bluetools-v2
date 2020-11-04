import React, {useState, useEffect} from 'react'
import './style.css'
import api from '../../../services/api'

function FormCadPais({country, saveCallback=((c)=>{})}){

	const [name, setName] = useState(country?country.name:'')
	const [code, setCode] = useState(country?country.code:'')
	const [abbreviation, setAbbrevation] = useState(country?country.abbreviation:'')
	const [currency, setCurrency] = useState(country?country.currency:'')

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		if(country){
			setName(country.name)
			setCode(country.code)
			setAbbrevation(country.abbreviation)
			setCurrency(country.currency)
		}
		else{
			setName('')
			setCode('')
			setAbbrevation('')
			setCurrency('')
		}
	}, [country])

	function saveCountry(event){
		event.preventDefault()

		api.post('/country/', {
				...(country?{id:country.id}:{}),
				name,
				code,
				abbreviation,
				currency
			},{
				headers: {
					'auth': authToken
				}
			}).then(({data: newCountry})=>{
				saveCallback(newCountry)
			}).catch((error)=>{
				alert(`Não foi possível salvar cadastro de país: ${error}`)
			})
	}

	return (
	<>
		<form action="" id="countryForm" onSubmit={saveCountry}>
			<div className="input-line" id="one">
				<div className="input-group">
					<label htmlFor="id">Id</label>
					<input type="text" id="id" disabled value={country?country.id:''}/>
				</div>
				<div className="input-group">
					<label htmlFor="name">Nome</label>
					<input type="text" id="name" value={name} onChange={event=>setName(event.target.value)}/>
				</div>
			</div>
			<div className="input-line" id="two">
				<div className="input-group" title="Código do país (ISO 3166-1 Numérico)">
					<label htmlFor="code">Código do país</label>
					<input type="text" id="code" value={code} onChange={event=>setCode(event.target.value.replace(/\D/g, ''))} onBlur={event=>setCode(event.target.value.replace(/\D/g, '').padEnd(3, '0'))} maxLength={3}/>
				</div>
				<div className="input-group">
					<label htmlFor="abbreviation">Abreviação</label>
					<input type="text" id="abbreviation" value={abbreviation} onChange={event=>setAbbrevation(event.target.value.toUpperCase())} maxLength={2}/>
				</div>
				<div className="input-group">
					<label htmlFor="abbreviation">Moeda</label>
					<input type="text" id="abbreviation" value={currency} onChange={event=>setCurrency(event.target.value.toUpperCase())} maxLength={3}/>
				</div>
			</div>
			<button type="submit" className="btnSave color-secondary-dark">Salvar</button>
		</form>
	</>
	)
}

export default FormCadPais