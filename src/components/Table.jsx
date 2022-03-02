import React, { useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';

const Table = (props) =>  {
    
  const{
      data
  } =props;
 
  
  return ( 
      <div>
    <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={3} pagesAmount={4} data={data} materialSearch />;
  </div>);
  
};

export default Table;