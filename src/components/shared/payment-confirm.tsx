import { $component, useContext } from "@builder.io/qwik"
import { ClearSvg } from "../icons/clear"
import { GasContext } from "~/root"

export default $component(()=>{

const gasContext = useContext(GasContext)

return(
  <div class='flex flex-row justify-between md:mx-4 lg:mx-8 m-8'>
    <button onClick$={$(()=>gasContext.layout.overlay = true)} class='flex h-10 mr-4 w-full justify-center items-center border-2 bg-mid-green rounded-xl border-mid-green text-white' >Confirm</button>
    <button onClick$={$(()=>{gasContext.foodTypes.forEach(type=>{type.qty = 0}), gasContext.total = 0, gasContext.merchTotal = 0, gasContext.discount = 0})} class='flex h-10 ml-4 w-full justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>
      <ClearSvg/>
      <p class='ml-2'>Clear</p>
    </button>
  </div>
  )
        
})