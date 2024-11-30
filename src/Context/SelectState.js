import React, { useState } from 'react'
import SelectContext from './SelectContext'

const SelectState = (props) => {
    const [selectedOption,setSelectedOption] = useState(1);
    const [selectedOption1,setSelectedOption1] = useState(1);
  return (
    <SelectContext.Provider value={{selectedOption,setSelectedOption,selectedOption1,setSelectedOption1}}>
        {props.children}
    </SelectContext.Provider>
  )
}

export default SelectState;
