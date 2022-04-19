import React, { useState } from "react";
import "./Order.scss"
import OrderDrag from "./OrderDrag";

export default function Order({ order,submitOrder,updateOrder}) {
    const food = order[1].food;
    const drink = order[2].drink;
    const {people, table, urgent, takeAway } = order[0].tableInfo

    const [renderedListFood, setRenderedListFood]   = useState(food);
    const [renderedListDrink, setRenderedListDrink] = useState(drink);
    const finalOrder = [order[0],{"food": renderedListFood},{"drink": renderedListDrink}]

    const sendInfo = (info,type) => {
      type === "food" ? setRenderedListFood(info) : setRenderedListDrink(info)
    }
    
    const calculateBill = (type) => {
        return type.reduce((acc, item) => {
        acc += item.price * item.quantity;
        return acc;
        }, 0);
    };
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

        {/* --------------------FOOD DRINK ORDERS----------------- */}
        <OrderDrag list={food} sendInfo={sendInfo}/>

        {drink.length > 0 && 
        <div>
            <hr/>
            <OrderDrag list={drink} sendInfo={sendInfo}/>
        </div>
        }
        
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
  