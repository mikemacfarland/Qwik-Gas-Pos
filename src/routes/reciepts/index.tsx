import { component$,useContext} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { GasContext } from '~/root';

export default component$(() => {

  const gasContext = useContext(GasContext)

  // LI Item inline component
  interface liItemProps{
    class?:string
    item1:string
    item2:string
    item3:string
    key?:string
  }
  
  const LiItem = ((props:liItemProps)=>{
    return(
      <li key={props.key} class={`${props.class} grid grid-cols-3 `}>
        <div class='text-left'>{props.item1}</div>
        <div class='text-center'>{props.item2}</div>
        <div class='text-right'>{props.item3}</div>
      </li>
      )
  })
  

  return (
    <div class='flex flex-col space-y-4 rounded-3xl bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 mr-4 xl:mr-8 py-8 px-8 font-bold w-full'>
      <ul class='w-full'>
        <LiItem class='mb-4 border-' item1='Transaction ID' item2='Date' item3='Total'/>
        {
          gasContext.orders.history.map((order)=>{
            return (
              <LiItem key={order.id} item1={order.id} item2={order.date} item3={order.total}/>
            )
          })
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