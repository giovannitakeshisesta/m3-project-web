import React from "react";
import "./Order.css";
export default function Order({ order, people,table,urgent,takeAway }) {
    const calculateBill = () => {
        return order.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
        }, 0);
    };

    return (
        <div>
        <div className="frca">
            {urgent && <i className="fas fa-exclamation-circle "></i>}

            <div className="frcc">
                <img src="images/table_icon_125938.png" alt="table" 
                    className='imgTable'
                />
                <h3>{table}</h3>
            </div>
            <div className="frcc">
                <i className="fas fa-users"></i>
                <h3>{people}</h3>
            </div>

            {takeAway && <i className="fas fa-bicycle "></i>}
            
        </div>

        {order.map((item) => {
            return (
            <div key={item.id}>
                {item.type === "food" && (
                <>
                    <div className="d-flex">
                    <p className="itemOrderQty">{item.quantity}</p>
                    <p>{item.name}</p>
                    <p className="itemOrderMsg">{item.message}</p>
                    </div>
                </>
                )}
            </div>
            );
        })}
        <hr />
        {order.map((item) => {
            return (
            <div key={item.id}>
                {item.type === "drink" && (
                <div className="d-flex">
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                    <p className="itemOrderMsg">{item.message}</p>
                </div>
                )}
            </div>
            );
        })}

        <div className="frcb">
            <p>waiter :</p>
            <p>Total : {calculateBill()}€</p>
        </div>
        </div>
    );
}
