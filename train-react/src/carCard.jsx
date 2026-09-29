 import { useState } from "react"
 function CarCard({car,updateCar}){
    const [editBrand,setEditBrand] = useState(car.brand)
    const [editPrice,setEditPrice] = useState(car.price) 
    const [isEditing,setIsEditing] = useState(false) 

    return(
        <div style={{display:'flex',alignItems:"center",justifyContent:"center"}}>
            {isEditing ? <input value={editBrand}
            onChange={function(e){setEditBrand(e.target.value)}} /> : <h3>{car.brand}</h3>}
            
            {isEditing? <input type="number" value={editPrice} onChange={function(e){setEditPrice(e.target.value)}}/> : <p>{car.price}</p>}
            
            {isEditing?<button onClick={()=>{updateCar(car._id,editPrice,editBrand);setIsEditing(false)}} >تعديل</button> : (<button onClick={function(){setIsEditing(true)}} >تعديل </button>)}
            
        </div>


    )
}

export default CarCard