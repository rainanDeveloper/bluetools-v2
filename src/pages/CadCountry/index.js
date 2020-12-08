import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import FormCadPais from './FormCadPais'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import ToastDisplay from '../../components/ToastDisplay'
import PDFPrintTable from '../../functions/PdfPrintTable'
import api from '../../services/api'

function CadCountry(){
	
	const [countries, setCountries] = useState([])
	const [countryEdit, setCountryEdit] = useState(null)
	const [searchTerm, setSearchTerm] =  useState('')
	const [alert, setAlert] =  useState('')
	const [alertChanger, setAlertChanger] = useState(0)

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		var query = ''
		if(searchTerm){
			query+=`?searchTerm=${searchTerm}`
		}

		api.get(`/country/${query}`,{
			headers:{
				'auth': authToken
			}
		}).then(response=>{
			setCountries(response.data)
		})
	}, [setCountries,authToken, searchTerm])

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

	function deleteItem(id){
		if(window.confirm(`Deseja realmente excluir país ${id}?`)){
			api.delete(`/country/${id}`,{
				headers:{
					'auth': authToken
				}
			}).then(()=>{
				setCountries(countries.filter(c=>(parseInt(c.id)!==parseInt(id))))
				setAlert(`País ${id} deletado com sucesso!`)
				setAlertChanger(alertChanger+1)
			}).catch(error=>{
				setAlert(`Erro ao deletar país ${id}`)
				setAlertChanger(alertChanger+1)
			})
		}
		
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
		setAlert(`País ${country.name}(${country.id}) salvo com sucesso!`)
		setAlertChanger(alertChanger+1)
	}

	return (
		<>
			<SupMenuAdmin/>
			<div className="listContainer">
				<h1 className="titleListTable">Países</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" value={searchTerm} onChange={event=>setSearchTerm(event.target.value)} placeholder="Buscar..."/>
					</div>
					<div className="utilityButtons">
						<button onClick={newItem} className="color-primary">Novo</button>
						<button onClick={editItem} className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
						<button onClick={()=>{
							PDFPrintTable('Países', 10, 10, {
								columns: [
									{ header: 'Código', dataKey: 'id' },
									{ header: 'Abreviação', dataKey: 'abbreviation' },
									{ header: 'Nome', dataKey: 'name' },
									{ header: 'Moeda', dataKey: 'currency' }
								],
								body: countries
							})
						}} className="color-primary">Imprimir</button>
					</div>
				</div>
				<HtmlTable id="tblPais" tableTitles={[
					{title: "Código", dataKey: "id"},
					{title:"Abreviação", dataKey: "abbreviation"},
					{title: "Nome", dataKey: 'name'},
					{title:"Moeda", dataKey: 'currency'}
					]} tableData={countries} selection={true} selectionCallback={items=>{
						setCountries(items)
					}} itemDoubleClickCallback={editItem} delectionCallback={deleteItem}/>
			</div>
			<HtmlModal titleModal={`Cadastro de País`} modalId="modalPais">
				<FormCadPais country={countryEdit} saveCallback={saveCallback}/>
			</HtmlModal>
			<ToastDisplay changer={alertChanger}>{alert}</ToastDisplay>
		</>
	)
}

export default CadCountry