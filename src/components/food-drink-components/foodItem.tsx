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
        // onchange
        if(e.type === 'change'){
            const maxFoodQty = gasContext.settings.maxFoodQty
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            e.target.value > maxFoodQty ?  e.target.value = maxFoodQty : e.target.value
            gasContext.foodTypes.map((item)=>{
                if(item.name === props.foodItem.name)  item.qty = e.target.value
            })
        }
        // keydown
        if(e.type === 'keyup'){
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
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
    // onfocus
    const inputFocus = $((e)=>{
        const prevVal = props.foodItem.qty
        e.type === 'focus' ? e.target.value = '' : e.target.value === '' ? e.target.value = prevVal : e.target.value
    })

    const createSizes = $((array:boolean)=>{
        if(array){
            return(
                props.foodItem.sizes.map((size)=>{
                    return(
                        <button onClick$={()=>changeSize(size)} class={`w-10 h-10 border-2  border-mid-green dark:border-secondary-color rounded-xl mr-2 hover:bg-mid-green ${size.price === props.foodItem.price ? 'bg-mid-green text-secondary-color border-none' : 'bg-secondary-color dark:bg-slate-400 '} hover:text-white`}>{size.name}</button>
                    )})
            )
        }  
    })     

    return(
        <div class={`flex flex-row justify-left items-center text-lg h-14 p-4 mb-4 md:mx-4 lg:mx-8 border-2  rounded-xl ${props.class}`}>

                <FoodIcon type={props.foodItem.type} class='fill-mid-green dark:fill-secondary-color h-4 w-4 mr-3'/>
                <p>{props.foodItem.name}</p>
                <p class='font-bold ml-auto pl-2'>{props.foodItem.price}</p>

                <div class='flex flex-row justify-center items-center ml-4'>
                    <div class={`${props.foodItem.type === 'Coffee' || props.foodItem.type ==='Soda' || props.foodItem.type ==='Tea' ? 'flex flex-row' : 'hidden'} text-base`}>
                        {
                        props.foodItem.sizes ? createSizes(true) : createSizes(false)
                        }
                    </div>
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 border-2  border-mid-green dark:border-secondary-color rounded-xl text-mid-green dark:text-secondary-color '>-</button>
                    <input onFocus$={(e)=>inputFocus(e)}
                        onKeyUp$={(e)=>{changeQty(e)}} 
                        onChange$={(e)=>changeQty(e)}
                        onFocusout$={(e)=>inputFocus(e)} 
                        class='w-8 text-center mx-2 font-bold bg-quadrary-color dark:bg-tertiary-color rounded-md' type="text" value={props.foodItem.qty}
                    />
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 rounded-xl bg-mid-green text-secondary-color'>+</button>
                </div>
            {/* @TODO <button></button> this will be for deleting items*/}
        </div>
    )
})
