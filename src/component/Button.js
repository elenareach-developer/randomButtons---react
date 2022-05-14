import React from 'react';
import "./Button.css"

 const Button = ({backgroundClass,id, text="Hello"})=>{
    return(
        <>
            <button className={backgroundClass} id ={id} >{text}</button>
        </>
    )
}
export default Button;