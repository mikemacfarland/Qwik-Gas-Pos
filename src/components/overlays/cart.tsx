import { component$,$, useContext } from "@builder.io/qwik";
import { GasContext } from "~/root";

export default component$(()=>{

    const gasContext = useContext(GasContext)

    interface liItemProps{
        item:{name:string,qty:number,price:number}
        key:string
    }

    // @TODO  make this component reusable for reciepts display as well to refactor files

    const LiItem = ((props:liItemProps)=>{
        return(
            <ul class='flex flex-row justify-between my-2' key={props.key}>
                <p class='w-52 md:w-60 lg:w-72 text-left'>{props.item.name}</p>
                <p class='w-12 md:w-14 lg:w-20 text-center'>
                    {props.item.qty}
                    {/* 
                    // @TODO make this a changable input for qty in cart 
                    <input onChange$={(e)=>{}}
                    class='w-14 text-center mx-2 font-bold bg-quadrary-color  transition-colors duration-300 dark:bg-tertiary-color rounded-md' type="text" value={props.item.qty}/> */}
                </p>
                <p class='w-12 md:w-14 lg:w-20 text-center'>{props.item.price}</p>
                <p class='w-12 md:w-14 lg:w-20 text-right'> {(props.item.price * props.item.qty).toFixed(2)}</p>
                {/* <p class='w-1/4 text-right'><button class='w-8 h-content border-2 rounded-lg text-center' onClick$={()=>{console.log('remove item')}}>x</button></p> */}
            </ul>
        )
    })

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class=' h-content max-h-3/4 p-8 w-content  	 bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 rounded-3xl'>
            <div>
                <div class='flex justify-between w-full font-bold border-2 px-2 py-2 rounded-lg mb-4'>
                    <p class='w-52 md:w-60 lg:w-72 text-left'>Item</p>
                    <p class='w-12 md:w-14 lg:w-20 text-center'>Qty</p>
                    <p class='w-12 md:w-14 lg:w-20 text-center'>Price</p>
                    <p class='w-12 md:w-14 lg:w-20 text-right'>Total</p>
                </div>
                <ul class='max-h-80 w-full overflow-y-auto border-2 rounded-lg p-2'>
                    
                    {
                    gasContext.orders.cart.length > 0 ? 
                    gasContext.orders.cart.map((item,)=>{
                        return(
                            <LiItem key={item.name} item={item}/>
                            )
                    }) : <li class='flex justify-center my-8'>Cart is empty!</li>
                }
                </ul>
            </div>
            <div class='flex flex-row justify-between'>
                <button onClick$={()=>gasContext.layout.overlay = ''} class='w-1/3 block text-mid-green hover:text-secondary-color dark:text-secondary-color border-mid-green  transition-colors duration-300 hover:bg-mid-green dark:border-secondary-color border-2 h-14 px-5 rounded-xl mx-auto mt-6'>Close</button>
                <button onClick$={()=>gasContext.orders.cart.length > 0 ? gasContext.layout.overlay = 'payment' : gasContext.layout.overlay = 'cart'} class='w-1/3 block text-secondary-color bg-mid-green border-2 border-mid-green transition-colors duration-300 h-14 px-5 rounded-xl mx-auto mt-6'>Checkout</button>
            </div>
        </div>
    )
})