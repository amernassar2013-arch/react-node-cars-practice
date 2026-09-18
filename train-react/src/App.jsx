import { useState } from "react";
import { useEffect } from "react";
import CarCard from "./carCard";


function App() {
const [minPrice,setMinPrice] = useState(0)
const [cars, setCars] = useState([]);
const [newBrand,setNewBrand] = useState("")
const [newPrice,setNewPrice] = useState(0)

useEffect(function(){
  async function fetchCars() {
    let response = await fetch("http://localhost:3000/cars");
    let data = await response.json();
    setCars(data);
  }
  fetchCars()

},[])

async function addCar(){
  let response = await fetch("http://localhost:3000/cars",{
    method :"post",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({brand:newBrand,price:newPrice})

  }) 
  let data=await response.json();
  setCars(data);
}


let filterCars=cars.filter(function(car){return car.price>=minPrice})
  return <div> <input type="number" onChange={function(e) {setMinPrice(e.target.value)}}>
    </input><ul>{filterCars=cars.filter(function(car){return car.price>=minPrice})
.map(function(car){return <CarCard car={car}/>})}</ul>
    <span>
    <input placeholder="النوع" type="text" onChange={function(e) {setNewBrand(e.target.value)}} /><br/>
    <input placeholder="السعر"  type="number" onChange={function(e) {setNewPrice(e.target.value)}} /><br/>
    <button onClick={addCar}>اضافه</button> <br/>
    </span>
</div>
}

export default App;