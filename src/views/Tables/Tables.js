import React, { useCallback, useEffect, useState } from 'react';
import { getHolders }  from '../../services/OrderService';
import Comandasingola from '../Comanda/ComandaSingola';
import TakeOrder      from '../../views/TakeOrder/TakeOrder';
import { useLocation } from 'react-router-dom';

const Tables = () => {
    let location = useLocation()
    const arrTablesBtn = [1,2,3,4,5,6,7,8,9,10]
    const [allOrdersArr, setAllOrdersArr]  =useState([])   // all the orders from the API
    const [occupiedTbArr, setOccupiedTbArr]=useState([])   // occupied tables
    const [tableOrder, setTableOrder]=useState()           // order of the table
    const [openTableNum, setOpenTableNum]  =useState(false)      // open the table and show take order component
        
    // set the allOrders Array & occupied Tables Array
    useEffect(() => {
        getHolders()
        .then(response => {
            const sumall = [
                ...Object.entries( response[0])[1][1].items,
                ...Object.entries( response[0])[2][1].items,
                ...Object.entries( response[0])[3][1].items,
                ...Object.entries( response[0])[4][1].items
            ]
            setOccupiedTbArr( sumall.map(tb => tb.tableInfo.table))
            setAllOrdersArr(sumall)
        })
        .catch(err => console.log(err))

        if (location.state){
            console.log("dentro location if")
            goToTable(location.state)
        }
    }, [location.state]);

    // function to check if the table is occupied
    const isOkk = useCallback ((val) => {return occupiedTbArr.includes(val)} , [occupiedTbArr])
    
    // if the table is occupied => show the order
    // else open a table and show the take order component 
    const goToTable = useCallback (
        (num) => {
        setOpenTableNum(false);
        setTableOrder(false);
        
        if (isOkk(num)){
            setTableOrder(allOrdersArr.find(el => el.tableInfo.table === num))
        } else {
            setOpenTableNum(num); 
        }
    },[allOrdersArr, isOkk])

    console.log(occupiedTbArr,location.state);


    return (
        <div className='fccc'>
       
            <div className='tablesBtnDiv'>
                {arrTablesBtn.map(tableBtn => {
                    return (
                        <p  key={tableBtn}
                            className='tableBtn' 
                            onClick={()=> goToTable(tableBtn)}
                            style={{ backgroundColor: isOkk(tableBtn)? "#008E8B": null}}
                            >
                            {tableBtn}
                        </p>
                    )
                })}
            </div>

            {/*  if the table is occupied => show the order */}
            {tableOrder && 
                <>
                <div className='tableTicketDiv'>
                <Comandasingola {...tableOrder}/>
                </div>
                <button className='btn btn-warning' >
                    update
                </button>
                </>
            }

            {/* if the table is not occupied => show the take order component*/}
            {openTableNum &&
                <div className='tableMenuOrder'>
                <TakeOrder openTableNum={openTableNum} />
                </div>
            }
        </div>
    );
}

export default Tables;
