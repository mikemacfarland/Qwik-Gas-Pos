import { component$,$,useContext, useStore } from "@builder.io/qwik"
import { GasSvg } from "../icons/gasPump"
import { DownSvg } from '../icons/down'
import { GasContext } from "~/root"

interface gasItemProps{
    fill: string
    gasType: {qty:number, name:string, octane:number, price:number}
    class:string
  }
  
  export default component$((props:gasItemProps)=>{
    const gasContext = useContext(GasContext)
    
    const gasItemStore = useStore({
      dropdown: false,
      selectedPump: null
    })

    const gasPumps = []
    for(let i = 0; i < gasContext.settings.noOfPumps; i++){
      gasPumps.push([i+1])
    }

    
    const gasTotal = $(()=>{
      const newGasTotal = gasContext.gasTypes.map((type)=>{
        return (type.price * type.qty)
      }).reduce((a,b)=>{
        return parseFloat((a + b).toFixed(2))
      })

      gasContext.total = newGasTotal
    })

    // @TODO figure out how to get typscript to work with (e) being passed as argument, its just using (e) set to any for now
    interface e{
      target:any
      type:string
    }

    const changeQty = $((e:e)=>{
      if(e.type === 'change'){
      e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
      props.gasType.qty = parseInt(e.target.value)
      }
      if(e.target.innerText === '+'){
        props.gasType.qty++
      }
      if(e.target.innerText === '-'){
        props.gasType.qty > 0 ? props.gasType.qty-- : props.gasType.qty === 0
      }
      gasTotal()
    })

    const pumpDropDown = $(()=>{
      gasItemStore.dropdown ? gasItemStore.dropdown = false :
      gasItemStore.dropdown = true
    })

    const selectPump = $((e:e)=>{
      gasItemStore.selectedPump === parseInt(e.target.innerText) ? gasItemStore.selectedPump = null :
      gasItemStore.selectedPump = parseInt(e.target.innerText)
    })

  return(
    <div class={`flex flex-row justify-left items-center md:mx-4 lg:mx-8 lg:text-sm p-4 border-2 rounded-xl ${props.class}`}>
          <GasSvg class={`md:hidden lg:block h-12 ${props.fill} `}/>
          <div class='flex flex-col w-1/4 lg:ml-7 mr-auto'>
            <p class='font-bold md:text-2xl xl:text-3xl'>{props.gasType.octane}</p>
            <p class='text-slate-400'>{(props.gasType.name).toUpperCase()}</p>
          </div>
          <p class='mr-4 text-xl font-bold'>{props.gasType.price}$</p>
          <div onClick$={$((e:e)=>{pumpDropDown(e)})} class='min-w-22 relative flex flex-row mr-2 cursor-pointer justify-center items-center h-10 px-4 border-mid-green border-2 rounded-xl '>
            <p  class='cursor-pointer mr-1 w-full'>{gasItemStore.selectedPump ? gasItemStore.selectedPump : 'Pump'}</p>
            <DownSvg class='fill-mid-green h-4 w-4'/>
            <div class={`absolute top-3/4 w-full bg-white z-20 border-x-2 border-b-2 border-b-mid-green border-x-mid-green rounded-b-xl overflow-hidden ${gasItemStore.dropdown ? 'block' : 'hidden'}`}>
              { gasPumps.map((pump)=>{
                return (<p onClick$={$((e:e)=>{selectPump(e)})} class='flex justify-left items-center h-8 pl-4 w-full bg-white hover:bg-mid-green hover:text-white'>{pump}</p>)
                })
              }
            </div>
          </div>
          <div class='flex flex-row items-center'>
            <button onClick$={$((e:e)=>changeQty(e))} class='flex w-10 h-10 justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>-</button>
            <input onChange$={$((e:e)=>{changeQty(e)})}
            onClick$={(e:e)=>{e.target.value = ''}}
            onFocusout$={(e:e)=>{!e.target.value ? e.target.value = 0 : e.target.value}}
            type='text' value={props.gasType.qty} class='text-center font-bold text-xl mx-2 w-9'
            />
            <button onClick$={$((e:e)=>changeQty(e))} class='flex w-10 h-10 justify-center items-center bg-mid-green border-2 rounded-xl border-mid-green text-white'>+</button>
          </div>
        </div>
   )
  })