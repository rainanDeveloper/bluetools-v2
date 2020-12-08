import React, {useState, useEffect} from 'react'
import './style.css'
import {cpfMask, phoneMask, cepMask, dateMask} from '../../functions/Masks/'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import HtmlTable from '../../components/HtmlTable'
import ToastDisplay from '../../components/ToastDisplay'
import PDFPrintTable from '../../functions/PdfPrintTable'

import {FiSearch} from 'react-icons/fi'
import api from '../../services/api'

function CadCustomer(){

	const [customers, setCustomers] = useState([])
	const [searchTerm, setSearchTerm] =  useState('')

	const [alert, setAlert] =  useState('')
	const [alertChanger, setAlertChanger] = useState(0)

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		var query = ''
		if(searchTerm){
			query+=`?searchTerm=${searchTerm}`
		}

		api.get(`/customer/${query}`,{
			headers:{
				'auth': authToken
			}
		}).then(response=>{
			setCustomers(response.data)
		})
	}, [setCustomers,authToken, searchTerm])

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

	return (
	<>
		<SupMenuAdmin/>

		<div className="listContainer">
				<h1 className="titleListTable">Clientes</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" value={searchTerm} onChange={event=>setSearchTerm(event.target.value)} placeholder="Buscar..."/>
						<button><FiSearch color="#888" size={18}/></button>
					</div>
					<div className="utilityButtons">
						<button className="color-primary">Novo</button>
						<button className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
						<button className="color-primary">Imprimir</button>
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
						c.masked_cpf = cpfMask(c.cpf)
						c.masked_telephone = phoneMask(c.telephone)
						c.masked_cep = cepMask(c.cep)
						c.masked_birth_date = dateMask(c.birth_date)
						return c
					})} selection={true} selectionCallback={items=>{
						setCustomers(items)
					}} delectionCallback={deleteItem}/>
		</div>
		<ToastDisplay changer={alertChanger}>{alert}</ToastDisplay>
	</>
	)
}

export default CadCustomer