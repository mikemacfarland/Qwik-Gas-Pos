import { component$ ,$,useContext, } from "@builder.io/qwik";

//@TODO import these into one component as properties similar to how react uses SVG components
import { BowlSvg } from "../icons/bowl";
import { CoffeeSvg } from "../icons/coffee";
import { Cookie } from "@builder.io/qwik-city";
import { DrinkSvg } from "../icons/drink";
import { FruitSvg } from "../icons/fruit";
import { PizzaSvg } from "../icons/pizza";
import { HotdogSvg } from "../icons/hotDog";
import { FoodSvg } from "../icons/food";
import { GasContext } from "~/root";


interface foodItemProps{
    class:string
    foodItem:{name:string,type:string,price:number,qty:number,sizes:Array<{name:string,price:number}>}
}
export default component$((props:foodItemProps)=>{

    const gasContext = useContext(GasContext)

    const merchTotal = $(()=>{
        const newMerchTotal = gasContext.foodTypes.map((item)=>{
            return (item.qty * item.price)
          }).reduce((a,b)=>{
            return parseFloat((a + b).toFixed(2))
          })
          gasContext.merchTotal = newMerchTotal
    })

    // @TODO the below 3 functions could be one function for refactor
    const changeQty = $((e)=>{
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        gasContext.foodTypes.map((item)=>{
            if(item.name === props.foodItem.name)  item.qty = e.target.value
            merchTotal()
        })          
    })

    const increment = $(()=>{
        gasContext.foodTypes.map((item)=>{
            if(item.name === props.foodItem.name)  item.qty ++
            merchTotal()
        })
    })

    const decrement = $(()=>{
        gasContext.foodTypes.map((item)=>{
            if(item.name === props.foodItem.name && item.qty > 0)  item.qty --
            merchTotal()
            console.log(props.foodItem.sizes)
        })
    })

    const changeSize = $((size:any)=>{
        props.foodItem.price = size.price
        console.log(size.price)
        merchTotal()
    })

    const createSizes = $((array:boolean)=>{
        if(array){
        return(
            props.foodItem.sizes.map((size)=>{
                return(
                    <button onClick$={()=>changeSize(size)} class={`w-10 h-10 border-2 border-mid-green rounded-xl mr-2 hover:bg-mid-green ${size.price === props.foodItem.price ? 'bg-mid-green text-white' : 'bg-white text-black'} hover:text-white`}>{size.name}</button>
                )})
        )
        }
            
    })     

    // if food item price exists return fooditem price, otherwize food item price equals fooditem sizes [0].price
    props.foodItem.price ? props.foodItem.price : props.foodItem.price = props.foodItem.sizes[0].price

    return(
        <div class={`flex flex-row justify-left items-center h-14 p-4 md:mx-4 lg:mx-8 lg:text-sm border-2 rounded-xl ${props.class}`}>

                <p>{props.foodItem.name}</p>
                <p class='font-bold ml-auto'>{props.foodItem.price}</p>

                <div class='flex flex-row justify-center items-center ml-4'>
                    <div class={`${props.foodItem.type === ('Coffee' || 'Soda') ? 'flex flex-row' : 'hidden'} `}>
                        {/* @TODO this map is looking for a sizes array. either provide an empty one or add a conditional to omit this code */}
                        {
                        props.foodItem.sizes ? createSizes(true) : createSizes(false)
                        }
                    </div>
                    <button onClick$={()=>decrement()} class='w-10 h-10 border-2 border-mid-green rounded-xl text-mid-green'>-</button>
                    <input onChange$={(e)=>changeQty(e)} class='w-6 text-center mx-2 font-bold' type="text" value={props.foodItem.qty}/>
                    <button onClick$={()=>increment()} class='w-10 h-10 rounded-xl bg-mid-green text-white'>+</button>
                </div>
            {/* @TODO <button></button> this will be for deleting items*/}
        </div>
    )
})