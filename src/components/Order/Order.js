import React, { useEffect } from "react";
import "./Order.css";

import {useState} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Order({ order}) {
    const food = order[1].food;
    const drink = order[2].drink;
    const {people, table, urgent, takeAway } = order[0].tableInfo

    const [orderList, setOrderList] = useState(food)
    useEffect(() => {
        setOrderList(food)
        setRenderedList(food)
    }, [food]);
    console.log(orderList)

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

    // const orderList = [
    //     {
    //       "id": "1",
    //       "type": "food",
    //       "name": "Gazpacho",
    //       "price": 6,
    //       "quantity": 1,
    //       "message": ""
    //      },
    //      {
    //       "id": "2",
    //       "type": "food",
    //       "name": "Ensaladilla rusa",
    //       "price": 7,
    //       "quantity": 1,
    //       "message": ""
    //      }
    //     ]
    const [renderedList, setRenderedList] = useState(orderList);

    function handleOnDragEnd(result) {
        const {source, destination} = result
      //if drop out of a droppable area, destination = null => dont do anything
      if (!destination) 
      return;
  
      // if drop in the same droppable section && at the same index
      if (source.index === destination.index && source.droppableId === destination.droppableId)
      return;

      // set the rendered list as an array with the new sequence
      const newArr = Array.from(renderedList);
      const [draggedItem] = newArr.splice(source.index, 1);
      newArr.splice(destination.index, 0, draggedItem);
      setRenderedList(newArr);
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="renderedList" direction='vertical'>
          {(provided) => (
            <ul className="renderedList" {...provided.droppableProps} ref={provided.innerRef}>

              {renderedList.map(({id, name}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>  
                    {(provided) => (
                      <li 
                      ref={provided.innerRef} 
                      {...provided.draggableProps}  
                      {...provided.dragHandleProps}>
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}

            </ul>
          )}
        </Droppable>
        
      </DragDropContext>
        {/* ------------------------FOOD ORDER----------------------- */}
        {/* {food.map((item) => {
            return (
                <OrderLine key={item.id} tipo="food" item={item}/>
            );
        })} */}

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
  