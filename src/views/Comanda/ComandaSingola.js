import React from 'react';

const Comandasingola = ({tableInfo, food, createdAt}) => {
    return (
    <>
        <p>Table :{tableInfo.table}</p>
        <p>People: {tableInfo.people}</p>
        
        {tableInfo.urgent && <p>urgent</p>}
        {tableInfo.takeAway}

        <p>Time : {createdAt}</p>                           

        {food.map(dish => {
            return(
                <div key={dish.id}>
                {dish.quantity}
                {dish.name}
                </div>                    
            )
        })}
    </>
     
    );
}

export default Comandasingola;
