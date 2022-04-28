import React, { useState } from 'react';
import BillTicket from './BillTicket';

const calculateBill = (arr) => {
    return arr.reduce((acc, item) => {
    acc += item.price * item.quantity;
    return acc;
    }, 0);
};

const Bill = ({tableOrder}) => {
    const [showTotalBill, setShowTotalBill]= useState(false)
    const [showSplitPayment, setShowSplitPayment]= useState(true)

    // table orders details
    const tableInfo = tableOrder[0].tableInfo
    const foodTotArr = []
    const drinkTotArr = []
        tableOrder.forEach(tick => {
            foodTotArr.push(...tick.food); drinkTotArr.push(...tick.drink)
        })
    const foodANDdrink = [...foodTotArr,...drinkTotArr]

    // variables for the partial payment
    const copyFoodAndDrink = JSON.parse(JSON.stringify(foodANDdrink))
    const copyFoodAndDrinkReset = copyFoodAndDrink.map(obj => {return {...obj, quantity:0}});

    const [currentFad,setCurrentFad]=useState(JSON.parse(JSON.stringify(foodANDdrink)))
    const [restToPay, setRestToPay] =useState(JSON.parse(JSON.stringify(foodANDdrink)))

    const [currentBill, setCurrentBill] =useState(copyFoodAndDrinkReset)
    const [paidBills, setPaidBills] =useState([])
    

    // function => rest 1 to the order, add 1 to the current payment
    const editQty = (index) => {
        let newCurrentFad   = [...currentFad ]
        let newCurrentBill  = [...currentBill ]
        if (currentFad[index].quantity >0){
            newCurrentFad[index].quantity -=1
            setCurrentFad(newCurrentFad)

            newCurrentBill[index].quantity +=1
            setCurrentBill(newCurrentBill)
        }
    }

    // function => add 1 to the order, rest 1 to the current payment
    const editQtyReverse = (index) => {
        let newCurrentFad   = [...currentFad ]
        let newCurrentBill  = [...currentBill ]

        if (currentFad[index].quantity < restToPay[index].quantity){
            newCurrentFad[index].quantity +=1
            setCurrentFad(newCurrentFad)

            newCurrentBill[index].quantity -=1
            setCurrentBill(newCurrentBill)
        }
    }

    // function => store the current payment in an array,
    // sets the new rest to pay
    // reset the current payment
    const partialPayBtn = () => {
        const newRestToPay = JSON.parse(JSON.stringify(currentFad))
        const newArr = [...paidBills] 
        newArr.push([currentBill])
        setPaidBills(newArr)
        setCurrentBill(copyFoodAndDrinkReset)
        setRestToPay(newRestToPay)
    }
    

    return (
        <div className='billMainView'>
            <button
                onClick={()=>{
                    setShowTotalBill(!showTotalBill);
                    setShowSplitPayment(!showSplitPayment)}}
                >{showTotalBill? "partial bill" : "total Bill"}
            </button>

            {/* STATIC BILL */}
            {showTotalBill &&
            <div className='staticBillDiv'>
                <BillTicket
                    tableInfo={tableInfo}
                    foodANDdrink={foodANDdrink}
                    calculateBill={calculateBill}
                    showTotalXperson={true}
                />
            </div>
            }

            {/* SPLIT PAYMENT LEFT  &  RIGHT */}
            {showSplitPayment &&
            <div className='splitRow '>
                <div className='splitLeft'>
                    <div className='billTicketDiv'>
                        <BillTicket
                            tableInfo={tableInfo}
                            foodANDdrink={currentFad}
                            calculateBill={calculateBill}
                            editQty={editQty}
                            editQtyReverse={editQtyReverse}
                        />
                    </div>
                </div>

                <div className=' splitRight'>
                    <div className='billTicketDiv'>
                        <BillTicket
                            tableInfo={tableInfo}
                            foodANDdrink={currentBill}
                            calculateBill={calculateBill}
                            partialPayBtn={partialPayBtn}
                        />
                    </div>
                </div>
            </div>
            } 

            {/* PAID BILLS */}
            {paidBills &&
                paidBills.map((el,index )=> {
                    return ( 
                        <div className='paidBills' key={index}>
                            <BillTicket
                                tableInfo={tableInfo}
                                foodANDdrink={el[0]}
                                calculateBill={calculateBill}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Bill;


    
// const tableOrderReduce = tableOrder.reduce((acc,el)=>{ 
//     acc[el._id]=el
//     return acc
// },{})
