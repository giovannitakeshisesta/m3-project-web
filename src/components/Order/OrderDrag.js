import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../../styles/Order.scss'


export default function OrderDrag({list,sendInfo}) {
    
  useEffect(() => {
    setRenderedList(list)
    if (list.length > 0) {sendInfo(list,list[0].type)}
  }, [list]);

  const [renderedList, setRenderedList] = useState(list);

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

    sendInfo(newArr,list[0].type)
  }
    
  return (
  <div>
    {/* ------------------------FOOD  DRINK ORDER----------------------- */}
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="renderedList" direction='vertical'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
          
            {renderedList.map((item, index) => {
              return (
                item.course === 1 &&(
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                      {item && (
                        <>
                        <div className="d-flex">
                          <p className="itemOrderQty">{item.quantity} </p>
                          <p >{item.name}</p>
                        </div>
                        <p className="itemOrderMsg">{item.message}</p>
                        </>
                      )}
                    </li>
                  )}
                </Draggable>
                )
              );
            })}

            {renderedList.some(item => item.course === 2) &&
              <>
                <hr className="hrBlue"/>
                {renderedList.map((item, index) => {
              return (
                item.course === 2 &&(
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                      {item && (
                        <>
                        <div className="d-flex">
                          <p className="itemOrderQty">{item.quantity} </p>
                          <p >{item.name}</p>
                        </div>
                        <p className="itemOrderMsg">{item.message}</p>
                        </>
                      )}
                    </li>
                  )}
                </Draggable>
                )
              );
            })}
              </>
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>    
  )
}
