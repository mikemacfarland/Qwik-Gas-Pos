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
    <header class='flex flex-row flex-wrap lg:flex-nowrap lg:flex-col lg:h-full items-center'>
        <h1 class='align-middle font-bold text-4xl text-center  lg:mb-6 md:mr-auto'>Gas Pos System</h1>
      <ul class='lg:w-full flex md:flex-row lg:flex-col'>
        <li class='h-14 lg:mb-8 mr-4 lg:mr-0'>
          <AnchorItem content='Fuel' class={checkPath('/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<GasSvg class='fill-inherit h-4 w-4 ml-2'/>} linkto='/'/>
        </li>
        <li class='h-14 lg:mb-8 md:mr-4 lg:mr-0'>
          <AnchorItem content='Food/Drinks' class={checkPath('/food-drinks/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<FoodSvg class='fill-inherit h-4 w-4 ml-2'/>} linkto='/food-drinks'/>
        </li>
        <li class='h-14 lg:mb-8 md:mr-4 lg:mr-0'>
          <AnchorItem content='Reciepts' class={checkPath('/reciepts/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<MoneySvg class='fill-inherit h-4 w-4 ml-2'/>} linkto='/reciepts'/>
        </li>
        <li class='h-14 lg:mb-8'>
          <AnchorItem content='Settings' class={checkPath('/settings/')  ? 'bg-mid-green text-secondary-color fill-secondary-color' : ' bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<Settings class='fill-inherit h-4 w-4 ml-2'/>} linkto='/settings'/>
        </li>
      </ul>
      <div class='text-sm flex flex-row md:justify-start lg:justify-between  items-center h-content md:mr-auto md:w-1/2 lg:w-full mb-4 lg:mb-8 '>
        {/* help button */}
        <button onClick$={()=>gasContext.layout.overlay = 'help'}
        class='flex flex-col md:mr-4 justify-center items-center h-14 w-14 lg:h-16 lg:w-16 border-2  border-slate-300 rounded-2xl bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'> 
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
      {/* <div class='h-14 w-content lg:w-full'>
        <AnchorItem content='Cashier - name' class={checkPath('/user/')  ? 'bg-mid-green text-white fill-white' : 'text-black bg-secondary-color  transition-colors duration-300 dark:bg-slate-400'} icon={<User class='ml-4 w-4 h-4 fill-inherit'/>} linkto='/user'/>
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
      <Link class={`flex flex-row w-full h-full justify-between items-center font-bold rounded-2xl px-4 hover:bg-mid-green dark:hover:bg-mid-green hover:text-white fill-mid-green  transition-colors duration-300 dark:fill-secondary-color hover:fill-white ${props.class}`} href={props.linkto}>
        {props.content}
        {props.icon}
      </Link>
  )
})
