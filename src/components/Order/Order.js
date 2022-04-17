import React, { useState } from "react";
import "./Order.css"

import OrderDrag from "./OrderDrag";

export default function Order({ order,submitOrder}) {
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

    const [renderedListFood, setRenderedListFood] = useState(food);
    const [renderedListDrink, setRenderedListDrink] = useState(drink);

    const sendInfo = (info,type) => {
      type === "food" ? setRenderedListFood(info) : setRenderedListDrink(info)
    }
    
    const finalOrder = [order[0],{"food": renderedListFood},{"drink": renderedListDrink}]
     
    
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
        <OrderDrag list={food} sendInfo={sendInfo}/>
        {/* ------------------------DRINK ORDER----------------------- */}
        <OrderDrag list={drink} sendInfo={sendInfo}/>

        {/* {drink.length > 0 && (
        <>
            <hr />
            {drink.map((item) => {
                return (
                    <OrderLine key={item.id} tipo="drink" item={item}/>
                );
            })}
        </>
        )} */}

        {/* ------------------------ FOOTER ----------------------- */}
        <hr />
        <div className="frcb">
            <p>waiter :</p>
            <p>Total : {calculateBill(food) + calculateBill(drink)}€</p>
        </div> 
        <button onClick={()=>submitOrder(finalOrder)} className='submitOrder btn'>send</button>
{/* condizioni array vacio */}
    </div>
    );
}
  