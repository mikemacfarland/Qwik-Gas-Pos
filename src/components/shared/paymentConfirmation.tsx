import { component$, useContext,$ } from "@builder.io/qwik"
import { ClearSvg } from "../icons/clear"
import { GasContext } from "~/root"

export default component$(()=>{

  const gasContext = useContext(GasContext)

  const setAlert = $((msg:string)=>{
    gasContext.layout.alert = msg
    setTimeout(()=>{
      gasContext.layout.alert = ''
    },3000)
  })

  const checkPumps = $(()=>{
    const selectedPumps = ()=>{
      const selected = gasContext.gasTypes.filter((type)=>{
        if(type.pump !== 0) return type
      }).map((type)=>{
        return type.pump
      })
      return selected.length === 3 ? `pumps ${selected[0]}, ${selected[1]} & ${selected[2]}` : selected.length === 2 ? `pumps ${selected[0]} & ${selected[1]}` :
      `pump ${selected[0]}`
    }
    const pumpsWithInvalidPump = gasContext.gasTypes.filter((type)=>{
      if(type.qty > 0 && type.pump === 0) return type
    })
    const pumpsWithInvalidQty = gasContext.gasTypes.filter((type)=>{
      if(type.qty === 0 && type.pump > 0) return type
    })
    const pumpsWithValidParam = gasContext.gasTypes.filter((type)=>{
      if(type.qty > 0 && type.pump > 1)return type
    })

    // merch total and gas total are 0
    if(gasContext.merchTotal === 0 && gasContext.total === 0){
      setAlert('Total Balance is $0.00')
    }
    // invalid qty
    if(pumpsWithInvalidQty.length > 0){
      setAlert(`Please select qty of fuel for ${selectedPumps()}`)
    }
    // invalid pumps
    if(pumpsWithInvalidPump.length > 0){
      setAlert('Please select pumps for gas types')
    }
    // passing condition
    if((pumpsWithInvalidPump.length === 0 && pumpsWithInvalidQty.length === 0) && (pumpsWithValidParam && gasContext.merchTotal > 0 || gasContext.total > 0)){
        gasContext.layout.overlay = 'payment'
    }
  })

  const clearTotal = $(()=>{
    gasContext.foodTypes.forEach(type=>{
      if(type.sizes){
        type.sizes.forEach(size=>size.qty = 0)
      }
      if(type.qty){
        type.qty = 0
      }
    }), 
    gasContext.gasTypes.forEach(type=>{
      type.qty = 0
      type.pump = 0
    })
    gasContext.total = 0, gasContext.merchTotal = 0, gasContext.discount = 0
  })

return(
  <div class='flex flex-row justify-between mx-8 lg:mx-8 xl:mx-12 m-8'>
    <button onClick$={$(()=>checkPumps())} class='flex h-10 mr-4 w-full justify-center items-center border-2  bg-mid-green rounded-xl border-mid-green  transition-colors duration-300  text-white' >Confirm</button>
    {/* @TODO this piece of shit wont style the first child (svg) */}
    <button onClick$={$(()=>clearTotal())} class='flex h-10 ml-4 w-full justify-center items-center border-2 hover:bg-mid-green first:bg-red-400 hover:text-secondary-color  rounded-xl border-mid-green dark:border-secondary-color text-mid-green  transition-colors duration-300 dark:text-white'>
      <ClearSvg class='w-4 h-4 fill-mid-green transition-colors duration-300 dark:fill-secondary-color'/>
      <p class='ml-2'>Clear</p>
    </button>
  </div>
  )      
})