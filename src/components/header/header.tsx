import { component$, JSXNode} from '@builder.io/qwik';
import { Settings } from '../icons/settings'
import { Food } from '../icons/food'
import { GasSvg } from '../icons/gasPump';
import { User } from '../icons/user'
import { Help } from '../icons/help'

export default component$(() => {

  return (
    <header class='flex flex-col h-screen items-center mt-8 mb-8 ml-8'>
      <div class='rounded-2xl'>
        <h1 class='w-11/12 font-bold text-4xl text-center mb-6'>Gas Pos System</h1>
      </div>
      <ul class='w-full'>
        <li class='h-14 mb-8'>
          <AnchorItem content='Fuel' icon={<GasSvg fill='#63c99e' height='16px' width='16px'/>} linkto='/'/>
        </li>
        <li class='h-14 mb-8'>
          <AnchorItem content='Food & Drinks' icon={<Food/>} linkto='/food-drinks'/>
        </li>
        <li class='h-14 mb-8'>
          <AnchorItem content='Settings' icon={<Settings/>} linkto='/settings'/>
        </li>
      </ul>
      <div class='flex flex-row justify-left items-center h-20 w-full mb-8'>
        <a href="/" class='flex flex-col justify-center items-center h-20 w-20 border-2 rounded-2xl'> 
          <Help/>
          <p>Help</p> 
        </a>
        <div class='ml-8'>
          <p class='text-slate-400'>Last sync</p>
          <div class='flex flex-row items-center'>
            <div class='w-3 h-3 rounded-full bg-mid-green mr-2'></div>
            <p>1 Min ago</p>
          </div>
        </div>
      </div>
      <div class='h-14 w-full'>
        <AnchorItem content='Cashier - name'  icon={<User/>} linkto='/'/>
      </div>
    </header>
  );
  
});

interface linkProps{
  linkto:string,
  content:string,
  icon:JSXNode
}

export const AnchorItem = ((props:linkProps)=>{
  return(
      <a class='flex flex-row w-full h-full justify-between items-center p-5 font-bold bg-white rounded-2xl' href={props.linkto}>
        {props.content}
        {props.icon}
      </a>
  )
})
