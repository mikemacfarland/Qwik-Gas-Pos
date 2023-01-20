import { component$ ,$,useContext, useStore} from "@builder.io/qwik";
import FoodIcon from "../icons/foodIcon";
import { GasContext } from "~/root";

interface foodItemProps{
    class:string
    foodItem:{name:string,type:string,price:number,qty:number,sizes:Array<{name:string,price:number,qty:number}>}
}

export default component$((props:foodItemProps)=>{

    const gasContext = useContext(GasContext)

    const foodItemStore = useStore({
        size: props.foodItem.sizes ? props.foodItem.sizes[0].name : undefined,
        qty:0,
        idx:0
    })

    // function to update global totals
    // this function could be in the update cart function if both were refactored a bit
    const updateTotals = $(()=>{ 
        const arrReduce = (arr)=>{
            const totalAll = arr.map((item)=>{
                return (item.price * item.qty)
            }).reduce((item,a)=>{
                return item + a
            })
            return totalAll
        }

        if(gasContext.orders.cart.length > 0 ){
            const gasItems = []
            const foodItems = []
            gasContext.orders.cart.forEach((item)=>{
                item.type === 'gas' ? gasItems.push(item) : foodItems.push(item)
            })

            foodItems.length > 0 ? gasContext.tax = arrReduce(foodItems) * (gasContext.settings.taxRate / 100) : gasContext.tax = 0
            gasItems.length > 0 ? gasContext.total = arrReduce(gasItems) : gasContext.total = 0
            foodItems.length > 0 ? gasContext.merchTotal = arrReduce(foodItems) : gasContext.merchTotal = 0
        }
    })

    // Function to update cart
    const updateCart = $(()=>{
        gasContext.orders.cart = []
        gasContext.foodTypes.map((foodItem)=>{
            if(foodItem.qty && foodItem.qty > 0){
                gasContext.orders.cart.push(foodItem)
            }
            if(foodItem.sizes){
                foodItem.sizes.map((size)=>{
                    if(size.qty > 0){
                        const sizedItemName = `${size.name} ${foodItem.name}`
                        gasContext.orders.cart.push({name:sizedItemName,qty:size.qty,price:size.price,type:foodItem.type})
                    }
                })
            }
        })
        gasContext.gasTypes.map((gasItem)=>{
            if(gasItem.qty > 0){
                const newName = gasItem.name.charAt(0).toUpperCase() + gasItem.name.substring(1)
                gasContext.orders.cart.push({name:newName,qty:gasItem.qty,price:gasItem.price,type:'gas'})
            }
        })
        updateTotals()
    })

    // Function to change qty
    const changeQty = $((e)=>{
        // onchange
        if(e.type === 'change'){
            props.foodItem.sizes ? props.foodItem.sizes[foodItemStore.idx].qty = e.target.value : props.foodItem.qty = e.target.value
        }
        // keydown
        if(e.type === 'keyup'){
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        }
        // increment 
        if(e.target.innerText === '+'){
            props.foodItem.sizes ? props.foodItem.sizes[foodItemStore.idx].qty ++ : props.foodItem.qty ++
        }
        // decrement
        if(e.target.innerText === '-'){
            if(props.foodItem.sizes)
            props.foodItem.sizes[foodItemStore.idx].qty > 0 ? props.foodItem.sizes[foodItemStore.idx].qty -- : props.foodItem.sizes[foodItemStore.idx].qty = 0
            if(props.foodItem.qty)
            props.foodItem.qty > 0 ? props.foodItem.qty -- : props.foodItem.qty = 0
        }
        updateCart()
    })

    // on input focus behaviour function
    const inputFocus = $((e)=>{
        const prevVal = props.foodItem.qty
        e.type === 'focus' ? e.target.value = '' : e.target.value === '' ? e.target.value = prevVal : e.target.value
    })
     // Function to change size
     const changeSize = $((e)=>{
        const size = e.target.innerText
        foodItemStore.idx = size === 'Md' ? 1 : 
        size === 'Lg' ? 2 : 0
    })


    const createSizes = $((array:boolean)=>{
        if(array){
            return(
                props.foodItem.sizes.map((size)=>{
                return(
                    <button onClick$={(e)=>changeSize(e)} class={`relative w-10 h-10 border-2 border-mid-green dark:border-secondary-color rounded-xl mr-2 hover:text-secondary-color hover:bg-mid-green ${props.foodItem.sizes[foodItemStore.idx].name ===  size.name ? 'bg-mid-green text-secondary-color border-mid-green border-2 dark:border-mid-green' : 'bg-secondary-color dark:bg-slate-400 '} hover:text-white transition-colors duration-300`}>
                    {size.name}
                    <div class={`${size.qty > 0 ? 'visible' : 'hidden'} absolute bg-unl-yellow w-2 h-2 -top-0.5 -right-0.5 rounded-full`}>{}</div>
                    </button>
                )})
            )
        }  
    })     

    return(
        <div class={`flex flex-row justify-left items-center text-lg h-14 p-4 mx-4 xl:mx-8 border-2 rounded-xl ${props.class}`}>
                <FoodIcon type={props.foodItem.type} class='fill-mid-green  transition-colors duration-300 dark:fill-secondary-color h-4 w-4 mr-3'/>
                <p>{props.foodItem.name}</p>
                <p class='font-bold ml-auto pl-2'>{props.foodItem.sizes ? props.foodItem.sizes[foodItemStore.idx].price : props.foodItem.price}</p>
                <div class='flex flex-row justify-center items-center ml-4'>
                    <div class={`${props.foodItem.type === 'Coffee' || props.foodItem.type ==='Soda' || props.foodItem.type ==='Tea' ? 'flex flex-row' : 'hidden'} text-base`}>
                        {
                        props.foodItem.sizes ? createSizes(true) : createSizes(false)
                        }
                    </div>
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 border-2  border-mid-green  dark:border-secondary-color rounded-xl text-mid-green hover:text-secondary-color hover:bg-mid-green transition-colors duration-300 dark:text-secondary-color '>-</button>
                    <input onFocus$={(e)=>inputFocus(e)}
                        onKeyUp$={(e)=>{changeQty(e)}} 
                        onChange$={(e)=>changeQty(e)}
                        onFocusout$={(e)=>inputFocus(e)} 
                        // @TODO qty will need to be dynamically computed and set from new context rules
                        class='w-8 text-center mx-2 font-bold bg-quadrary-color  transition-colors duration-300 dark:bg-tertiary-color rounded-md' type="text" value={props.foodItem.sizes ? props.foodItem.sizes[foodItemStore.idx].qty : props.foodItem.qty}
                    />
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 rounded-xl bg-mid-green text-secondary-color'>+</button>
                </div>
               
            {/* @TODO <button></button> this will be for deleting items*/}
        </div>
    )
})
