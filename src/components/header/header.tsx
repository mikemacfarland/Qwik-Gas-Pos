import { component$, JSXNode,} from '@builder.io/qwik';
import { Link, useLocation} from '@builder.io/qwik-city';
import { Settings } from '../icons/settings'
import { FoodSvg } from '../icons/food'
import { GasSvg } from '../icons/gasPump';
// import { User } from '../icons/user'
import { Help } from '../icons/help'

export default component$(() => {

  const checkPath = (path:string)=>{
    // useLocation() is Qwiks api for  window.location and returns a similar object
    const location = useLocation()
    return location.pathname === path ? true : false
  } 

  return (
    <header class='flex flex-row flex-wrap lg:flex-nowrap lg:flex-col lg:h-full items-center'>
        <h1 class='align-middle font-bold text-4xl text-center  lg:mb-6 md:mr-auto'>Gas Pos System</h1>
      <ul class='lg:w-full flex md:flex-row lg:flex-col'>
        <li class='h-14 lg:mb-8 mr-4 lg:mr-0'>
          <AnchorItem content='Fuel' class={checkPath('/')  ? 'bg-mid-green text-white fill-white' : 'text-black bg-white'} icon={<GasSvg class='fill-inherit h-4 w-4 ml-2'/>} linkto='/'/>
        </li>
        <li class='h-14 lg:mb-8 md:mr-4 lg:mr-0'>
          <AnchorItem content='Food/Drinks' class={checkPath('/food-drinks/')  ? 'bg-mid-green text-white fill-white' : 'text-black bg-white'} icon={<FoodSvg class='fill-inherit h-4 w-4 ml-2'/>} linkto='/food-drinks'/>
        </li>
        <li class='h-14 lg:mb-8'>
          <AnchorItem content='Settings' class={checkPath('/settings/')  ? 'bg-mid-green text-white fill-white' : 'text-black bg-white'} icon={<Settings class='fill-inherit h-4 w-4 ml-2'/>} linkto='/settings'/>
        </li>
      </ul>
      <div class='flex flex-row justify-left items-center h-20 md:mr-auto md:w-1/2 lg:w-full lg:mb-8'>
        <a href="/" class='flex flex-col justify-center items-center h-16 w-16 lg:h-20 lg:w-20 border-2 rounded-2xl'> 
          <Help/>
          <p>Help</p> 
        </a>
        <div class='md:ml-4 lg:ml-8 flex flex-col justify-center'>
          <p class='text-slate-400'>Last sync</p>
          <div class='flex flex-row items-center'>
            <div class='w-3 h-3 rounded-full bg-mid-green mr-2'></div>
            <p>1 Min ago</p>
          </div>
        </div>
      </div>
      {/* <div class='h-14 w-content lg:w-full'>
        <AnchorItem content='Cashier - name' class={checkPath('/user/')  ? 'bg-mid-green text-white fill-white' : 'text-black bg-white'} icon={<User class='ml-4 w-4 h-4 fill-inherit'/>} linkto='/user'/>
      </div> */}
    </header>
  );
  
});

interface linkProps{
  linkto:string,
  content:string,
  icon:JSXNode
  class: string
}

export const AnchorItem = ((props:linkProps)=>{
  return(
      <Link class={`flex flex-row w-full h-full justify-between items-center font-bold rounded-2xl px-4 hover:bg-mid-green hover:text-white fill-mid-green hover:fill-white ${props.class}`} href={props.linkto}>
        {props.content}
        {props.icon}
      </Link>
  )
})
