import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import "./KitchenWall.scss";
import { getHolders, putHolders } from '../../services/OrderService';
import Ticket from "../../components/Ticket/Ticket";

const holdersInitialState = {
  hold1: {
    name: "Incoming Tickets",
    items: [],
  },
  hold2: {
    name: "First Course",
    items: [],
  },
  hold3: {
    name: "Second Course",
    items: [],
  },
  hold4: {
    name: "Done",
    items: [],
  },
}; 


const KitchenWall = () => {
  const [holders, setHolders] = useState(holdersInitialState);

  const getHOLDERS = () => {
    getHolders()
    .then(response => {
      const { hold1, hold2, hold3, hold4 } = response[0];
      setHolders({hold1, hold2, hold3, hold4})
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getHOLDERS()
    const interval = setInterval(() => {getHOLDERS()}, 500000);
    return () => clearInterval(interval);
  }, []);

  const prevHoldersRef = useRef();

  useEffect(() => {
    if (prevHoldersRef.current) {  
      putHolders(holders)
        .then(()=> {})
        .catch(() => {
          setHolders(prevHoldersRef.current);
        });
    }
  }, [holders]);
  

  const onDragEnd = (result, holders, setHolders) => {
    if (!result.destination) return;
    const { source, destination } = result;
    
    //if drag in other holders 
    if (source.droppableId !== destination.droppableId) {
      const sourceHolder = holders[source.droppableId];
      const destHolder = holders[destination.droppableId];
      const sourceItems = [...sourceHolder.items];
      const destItems = [...destHolder.items];
  
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      prevHoldersRef.current = holders;
      setHolders({
        ...holders,
        [source.droppableId]: {
          ...sourceHolder,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destHolder,
          items: destItems,
        },
      });
    } 
    else {
      //if drag in the same position,same holder
      const holder = holders[source.droppableId];
      const copiedItems = [...holder.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      prevHoldersRef.current = holders;
      setHolders({
        ...holders,
        [source.droppableId]: {
          ...holder,
          items: copiedItems,
        },
      });
    }
  };
    
  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, holders, setHolders)}
      >
        {Object.entries(holders).map(([holdX, holder]) => {
          return (
            <div key={holdX} className="titleAndBar">
              <h2>{holder.name}</h2>
              <>
                <Droppable
                  droppableId={holdX}
                  key={holdX}
                  direction="horizontal"
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="holder"
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "rgba(200, 200, 200, 0.2)",
                        }}
                      >
                        {holder.items.map((ticket, index) => {
                          return (
                            <Draggable
                              key={String(ticket._id)}
                              draggableId={String(ticket._id)}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="ticketDraggable"
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "rgba(210, 210, 210,0.4)",
                                      
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                  <Ticket {...ticket}/>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </>
            </div>
          );
        })}
      </DragDropContext> 
    </div>
  );
};

export default KitchenWall;
