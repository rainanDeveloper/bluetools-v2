import React, {useState, useEffect} from 'react'
import './style.css'
import {cpfMask, phoneMask, cepMask} from '../../../functions/Masks/'
import api from '../../../services/api'
import Loader from '../../../components/Loader'
import axios from 'axios'

function FormCadCustomer({customer, saveCallback=(()=>{})}){

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [ssa_vat_id, setSsaVatId] = useState('')
	const [birth_date, setBirthDate] = useState('')
	const [telephone, setPhone] = useState('')
	const [cep, setCep] = useState('')
	const [address, setAddress] = useState('')
	const [cities, setCities] = useState([])
	const [cityId, setCityId] = useState('')
	const [country_districts, setCountryDistricts] = useState([])
	const [country_districtId, setCountryDistrictId] = useState('')
	const [countries, setCountries] = useState([])
	const [countryId, setCountryId] = useState('')
	const [loader, setLoader] = useState(false)

	const auth = localStorage.getItem('authToken')

	useEffect(()=>{
		if(customer){
			setName(customer.name)
			setEmail(customer.email)
			setBirthDate(customer.birth_date)
			setSsaVatId(customer.ssa_vat_id)
			setPhone(customer.telephone)
			setCep(customer.cep)
			setAddress(customer.address)
			setCityId(customer.cityId)
			setCountryDistrictId(customer.country_districtId)
			setCountryId(customer.countryId)
		}
		else{
			setName('')
			setEmail('')
			setBirthDate('')
			setSsaVatId('')
			setPhone('')
			setCep('')
			setAddress('')
			setCityId('')
			setCountryDistrictId('')
			setCountryId('')
		}

		api.get(`/city/`,{
			headers: {
				auth
			}
		}).then(({data: citiesFound})=>{
			setCities(citiesFound)
		})

		api.get(`/country/`,{
			headers: {
				auth
			}
		}).then(({data: countriesFound})=>{
			setCountries(countriesFound)
		})

		api.get(`/countryDistrict/`,{
			headers: {
				auth
			}
		}).then(({data: countryDistrictsFound})=>{
			setCountryDistricts(countryDistrictsFound)
		})

	}, [customer, auth])

	useEffect(()=>{
		if(countryId){
			api.get(`/countryDistrict/?countryId=${countryId}`, {
				headers: {
					auth
				}
			}).then(({data})=>{
				setCountryDistricts(data)
			})
		}
		else{
			api.get(`/countryDistrict/`, {
				headers: {
					auth
				}
			}).then(({data})=>{
				setCountryDistricts(data)
			})
		}
	}, [countryId])

	useEffect(()=>{
		if(country_districtId){
			api.get(`/city/?country_districtId=${country_districtId}`, {
				headers: {
					auth
				}
			}).then(({data})=>{
				setCities(data)
			})

			const district = country_districts.find(c=>parseInt(c.id)===parseInt(country_districtId))

			if(district){
				setCountryId(district.countryId)
			}

		}
		else{
			api.get(`/city/`, {
				headers: {
					auth
				}
			}).then(({data})=>{
				setCities(data)
			})
		}
	}, [country_districtId])

	useEffect(()=>{
		if(cityId){
			const city = cities.find(c=>parseInt(c.id)===parseInt(cityId))

			if(city){
				setCountryDistrictId(city.country_districtId)
			}
		}
	}, [cityId])

	function saveCustomer(event){
		event.preventDefault()
		setLoader(true)
		api.post('/customer/',
		{
			...(customer?{id: customer.id}:{}),
			name,
			ssa_vat_id,
			email,
			telephone,
			countryId,
			country_districtId,
			cityId,
			address,
			cep,
			birth_date
		},
		{
			headers: {
				auth
			}
		})
		.then(({data})=>{
			setName('')
			setEmail('')
			setBirthDate('')
			setSsaVatId('')
			setPhone('')
			setCep('')
			setAddress('')
			setCityId('')
			setCountryDistrictId('')
			setCountryId('')
			saveCallback(data)
			setLoader(false)
		})
		.catch(error=>{
			setLoader(false)
		})
	}

	async function countryProcessing(){
		const brasil = countries.find(c=>((c.name.indexOf('Brazil')>-1)||(c.name.indexOf('Brasil')>-1)))

		if(brasil){
			setCountryId(brasil.id)
			return brasil
		}
		else{
			const {data: newCountry} = await api.post('/country/',{
				name: "Brasil",
				code: "076",
				abbreviation: "BR",
				currency: "BRL"
			}, {
				headers: {
					auth
				}
			})

			setCountries([...countries, newCountry])
			setCountryId(newCountry.id)
			return newCountry
		}
	}

	async function countryDistrictProcessing(districtName, country_id){
		const cepDistrict = country_districts.find(c=>((c.name.indexOf(districtName)>-1)||(c.abbreviation.indexOf(districtName)>-1)))

		if(cepDistrict){
			setCountryDistrictId(cepDistrict.id)
			return cepDistrict
		}
		else{
			const {data: newDistrict} = await api.post('/countryDistrict/',{
				name: districtName,
				code: "",
				abbreviation: districtName,
				countryId: country_id
			}, {
				headers: {
					auth
				}
			})

			setCountryDistricts([...country_districts, newDistrict])
			setCountryDistrictId(newDistrict.id)
			return newDistrict
		}

	}

	async function cityProcessing(cityName, country_id, country_district_id){
		const cepCity = cities.find(c=>c.name.indexOf(cityName)>-1)

		if(cepCity){
			setCityId(cepCity.id)
		}
		else{
			const {data: newCity} = await api.post('/city/',{
				name: cityName,
				code: "",
				countryId: country_id,
				country_districtId: country_district_id
			}, {
				headers: {
					auth
				}
			})

			setCities([...cities, newCity])
			setCityId(newCity.id)
			return newCity
		}
	}


	function cepProcessing(){
		if(cep?.length===8){
			axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
			.then(async ({data})=>{
				setAddress(`${data.street}, ${data.neighborhood}`)
				
				const country = await countryProcessing()

				const countryDistrict = await countryDistrictProcessing(data.state, country.id)

				cityProcessing(data.city, country.id, countryDistrict.id)

			})
			.catch(error=>{})
		}
	}


	return (
	<>
		<Loader loading={loader}/>
		<form action="" id="customerForm" onSubmit={saveCustomer}>
			<div className="input-line" id="lineOneCustomer">
				<div className="input-group">
					<label htmlFor="customerName">Nome</label>
					<input id="customerName" required type="text" value={name} onChange={event=>setName(event.target.value)}/>
				</div>
			</div>
			<div className="input-line" id="lineTwoCustomer">
				<div className="input-group">
					<label htmlFor="customerEmail">Email</label>
					<input id="customerEmail" required type="text" value={email} onChange={event=>setEmail(event.target.value)}/>
				</div>
				<div className="input-group">
					<label htmlFor="customerCpf">CPF</label>
					<input id="customerCpf" type="text" pattern="\d{3}.\d{3}.\d{3}-\d{2}" required value={cpfMask(ssa_vat_id)} onChange={event=>setSsaVatId(event.target.value.replace(/\D/g, ''))} maxLength={14}/>
				</div>
			</div>
			<div className="input-line" id="lineThreeCustomer">
				<div className="input-group">
					<label htmlFor="customerPhone">Telefone</label>
					<input id="customerPhone" type="text" pattern="\(\d{2}\) \d{4,5}-\d{4}" required value={phoneMask(telephone)} onChange={event=>{setPhone(event.target.value.replace(/\D/g, ''))}} maxLength={15}/>
				</div>
				<div className="input-group">
					<label htmlFor="customerBirthDate">Data de Nasc.</label>
					<input type="date" value={birth_date} required onChange={event=>setBirthDate(event.target.value)}/>
				</div>
			</div>
			<div className="input-line" id="linefourCustomer">
				<div className="input-group">
					<label htmlFor="customerCep">CEP</label>
					<input id="customerCep" type="text" pattern="\d{5}-\d{3}" required value={cepMask(cep||'')} onChange={event=>{setCep(event.target.value.replace(/\D/g, ''))}} maxLength={9} onBlur={cepProcessing}/>
				</div>
				<div className="input-group">
					<label htmlFor="customerAddress">Endereço</label>
					<input id="customerAddress" type="text" required value={address} onChange={event=>setAddress(event.target.value)}/>
				</div>
			</div>
			<div className="input-line" id="lineFiveCustomer">
				<div className="input-group">
					<label htmlFor="customerCity">País</label>
					<select name="customerCountry" id="customerCountry" value={countryId} onChange={event=>setCountryId(event.target.value)}>
						<option value="">Selecione o país...</option>
						{countries.map(c=>{
							return <option value={c.id}>{c.name}</option>
						})}
					</select>
				</div>
				<div className="input-group">
					<label htmlFor="customerDistrict">Estado</label>
					<select name="customerCountryDistrict" id="customerCountryDistrict" value={country_districtId} onChange={event=>setCountryDistrictId(event.target.value)}>
						<option value="">Selecione um estado...</option>
						{country_districts.map(cd=>{
							return <option value={cd.id}>{cd.name}</option>
						})}
					</select>
				</div>
				<div className="input-group">
					<label htmlFor="customerCity">Cidade</label>
					<select name="customerCity" id="customerCity" value={cityId} onChange={event=>setCityId(event.target.value)}>
						<option value="">Selecione uma cidade...</option>
						{cities.map(c=>{
							return <option value={c.id}>{c.name}</option>
						})}
					</select>
				</div>
			</div>
			<button type="submit" className="btnSave color-secondary-dark">Salvar</button>
		</form>
	</>
	)
}


export default FormCadCustomer