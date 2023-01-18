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
            <li class='flex flex-row space-x-8' key={props.key}>
                <p>{props.item.name}</p>
                <input class='w-14' type="text"></input>
                <p>{props.item.price}</p>
                <button onClick$={()=>{console.log('remove item')}}>x</button>
            </li>
        )
    })

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class=' h-content p-8 md:w-1/2 lg:w-1/2 xl:w-1/3 bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 rounded-3xl'>
            <div>
                <ul>
                    {
                    gasContext.orders.cart.map((item,)=>{
                        return(
                            <LiItem key={item.name} item={item}/>
                            )
                    })}
                </ul>
            </div>
            <button onClick$={()=>gasContext.layout.overlay = ''} class='block text-mid-green dark:text-secondary-color border-mid-green  transition-colors duration-300 dark:border-secondary-color border-2  h-14 px-5 rounded-xl mx-auto mt-6'>Close</button>
        </div>
    )
})