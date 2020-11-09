import React, {useState, useEffect} from 'react'
import './style.css'
import api from '../../../services/api'

function FormCadUf({district, saveCallback=((d)=>{})}){

	const [name, setName] = useState(district?district.name:'')
	const [code, setCode] = useState(district?district.name:'')
	const [country, setCountry] = useState(district?district.countryId:0)
	const [abbreviation, setAbbreviation] = useState(district?district.abbreviation:'')
	const [countries, setCountries] = useState([])

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		api.get('/country/',{
			headers: {
				auth: authToken
			}
		}).then(response=>{
			setCountries(response.data)
		})
	}, [])

	useEffect(()=>{
		if(district){
			setName(district.name)
			setCode(district.code)
			setAbbreviation(district.abbreviation)
			setCountry(district.countryId)
		}
		else{
			setName('')
			setCode('')
			setAbbreviation('')
			setCountry(0)
		}
	}, [district])

	function saveDistrict(event){
		event.preventDefault()

		api.post('/countryDistrict/',{
			...(district?{id:district.id}:{}),
			name,
			code,
			countryId:country,
			abbreviation
		}, {
			headers: {
				auth: authToken
			}
		})
		.then(({data: newDistrict})=>{
			saveCallback(newDistrict)
		})
		.catch(error=>{
			
		})
	}
	
	return (
		<>
			<form action="" id="districtForm" onSubmit={saveDistrict}>
				<div className="input-line" id="lineOneUf">
					<div className="input-group">
						<label htmlFor="id">Id</label>
						<input type="text" id="id" disabled value={district?district.id:''}/>
					</div>
					<div className="input-group">
						<label htmlFor="name">Nome</label>
						<input type="text" id="name" value={name} onChange={event=>setName(event.target.value)}/>
					</div>
				</div>
				<div className="input-line" id="lineTwoUf">
					<div className="input-group">
						<label htmlFor="country">País</label>
						<select name="countries" required={true} id="country" value={country} onChange={event=>setCountry(event.target.value)}>
							<option value={0}>Selecione um país</option>
							{countries.map(c=>{
								return <option value={c.id}>{c.name}</option>
							})}
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="abbreviation">Abreviação</label>
						<input type="text" id="abbreviation" value={abbreviation} onChange={event=>setAbbreviation(event.target.value.toUpperCase())} maxLength={2}/>
					</div>
					<div className="input-group">
						<label htmlFor="code">Código do IBGE</label>
						<input type="text" id="code" value={code} onChange={event=>setCode(event.target.value.replace(/\D/g, ''))} maxLength={2}/>
					</div>
				</div>
				<button type="submit" className="btnSave color-secondary-dark">Salvar</button>
			</form>
		</>
	)
}

export default FormCadUf