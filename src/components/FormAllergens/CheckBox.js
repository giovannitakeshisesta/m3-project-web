import React from 'react'

export default function CheckBox({handleCheckBox,name,checked}) {
  return (
    <>
    <input type="checkbox" id={name} value={name} onChange={handleCheckBox} defaultChecked={checked}/>
    <label htmlFor={name}> {name} </label><br/>
    </>
  )
}
