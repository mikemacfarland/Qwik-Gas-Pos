import { component$,useContext,$} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { GasContext } from '~/root';

export default component$(() => {

  const gasContext = useContext(GasContext)

  // LI Item inline component
  interface liItemProps{
    class?:string
    key:string
    order:[]
  }
  
  const log = $((item)=>console.log(item))

  const LiItem = ((props:liItemProps)=>{
    return(
      <li key={props.key} class={`${props.class} flex flex-row justify-between px-2`}>
        <button onClick$={()=>{(gasContext.layout.overlay = 'recieptSummary',gasContext.orders.oldOrder = props.order,log(props.order))}} 
        class='text-left cursor-pointer border-2 p-2 rounded-lg hover:bg-mid-green hover:text-secondary-color transition-colors duration-300'>{props.order.id}</button>
        <p class='text-center p-2'>{props.order.date}</p>
        <p class='text-right p-2'>{props.order.total}</p>
      </li>
      )
  })
  

  return (
    <div class='flex flex-col rounded-3xl bg-secondary-color dark:bg-slate-400 transition-colors duration-300  lg:text-lg mr-4 xl:mr-8 py-8 px-8 w-full'>
      <ul class='w-full space-y-4'>
        <li class='flex flex-row h-14 items-center text-lg justify-between mb-4 border-2 px-4 rounded-lg font-bold'>
          <p class='text-left w-1/4'>Transaction ID</p>
          <p class='text-center w-auto'>Date</p>
          <p class='text-right w-1/4'>Total</p>
        </li>
        {gasContext.orders.history.length > 0 ?
          gasContext.orders.history.map((order)=>{
            return (
              <LiItem key={order.id} order={order}/>
            )
          }) : <li class='flex items-center justify-center h-14'><p>No data here, create some orders to view data!</p></li>
        }
      </ul>
    </div>
  )
})



export const head: DocumentHead = {
  title: 'GasPos | Settings',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};