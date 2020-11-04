import React from 'react'
import './style.css'
import {FiX} from 'react-icons/fi'

function HtmlModal({titleModal, children, extraClassList=[],modalId='default'}){

	function closeModal(event){
		const modal = event.target.closest('div.HtmlModalContainer')
		modal.classList.remove('active')
	}

	return (
		<div className={`HtmlModalContainer faded-color ${extraClassList.join(' ')}`} id={modalId}>
			<div className="HtmlModal">
				<div className="closeModal" onClick={closeModal}>
					<FiX color="white" size={26}/>
				</div>
				<h1 className="titleModal color-primary">{titleModal}</h1>
				<div className="bodyModal">
					{children}
				</div>
			</div>
		</div>
	)
}

export default HtmlModal