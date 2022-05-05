import React from 'react'

export default function TicketBody({dish,dishDone,_id}) {
  return (
    <div className="ticketBody">
        <div className='d-flex'>
            <p className='me-3'>{dish.quantity}</p>
            <p onClick={()=> dishDone(_id,dish)}
                className={dish.isDone ? "isDone" : ""}
            >{dish.name}</p>
        </div>
        <p className='ticketMessage'>{dish.message}</p>
    </div>   
  )
}
