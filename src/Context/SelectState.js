import React, { useEffect, useState } from 'react'
import SelectContext from './SelectContext'

const SelectState = (props) => {
    const [selectedOption,setSelectedOption] = useState("");
    const [selectedOption1,setSelectedOption1] = useState("");
    const [selectedQueId, setSelectedQueId] = useState(null);
    const [flag,setFlag] = useState(true);
    const [active, setActive] = useState("");

  return (
    <SelectContext.Provider value={{selectedOption,active, setActive,setSelectedOption,selectedOption1,setSelectedOption1,selectedQueId, setSelectedQueId,flag,setFlag}}>
        {props.children}
    </SelectContext.Provider>
  )
}

export default SelectState;
