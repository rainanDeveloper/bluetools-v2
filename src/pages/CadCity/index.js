import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
//import FormCadUf from './FormCadUf'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import ToastDisplay from '../../components/ToastDisplay'
import api from '../../services/api'

function CadCity(){

	const [searchTerm, setSearchTerm] = useState('')
	const [cities, setCities] = useState([])

	const auth = localStorage.getItem('authToken')

	useEffect(()=>{
		api.get(`/city/?searchTerm=${searchTerm}`,{
			headers: {
				auth
			}
		}).then(({data: citiesFounded})=>{
			setCities(citiesFounded)
		})
	}, [searchTerm])

	function updateCitiesList(city){
		const cityFinded = cities.filter(c=>c.id===city.id)

		if(cityFinded){
			setCities(cities.map(c=>{
				if(c.id===city.id){
					return city
				}
				else{
					return c
				}
			}))
		}
		else{
			setCities([...cities,city])
		}
	}

	function saveCallback(city){
		updateCitiesList(city)
	}
	

	return (
		<>
			<SupMenuAdmin/>
			<div className="listContainer">
				<h1 className="titleListTable">Cidades</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" value={searchTerm} onChange={event=>setSearchTerm(event.target.value)} placeholder="Buscar..."/>
					</div>
					<div className="utilityButtons">
						<button className="color-primary">Novo</button>
						<button className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
						<button className="color-primary">Imprimir</button>
					</div>
				</div>
				<HtmlTable id="tblCity" tableData={cities.map(c=>{
					c.ufName = c.countryDistrict.name
					c.countryName = c.country.name

					return c
				})} tableTitles={[
					{title: "ID", dataKey: "id"},
					{title: "Nome", dataKey: "name"},
					{title: "País", dataKey: "countryName"},
					{title: "UF", dataKey: "ufName"}
				]}
				selection={true}
				selectionCallback={items=>{
					setCities(items)
				}}
				/>
			</div>
		</>
	)
}

export default CadCity