import { component$, $,useContext} from "@builder.io/qwik";
import { GasContext } from "~/root";
import Loader from "../icons/loader";

export default component$(()=>{
    const gasContext = useContext(GasContext)

    const totalTax = gasContext.tax.toFixed(2)

    const totalCharge = (gasContext.total + gasContext.tax + gasContext.merchTotal).toFixed(2)

    const confirmClick = $(()=>{
        
        const  closeOverlay = (timeout:number)=>{setTimeout(()=>{
                gasContext.layout.overlay = '' 
                gasContext.layout.message = null
            },timeout)}
        const updateTotals = (timeout:number)=>{
            setTimeout(()=>{
            gasContext.gasTypes.forEach((type)=>{
               type.stock = type.stock - type.qty
               type.qty = 0
               type.pump = 0
            })
            gasContext.foodTypes.map((type)=>{
                type.qty ? type.qty = 0 : type.sizes.forEach(size=> size.qty = 0)
            })
            gasContext.orders.cart = []
            gasContext.total = 0
            gasContext.merchTotal = 0
            },timeout)
        }

        if(gasContext.payment.card && totalCharge > 0){
        gasContext.payment.paymentProcessing = true
        setTimeout(()=>{
            gasContext.payment.paymentProcessing = false
            gasContext.layout.message = 'Payment Successful! 🎉'
            closeOverlay(2000)
            updateTotals(2000)
        },6000)}
        
        if(!gasContext.payment.card && totalCharge > 0){
            gasContext.layout.message = 'Payment Successful! 🎉'
            closeOverlay(2000)
            updateTotals(2000)
        }
        
    })

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class=' h-content p-8 w-1/2 bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 rounded-3xl'>
            <div class='flex flex-row justify-between'>
                <div onClick$={$(()=>{gasContext.payment.card = true})} class={`${gasContext.payment.card ? 'bg-mid-green' : 'bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} cursor-pointer flex justify-center items-center h-14 w-1/2 border-2  border-mid-green  transition-colors duration-300 dark:border-secondary-color rounded-xl mr-1`}>Card Sale</div>
                <div onClick$={$(()=>{gasContext.payment.card = false})} class={`${gasContext.payment.card! ? 'bg-secondary-color  transition-colors duration-300 dark:bg-slate-400' : 'bg-mid-green'} cursor-pointer flex justify-center items-center h-14 w-1/2 border-2  border-mid-green  transition-colors duration-300 dark:border-secondary-color rounded-xl ml-1`}>Cash Sale</div>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Gas</p>
                <p>{gasContext.total.toFixed(2)}</p>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Merchandise</p>
                <p>{gasContext.merchTotal.toFixed(2)}</p>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Tax</p>
                <p>{parseFloat(totalTax).toFixed(2)}</p>
            </div>
            <div class='flex flex-row justify-between px-8 my-6'>
                <p>Total Charge</p>
                <p>{totalCharge}</p>
            </div>
            <div class='flex flex-col justify-center items-center'>
                <button onClick$={$(()=>{confirmClick()})} class='flex justify-center items-center text-white bg-mid-green h-14 px-5 rounded-xl w-3/4 mb-4' >{gasContext.payment.paymentProcessing ? <Loader/> : gasContext.payment.card ? 'Request Card Payment' : 'Confirm Cash Payment'}</button> 
                <button onClick$={$(()=>{gasContext.layout.overlay = ''})} class='text-mid-green border-mid-green border-2  h-14 px-5 rounded-xl w-3/4 dark:border-secondary-color  transition-colors duration-300 dark:text-secondary-color'>Cancel Transaction</button>
            </div>
        </div>
    )
})

