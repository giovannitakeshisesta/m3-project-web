import React, { useEffect, useState } from "react";
import '../../styles/Order.scss'
import OrderDrag from "./OrderDrag";

export default function Order({ order,submitOrder, editOrder}) {
    const food = order.food;
    const drink = order.drink;
    const {people, table, urgent, takeAway, waiter } = order.tableInfo

    const [renderedListFood, setRenderedListFood]   = useState(food);
    const [renderedListDrink, setRenderedListDrink] = useState(drink);
    const finalOrder = {
        id: order.id,
        tableInfo: order.tableInfo,
        food:renderedListFood,
        drink: renderedListDrink
    }

    useEffect(() => {
        setRenderedListFood(food)
        setRenderedListDrink(drink)
    }, [order,food,drink]);

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
            </div>
            
            {takeAway && <i className="fas fa-bicycle "></i>}
        </div>    

        {/* --------------------FOOD DRINK ORDERS----------------- */}
        <OrderDrag list={food} sendInfo={sendInfo}/>

        {drink.length > 0 &&  <hr/> }
        
        <OrderDrag list={drink} sendInfo={sendInfo}/>
       
        {/* ------------------------ FOOTER ----------------------- */}
        <hr />
        <div className="frcb">
            <p>waiter :{waiter}</p>
            <p>Total : {calculateBill(food) + calculateBill(drink)}€</p>
        </div> 

        {/* ------------------------ BUTTONS ---------------------- */}
        {order.id ?
            <button 
                onClick={()=> editOrder(finalOrder)} 
                className=' btn btn-success'>update
            </button>
        :
            [...food,...drink].length > 0 &&
            <button 
                onClick={()=>submitOrder(finalOrder)} 
                className='submitOrder btn'>send
            </button>  
        } 
    </div>
    );
}
  