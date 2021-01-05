import React, {useEffect, useState} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import FormCadContract from './FormCadContract'
import {FiSearch} from 'react-icons/fi'
import api from '../../services/api'
import { dateMask } from '../../functions/Masks'

function CadContract(){

	const [contracts, setContracts] = useState([])
	const [q, setQ] =  useState('')

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
						<button className="color-primary">Novo</button>
						<button className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
					</div>
				</div>
				<HtmlTable id="tblContract" tableData={contracts.map(c=>{
					c.installDateWithMask = dateMask(c.installationDate)
					c.dueDayComplete = `Dia ${c.dueDay} de todo mês`
					c['customer.name'] = c.customer.name

					return c
				})}  tableTitles={[
					{title: "ID", dataKey: "id"},
					{title: "Cliente", dataKey: "customer.name"},
					{title: "Data de instalação", dataKey: "installDateWithMask"},
					{title: "Dia da cobrança", dataKey: "dueDayComplete"},
					{title: "Status", dataKey: "status"}
				]}/>
			</div>
			<HtmlModal titleModal={`Cadastro de País`} modalId="modalPais">
				<FormCadContract />
			</HtmlModal>
		</>
	)
}

export default CadContract