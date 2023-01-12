import { component$,useContext, $} from "@builder.io/qwik";
import { GasContext } from "~/root";
import Payment from "./payment";
import UserAlert from "./userAlert";
import Help from "./help";

export default component$(()=>{
    const gasContext = useContext(GasContext)

    const paymentClick = $((e)=>{
        e.stop
        gasContext.layout.overlay = ''
    })

    return(
        <div onClick$={$((e)=>{paymentClick(e)})} class={`${gasContext.layout.overlay !== '' ? 'flex' : 'hidden'} justify-center items-center z-30 h-screen w-screen absolute top-0 left-0 bg-slate-400/75  transition-colors duration-300 dark:bg-tertiary-color/75 backdrop-blur-md`}>
            <UserAlert/>
            {gasContext.layout.overlay === 'payment' ? <Payment/> : <Help/>}
            
            
        </div>
    )
})