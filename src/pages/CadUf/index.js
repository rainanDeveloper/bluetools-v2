import React, {useState, useEffect} from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'
//import FormCadPais from './FormCadPais'
import HtmlTable from '../../components/HtmlTable'
import HtmlModal from '../../components/HtmlModal'
import ToastDisplay from '../../components/ToastDisplay'
import api from '../../services/api'

function CadUf(){
    return (
        <>
            <SupMenuAdmin/>
            <div className="listContainer">
				<h1 className="titleListTable">UFs</h1>
            </div>
        </>
    )
}

export default CadUf