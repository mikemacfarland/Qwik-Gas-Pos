import { component$, JSXNode, useContext,} from '@builder.io/qwik';
import { Link, useLocation} from '@builder.io/qwik-city';
import { Settings } from '../icons/settings'
import { FoodSvg } from '../icons/food'
import { GasSvg } from '../icons/gasPump';
// import { User } from '../icons/user'
import { HelpSvg } from '../icons/help'
import { MoneySvg } from '../icons/money';
import { GasContext } from '~/root';


export default component$(() => {

  const gasContext = useContext(GasContext)
  const checkPath = (path:string)=>{
    // useLocation() is Qwiks api for  window.location and returns a similar object
    const location = useLocation()
    return location.pathname === path ? true : false
  }

  return (
    <header class='flex flex-row flex-wrap lg:flex-nowrap lg:flex-col lg:h-full items-center space-y-4 mb-4'>
        <h1 class='order-1 w-full align-middle font-bold text-4xl text-center  md:mr-auto'>Gas Pos System</h1>

      <ul class='order-last w-full flex flex-row lg:flex-col justify-between space-x-4 lg:space-x-0 lg:space-y-4'>
        <li class='h-14 w-1/4 md:w-full'>
          <AnchorItem content='Fuel' class={checkPath('/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<GasSvg class='fill-inherit h-4 w-4 '/>} linkto='/'/>
        </li>
        <li class='h-14 w-1/4 md:w-full'>
          <AnchorItem content='Food/Drinks' class={checkPath('/food-drinks/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<FoodSvg class='fill-inherit h-4 w-4 '/>} linkto='/food-drinks'/>
        </li>
        <li class='h-14 w-1/4 md:w-full'>
          <AnchorItem content='Reciepts' class={checkPath('/reciepts/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<MoneySvg class='fill-inherit h-4 w-4 '/>} linkto='/reciepts'/>
        </li>
        <li class='h-14 w-1/4 md:w-full'>
          <AnchorItem content='Settings' class={checkPath('/settings/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<Settings class='fill-inherit h-4 w-4 '/>} linkto='/settings'/>
        </li>
      </ul>
      <div class='order-2 justify-center text-sm flex flex-row  lg:justify-between  items-center h-content md:mr-auto  w-full mb-4 lg:mb-8 '>
        {/* help button */}
        <button onClick$={()=>gasContext.layout.overlay = 'help'}
        class='flex flex-col mr-4 justify-center items-center h-14 w-14 lg:h-16 lg:w-16 border-2  border-slate-300 rounded-2xl bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'> 
          <HelpSvg/>
          <p>Help</p> 
        </button>
        {/* sync div */}
        <div class='flex flex-col justify-center border-2  border-slate-300 rounded-2xl h-14 lg:h-16 px-4 bg-nuetral-100'>
          <p class='text-slate-400'>Last sync</p>
          <div class='flex flex-row items-center'>
            <div class='w-3 h-3 rounded-full bg-mid-green mr-2'></div>
            <p>1 min ago</p>
          </div>
        </div>
      </div>
      
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
      <Link class={`flex flex-row w-full h-full justify-between items-center font-bold rounded-2xl px-4 hover:bg-mid-green dark:hover:bg-mid-green hover:text-white fill-mid-green  transition-colors duration-300 dark:fill-secondary-color hover:fill-white ${props.class}`} href={props.linkto}>
        {props.content}
        {props.icon}
      </Link>
  )
})
