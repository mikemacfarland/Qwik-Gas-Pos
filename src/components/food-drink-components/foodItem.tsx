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

    // Function to update merch total
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
                        gasContext.orders.cart.push({name:sizedItemName,qty:size.qty,price:size.price})
                    }
                })
            }
        })
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
            props.foodItem.sizes ? props.foodItem.sizes[foodItemStore.idx].qty -- : props.foodItem.qty --
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
                    <button onClick$={(e)=>changeSize(e)} class={`relative w-10 h-10 border-2  border-mid-green  transition-colors duration-300 dark:border-secondary-color rounded-xl mr-2 dark:hover:bg-mid-green hover:bg-mid-green ${size.price ? 'bg-mid-green text-secondary-color border-none' : 'bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 '} hover:text-white`}>
                    {size.name}
                    <div class={`${size.qty > 0 ? 'visible' : 'hidden'} absolute bg-unl-yellow w-2 h-2 top-1 left-1/2 -translate-x-1/2 rounded-full`}>{}</div>
                    </button>
                )})
            )
        }  
    })     

    return(
        <div class={` flex flex-row justify-left items-center text-lg h-14 p-4 mb-4 md:mx-4 lg:mx-8 border-2 rounded-xl ${props.class}`}>
                <FoodIcon type={props.foodItem.type} class='fill-mid-green  transition-colors duration-300 dark:fill-secondary-color h-4 w-4 mr-3'/>
                <p>{props.foodItem.name}</p>
                {/* @TODO else clause willneed to be using a local variable that when sizes switched = thi price */}
                <p class='font-bold ml-auto pl-2'>{props.foodItem.sizes ? props.foodItem.sizes[foodItemStore.idx].price : props.foodItem.price}</p>
                <div class='flex flex-row justify-center items-center ml-4'>
                    <div class={`${props.foodItem.type === 'Coffee' || props.foodItem.type ==='Soda' || props.foodItem.type ==='Tea' ? 'flex flex-row' : 'hidden'} text-base`}>
                        {
                        props.foodItem.sizes ? createSizes(true) : createSizes(false)
                        }
                    </div>
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 border-2  border-mid-green  dark:border-secondary-color rounded-xl text-mid-green  transition-colors duration-300 dark:text-secondary-color '>-</button>
                    <input onFocus$={(e)=>inputFocus(e)}
                        onKeyUp$={(e)=>{changeQty(e)}} 
                        onChange$={(e)=>changeQty(e)}
                        onFocusout$={(e)=>inputFocus(e)} 
                        // @TODO qty will need to be dynamically computed and set from new context rules
                        class='w-8 text-center mx-2 font-bold bg-quadrary-color  transition-colors duration-300 dark:bg-tertiary-color rounded-md' type="text" value={props.foodItem.sizes ? props.foodItem.sizes[foodItemStore.idx].qty : props.foodItem.qty}
                    />
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 rounded-xl bg-mid-green text-secondary-color'>+</button>
                </div>
                {/* @TODO add little icon to denote if 2 or 3 sizes are picked */}
            {/* @TODO <button></button> this will be for deleting items*/}
        </div>
    )
})
