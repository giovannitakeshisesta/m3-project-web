import React, { useEffect, useState } from 'react'
import Formallergens from '../../components/FormAllergens/FormAllergens'
import Item from '../../components/Item/Item'
import Modal from '../../components/Modal/Modal'
import Order from '../../components/Order/Order'
import { useAuthContext } from '../../contexts/AuthContext'
import menuJson from '../../data/menu.json'
import { postOrder } from '../../services/OrderService'
import './TakeOrder.scss'

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
  
  const { user } = useAuthContext()
  const list = [...menuJson]            // list we use for the menu
  const listLight = cleanList(list)     // list we use for the order

  const [foodOrder, setFoodOrder]= useState([])
  const [drinkOrder, setDrinkOrder]= useState([])
  const [tableInfo,setTableInfo]= useState({"table":0, "people":0 , "urgent":false, "takeAway":false, "waiter":user.name})
  const [order, setOrder] = useState([{tableInfo:tableInfo},{food:foodOrder},{drink:drinkOrder}])
  const FoodAndDrink = [...order[1].food, ...order[2].drink]

  useEffect(() => {
    setOrder([
      
      {tableInfo:tableInfo},
      {food:foodOrder.sort((a, b) => a.course - b.course)},
      {drink:drinkOrder.sort((a, b) => a.course - b.course)}])
  }, [foodOrder,drinkOrder,tableInfo]);

  // Table info
  const [urgentTk, setUrgentTk]= useState(false)
  const [takeAway, setTakeAway]= useState(false)


  // Modal descripcion
  const [modalDescription, setModalDescription] = useState(false)
  const [modalDescriptioninfo, setModalDescriptioninfo] = useState([])


  // Modal filter
  const [filterBy, setFilterBy]= useState([])
  const [modalFilter, setModalFilter]= useState(false)

  // Modal msg
  const [modalMsg, setModalMsg]= useState(false)
  const [existingMsg,setExistingMsg]= useState("")
  const [newMsg, setNewMsg]= useState("")
  const [msgID, setMsgId]= useState()
  const [msgType, setMsgType]= useState()
  

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

  //------------------MODAL DESCRIPTION------------------------
  const openModalDescription = (name,description,price) => {
    setModalDescription(true)
    setModalDescriptioninfo([name,description,price])
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
  const openModal = (message,id,type) => {
    setExistingMsg(message)
    setMsgId(id)
    setMsgType(type)
    setModalMsg(true)
  } 
  
  const handleChangeTextArea = (e) =>{
    setNewMsg(e.target.value)
  }
  
  const onSaveMsg = (e) =>{
    e.preventDefault()
    if (msgType==="food"){
      let newOrder = [...foodOrder]
      const itemIndexInTheOrder = foodOrder.findIndex(el => el.id === msgID)
      newOrder[itemIndexInTheOrder].message = newMsg
      setFoodOrder(newOrder)
      setModalMsg(false)
    }
    if (msgType==="drink"){
      let newOrder = [...drinkOrder]
      const itemIndexInTheOrder = drinkOrder.findIndex(el => el.id === msgID)
      newOrder[itemIndexInTheOrder].message = newMsg
      setDrinkOrder(newOrder)
      setModalMsg(false)
    }
  }
  //---------------------CHANGE COURSE---------------------------
  const changeCourse = (type,itemId,course) => {
    console.log("course",type,course)
    if (type === "food"){
      const itemIndex = foodOrder.findIndex(item => item.id === itemId)
 
      let newOrder = [...foodOrder]
      if (course < 3 ){
        newOrder[itemIndex].course +=1
      } else{
        newOrder[itemIndex].course =1
      }
      // newOrder .sort((a, b) => a.course - b.course)
      setFoodOrder(newOrder)
    }
    if (type === "drink"){
      const itemIndex = drinkOrder.findIndex(item => item.id === itemId)
  
      let newOrder = [...drinkOrder]
      if (course < 3 ){
        newOrder[itemIndex].course +=1
      } else{
        newOrder[itemIndex].course =1
      }
      // newOrder .sort((a, b) => a.course - b.course)
      setDrinkOrder(newOrder)
    }
  }
  //---------------------TABLE INFO---------------------------
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

  //---------------------   json ---------------------------
  const [jason,setjason]= useState()
  const submitOrder = (renderedList) => {
    // convert the array to object
    const order = Object.assign({}, ...renderedList)
    setjason(order)// display json
    postOrder(order)
    .then(()=> console.log("dentro el then"))
    .catch(()=> console.log("hay un error"))
  }




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
                    openModalDescription={openModalDescription}
                    changeCourse={changeCourse}
                  />
                </div>
              )
            } else return null
            })}
          </div>

        {/* //--------------------ORDER TICKET ---------------------- */}
        <div className='col colcolor'>
          <h2 className='frcc'>Order</h2>
          <Order order={order} submitOrder={submitOrder} />
        </div>

      </div>


        {/* //---------------------DESCRIPTION MODAL--------------------*/}
        {modalDescription && 
        <div>
          <Modal
            title = {
              <div className='frcb'>
                  <h2>{modalDescriptioninfo[0]}</h2>
                  <h2 className='ms-5'>{modalDescriptioninfo[2]} € </h2>
              </div>
            }
            body = {modalDescriptioninfo[1]}
            onClose={() => setModalDescription(false)}
            reactPortal />
        </div>
        }

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


        

        {jason &&
        <div>
          <h2>Json que se envia a la API</h2>
          <p>id dinamico</p>
          <p>date time</p>
          <p>waiter name</p>
          <pre>{JSON.stringify(jason,null,1)}</pre>
          <h2>cocina y barra se conectan a la API y reciben respectivamente:</h2>
          <div className='row'>
            <div className='col colcolor'>
              <pre>{JSON.stringify([jason[0],jason[1]],null,1)}</pre>
            </div>
            <div className='col colcolor'>
            <pre>{JSON.stringify([jason[0],jason[2]],null,1)}</pre>
            </div>

          </div>
        </div>
        }
    </div>
  )
}
