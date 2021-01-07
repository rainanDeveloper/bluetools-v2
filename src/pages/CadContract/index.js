import React, {useEffect, useState} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import FormCadContract from './FormCadContract'
import {FiSearch} from 'react-icons/fi'
import api from '../../services/api'
import { dateMask } from '../../functions/Masks'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import ToastDisplay from '../../components/ToastDisplay'

function CadContract(){

	const [contracts, setContracts] = useState([])
	const [editedContract, setEditedContract] = useState()
	const [q, setQ] =  useState('')

	const [alert, setAlert] = useState('')
	const [alertChanger, setAlertChanger] = useState(0)

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		api.get('/contract/', {
			headers: {
				auth: authToken
			}
		})
		.then(({data})=>{
			setContracts(data)
		})
	}, [authToken, q])

	function newContract(event){
		event.preventDefault()

		setEditedContract()

		openModal()
	}

	function closeModal(){
		const modal = document.querySelector('div#modalContract')
		modal.classList.remove('active')
	}

	function saveCallback(contract){

		const existentContract = contracts.find(c=>c.id===contract.id)

		if(existentContract){
			setContracts(contracts.map(c=>{
				if(c.id===contract.id){
					return contract
				}
				else{
					return c
				}
			}))
		}
		else{
			setContracts([...contracts, contract])
		}

		setEditedContract(undefined)
		closeModal()
	}

	function openModal(){
		const modal = document.querySelector('#modalContract')
		modal.classList.add('active')
	}

	function editItem(){
		const selectedContract = contracts.find(contract=>contract.selected)

		setEditedContract(selectedContract)

		if(selectedContract){
			openModal()
		}
		else{
			setAlert('Nenhum item selecionado!')
			setAlertChanger(alertChanger+1)
		}

	}

	function deleteItem(id){
		confirmAlert({
			title: "Deletar cadastro",
			message: `Deseja deletar cadastro de contrato ${id}?`,
			buttons: [
				{
					label: 'Confirmar',
					onClick: () => {
						api.delete(`/contract/${id}`, {
							headers: {
								auth: authToken
							}
						}).then(()=>{
							setContracts(contracts=>contracts.filter(c=>parseInt(c.id)!==parseInt(id)))
							setAlert(`Contrato ${id} deletado com sucesso!`)
							setAlertChanger(alertChanger+1)
						})
					}
				},
				{
					label: 'Cancelar',
					onClick: () => {}
				}
			]		
		})
	}
	
	return (
		<>
			<SupMenuAdmin/>

			<div className="listContainer">
				<h1 className="titleListTable">Contratos</h1>
				<div className="utility">
					<div className="searchArea">
						<input type="text" id="searchInput" value={q} onChange={event=>setQ(event.target.value)} placeholder="Buscar..."/>
						<button><FiSearch color="#888" size={18}/></button>
					</div>
					<div className="utilityButtons">
						<button onClick={newContract} className="color-primary">Novo</button>
						<button onClick={editItem} className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
					</div>
				</div>
				<HtmlTable id="tblContract" tableData={contracts.map(c=>{
					c.installDateWithMask = dateMask(c.installationDate)
					c.dueDayComplete = `Dia ${c.dueDay} de todo mês`
					c['customer.name'] = (c.customer?.name||'')
					c.statusIndicator = (c.status===1?<div className="indicator green"></div>:<div className="indicator red"></div>)

					return c
				})}  tableTitles={[
					{title: "ID", dataKey: "id"},
					{title: "Cliente", dataKey: "customer.name"},
					{title: "Data de instalação", dataKey: "installDateWithMask"},
					{title: "Dia da cobrança", dataKey: "dueDayComplete"},
					{title: "Status", dataKey: "statusIndicator"}
				]}
				selection={true}
				selectionCallback={setContracts}
				delectionCallback={deleteItem}
				/>
			</div>
			<HtmlModal titleModal={`Cadastro de Contrato`} modalId="modalContract">
				<FormCadContract contract={editedContract} saveCallback={saveCallback}/>
			</HtmlModal>

			<ToastDisplay changer={alertChanger}>
				{alert}
			</ToastDisplay>
		</>
	)
}

export default CadContract