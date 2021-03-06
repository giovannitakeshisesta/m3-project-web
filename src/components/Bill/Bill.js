import React, { useState } from 'react';
import { deleteOrder, editOrder } from '../../services/OrderService';
import TicketHeader from '../TicketHeader/TicketHeader';
import BillTicket from './BillTicket';
import '../../styles/bills.scss'

const calculateBill = (arr) => {
    return arr.reduce((acc, item) => {
    acc += item.price * item.quantity;
    return acc;
    }, 0);
};

const reduceOrders = (orders) => {
    return orders.reduce((acc,el)=>{ 
        acc[el._id]=el
        return acc
    },{})
}


const Bill = ({tableOrder, refrAfterPay}) => {
    const [showTotalBill, setShowTotalBill]= useState(true)
    const [showSplitPayment, setShowSplitPayment]= useState(false)

    // table orders details
    const tableInfo = tableOrder[0].tableInfo
    const foodTotArr = []
    const drinkTotArr = []
    tableOrder.forEach(tick => {
        foodTotArr.push(...tick.food); drinkTotArr.push(...tick.drink)
    })
    const foodANDdrink = [...foodTotArr,...drinkTotArr]

    //---------------------------------------------
    const tableOrderReduce = reduceOrders(tableOrder)
    const [allOrders,setAllOrders] = useState(tableOrderReduce)
    const [partialPayment, setPartialPayment]= useState([])
    const maxQty=JSON.parse(JSON.stringify(tableOrder))

    // function => rest 1 to the order, add 1 to the partial payment
    const editQty = (id , type, name ) => {
        // allOrders
        const newOrder = structuredClone(allOrders)
        const item = newOrder[id][type].find(el => el.name === name)

        if (item.quantity>0) {
            item.quantity -=1
            setAllOrders(newOrder)

            // partial Payment
            const newPartialPayment =partialPayment
            if (!newPartialPayment.some(el => el.name===item.name)){
                const newItem = {...item}
                newItem.quantity=1
                newPartialPayment.push(newItem)
                setPartialPayment(newPartialPayment)
            } else {
                const newItem = newPartialPayment.find(el => el.name === item.name)
                newItem.quantity+=1
                setPartialPayment(newPartialPayment)
            }
        } 
    }


    // function => add 1 to the order, rest 1 to the partial payment
    const editQtyReverse = (id,type, name ) => {
    if(partialPayment.find(el => el.name===name))
        {
            const itemMaxQty = 
                maxQty.find(el => el._id===id)[type]
                .find(el=>el.name===name).quantity

            const newOrder = structuredClone(allOrders)
            const item = newOrder[id][type].find(el => el.name === name)
            if(item.quantity<itemMaxQty){
                // allOrders
                item.quantity +=1
                setAllOrders(newOrder)
        
                // partial Payment
                const newPartialPayment =partialPayment
                const newItem=newPartialPayment.find(el=>el.name===name)
                newItem.quantity-=1
            }
        }
    }


    // function => store the changes in the API
    const partialPayBtn = () => {
        Object.entries(allOrders).forEach((ticket)=>{
            const {_id,food,drink,tableInfo} = ticket[1]
            if ([...food,...drink].some((ticket)=>ticket.quantity>0))
            {
                editOrder(_id, { food, drink, tableInfo })
                .then(() => {
                    setPartialPayment([])
                    refrAfterPay()                   
                })
                .catch((err) => console.log(err))
            }
            else
            {
                deleteOrder(_id)
                .then(() => {
                    setPartialPayment([])
                    refrAfterPay()
                })
                .catch((err) => console.log(err))
            }
        })
    }

    const totalPayBtn = () =>{
        tableOrder.forEach(ticket => {
            deleteOrder(ticket._id)
            .then(() => {
                setPartialPayment([])
                refrAfterPay()
            })
            .catch((err) => console.log(err))
        })
    }
    
    return (
        <div className='billMainView'>
            <button
            className='button-59 yellow'
                onClick={()=>{
                    setShowTotalBill(!showTotalBill);
                    setShowSplitPayment(!showSplitPayment)}}
                >{showTotalBill? "Partial Bill" : "Total Bill"}
            </button>

            {/* TOTAL BILL */}
            {showTotalBill &&
            <div className='staticBillDiv'>
                <BillTicket
                    tableInfo={tableInfo}
                    header={true}
                    foodANDdrink={foodANDdrink}
                    calculateBill={calculateBill}
                    showTotalXperson={true}
                    totalPayBtn={totalPayBtn}

                />
            </div>
            }

            {/* SPLIT PAYMENT LEFT  &  RIGHT */}
            {showSplitPayment &&
            <div className='splitRow '>
                <div className='splitLeft'>
                {Object.entries(allOrders).length>1 ?
                    // if multiple tickets => show only 1 header 
                    <div>
                        <TicketHeader {...tableInfo}/>
                        {Object.entries(allOrders).map(ticket => {
                            return(
                                <div className='billTicketDiv' key={ticket[0]}>
                                    <BillTicket
                                        ticketId={ticket[0]}
                                        tableInfo={ticket[1].tableInfo}
                                        header={false}
                                        foodANDdrink={[...ticket[1].food,...ticket[1].drink]}
                                        calculateBill={calculateBill}
                                        editQty={editQty}
                                        editQtyReverse={editQtyReverse}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    : // else show header
                    Object.entries(allOrders).map(ticket => {
                        return(
                            <div className='billTicketDiv' key={ticket[0]}>
                                <BillTicket
                                    ticketId={ticket[0]}
                                    tableInfo={tableInfo}
                                    header={true}
                                    foodANDdrink={[...ticket[1].food,...ticket[1].drink]}
                                    editQty={editQty}
                                    editQtyReverse={editQtyReverse}
                                    calculateBill={calculateBill}
                                />
                            </div>
                        )
                    })
                }
                </div>

                <div className=' splitRight'>
                    <div className='billTicketDiv'>
                        <BillTicket
                            tableInfo={tableInfo}
                            header={true}
                            foodANDdrink={partialPayment}
                            calculateBill={calculateBill}
                            partialPayBtn={partialPayBtn}
                        />
                    </div>
                </div>
            </div>
            } 
        </div>
    );
}

export default Bill;


    

