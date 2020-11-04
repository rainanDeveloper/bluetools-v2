import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import FormCadPais from './FormCadPais'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import api from '../../services/api'

function CadPais(){
	
	const [countries, setCountries] = useState([])
	const [contryEdit, setCountryEdit] = useState([])

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		api.get('/country/',{
			headers:{
				'auth': authToken
			}
		}).then(response=>{
			setCountries(response.data)
		})
	}, [setCountries,authToken])

	function openModal(){
		const modal = document.querySelector('#modalPais')
		modal.classList.add('active')
	}

	function closeModal(){
		const modal = document.querySelector('#modalPais')
		modal.classList.remove('active')
	}

	function editItem(){
		const selectedCountry = countries.filter(country=>country.selected)[0]

		setCountryEdit(selectedCountry)

		if(selectedCountry){
			openModal()
		}
		else{
			alert('Nenhum item selecionado!')
		}
	}

	function newItem(){
		setCountryEdit(null)
		
		openModal()
	}

	function updateCountryOnList(country){
		const findedCountry = countries.filter(c=>c.id===country.id)
		if(findedCountry.length>0){
			setCountries(countries.map(c=>{
				if(c.id===country.id){
					return country
				}
				else{
					return c
				}
			}))
		}
		else{
			setCountries([...countries,country])
		}
	}

	function saveCallback(country){
		updateCountryOnList(country)
		closeModal()
	}

	return (
		<>
			<SupMenuAdmin/>
			<div className="listContainer">
				<h1 className="titleListTable">Países</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" placeholder="Buscar..."/>
					</div>
					<div className="utilityButtons">
						<button onClick={newItem} className="color-primary">Novo</button>
						<button onClick={editItem} className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
						<button className="color-primary">Imprimir</button>
					</div>
				</div>
				<HtmlTable id="tblPais" tableTitles={[
					{title: "Código", dataKey: "id"},
					{title:"Abreviação", dataKey: "abbreviation"},
					{title: "Nome", dataKey: 'name'},
					{title:"Moeda", dataKey: 'currency'}
					]} tableData={countries} selection={true} selectionCallback={items=>{
						setCountries(items)
					}} itemDoubleClickCallback={editItem}/>
			</div>
			<HtmlModal titleModal={`Cadastro de País`} modalId="modalPais">
				<FormCadPais country={contryEdit} saveCallback={saveCallback}/>
			</HtmlModal>
		</>
	)
}

export default CadPais