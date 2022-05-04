import React, { useState } from 'react'
import MenuForm from '../../components/MenuForm/MenuForm'
import MenuList from '../../components/MenuList/MenuList'
import '../../styles/menu.scss'

export default function Menu() {
  const [showForm,setShowForm]=useState(false)

  const toggleShowForm = () => {
      setShowForm(!showForm)
  }

  return (
      <div className='menuMainPage'>
        <div className='menuMainPageInner'>
          {showForm ?
          <MenuForm toggleShowForm={toggleShowForm}/>
          :
          <MenuList toggleShowForm={toggleShowForm}/>
          }
        </div>
      </div>
  )
}
