import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import "./KitchenWall.css";
import allTheTikets from "../../data/orders.json";
import Ticket from "../../components/Tickets/Ticket";

const allTheTicketHolders = {
  hold1: {
    name: "Incoming Tickets",
    items: allTheTikets,
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

const onDragEnd = (result, holders, setHolders) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceHolder = holders[source.droppableId];
    const destHolder = holders[destination.droppableId];
    const sourceItems = [...sourceHolder.items];
    const destItems = [...destHolder.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

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

  } else {

    const holder = holders[source.droppableId];
    const copiedItems = [...holder.items];
    const [removed] = copiedItems.splice(source.index, 1);
    
    copiedItems.splice(destination.index, 0, removed);
    setHolders({
      ...holders,
      [source.droppableId]: {
        ...holder,
        items: copiedItems,
      },
    });
  }
};

const KitchenWall = () => {
  const [holders, setHolders] = useState(allTheTicketHolders);
  console.log(holders);

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, holders, setHolders)}
      >
        {Object.entries(holders).map(([holderId, holder], index) => {
          return (
            <div key={holderId} className="titleAndBar">
              <h2>{holder.name}</h2>
              <>
                <Droppable
                  droppableId={holderId}
                  key={holderId}
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
                              key={ticket.id}
                              draggableId={ticket.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="ticket"
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
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
