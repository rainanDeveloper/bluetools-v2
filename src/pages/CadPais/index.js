import React from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'

function CadPais(){
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
						<button className="color-primary">Editar</button>
						<button className="color-primary">Imprimir</button>
					</div>
				</div>
				
			</div>
		</>
	)
}

export default CadPais