import { component$ ,$,useContext, } from "@builder.io/qwik";
import FoodIcon from "../icons/foodIcon";
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

    const changeQty = $((e)=>{
        // @TODO qwik error element must be connected to the dom on plus press
        
        // change from input
        if(e.type === 'change'){
            const maxFoodQty = gasContext.settings.maxFoodQty
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            e.target.value > maxFoodQty ?  e.target.value = maxFoodQty : e.target.value
            gasContext.foodTypes.map((item)=>{
                if(item.name === props.foodItem.name)  item.qty = e.target.value
            })
        }
        // increment 
        if(e.target.innerText === '+'){
            gasContext.foodTypes.map((item)=>{
            if(item.name === props.foodItem.name && item.qty < gasContext.settings.maxFoodQty)  item.qty ++
        })
        }
        // decrement
        if(e.target.innerText === '-'){
            gasContext.foodTypes.map((item)=>{
                if(item.name === props.foodItem.name && item.qty > 0)  item.qty --
            })
        }
        merchTotal()
    })

    const changeSize = $((size:any)=>{
        props.foodItem.price = size.price
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

    return(
        <div class={`flex flex-row justify-left items-center text-lg h-14 p-4 mb-4 md:mx-4 lg:mx-8 border-2 rounded-xl ${props.class}`}>

                <FoodIcon type={props.foodItem.type} class='fill-mid-green h-4 w-4 mr-3'/>
                <p>{props.foodItem.name}</p>
                <p class='font-bold ml-auto pl-2'>{props.foodItem.price}</p>

                <div class='flex flex-row justify-center items-center ml-4'>
                    <div class={`${props.foodItem.type === 'Coffee' || props.foodItem.type ==='Soda' || props.foodItem.type ==='Tea' ? 'flex flex-row' : 'hidden'} text-base`}>
                        {
                        props.foodItem.sizes ? createSizes(true) : createSizes(false)
                        }
                    </div>
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 border-2 border-mid-green rounded-xl text-mid-green '>-</button>
                    <input onClick$={(e)=>e.target.value=''}  
                        onChange$={(e)=>changeQty(e)}
                        onFocusout$={(e)=>!e.target.value ? e.target.value = 0 : e.target.value} 
                        class='w-8 text-center mx-2 font-bold bg-gray-100 rounded-md' type="text" value={props.foodItem.qty}
                    />
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 rounded-xl bg-mid-green text-white'>+</button>
                </div>
            {/* @TODO <button></button> this will be for deleting items*/}
        </div>
    )
})
