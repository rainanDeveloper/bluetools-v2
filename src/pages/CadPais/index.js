import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import api from '../../services/api'

function CadPais(){
	
	const [countries, setCountries] = useState([])

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

	function editItem(){
		const selectedCountry = countries.filter(country=>country.selected)[0]

		if(selectedCountry){
			const id = selectedCountry.id
		}
		else{
			alert('Nenhum item selecionado!')
		}
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
						<button className="color-primary">Novo</button>
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
					}}/>
			</div>
			<HtmlModal titleModal={`Cadastro de País`}>
				<div>Teste</div>
			</HtmlModal>
		</>
	)
}

export default CadPais