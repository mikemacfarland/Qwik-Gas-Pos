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
            <li class='flex flex-row justify-between my-2' key={props.key}>
                <p class='w-52 md:w-60 lg:w-72 text-left'> {props.item.name}</p>
                <p class='w-12 md:w-14 lg:w-20 text-center'>{props.item.qty}</p>
                <p class='w-12 md:w-14 lg:w-20 text-center'>{props.item.price}</p>
                <p class='w-12 md:w-14 lg:w-20 text-right'>{(props.item.price * props.item.qty).toFixed(2)}</p>
            </li>
        )
    })

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class='h-content p-8 w-content bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 rounded-3xl'>
            <div>
                <div class='flex justify-between w-full font-bold border-2 px-2 py-2 rounded-lg mb-4'>
                    <p class='w-52 md:w-60 lg:w-72 text-left'>Item</p>
                    <p class='w-12 md:w-14 lg:w-20 text-center'>Qty</p>
                    <p class='w-12 md:w-14 lg:w-20 text-center'>Price</p>
                    <p class='w-12 md:w-14 lg:w-20 text-right'>Total</p>
                </div>
                <ul class='max-h-80 w-full border-2 rounded-lg p-2 overflow-y-auto'>
                {
                    gasContext.orders.oldOrder.items.map((item)=>{
                        return (
                            <LiItem item={item} key={item.name} />
                        )
                    })
                }
                </ul>
            </div>
                {gasContext.orders.oldOrder ? 
                <ul class='flex flex-col justify-between space-y-2 w-1/2 my-8 mx-auto border-2 p-2 rounded-lg'>
                    <li class='flex flex-row justify-between'>
                        <p>Gas</p>
                        {/* @TODO this should be set inside the oldorder data when a transaction is complete */}
                        <p>{(gasContext.orders.oldOrder.total - gasContext.orders.oldOrder.foodTotal - gasContext.orders.oldOrder.tax).toFixed(2)}</p>
                    </li>
                    <li class='flex flex-row justify-between'>
                        <p>Food</p>
                        <p>{gasContext.orders.oldOrder.foodTotal}</p>
                    </li>
                    <li class='flex flex-row justify-between'>
                        <p>Tax</p>
                        <p>{gasContext.orders.oldOrder.tax}</p>
                    </li>
                    <li class='flex flex-row justify-between'>
                        <p>Total</p>
                        <p>{gasContext.orders.oldOrder.total}</p>
                    </li>
                </ul> :
                <p>No order data!</p>
                }
            <div class='flex flex-row justify-between'>
                <button onClick$={()=>gasContext.layout.overlay = ''} class='w-1/3 block text-mid-green dark:text-secondary-color border-mid-green hover:bg-mid-green transition-colors duration-300 dark:border-secondary-color border-2 h-14 px-5 rounded-xl mx-auto mt-6'>Close</button>
            </div>
        </div>
    )
})