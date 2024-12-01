import React, { useEffect, useState } from 'react'
import SelectContext from './SelectContext'

const SelectState = (props) => {
    const [selectedOption,setSelectedOption] = useState("1");
    const [selectedOption1,setSelectedOption1] = useState("1");
    const [selectedQueId, setSelectedQueId] = useState(null);
    const [flag,setFlag] = useState(true);

    useEffect(()=>{
      console.log("Selected Option1  : ",selectedOption1);
    },[selectedOption1])

  return (
    <SelectContext.Provider value={{selectedOption,setSelectedOption,selectedOption1,setSelectedOption1,selectedQueId, setSelectedQueId,flag,setFlag}}>
        {props.children}
    </SelectContext.Provider>
  )
}

export default SelectState;
