import { component$ ,$,useContext, useStore, } from "@builder.io/qwik";
import FoodIcon from "../icons/foodIcon";
import { GasContext } from "~/root";

interface foodItemProps{
    class:string
    foodItem:{name:string,type:string,price:number,qty:number,sizes:Array<{name:string,price:number,qty:number}>}
}

export default component$((props:foodItemProps)=>{

    const foodItemStore = useStore({
        idx:0,
        price:0,
        qty:0
    })
    
    props.foodItem.price ? foodItemStore.price = props.foodItem.price : foodItemStore.price = props.foodItem.sizes[foodItemStore.idx].price

    props.foodItem.sizes ? foodItemStore.qty = props.foodItem.sizes[foodItemStore.idx].qty : foodItemStore.qty = props.foodItem.qty

    const gasContext = useContext(GasContext)

    const merchTotal = $(()=>{
        // @TODO this total will need to come from cart in future
        // const newMerchTotal = 

        gasContext.orders.cart = []
        const newCart = []
        gasContext.foodTypes.map((item)=>{
            if(item.qty > 0){
                newCart.push({name:item.name,qty:item.qty,price:item.price})
            }

            // if item doesnt have qty, but sizes array exists
            if(item.qty === 0 && item.sizes){
                // map sizes array in search for a qty
                  item.sizes.map((size)=>{
                    // if size has qty push item to array with size prefixed in front of name
                    if(size.qty > 0){
                        const sizeName = `${size.name} ${item.name}`
                        newCart.push({name:sizeName,qty:size.qty,price:size.price})
                    }
                })
            }

            gasContext.orders.cart = newCart
        //     return (item.qty * item.price)
        //   }).reduce((a,b)=>{
        //     return parseFloat((a + b).toFixed(2))
        //   })
        //   gasContext.merchTotal = newMerchTotal
        })
        
    })

    const changeQty = $((e)=>{
        // onchange
        if(e.type === 'change'){
            const maxFoodQty = gasContext.settings.maxFoodQty
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            e.target.value > maxFoodQty ?  e.target.value = maxFoodQty : e.target.value
            gasContext.foodTypes.map((item)=>{
                if(item.name === props.foodItem.name && item.qty){
                    item.qty = e.target.value
                    foodItemStore.qty = item.qty
                }
                if(item.sizes && !item.qty){
                    item.sizes[foodItemStore.idx].qty = e.target.value
                    foodItemStore.qty = item.sizes[foodItemStore.idx].qty
                }
            })
        }
        // keydown
        if(e.type === 'keyup'){
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        }
        // increment 
        if(e.target.innerText === '+'){
            gasContext.foodTypes.map((item)=>{
            if(item.name === props.foodItem.name && item.qty < gasContext.settings.maxFoodQty)  
            console.log('increment')
            })
        
        }
        // decrement
        if(e.target.innerText === '-'){
            gasContext.foodTypes.map((item)=>{
                if(item.name === props.foodItem.name && item.qty > 0)
                console.log('decrement')
            })
            
        }
        merchTotal()

    })

    

    // onfocus
    const inputFocus = $((e)=>{
        const prevVal = props.foodItem.qty
        e.type === 'focus' ? e.target.value = '' : e.target.value === '' ? e.target.value = prevVal : e.target.value
    })

    const createSizes = $((array:boolean)=>{

        // @TODO state mutation inside render error when changing sizes
        const changeSize = $((size:any)=>{
            size.name === 'Md' ? foodItemStore.idx = 1 :
            size.name === 'Lg' ? foodItemStore.idx = 2 : foodItemStore.idx = 0
        })

        if(array){
            return(
                props.foodItem.sizes.map((size)=>{
                return(
                    <button onClick$={()=>changeSize(size)} class={`w-10 h-10 border-2  border-mid-green  transition-colors duration-300 dark:border-secondary-color rounded-xl mr-2 dark:hover:bg-mid-green hover:bg-mid-green ${size.price === foodItemStore.price ? 'bg-mid-green text-secondary-color border-none' : 'bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 '} hover:text-white`}>{size.name}</button>
                )})
            )
        }  
    })     

    return(
        <div class={`flex flex-row justify-left items-center text-lg h-14 p-4 mb-4 md:mx-4 lg:mx-8 border-2 rounded-xl ${props.class}`}>
                <FoodIcon type={props.foodItem.type} class='fill-mid-green  transition-colors duration-300 dark:fill-secondary-color h-4 w-4 mr-3'/>
                <p>{props.foodItem.name}</p>
                {/* @TODO else clause willneed to be using a local variable that when sizes switched = thi price */}
                <p class='font-bold ml-auto pl-2'>{foodItemStore.price}</p>
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
                        class='w-8 text-center mx-2 font-bold bg-quadrary-color  transition-colors duration-300 dark:bg-tertiary-color rounded-md' type="text" value={foodItemStore.qty}
                    />
                    <button onClick$={(e)=>changeQty(e)} class='w-10 h-10 rounded-xl bg-mid-green text-secondary-color'>+</button>
                </div>
            {/* @TODO <button></button> this will be for deleting items*/}
        </div>
    )
})
