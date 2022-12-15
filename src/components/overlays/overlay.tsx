import { component$,useContext, $} from "@builder.io/qwik";
import { GasContext } from "~/root";
import Payment from "./payment";
import UserAlert from "./userAlert";


export default component$(()=>{
    const gasContext = useContext(GasContext)

    // @TODO use this component to pass other components into it as children eg: 
    //      - pay screen 
    //      - user sign in screen 
    //      - sync screen 
    //      - help screen.
    
    const paymentClick = $((e)=>{
        e.stop
        gasContext.layout.overlay = false
    })

    return(
        <div onClick$={$((e)=>{paymentClick(e)})} class={`${gasContext.layout.overlay ? 'flex' : 'hidden'} justify-center items-center z-30 h-screen w-screen absolute top-0 left-0 bg-slate-400/75  backdrop-blur-md`}>
            <UserAlert/>
            <Payment/>
        </div>
    )
})