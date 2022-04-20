import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUsers } from '../../services/UsersService';

export default function Home() {

  const [users,setUsers] = useState([])

  useEffect(() => {
    getUsers()
    .then( response => {
      setUsers(response)
    })
    .catch(err => console.log(err))
    
  }, []);

  return (
    <div className='fccc'>
    <h1>Home</h1>
    <h2>Aqui pongo fotos bonitas y descripciones de la app</h2>

    {users.map( user => {
      return (
        <div key={user.id}>

        <p>{user.name}</p>
        <Link to={`/users/${user.id}`}>go to {user.id}</Link>
        </div>
      )
    })}
    </div>
  )
}
