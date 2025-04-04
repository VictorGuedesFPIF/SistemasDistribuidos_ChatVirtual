import React from "react";
import logoVirtualChat from "../images/logoVirtualChat3.png"

function Splash(props){
    return (
        <div className = {'splash abs'}> 
            <h2 className={'s30 abs abc'}>Chat Virtual</h2>
            <img src={logoVirtualChat} alt= "Logo do Chat Virtual" className={'abs abc'}/>
        </div>
    );
}
export default Splash;