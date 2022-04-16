import React, { useState } from 'react'
import Formallergens from '../../components/FormAllergens/FormAllergens'
import Item from '../../components/Item/Item'
import Modal from '../../components/Modal/Modal'
import Order from '../../components/Order/Order'
import menuJson from '../../data/menu.json'
import './TakeOrder.css'

export default function Menu() {
  const [list, setList] = useState(menuJson)
  const [order, setOrder] = useState([])
  const [filterBy, setFilterBy]= useState([])
  const [modalFilter, setModalFilter]= useState(false)
  const [modalMsg, setModalMsg]= useState(false)
  
  
  const addOneItem = (itemId) => {
    const itemIndex = order.findIndex(el => el.id === itemId)
    let addedItem = list.find(item => item.id===itemId)
    
    //if the item passed to the function is already in the order => update the quantity
    if (itemIndex > -1) {
      let newOrder = [...order]
      newOrder[itemIndex].quantity += 1
      setOrder(newOrder)
      // else : add the item to the order
    } else  {
      addedItem.quantity=1
      setOrder([...order, addedItem])
    }
  }

  const deleteOneItem = (itemId) => {
    let newOrder = [...order]
    const itemIndex = order.findIndex(el => el.id === itemId)
    
    if (order[itemIndex]) {
      const currentQuantity = order[itemIndex].quantity
      if (currentQuantity>1){
        newOrder[itemIndex].quantity -= 1
        setOrder(newOrder)
      }
      if (currentQuantity === 1){
        newOrder[itemIndex].quantity = 0
        setOrder(newOrder.filter(item => item.id !== itemId))
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
  const [tableInfo,setTableInfo]= useState(
    {"table":0, "people":0 , "urgent":false, "takeAway":false}
    )

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

  console.log(tableInfo,takeAway);

  return (
    <div>
      <div className='row'>
                        {/* -12 col-sm-12 col-md-6 */}
        <div className='col  colcolor scroll'> 
          <div className='frcc'> 
            <h2>Menu</h2>
            <i className="fa-solid fa-pepper-hot" onClick={() => setModalFilter(true)}></i>
          </div>

          {/* //--------------------TABLE INFO------------------ */}

          <div className='frca'>
            <img src="images/table_icon_125938.png" alt="table" className='imgTable'/>
            <input className='inputPeople' type="number" min={0}
              name="table"
              placeholder={0}
              onChange={handleChange}
            />
            <i className="fas fa-users"></i>
            <input className='inputPeople' type="number" min={0}
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
                    addOneItem={addOneItem} 
                    deleteOneItem={deleteOneItem} 
                    openModal={openModal}
                  />
                </div>
              )
            }
            })}
          </div>

        {/* //--------------------ORDER TICKET ---------------------- */}
        <div className='col colcolor'>
          <h2 className='frcc'>Order</h2>
          <Order order={order} {...tableInfo}/>
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
