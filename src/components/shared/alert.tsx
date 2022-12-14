import { component$,useContext } from "@builder.io/qwik";
import { GasContext } from "~/root";
import { AlertSvg } from "../icons/alert";

export default component$(()=>{
    
    const gasContext = useContext(GasContext)

    return(
        <div class={`${gasContext.layout.alert ? 'absolute z-30' : 'hidden'} space-x-4 px-4 flex flex-row items-center h-14 -translate-x-1/2 top-20 left-1/2 border-2 border-unl-yellow rounded-xl bg-white shadow-lg select-none`}>
            <AlertSvg class='w-6 h-6  fill-unl-yellow '/>
            <p>{gasContext.layout.alert}</p> 
            <AlertSvg class='w-6 h-6 fill-unl-yellow'/>
        </div>
    )
})