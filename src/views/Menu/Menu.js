import React, { useState } from 'react'
import MenuForm from '../../components/MenuForm/MenuForm'
import MenuList from '../../components/MenuList/MenuList'

export default function Menu() {
  const [showForm,setShowForm]=useState(false)

  const toggleShowForm = () => {
      setShowForm(!showForm)
  }

  return (
      <div className='menuMainPage'>
        <div className='menuMainPageInner'>
          <div className='menuMainPageTop'>
          {/* <img src="/images/risto_room.webp" alt="" /> */}
            <h1>Menu</h1>
            <button
                onClick={()=>toggleShowForm()}>
                Add new item
            </button>
          </div>
          {showForm ?
          <MenuForm />
          :
          <MenuList />
          }
        </div>
      </div>
  )
}
