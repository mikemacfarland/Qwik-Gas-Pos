import { component$, useStore, $,useContext} from "@builder.io/qwik";
import { GasContext } from "~/root";
import Loader from "../icons/loader";

export default component$(()=>{
    const gasContext = useContext(GasContext)

    const totalTax = parseFloat((gasContext.merchTotal * gasContext.settings.taxRate).toFixed(2))

    const confirmClick = $(()=>{
        
        const  closeOverlay = (timeout:number)=>{setTimeout(()=>{
                gasContext.layout.overlay = false 
                gasContext.layout.message = null
            },timeout)}

        if(gasContext.payment.card){
        gasContext.payment.paymentProcessing = true
        setTimeout(()=>{
            gasContext.payment.paymentProcessing = false
            gasContext.layout.message = 'Payment Successful! 🎉'
        },6000)}
            
        closeOverlay(8000)
        
        if(!gasContext.payment.card){
            gasContext.layout.message = 'Payment Successful! 🎉'
            closeOverlay(2000)
        }
        
    })

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class=' h-content p-8 w-1/2 bg-white rounded-3xl'>
            <div class='flex flex-row justify-between'>
                <div onClick$={$(()=>{gasContext.payment.card = true})} class={`${gasContext.payment.card ? 'bg-mid-green' : 'bg-white'} cursor-pointer flex justify-center items-center h-14 w-1/2 border-2 border-mid-green rounded-xl mr-1`}>Card Sale</div>
                <div onClick$={$(()=>{gasContext.payment.card = false})} class={`${gasContext.payment.card! ? 'bg-white' : 'bg-mid-green'} cursor-pointer flex justify-center items-center h-14 w-1/2 border-2 border-mid-green rounded-xl ml-1`}>Cash Sale</div>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Gas</p>
                <p>{gasContext.total}</p>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Merchandise</p>
                <p>{gasContext.merchTotal}</p>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Tax</p>
                <p>{totalTax}</p>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Total Charge</p>
                <p>{parseFloat((gasContext.total + gasContext.merchTotal + totalTax).toFixed(2))}</p>
            </div>
            <div class='flex flex-col justify-center items-center'>
                { gasContext.payment.card ? 
                <button onClick$={$(()=>{confirmClick()})} class='flex justify-center items-center text-white bg-mid-green h-14 px-5 rounded-xl w-3/4 mb-4' >{gasContext.payment.paymentProcessing ? <Loader/> : 'Request Card Payment'}</button> : 
                <button onClick$={$(()=>{confirmClick()})} class='text-white bg-mid-green h-14 px-5 rounded-xl w-3/4 mb-4' >Confirm Cash Payment</button>}
                <button onClick$={$(()=>{gasContext.layout.overlay = false})} class='text-white text-mid-green border-mid-green border-2 h-14 px-5 rounded-xl w-3/4'>Cancel Transaction</button>
            </div>
        </div>
    )
})

