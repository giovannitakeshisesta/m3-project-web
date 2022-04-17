import React from "react";
import "./Order.css";

export default function Order({ order1}) {
    const food = order1[0].food;
    const drink = order1[1].drink;
    const {people, table, urgent, takeAway } = order1[2].tableInfo

    const calculateBill = (type) => {
        return type.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
        }, 0);
    };

    return (
    <div>
        <div className="frca">
            {urgent && <i className="fas fa-exclamation-circle "></i>}

            <div className="frcc">
                <img
                src="images/table_icon_125938.png"
                alt="table"
                className="imgTable"
                />
                <h3>{table}</h3>
            </div>

            <div className="frcc">
                <i className="fas fa-users"></i>
                <h3>{people}</h3>

                {takeAway && <i className="fas fa-bicycle "></i>}
            </div>
        </div>    

        {food.map((item) => {
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

        {drink.length > 0 && (
            <>
            <hr />
            {drink.map((item) => {
                return (
                <div key={item.id}>
                    {item.type === "drink" && (
                    <div className="d-flex">
                        <p>{item.quantity}</p>
                        <p>{item.name}</p>
                        <p className="itemOrderMsg">{item.message}</p>
                    </div>
                    )}
                </div>
                );
            })}
            </>
        )}

        <hr />
        <div className="frcb">
            <p>waiter :</p>
            <p>Total : {calculateBill(food) + calculateBill(drink)}€</p>
        </div>
    </div>
    );
}
  