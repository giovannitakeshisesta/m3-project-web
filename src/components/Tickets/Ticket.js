import React from "react";
import "../../views/KitchenWall/KitchenWall.scss";

export default function Ticket(ticket) {
  return (
    <>
      <h3 className="table">Table {ticket.table}</h3>
      {ticket.dishes.map((dish, index) => {
        return (
          <div key={index}>
            <div className="quantity_dish">
              <p className="quantity">{dish.quantity && dish.quantity}</p>
              <p style={{ color: dish.urgent && "red" }}>{dish.name}</p>
              <i
                className="far fa-check-circle check-circle"
                style={{ color: "lightGreen" }}
              ></i>
            </div>
            <p className="message">{dish.message && dish.message}</p>
          </div>
        );
      })}

      <div className="frcc">
        <p>
          <i className="fas fa-users"></i>
          {ticket.customers}{" "}
        </p>
        <p>
          <i className="fa-regular fa-clock"></i>
          {ticket.time}
        </p>
      </div>
    </>
  );
}
