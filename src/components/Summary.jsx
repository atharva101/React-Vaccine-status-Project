import React from "react";
import './Summary.styles.css'

const Summary = ({vaccinated , total}) => {

 return (
   <span className = 'summary-text'> 
    {vaccinated} out of {total} have been vaccinated.
   </span>
 );
};

export default Summary;