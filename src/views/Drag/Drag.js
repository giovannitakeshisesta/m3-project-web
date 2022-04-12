import React from 'react'
import {useState} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Drag.css'

export default function Drag() {
    const orderList = [
        {
          id: '1',
          name: 'comanda 1'
        },
        {
          id: '2',
          name: 'comanda 2'
        },
        {
          id: '3',
          name: 'comanda 3'
        },
        {
          id: '4',
          name: 'comanda 4'
        },
        {
          id: '5',
          name: 'comanda 5'
        }
      ]

      
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
    <div>
        <p> <b>DragDropContext</b> wraps the list </p>
        <p> <b>Droppable</b> = defines the area  and set the direction<br/>
           + function that allows us to pass more info to the Droppable component</p>
        <p> <b>Draggable </b>component wrap each item<br/>
           + function that allows us to pass more info to the Draggable component</p>
        <p> <b>Placeholder </b>to set the end of the area</p>
        <p> onDragEnd = handler that we can pass to the DragDropContext to save the order of the list, is required</p>
    </div>
    <header >
      <h1>Kitchen Ticket Holder</h1>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="renderedList" direction='horizontal'>
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
                        <p>{ name }</p>
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
    </header>
    <p>hola mundo</p>
  </div>

  )
}
