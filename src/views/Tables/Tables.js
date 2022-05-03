import React, { useCallback, useEffect, useState } from 'react';
import { useLocation }  from 'react-router-dom';
import { getHolders }   from '../../services/OrderService';
import Ticket           from '../../components/Ticket/Ticket';
import TakeOrder        from '../../components/TakeOrder/TakeOrder';
import Bill             from '../../components/Bill/Bill';

const Tables = () => {
    let location = useLocation()
    const arrTablesBtn = [1,2,3,4,5,6,7,8,9,10]
    const [allOrdersArr, setAllOrdersArr]  =useState([])   // all the orders from the API
    const [occupiedTbArr, setOccupiedTbArr]=useState([])   // occupied tables
    const [tableOrder, setTableOrder]=useState([])         // orders of the table
    const [openTableNum, setOpenTableNum]  =useState(false)// open the table and show take order 
    const [showTakeOrder,setShowTakeOrder]= useState(false)
    const [showBill,setShowBill]    = useState(false)
    const [showTicket,setShowTicket]= useState(true)
    const [refreshAfterPay,setRefreshAfterPay]= useState(true)
        
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
            goToTable(location.state)
        }

    }, [location.state, refreshAfterPay]);

    // function to check if the table is occupied
    const isOkk = useCallback ((val) => {return occupiedTbArr.includes(val)} , [occupiedTbArr])
    
    // when click on the table buttons, if the table is occupied => show the order
    // else open a table and show the take order component 
    const goToTable = useCallback ((num) => {
        setShowBill(false)
        setShowTicket(true)
        setShowTakeOrder(false)
        setOpenTableNum(false);
        setTableOrder(false);
        
        if (isOkk(num)){
            setTableOrder(allOrdersArr.filter(el => el.tableInfo.table === num))
        } else {
            setOpenTableNum(num); 
        }
    },[allOrdersArr, isOkk])

    // function called from the ticket edit button
    const editTableId = (table,id) => {
        setOpenTableNum(table)
        setTableOrder(allOrdersArr.find(el => el._id === id))
    }

    const refrAfterPay = () => {
        setRefreshAfterPay(!refreshAfterPay)
    }

    return (
        <div className='tablesMainDiv'>
            {/* ------------- BUTTONS ------------- */}
            <div className='tablesBtnDiv'>
                {arrTablesBtn.map(tableBtn => {
                    return (
                        <p  key={tableBtn}
                            className="tableBtn" 
                            role="button"
                            onClick={()=> goToTable(tableBtn)}
                            style={{ backgroundColor: isOkk(tableBtn)? "#008E8B": null}}
                            >
                            {tableBtn}
                        </p>
                    )
                })}
            </div>

            {/*  if there are orders for the table => show the tickets */}
            {tableOrder.length > 0 && showTicket &&
                <div className='tablesInnerDiv'>
                <button className='button-80 '
                    onClick={()=> {
                        setOpenTableNum(tableOrder[0].tableInfo.table)
                        setShowTakeOrder(true)
                        setShowTicket(false)
                    }}
                > <i class="fa-solid fa-cart-plus"></i>
                </button>

                <div className='tableTicketDiv'>
                {
                    tableOrder.map(ticket => {
                        return (
                            <Ticket key={ticket._id} {...ticket} editTableId={editTableId}/>
                        )
                    })
                }
                </div>
                <button  className='button-80 '
                    onClick={()=> {
                        setShowTicket(false)
                        setShowBill(true)
                        }}
                ><i class="fa-solid fa-circle-dollar-to-slot"></i>
                </button>
                </div>
            }

            {/* if the table is not occupied => show the take order component*/}
            {openTableNum && !showTakeOrder &&
                <div className='tableMenuOrder'>
                <TakeOrder openTableNum={openTableNum} data={tableOrder}/>
                </div>
            }
            {showTakeOrder &&
                <div className='tableMenuOrder'>
                <TakeOrder openTableNum={openTableNum} data={{tableInfo:tableOrder[0].tableInfo,food:[],drink:[]}}/>
                </div>
            }

            {showBill && isOkk(tableOrder[0].tableInfo.table) &&
                <div className='tableMenuOrder'>
                <Bill tableOrder={tableOrder} refrAfterPay={refrAfterPay}/>
                </div>
            }
        </div>
    );
}

export default Tables;
