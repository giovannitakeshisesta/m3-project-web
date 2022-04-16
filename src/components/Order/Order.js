import React from "react";
import "./Order.css";
export default function Order({ order, people,table }) {
    const calculateBill = () => {
        return order.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
        }, 0);
    };

    return (
        <div>
        <div className="frcc">
            <div className="d-flex">
                <img src="images/table_icon_125938.png" alt="table" />
                <p>{table}</p>
            </div>
            <div className="d-flex">
                <i className="fas fa-users"></i>
                <p>{people}</p>
            </div>
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
