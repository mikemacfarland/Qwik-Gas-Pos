import { component$ ,$,useContext} from "@builder.io/qwik";

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
    class: string
    type:string
    name: string
    price:number
    qty:number
}
export default component$((props:foodItemProps)=>{
    const gasContext = useContext(GasContext)

    const changeQtyInput = $((e)=>{
        gasContext.foodTypes.map((type)=>{
            if(type.name === props.name)  type.qty = e.target.value
        })
    })

    const increment = $(()=>{
        gasContext.foodTypes.map((type)=>{
            if(type.name === props.name)  type.qty ++
        })
    })

    const decrement = $(()=>{
        gasContext.foodTypes.map((type)=>{
            if(type.name === props.name && type.qty > 0)  type.qty --
        })
    })
    
    return(
        <div class={`flex flex-row justify-left items-center h-14 p-4 md:mx-4 lg:mx-8 lg:text-sm border-2 rounded-xl ${props.class}`}>
                <p>{props.name}</p>
                <p>{props.price}</p>

                <div class='flex flex-row justify-center items-center ml-auto'>
                    <button onClick$={$(()=>{decrement()})} class='w-10 h-10 border-2 border-mid-green rounded-xl text-mid-green'>-</button>
                    <input onChange$={$((e)=>{changeQty(e)})} class='w-6 text-center mx-2' type="text" value={props.qty}/>
                    <button onClick$={$(()=>{increment()})} class='w-10 h-10 rounded-xl bg-mid-green text-white'>+</button>
                </div>
            {/* <button></button> this will be for deleting items*/}
        </div>
    )
})