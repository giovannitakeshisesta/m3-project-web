import React from "react";
import "./Order.css";

export default function Order({ order}) {
    const food = order[1].food;
    const drink = order[2].drink;
    const {people, table, urgent, takeAway } = order[0].tableInfo

    const calculateBill = (type) => {
        return type.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
        }, 0);
    };

    const OrderLine = ({tipo,item}) =>{
        return(
            <>
                {item.type === tipo && (
                <>
                    <div className="d-flex">
                    <p className="itemOrderQty">{item.quantity}</p>
                    <p>{item.name}</p>
                    <p className="itemOrderMsg">{item.message}</p>
                    </div>
                </>
                )}
            </>
        )
    }

    return (
    <div>
        {/* ------------------------TABLE INFO------------------------ */}
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

        {/* ------------------------FOOD ORDER----------------------- */}
        {food.map((item) => {
            return (
                <OrderLine key={item.id} tipo="food" item={item}/>
            );
        })}

        {/* ------------------------DRINK ORDER----------------------- */}
        {drink.length > 0 && (
        <>
            <hr />
            {drink.map((item) => {
                return (
                    <OrderLine key={item.id} tipo="drink" item={item}/>
                );
            })}
        </>
        )}

        {/* ------------------------ FOOTER ----------------------- */}
        <hr />
        <div className="frcb">
            <p>waiter :</p>
            <p>Total : {calculateBill(food) + calculateBill(drink)}€</p>
        </div>
    </div>
    );
}
  