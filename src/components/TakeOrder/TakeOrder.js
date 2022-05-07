import React, { useEffect, useState } from 'react'
import { useNavigate }    from 'react-router-dom'
import { createOrder, editOrder }      from '../../services/OrderService'
import { useAuthContext } from '../../contexts/AuthContext'
import '../../styles/TakeOrder.scss'
import Formallergens from '../FormAllergens/FormAllergens'
import Item          from '../Item/Item'
import Modal         from '../Modal/Modal'
import Order         from '../Order/Order'
import { getMenu } from '../../services/menu.service'
// import menuJson      from '../../data/menu.json'

const cleanList = (originalList) =>{
  const cleanedList = originalList.map(element => {
    const asArray = Object.entries(element);
    const filtered = asArray.filter(([key, value]) => key !== 'description' && key !== 'allergens');
    const cleanedList = Object.fromEntries(filtered);
    return cleanedList 
  })
  return cleanedList
}


export default function TakeOrder({openTableNum, data}) {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [menuJson,setMenuJson]=useState([])

  useEffect(() => {
    getMenu()
    .then((response)=>setMenuJson(response))
    .catch((err)=> console.log(err))
  }, []);

  const list = [...menuJson]            // list we use for the menu
  const listLight = cleanList(list)     // list we use for the order
  console.log(list);
  


  const [tableInfo,setTableInfo] = useState(
    {
      "table":openTableNum , 
      "people": data ? data.tableInfo.people : 0, 
      "urgent":false, 
      "takeAway":false, 
      "waiter":user.name
    });

  const [foodOrder, setFoodOrder] = useState([])
  const [drinkOrder,setDrinkOrder]= useState([])
  
  const currentOrder = {
    tableInfo,
    food: data ? data.food : [],
    drink: data ? data.drink : []
  }
  const [order, setOrder] = useState(currentOrder)
  const FoodAndDrink = [...order.food, ...order.drink]

  useEffect(() => {
    if (data){
      // setTableInfo(data.tableInfo)
      setFoodOrder(data.food)
      setDrinkOrder(data.drink)
    }
  }, [data]);

  useEffect(() => {
    setTableInfo((prevState) => ({
        ...prevState,
        "table":openTableNum
      }));
  }, [openTableNum]);

  useEffect(() => {
    setOrder(
      {
        id: data._id,
        tableInfo: tableInfo,
        food:foodOrder.sort((a, b) => a.course - b.course),
        drink:drinkOrder.sort((a, b) => a.course - b.course)
      })
  }, [foodOrder,drinkOrder,tableInfo,data._id]);

  // Table info
  const [urgentTk, setUrgentTk]= useState(false)
  const [takeAway, setTakeAway]= useState(false)


  // Modal description
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
        newOrder.splice(itemIndex,1)
        setFoodOrder(newOrder)
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
        newOrder.splice(itemIndex,1)
        setDrinkOrder(newOrder)
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
    if (type === "food"){
      const itemIndex = foodOrder.findIndex(item => item.id === itemId)
 
      let newOrder = [...foodOrder]
      if (course < 2 ){
        newOrder[itemIndex].course +=1
      } else{
        newOrder[itemIndex].course =1
      }
      setFoodOrder(newOrder)
    }
    if (type === "drink"){
      const itemIndex = drinkOrder.findIndex(item => item.id === itemId)
  
      let newOrder = [...drinkOrder]
      if (course < 2 ){
        newOrder[itemIndex].course +=1
      } else{
        newOrder[itemIndex].course =1
      }
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

  //---------------------   SUBMIT ---------------------------
  const submitOrder = (order) => {  
    createOrder(order)
    .then(()=> navigate('/KitchenWall'))
    .catch((err)=> console.log(err))
  }

  const handleEdit = (order) => {
    const {id, food, drink, tableInfo } = order
    editOrder(id, { food, drink, tableInfo })
      .then(order => { navigate('/KitchenWall') })
      .catch((err)=> console.log(err))
  }

  return (
    <div>
      <div className='row'>      
        <div className='col  colcolor scroll'> 
          <div className='frcc'> 
            <h2>Menu</h2>
            <i className="fa-solid fa-pepper-hot" 
              onClick={() => setModalFilter(true)}
                
              style={{color: filterBy.length>0 ? "red" : "orange"}}
            ></i>
          </div>

          {/* //--------------------TABLE INFO------------------ */}

          <div className='frca'>
            <img src="images/table_icon_125938.png" alt="table" className='imgTable'/>
            <input className='inputNumbers' type="number" min={0}
              name="table"
              placeholder={tableInfo.table}
              onChange={handleChange}
            />
            <i className="fas fa-users"></i>
            <input className='inputNumbers' type="number" min={0}
              name="people"
              placeholder={data ? data.tableInfo.people : 0}
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

          {tableInfo.people>0 && 
              <>
              <p>Starters</p>
              {list.map(dish => {
              if (filterBy.every(i => !dish.allergens.includes(i))) {
                return (
                  dish.type==="food" && dish.line[0]=== "Starters" &&
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
              </>
            } 

            {tableInfo.people>0 && 
              <>
              <p>Main Courses</p>
              {list.map(dish => {
              if (filterBy.every(i => !dish.allergens.includes(i))) {
                return (
                  dish.type==="food" && dish.line[0]=== "Main Courses" &&
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
              </>
            } 

            {tableInfo.people>0 && 
              <>
              <p>Desserts</p>
              {list.map(dish => {
              if (filterBy.every(i => !dish.allergens.includes(i))) {
                return (
                  dish.type==="food" && dish.line[0]=== "Desserts" &&
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
              </>
            }

          {/* //--------------------LIST OF DRINKS ------------------ */}
          
          {tableInfo.people>0 && 
            <>
            <p>Drinks</p>
            {list.map(dish => {
            if (filterBy.every(i => !dish.allergens.includes(i))) {
              return (
                dish.type==="drink" &&
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
            </>
          }
          </div>

        {/* //--------------------ORDER TICKET ---------------------- */}
        <div className='col colcolor'>
          <h2 className='frcc'>Order</h2>
          <Order order={order} submitOrder={submitOrder} editOrder={handleEdit}/>
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
            body = {
              <div className='modalDescriptioninfo'>
                {modalDescriptioninfo[1]}
              </div>
              }
            onClose={() => setModalDescription(false)}
            reactPortal />
        </div>
        }

        {/* //---------------------FILTER MODAL--------------------*/}
        {modalFilter && 
        <Modal  
          title = {
            <div className='frcb'>
                <h2 className='ms-3'>Filter By :</h2>
            </div>
          }
          body = {
            <Formallergens handleCheckBox={handleCheckBox} filterBy={filterBy}/> 
          }
          handleCheckBox={handleCheckBox} 
          filterBy={filterBy}
          onClose={() => setModalFilter(false)}  
          reactPortal />
        }

        {/* //---------------------MSG MODAL---------------------- */}
        {modalMsg && 
        <Modal     
          title = {
            <div className='frcb'>
                <h2 className='ms-3'>Send a message!</h2>
            </div>
          }       
          body = {
            <form className="fccc">
                <textarea
                onChange={handleChangeTextArea}
                defaultValue={existingMsg}
                name="" id="" cols="30" rows="3"></textarea>
                <button onClick={onSaveMsg}  className="btn modalBtn">Send</button>
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
