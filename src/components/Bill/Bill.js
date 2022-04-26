import React, { useState } from 'react';
import Splitpayment from './SplitPayment';
import TotalBill from './TotalBill';

const calculateBill = (arr) => {
    return arr.reduce((acc, item) => {
    acc += item.price * item.quantity;
    return acc;
    }, 0);
};

const Bill = ({tableOrder}) => {
    
    const [showTotalBill, setShowTotalBill]= useState(false)
    const [showSplitPayment, setShowSplitPayment]= useState(true)

    const tableInfo = tableOrder[0].tableInfo
    const foodTotArr = []
    const drinkTotArr = []
        tableOrder.forEach(tick => {
            foodTotArr.push(...tick.food); drinkTotArr.push(...tick.drink)
        })
    const foodANDdrink = [...foodTotArr,...drinkTotArr]
    console.log("foodANDdrink",foodANDdrink);
    const copyFoodAndDrink = JSON.parse(JSON.stringify(foodANDdrink))
    const copyFoodAndDrinkReset = copyFoodAndDrink.map(obj => {return {...obj, quantity:0}});
    const [currentFad,setCurrentFad]=useState(JSON.parse(JSON.stringify(foodANDdrink)))
    const [restToPay, setRestToPay] =useState(JSON.parse(JSON.stringify(foodANDdrink)))

    const [currentBill, setCurrentBill] =useState(copyFoodAndDrinkReset)
    const [paidBills, setPaidBills] =useState([])
    

    
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

    const partialPay = () => {
        console.log("dentro partial");
        const newRestToPay = JSON.parse(JSON.stringify(currentFad))
        const newArr = [...paidBills] 
        newArr.push([currentBill])
        setPaidBills(newArr)
        setCurrentBill(copyFoodAndDrinkReset)
        setRestToPay(newRestToPay)
    }
    
     console.log("paidBills",paidBills);
    //  console.log("restToPay",restToPay);

    return (
        <div className='bill'>
            <button
                onClick={()=>{
                    setShowTotalBill(!showTotalBill);
                    setShowSplitPayment(!showSplitPayment)}}
                >{showTotalBill? "partial bill" : "total Bill"}
            </button>

            {showTotalBill &&
                <TotalBill 
                    {...tableInfo} 
                    foodANDdrink={foodANDdrink}
                    calculateBill={calculateBill}
                />
            }

            {showSplitPayment &&
                <Splitpayment
                    {...tableInfo} 
                    foodANDdrink={currentFad}
                    calculateBill={calculateBill}
                    editQty={editQty}
                    editQtyReverse={editQtyReverse}
                    currentBill={currentBill}
                    partialPay={partialPay}
                />
            }

            {paidBills &&
                paidBills.map(el => {
                    console.log(el)
                    return ( 
                        <TotalBill 
                            {...tableInfo} 
                            foodANDdrink={el[0]}
                            calculateBill={calculateBill}
                            splitView={true}
                        />

                    )
                })
            }
            <div>

            </div>
        </div>

    );
}

export default Bill;


    
    // const racerScores = foodANDdrink.reduce((acc, { name, quantity,price }) => {
    //     acc[name] = acc[name] || { name, quantity: 0 ,price};
    //     acc[name].quantity += quantity;
    //     return acc;  
    //   }, []);
      
    //   console.log(racerScores)
