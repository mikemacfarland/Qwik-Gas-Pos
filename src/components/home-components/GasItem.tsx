import { component$,useContext,$ } from "@builder.io/qwik"
import { GasContext } from "~/root"
import { GasSvg } from "../icons/gasPump"

interface gasItemProps{
    mt: string
    mb: string
    fill: string
    gasType: object
  }
  
  export default component$((props: gasItemProps)=>{


    const decrement = $(()=>{
        props.gasType.qty > 0 ? props.gasType.qty-- : props.gasType.qty === 0
        })

    const increment = $(()=>{props.gasType.qty++})

   return(
    <div class={`flex flex-row justifyleft items-center mx-8 ${props.mt ? props.mt : ''} ${props.mb ? props.mb : ''} p-4 border-2 rounded-xl`}>
          <GasSvg fill={props.fill} height='100%' width='40px'/>
          <p class=' ml-8 text-xl'>{props.gasType.price}$</p>
          <div class='flex flex-col w-1/4 ml-8 mr-auto'>
            <p class='font-bold text-3xl'>{props.gasType.octane}</p>
            <p class='text-slate-400'>{(props.gasType.name).toUpperCase()}</p>
          </div>
          <div>pump</div>
          {/* @TODO add pump # selection HERE */}
          <div class='flex flex-row items-center'>
            <button onClick$={$(()=>decrement())} class='flex w-10 h-10 justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>-</button>
            <p class='flex justify-center items-center font-bold text-xl mx-4'>{props.gasType.qty}</p>
            <button onClick$={$(()=>increment())} class='flex w-10 h-10 justify-center items-center bg-mid-green border-2 rounded-xl border-mid-green text-white'>+</button>
          </div>
        </div>
   )
  })