import React, {useEffect, useState} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import {FiSearch} from 'react-icons/fi'

function CadContract(){

	const [contracts, setContracts] = useState([])
	const [q, setQ] =  useState('')

	const authToken = localStorage.getItem('authToken')

	useEffect(()=>{
		
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
				<HtmlTable id="tblContract" tableData={contracts}/>
			</div>
		</>
	)
}

export default CadContract