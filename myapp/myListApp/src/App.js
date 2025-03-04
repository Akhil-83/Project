import './App.css';
import React,{useState,useEffect} from 'react';

const getLocalData=()=>{
  const list=localStorage.getItem("todolist")

  return list?JSON.parse(list):[]
}

function App() {
  const [inputdata,setinputdata]=useState("")
  const [items,setItems]=useState(getLocalData())

  const addItem=()=>{
    if(!inputdata){
      alert("Fill the data")
    }else{
      const myin={
        id: new Date().getTime().toString(),
        name: inputdata
      }
      setItems([...items,myin]);
      setinputdata("")
    }
  }

  const deleteItem=(index)=>{
    const up=items.filter((currelm)=>{
      return currelm.id!==index;
    })
    setItems(up);
  }

useEffect(()=>{
  localStorage.setItem("todolist",JSON.stringify(items))
},[items])

const editItem=(index)=>{
  const upitem=items.find((currelm)=>{
    return currelm.id===index;
  })
}

  return (
  <>
    <div className='main-div'>
      <div className='child-div'>
        <figure>
          <img src='' alt='image' />
          <figcaption>Add your List Hear✌</figcaption>
        </figure>
        <div className='addItems'>
          <input type='text' placeholder='✍ add items...' 
          className='form-control'
          value={inputdata}
          onChange={(e)=>{setinputdata(e.target.value)}}></input>
          <i className="fa fa-solid fa-plus" onClick={addItem}></i>
        </div>

        <div className='showItems'>
          {items.map((currelm)=>{
            return <div className='eachItem' key={currelm.id}>
            <h3>{currelm.name}</h3>
            <div className='todo-btn'>
             <i className="far fa-solid fa-edit" onClick={()=>editItem(currelm.id)}></i>
             <i className="far fa-solid fa-trash-alt" onClick={()=>deleteItem(currelm.id)}></i>
            </div>
          </div>
          })}
          
        </div>

        <div className='showItems'>
          <button className='btn effect04' data-sm-link-text="Remove All" onClick={()=>setItems([])}><span>CHECK LIST</span></button>
        </div>
      </div>
    </div>
  </>  
  );
}

export default App;
