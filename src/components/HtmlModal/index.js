import React from 'react'
import './style.css'

function HtmlModal({titleModal, children}){
    return (
        <div className="HtmlModalContainer faded-color">
            <div className="HtmlModal">
                <h1 className="titleModal color-primary">{titleModal}</h1>
                <div className="bodyModal">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HtmlModal