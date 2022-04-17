import React, { useEffect, useState } from 'react'
import Formallergens from '../../components/FormAllergens/FormAllergens'
import Item from '../../components/Item/Item'
import Modal from '../../components/Modal/Modal'
import Order from '../../components/Order/Order'
import menuJson from '../../data/menu.json'
import './TakeOrder.css'


const cleanList = (originalList) =>{
  const cleanedList = originalList.map(element => {
    const asArray = Object.entries(element);
    const filtered = asArray.filter(([key, value]) => key !== 'description' && key !== 'allergens');
    const cleanedList = Object.fromEntries(filtered);
    return cleanedList 
  })
  return cleanedList
}


export default function Menu() {
  const list = [...menuJson]            // list we use for the menu
  const listLight = cleanList(list)     // list we use for the order
  const [order, setOrder] = useState([])

  const [foodOrder, setFoodOrder]= useState([])
  const [drinkOrder, setDrinkOrder]= useState([])
  const [tableInfo,setTableInfo]= useState({"table":0, "people":0 , "urgent":false, "takeAway":false})
  const [order1, setOrder1] = useState([{food:foodOrder},{drink:drinkOrder},{tableInfo:tableInfo}])
  const FoodAndDrink = [...order1[0].food, ...order1[1].drink]

  useEffect(() => {
    setOrder1([{food:foodOrder},{drink:drinkOrder},{tableInfo:tableInfo}])
  }, [foodOrder,drinkOrder,tableInfo]);


  const [filterBy, setFilterBy]= useState([])
  const [modalFilter, setModalFilter]= useState(false)
  const [modalMsg, setModalMsg]= useState(false)
  

  //------------------------ ADD ITEM ----------------------------
  //if the item passed to the function is already in the order => update the quantity
  // else : add the item to the order
  const addOneItem = (itemId,type) => {
    if (type === "food"){
      const itemIndex = foodOrder.findIndex(el => el.id === itemId)
      const addedItem = listLight.find(item => item.id===itemId)
      if (itemIndex > -1) {
        let newOrder = [...foodOrder]
        newOrder[itemIndex].quantity += 1
        setFoodOrder(newOrder)
      } else  {
        addedItem.quantity=1
        setFoodOrder([...foodOrder, addedItem])
      }
    }
    if (type === "drink"){
      const itemIndex = drinkOrder.findIndex(el => el.id === itemId)
      const addedItem = listLight.find(item => item.id===itemId)
      if (itemIndex > -1) {
        let newOrder = [...drinkOrder]
        newOrder[itemIndex].quantity += 1
        setDrinkOrder(newOrder)
      } else  {
        addedItem.quantity=1
        setDrinkOrder([...drinkOrder, addedItem])
      }
    }
  }

  //------------------------ DELETE ITEM ----------------------------
  const deleteOneItem = (itemId,type) => {
    if (type === "food"){
      let newOrder = [...foodOrder]
      const itemIndex = foodOrder.findIndex(el => el.id === itemId)
      
      const currentQuantity = foodOrder[itemIndex].quantity
      if (currentQuantity>1){
        newOrder[itemIndex].quantity -= 1
        setFoodOrder(newOrder)
      }
      if (currentQuantity === 1){
        newOrder[itemIndex].quantity = 0
        setFoodOrder(newOrder.filter(item => item.id !== itemId))
      }
    }
    if (type === "drink"){
      let newOrder = [...drinkOrder]
      const itemIndex = drinkOrder.findIndex(el => el.id === itemId)
      
      const currentQuantity = drinkOrder[itemIndex].quantity
      if (currentQuantity>1){
        newOrder[itemIndex].quantity -= 1
        setDrinkOrder(newOrder)
      }
      if (currentQuantity === 1){
        newOrder[itemIndex].quantity = 0
        setDrinkOrder(newOrder.filter(item => item.id !== itemId))
      }
    }
  }

  //------------------------FILTER----------------------------
  const handleCheckBox = () => {
    const values = Array
    .from(document.querySelectorAll('input[type="checkbox"]'))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
    setFilterBy(values)
  }
  
  //------------------------MESSAGE----------------------------
  const [existingMsg,setExistingMsg]= useState("")
  const [newMsg, setNewMsg]= useState("")
  const [msgID, setMsgId]= useState()

  const openModal = (message,id) => {
    setExistingMsg(message)
    setMsgId(id)
    setModalMsg(true)
  } 
  
  const handleChangeTextArea = (e) =>{
    setNewMsg(e.target.value)
  }

  const onSaveMsg = (e) =>{
    e.preventDefault()
    let newOrder = [...order]
    const itemIndexInTheOrder = order.findIndex(el => el.id === msgID)
    newOrder[itemIndexInTheOrder].message = newMsg
    setOrder(newOrder)
    setModalMsg(false)
  }
  //---------------------TABLE INFO---------------------------
  const [urgentTk, setUrgentTk]= useState(false)
  const [takeAway, setTakeAway]= useState(false)

  const handleChange = (e) => {
    const { name , value } = e.target

    setTableInfo(prevState => ({
      ...prevState,
      [name] : Number(value)
    }))
  }

  const setUrgent = () =>{
    setUrgentTk(!urgentTk)
    setTableInfo(prevState => ({
      ...prevState,
      urgent : !urgentTk
    }))
  }

  const TakeAway = () =>{
    setTakeAway(!takeAway)
    setTableInfo(prevState => ({
      ...prevState,
      takeAway : !takeAway
    }))
  }

  // console.log(order,tableInfo);

  // const comanda =     {
  //      "id":123,
  //      "tableInfo":{
  //         "table":0,
  //         "people":0,
  //         "urgent":false,
  //         "takeAway":false
  //      },
  //      "food":[
  //       {
  //         "id":0,
  //         "name":0,
  //         "quantity":0,
  //         "price":0
  //       }
  //       ]
  //   }

  const [xxx,setxxx]= useState()
  const submitOrder = () => {
    const food = order.filter(el => el.type === "food")
    const beverage = order.filter(el => el.type === "drink")
    setxxx({"id":123, "tableInfo":tableInfo, "food":food, "beverage":beverage})
  }
  // console.log(xxx)


  return (
    <div>
      <div className='row'>
      {xxx && <pre>{JSON.stringify(xxx,null,1)}</pre>}
      
                        {/* -12 col-sm-12 col-md-6 */}
        <div className='col  colcolor scroll'> 
          <div className='frcc'> 
            <h2>Menu</h2>
            <i className="fa-solid fa-pepper-hot" onClick={() => setModalFilter(true)}></i>
            <button onClick={submitOrder} className='submitOrder btn'>send</button>
          </div>

          {/* //--------------------TABLE INFO------------------ */}

          <div className='frca'>
            <img src="images/table_icon_125938.png" alt="table" className='imgTable'/>
            <input className='inputNumbers' type="number" min={0}
              name="table"
              placeholder={0}
              onChange={handleChange}
            />
            <i className="fas fa-users"></i>
            <input className='inputNumbers' type="number" min={0}
              name="people"
              placeholder={0}
              onChange={handleChange}
            />
            <i className="fas fa-exclamation-circle "
              onClick={setUrgent}
            ></i>
            <i className="fas fa-bicycle "
              onClick={TakeAway}
            ></i>
          </div>

          {/* //--------------------LIST OF DISHES ------------------ */}
          {list.map(dish => {
            if (filterBy.every(i => !dish.allergens.includes(i))) {
              return (
                <div key={dish.id}>
                  <Item 
                    {...dish} 
                    order={FoodAndDrink.filter(el => el.id === dish.id)}
                    addOneItem={addOneItem} 
                    deleteOneItem={deleteOneItem} 
                    openModal={openModal}
                  />
                </div>
              )
            } else return null
            })}
          </div>

        {/* //--------------------ORDER TICKET ---------------------- */}
        <div className='col colcolor'>
          <h2 className='frcc'>Order</h2>
          <Order order1={order1}/>
        </div>

      </div>


        {/* //---------------------FILTER MODAL--------------------*/}
        {modalFilter && 
        <Modal  
          body = {<Formallergens handleCheckBox={handleCheckBox} filterBy={filterBy}/> }
          handleCheckBox={handleCheckBox} 
          filterBy={filterBy}
          onClose={() => setModalFilter(false)}  
          reactPortal />
        }

        {/* //---------------------MSG MODAL---------------------- */}
        {modalMsg && 
        <Modal            
          body = {
            <form className="fccc">
                <textarea
                onChange={handleChangeTextArea}
                defaultValue={existingMsg}
                name="" id="" cols="30" rows="3"></textarea>
                <button onClick={onSaveMsg}  className="btn btn-primary">add msg</button>
            </form>
          }
          existingMsg={existingMsg}
          handleChangeTextArea={handleChangeTextArea}
          onSaveMsg={onSaveMsg}
          onClose={() => setModalMsg(false)}  
          reactPortal />
        }
    </div>
  )
}
