import React from 'react'
import './Home.scss'
import waiter from '../../assets/waiterHome.jpeg'
import { Link } from 'react-router-dom'


export default function Home() {


  return (
    <div className='homeMain'>
    {/* <h1>Home</h1>
    <h2>Aqui pongo fotos bonitas y descripciones de la app</h2> */}
    <div>
      <div className='homeTop'>
        <div className='homeTopTitle'>
          <p className='hugeText'>TICKETEAZY</p>
          <p className='hugeText'>MY FRIEND</p>
        </div>
        <div className='homeTopImg' style={{backgroundImage: `url(${waiter})`}}>
        </div>
      </div>

      <div className='homeSecond'>
        <div className='fccc'>
          <h2>Do you want to pay a waiter a sh!t </h2>
          <h2>BUT</h2>
          <h2>at same time</h2>
          <h2>GET THE JOB DONE ?</h2>
        </div>
      </div>

      <div className='homeThird'>
        <h1 className='huggerText'>TICKETEAZYISTHESOLUTION</h1>
      </div>

      <div className='homeSecond'>
        <div className='fccc'>
          <h2 >DO IT.</h2>
        <Link to='/register'>
          <h2 >DO IT.  NOW.</h2>
        </Link>
        </div>
      </div>
    </div>
    </div>
  )
}
