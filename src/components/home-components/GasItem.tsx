import { component$,$,useContext, useStore } from "@builder.io/qwik"
import { GasSvg } from "../icons/gasPump"
import { DownSvg } from '../icons/down'
import { GasContext } from "~/root"

interface gasItemProps{
    fill: string
    gasType: {qty:number, name:string, octane:number, price:number,stock:number}
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
      const changeQty = (val:any)=> {
        e.target.value = (val)
        console.log(val)
        typeof val === 'number' ? props.gasType.qty = val : props.gasType.qty = parseInt(val)
      }

      const maxQty = gasContext.settings.maxGasQty
      const gasStock = props.gasType.stock
      if(e.type === 'change'){
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')

        // if value is more than both maxQty and gasStock AND gasStock is less than maxQty : value = gasStock
        e.target.value > maxQty && e.target.value > gasStock && gasStock < maxQty ? changeQty(gasStock) :

        // if value is more than maxQty and gasStock AND gasStock is more than maxQty : value = gasStock
        e.target.value > maxQty && e.target.value > gasStock && gasStock > maxQty ? changeQty(maxQty) :
        
        // if value is more than maxQty AND less than gasStock AND gasStock is more than maxQty : value = maxQty
        e.target.value > maxQty && e.target.value < gasStock && gasStock > maxQty ? changeQty(maxQty) :

        // if value is less than maxQty AND value is more than gasStock AND gasStock is less than maxQty : value = gasStock
        e.target.value < maxQty && e.target.value > gasStock && gasStock < maxQty ? changeQty(gasStock) : changeQty(e.target.value)
        
        // if value is less than maxQty and maxQty is la
      }
      

      if(e.target.innerText === '+' && gasStock > props.gasType.qty && props.gasType.qty < maxQty){
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
      // @TODO fix this type issue
      gasItemStore.selectedPump = parseInt(e.target.innerText)
      gasItemStore.dropdown = false
    })

  return(
    <div class={`flex flex-row justify-left items-center md:mx-4 lg:mx-8 lg:text-sm h-20 p-4 border-2 rounded-xl overflow-y ${props.class}`}>
          <GasSvg class={`md:hidden lg:block h-12 ${props.fill} `}/>
          <div class='flex flex-col w-1/4 lg:ml-7 mr-auto'>
            <p class='font-bold md:text-2xl xl:text-3xl'>{props.gasType.octane}</p>
            <p class='text-slate-400'>{(props.gasType.name).toUpperCase()}</p>
          </div>
          <p class='mr-4 text-xl font-bold'>{props.gasType.price}$</p>

          <div class={`block ${gasItemStore.dropdown ?  'overflow-y z-20' : 'h-10 overflow-hidden z-10'} h-10 w-24 mr-2 relative`}>
          <ul  class={`${gasItemStore.dropdown ?  'h-content' : 'h-10'} absolute top-0 left-0 w-full mr-2 cursor-pointer items-center border-2 border-mid-green rounded-xl overflow-hidden bg-white `} >
            <li onClick$={$(()=>{pumpDropDown()})} class='cursor-pointer indent-2 w-full h-10 flex flex-row items-center'>{gasItemStore.selectedPump ? gasItemStore.selectedPump : 'Pump'}<DownSvg class='fill-mid-green w-4 ml-auto mr-2 z-20'/></li>

              { gasPumps.map((pump)=>{
                return (<li onClick$={$((e:e)=>{selectPump(e)})} class='flex justify-left items-center h-8 pl-4 w-full bg-white hover:bg-mid-green hover:text-white'>{pump}</li>)
                })
              }
          </ul>
          </div>

          <div class='flex flex-row items-center'>
            <button onClick$={$((e:e)=>changeQty(e))} class='flex w-10 h-10 justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>-</button>
            <input onChange$={$((e:e)=>{changeQty(e)})}
            onClick$={(e:e)=>{e.target.value > 0 ? e.target.value : e.target.value = ''}}
            onFocusout$={(e:e)=>{!e.target.value ? e.target.value = 0 : e.target.value}}
            type='text' value={props.gasType.qty} class='text-center font-bold text-xl mx-2 w-12 bg-gray-100 rounded-lg'
            />
            <button onClick$={$((e:e)=>changeQty(e))} class='flex w-10 h-10 justify-center items-center bg-mid-green border-2 rounded-xl border-mid-green text-white'>+</button>
          </div>
        </div>
   )
  })