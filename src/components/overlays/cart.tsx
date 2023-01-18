import { component$,$, useContext } from "@builder.io/qwik";
import { GasContext } from "~/root";

export default component$(()=>{

    const gasContext = useContext(GasContext)

    interface liItemProps{
        item:{name:string,qty:number,price:number}
        key:string
    }

    const LiItem = ((props:liItemProps)=>{
        return(
            <tr class='flex flex-row justify-between my-2' key={props.key}>
                <td class='w-1/4 text-left'><p class='w-1/'> {props.item.name}</p></td>
                <td class='w-1/4 text-center'>
                    <p>{props.item.qty}</p>
                    {/* 
                    // @TODO make this a changable input for qty in cart 
                    <input onChange$={(e)=>{}}
                    class='w-14 text-center mx-2 font-bold bg-quadrary-color  transition-colors duration-300 dark:bg-tertiary-color rounded-md' type="text" value={props.item.qty}/> */}
                </td>
                <td class='w-1/4 text-center'><p>{props.item.price}</p></td>
                <td class='w-1/4 text-right'> <p>{(props.item.price * props.item.qty).toFixed(2)}</p></td>
                {/* <td class='w-1/4 text-right'><button class='w-8 h-content border-2 rounded-lg text-center' onClick$={()=>{console.log('remove item')}}>x</button></td> */}
            </tr>
        )
    })

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class=' h-content max-h-1/2 p-8 md:w-1/2 lg:w-1/2 xl:w-1/3 bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 rounded-3xl'>
            <div>
                <table class='w-full overflow-y-scroll'>
                    <tr class='flex justify-between w-full font-bold border-2 px-2 py-2 rounded-lg mb-4'>
                        <td class='w-1/4 text-left'><p>Item</p></td>
                        <td class='w-1/4 text-center'><p>Qty</p></td>
                        <td class='w-1/4 text-center'><p>Price</p></td>
                        <td class='w-1/4 text-right'><p>Total</p></td>
                    </tr>
                    {
                    gasContext.orders.cart.length > 0 ? 
                    gasContext.orders.cart.map((item,)=>{
                        return(
                            <LiItem key={item.name} item={item}/>
                            )
                    }) : <tr class='flex justify-center my-8'><td>Cart is empty!</td></tr>
                }
                </table>
            </div>
            <div class='flex flex-row justify-between'>
                <button onClick$={()=>gasContext.layout.overlay = ''} class='w-1/3 block text-mid-green dark:text-secondary-color border-mid-green  transition-colors duration-300 dark:border-secondary-color border-2 h-14 px-5 rounded-xl mx-auto mt-6'>Close</button>
                <button onClick$={()=>gasContext.orders.cart.length > 0 ? gasContext.layout.overlay = 'payment' : gasContext.layout.overlay = 'cart'} class='w-1/3 block text-secondary-color bg-mid-green border-2 border-mid-green transition-colors duration-300 h-14 px-5 rounded-xl mx-auto mt-6'>Checkout</button>
            </div>
        </div>
    )
})