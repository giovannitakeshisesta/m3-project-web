import React from 'react'

export default function TicketHeader({table,people,showTotalXperson}) {
  return (
    <div className="billHeader">
        <div className="frcc">
            <img
            src="images/table_icon_125938.png"
            alt="table"
            className="imgTable"
            />
            <h3>{table}</h3>
        </div>

        {!showTotalXperson && <p>Partial Payment</p>}

        <div className="frcc">
            <i className="fas fa-users ms-2"></i>
            <h3>{people}</h3>
        </div>
    </div>
  )
}
