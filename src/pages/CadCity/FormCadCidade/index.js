import React, {useState, useEffect} from 'react'
import './style.css'
import api from '../../../services/api'


function FormCadCidade({city, saveCallback=()=>{}}){

	const [name, setName]								= useState('')
	const [code, setCode]								= useState('')
	const [country_districtId, setCountryDistrictId]	= useState(0)
	const [countryId, setCountryId]						= useState(0)
	const [countryDistricts, setCountryDistricts]		= useState([])
	const [countries, setCountries]						= useState([])
	
	const auth = localStorage.getItem('authToken')
	
	// Update form info when property city is updated

	useEffect(()=>{
		api.get(`/country/`,{
			headers:{
				auth
			}
		}).then(({data: countriesList})=>{
			setCountries(countriesList)
		})
		api.get(`/countryDistrict/`,{
			headers:{
				auth
			}
		}).then(({data: countriesList})=>{
			setCountryDistricts(countriesList)
		})
		if(city){
			setCode(city.code)
			setName(city.name)
			setCountryId(city.countryId)
			setCountryDistrictId(city.country_districtId)
		}
		else{
			setCode('')
			setName('')
			setCountryId('')
			setCountryDistrictId('')
		}
	},[city, auth])

	// Update the districts when the country is updated

	useEffect(()=>{
		if(countryId){
			api.get(`/countryDistrict/?countryId=${countryId}`,{
				headers:{
					auth
				}
			}).then(({data: countriesList})=>{
				setCountryDistricts(countriesList)
			})
		}
		else{
			api.get(`/countryDistrict/`,{
				headers:{
					auth
				}
			}).then(({data: countriesList})=>{
				setCountryDistricts(countriesList)
			})
		}
	}, [countryId, auth])

	function saveCity(event){
		event.preventDefault()

		api.post('/city/', {
			...(city?{id:city.id}:{}),
			name,
			code,
			countryId,
			country_districtId
		},
		{
			headers:{
				auth
			}
		}).then(({data})=>{
			data.countryDistrict = countryDistricts.find(c=>parseInt(c.id)===parseInt(data.country_districtId))
			data.country = countries.find(c=>parseInt(c.id)===parseInt(data.countryId))
			saveCallback(data)
			console.log(data)
		})
	}

	return (
		<>
			<form action="" className="formCity" onSubmit={saveCity}>
				<div className="input-line" id="lineOneCity">
					<div className="input-group">
						<label htmlFor="id">Id</label>
						<input type="text" id value={city?city.id:''} disabled/>
					</div>
					<div className="input-group">
						<label htmlFor="name">Nome</label>
						<input type="text" id="name" value={name} onChange={event=>setName(event.target.value)}/>
					</div>
				</div>
				<div className="input-line" id="lineTwoCity">
					<div className="input-group">
						<label htmlFor="code">Cód. IBGE</label>
						<input type="text" name="code" id="code" value={code} onChange={event=>setCode(event.target.value.replace(/\D/g, ''))}/>
					</div>
					<div className="input-group">
						<label htmlFor="country">País</label>
						<select name="country" id="country" value={countryId} onChange={event=>setCountryId(event.target.value)}>
							<option value="">Selecione um país</option>
							{countries.map(c=>{
								return <option value={c.id}>{c.name}</option>
							})}
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="countryDistrict">Estado</label>
						<select type="text" name="countryDistrict" id="countryDistrict" value={country_districtId} onChange={event=>setCountryDistrictId(event.target.value)}>
							<option value="">Selecione um estado</option>
							{countryDistricts.map(cd=>{
								return <option value={cd.id}>{cd.name}</option>
							})}
						</select>
					</div>
				</div>
				<button type="submit" class="btnSave color-secondary-dark">Salvar</button>
			</form>
		</>
	)
}

export default FormCadCidade