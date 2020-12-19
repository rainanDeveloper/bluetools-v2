import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import FormCadUf from './FormCadUf'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import ToastDisplay from '../../components/ToastDisplay'
import api from '../../services/api'

function CadUf(){

	const [districts, setDistricts]     = useState([])
	const [districtEdit, setDistrictEdit] = useState(null)
	const [q, setQ]   = useState('')
	const [alert, setAlert] =  useState('')
	const [alertChanger, setAlertChanger] = useState(0)

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		var query = ''
		if(q){
			query+=`?q=${q}`
		}

		api.get(`/countryDistrict/${query}`,{
			headers: {
				auth: authToken
			}
		}).then(response=>{
			setDistricts(response.data)
		})

	},[setDistricts, authToken, q])

	function openModal(){
		const modal = document.querySelector('#modalUf')
		modal.classList.add('active')
	}

	function closeModal(){
		const modal = document.querySelector('#modalUf')
		modal.classList.remove('active')
	}

	function editItem(){
		const selectedDistrict = districts.filter(d=>d.selected)[0]

		setDistrictEdit(selectedDistrict)

		if(selectedDistrict){
			openModal()
		}
		else{
			window.alert('Nenhum item selecionado!')
		}
	}

	function updateDistrictOnList(district){
		const findedCountry = districts.filter(d=>d.id===district.id)
		if(findedCountry.length>0){
			setDistricts(districts.map(d=>{
				if(d.id===district.id){
					return district
				}
				else{
					return d
				}
			}))
		}
		else{
			setDistricts([...districts,district])
		}
	}

	function saveCallback(district){
		updateDistrictOnList(district)
		closeModal()
		setAlert(`UF ${district.name}(${district.id}) salva com sucesso!`)
		setAlertChanger(alertChanger+1)
	}

	function newItem(){
		setDistrictEdit(null)
		
		openModal()
	}

	function deleteItem(id){
		if(window.confirm(`Deseja realmente excluir UF ${id}?`)){
			api.delete(`/countryDistrict/${id}`,{
				headers:{
					'auth': authToken
				}
			}).then(()=>{
				setDistricts(districts.filter(d=>(parseInt(d.id)!==parseInt(id))))
				setAlert(`UF ${id} deletado com sucesso!`)
				setAlertChanger(alertChanger+1)
			}).catch(error=>{
				setAlert(`Erro ao deletar UF ${id}`)
				setAlertChanger(alertChanger+1)
			})
		}
	}

	return (
		<>
			<SupMenuAdmin/>
			<div className="listContainer">
				<h1 className="titleListTable">UFs</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" value={q} onChange={event=>setQ(event.target.value)} placeholder="Buscar..."/>
					</div>
					<div className="utilityButtons">
						<button onClick={newItem} className="color-primary">Novo</button>
						<button onClick={editItem} className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
						<button className="color-primary">Imprimir</button>
					</div>
				</div>
				<HtmlTable id="tblUf" tableTitles={[
					{title: 'Código', dataKey: 'id'},
					{title: 'Nome', dataKey: 'name'},
					{title: 'Código IBGE', dataKey: 'code'},
					{title: 'Abreviação', dataKey: 'abbreviation'},
					{title: 'País', dataKey: 'countryName'}
				]}
				tableData={districts.map(d=>{
					d.countryName = d.country.name
					return d
				})} selection={true} selectionCallback={items=>{
					setDistricts(items)
				}}
				itemDoubleClickCallback={editItem}
				delectionCallback={deleteItem}				
				/>
				<HtmlModal titleModal={`Cadastro de UF`} modalId="modalUf">
					<FormCadUf district={districtEdit} saveCallback={saveCallback}/>
				</HtmlModal>
				<ToastDisplay changer={alertChanger}>{alert}</ToastDisplay>
			</div>
		</>
	)
}

export default CadUf