import { component$, $,useContext} from "@builder.io/qwik";
import { GasContext } from "~/root";
import Loader from "../icons/loader";
import { uid } from 'uid'

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
            if(gasContext.foodTypes.length > 0){
                console.log(gasContext.foodTypes)
                gasContext.foodTypes.forEach(type=>{
                    if(type.qty){
                        type.qty = 0
                    }
                    if(!type.qty && type.sizes){
                        type.sizes.forEach(size=> size.qty = 0)
                    }
                })  
            }
                gasContext.orders.cart = []
                gasContext.total = 0
                gasContext.merchTotal = 0
            },timeout)
        }

        const saveTransaction = ()=>{
            const date = new Date()
            const parsedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
            // set current transaction data to be stored
            const newTransaction = {date:parsedDate,total:totalCharge,foodTotal:gasContext.merchTotal,tax:totalTax,items:gasContext.orders.cart,id:uid(8)}
            
            // retrieve localstorage data to manipulate
            const storedHistory = localStorage.getItem('orderHistory') ? JSON.parse(localStorage.getItem('orderHistory')) : []
            storedHistory.push(newTransaction)
            localStorage.setItem('orderHistory',JSON.stringify(storedHistory))
            gasContext.orders.history = storedHistory
        }

        if(gasContext.payment.card && totalCharge > 0){
        gasContext.payment.paymentProcessing = true
        setTimeout(()=>{
            gasContext.payment.paymentProcessing = false
            gasContext.layout.message = 'Payment Successful! 🎉'
            closeOverlay(2000)
            saveTransaction()
            updateTotals(2000)
        },6000)}
        
        if(!gasContext.payment.card && totalCharge > 0){
            gasContext.layout.message = 'Payment Successful! 🎉'
            closeOverlay(2000)
            saveTransaction()
            updateTotals(2000)
        }
        
    })

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class=' h-content p-8 w-content bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 rounded-3xl'>
            <div class='flex flex-row justify-between'>
                <button onClick$={$(()=>{gasContext.payment.card = true})} class={`${gasContext.payment.card ? 'bg-mid-green' : 'bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 hover:bg-mid-green hover:text-secondary-color dark:hover:bg-mid-green'} w-52 lg:w-60 xl:w-72 cursor-pointer flex justify-center items-center h-14 border-2  border-mid-green  transition-colors duration-300 dark:border-secondary-color rounded-xl`}>Card Sale</button>
                <button onClick$={$(()=>{gasContext.payment.card = false})} class={`${gasContext.payment.card! ? 'bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 hover:bg-mid-green hover:text-secondary-color dark:hover:bg-mid-green' : 'bg-mid-green'} w-52 lg:w-60 xl:w-72 cursor-pointer flex justify-center items-center h-14 border-2  border-mid-green  transition-colors duration-300  dark:border-secondary-color rounded-xl ml-2`}>Cash Sale</button>
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
                <button onClick$={$(()=>{confirmClick()})} class='flex justify-center items-center text-white bg-mid-green  h-14 px-5 rounded-xl w-3/4 mb-4' >{gasContext.payment.paymentProcessing ? <Loader/> : gasContext.payment.card ? 'Request Card Payment' : 'Confirm Cash Payment'}</button> 
                <button onClick$={$(()=>{gasContext.layout.overlay = ''})} class='text-mid-green border-mid-green hover:bg-mid-green border-2 hover:text-secondary-color h-14 px-5 rounded-xl w-3/4 dark:border-secondary-color  transition-colors duration-300 dark:text-secondary-color'>Cancel Transaction</button>
            </div>
        </div>
    )
})

