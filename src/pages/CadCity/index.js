import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import FormCadCidade from './FormCadCidade'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import ToastDisplay from '../../components/ToastDisplay'
import api from '../../services/api'

function CadCity(){

	const [searchTerm, setSearchTerm] = useState('')
	const [cities, setCities] = useState([])
	const [editedCity, setEditedCity] = useState()
	const [alert, setAlert] = useState('')
	const [alertChanger, setAlertChanger] = useState(0)

	const auth = localStorage.getItem('authToken')

	useEffect(()=>{
		api.get(`/city/?searchTerm=${searchTerm}`,{
			headers: {
				auth
			}
		}).then(({data: citiesFounded})=>{
			setCities(citiesFounded)
		})
	}, [searchTerm, auth])

	function updateCitiesList(city){
		const cityFinded = cities.find(c=>c.id===city.id)

		if(cityFinded){
			setCities(cities.map(c=>{
				if(parseInt(c.id)===parseInt(city.id)){
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

	function closeModal(){
		const modal = document.querySelector('#modalCity')
		modal.classList.remove('active')
	}

	function saveCallback(city){
		updateCitiesList(city)
		closeModal()
		setAlert(`Cidade ${city.id}(${city.name}) salva com sucesso!`)
		setAlertChanger(alertChanger+1)
	}

	function deleteItem(id){
		if(window.confirm(`Deseja realmente excluir cidade ${id}?`)){
			api.delete(`/city/${id}`,{
				headers:{
					auth
				}
			}).then(()=>{
				setCities(cities.filter(c=>(parseInt(c.id)!==parseInt(id))))
				setAlert(`Cidade ${id} deletada com sucesso!`)
				setAlertChanger(alertChanger+1)
			}).catch(error=>{
				setAlert(`Erro ao deletar cidade ${id}`)
				setAlertChanger(alertChanger+1)
			})
		}
		
	}

	function createCity(event){
		event.preventDefault()

		setEditedCity()

		const modal = document.querySelector('div#modalCity')
		modal.classList.add('active')
	}

	function editCity(event){
		event.preventDefault()

		const city = cities.find(c=>c.selected)

		if(city){
			setEditedCity(city)
			const modal = document.querySelector('div#modalCity')
			modal.classList.add('active')
		}
		else{
			setAlert(`Nenhum item selecionado!`)
			setAlertChanger(alertChanger+1)
		}

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
						<button onClick={createCity} className="color-primary">Novo</button>
						<button onClick={editCity} className="color-primary">Editar</button>
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
					{title: "Código IBGE", dataKey: "code"},
					{title: "País", dataKey: "countryName"},
					{title: "UF", dataKey: "ufName"}
				]}
				selection={true}
				selectionCallback={items=>{
					setCities(items)
				}}
				itemDoubleClickCallback={editCity}
				delectionCallback={deleteItem}
				/>

				<HtmlModal titleModal="Cadastro de Cidade" modalId="modalCity">
					<FormCadCidade city={editedCity} saveCallback={saveCallback}/>
				</HtmlModal>

				<ToastDisplay>{alert}</ToastDisplay>
			</div>
		</>
	)
}

export default CadCity