import React, {useState, useEffect} from 'react'
import './style.css'
import {cpfMask, phoneMask, cepMask, dateMask} from '../../functions/Masks/'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import ToastDisplay from '../../components/ToastDisplay'
import PDFPrintTable from '../../functions/PdfPrintTable'

import {FiSearch} from 'react-icons/fi'
import api from '../../services/api'
import FormCadCustomer from './FormCadCustomer'

function CadCustomer(){

	const [customers, setCustomers] = useState([])
	const [q, setQ] =  useState('')
	const [editedCustomer, setEditedCustomer] =  useState()

	const [alert, setAlert] =  useState('')
	const [alertChanger, setAlertChanger] = useState(0)

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		var query = ''
		if(q){
			query+=`?q=${q}`
		}

		api.get(`/customer/${query}`,{
			headers:{
				'auth': authToken
			}
		}).then(response=>{
			setCustomers(response.data)
		})
	}, [setCustomers,authToken, q])

	function deleteItem(id){
		api.delete(`/customer/${id}`, {
			headers: {
				auth: authToken
			}
		}).then(()=>{
			setCustomers(customers.filter(c=>parseInt(c.id)!==parseInt(id)))
			setAlert(`Cliente ${id} deletado com sucesso!`)
			setAlertChanger(alertChanger+1)
		})
	}

	function closeModal(){
		const modal = document.querySelector('#modalCustomer')
		modal.classList.remove('active')
	}

	function openModal(){
		const modal = document.querySelector('#modalCustomer')
		modal.classList.add('active')
	}

	function editItem(){
		const selectedCustomer = customers.find(country=>country.selected)

		setEditedCustomer(selectedCustomer)

		if(selectedCustomer){
			openModal()
		}
		else{
			setAlert('Nenhum item selecionado!')
			setAlertChanger(alertChanger+1)
		}

	}

	function newItem(){
		setEditedCustomer(null)
		
		openModal()

	}

	function saveCallback(customer){

		const existentCustomer = customers.find(c=>c.id===customer.id)

		if(existentCustomer){
			setCustomers(customers.map(c=>{
				if(c.id===customer.id){
					return customer
				}
				else{
					return c
				}
			}))
		}
		else{
			setCustomers([...customers, customer])
		}


		closeModal()
	}

	return (
	<>
		<SupMenuAdmin/>

		<div className="listContainer">
				<h1 className="titleListTable">Clientes</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" value={q} onChange={event=>setQ(event.target.value)} placeholder="Buscar..."/>
						<button><FiSearch color="#888" size={18}/></button>
					</div>
					<div className="utilityButtons">
						<button onClick={newItem} className="color-primary">Novo</button>
						<button onClick={editItem} className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
						<button onClick={()=>{
							PDFPrintTable('Clientes', 10, 10, {
								columns: [
									{header: "Código", dataKey: "id"},
									{header:"Nome", dataKey: "name"},
									{header:"CEP", dataKey: "masked_cep"},
									{header:"Endereço", dataKey: "address"},
									{header:"Telefone", dataKey: "masked_telephone"},
									{header:"Data de Nasc.", dataKey: "masked_birth_date"}
								],
								body: (customers.map(c=>{
									c.masked_cpf = cpfMask(c.ssa_vat_id||'')
									c.masked_telephone = phoneMask(c.telephone||'')
									c.masked_cep = cepMask(c.cep||'')
									c.masked_birth_date = dateMask(c.birth_date)
									return c
								}))
							})
						}} className="color-primary">Imprimir</button>
					</div>
				</div>
				<HtmlTable id="tblPais" tableTitles={[
					{title: "Código", dataKey: "id"},
					{title:"Nome", dataKey: "name"},
					{title:"Email", dataKey: "email"},
					{title:"CPF", dataKey: "masked_cpf"},
					{title:"Telefone", dataKey: "masked_telephone"},
					{title:"CEP", dataKey: "masked_cep"},
					{title:"Endereço", dataKey: "address"},
					{title:"Data de Nasc.", dataKey: "masked_birth_date"},
					]} tableData={customers.map(c=>{
						c.masked_cpf = cpfMask(c.ssa_vat_id||'')
						c.masked_telephone = phoneMask(c.telephone||'')
						c.masked_cep = cepMask(c.cep||'')
						c.masked_birth_date = dateMask(c.birth_date||'')
						return c
					})} selection={true} selectionCallback={items=>{
						setCustomers(items)
					}} delectionCallback={deleteItem} itemDoubleClickCallback={editItem}/>
		</div>
		<HtmlModal titleModal={`Cadastro de cliente`} modalId="modalCustomer">
			<FormCadCustomer customer={editedCustomer} saveCallback={saveCallback}/>
		</HtmlModal>
		<ToastDisplay changer={alertChanger}>{alert}</ToastDisplay>
	</>
	)
}

export default CadCustomer