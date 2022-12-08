import { component$, useContext, $} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import { Link } from '@builder.io/qwik-city';
// import { GasSvg } from '../components/icons/gasPump'
import GasItem from '~/components/home-components/GasItem';
import { ClearSvg } from '../components/icons/clear'
import PieChart from '../components/charts/pieChart'
import BarChart from '~/components/charts/barChart';
import { GasContext }  from '~/root';
// im

export default component$(() => {
  const gasContext = useContext(GasContext)

  // const darkMode = settingsContext.darkMode
  // @TODO add a pump selection buttons maybe up to 4? or 8?
  // @TODO put # of pumps in settings
  return (
    <div class='flex flex-row w-full justify-between'>
      <div class='flex flex-col rounded-3xl bg-white mr-8 w-4/6'>
        <GasItem mt='mt-8' mb='mb-4' fill='#fcc482' gasType={gasContext.gasTypes[0]}/>
        <GasItem mt='' mb='' fill='#63c993' gasType={gasContext.gasTypes[1]}/>
        <GasItem mt='mt-4' mb='mb-8' fill='#6492ec' gasType={gasContext.gasTypes[2]}/>
        <div class='flex flex-row justify-between mx-8 my-4'>
          <p>Total Pay</p>
          <p class='font-bold'>{gasContext.total ? gasContext.total : '0.00'}$</p>
        </div>

        <div class='flex flex-row justify-between mx-8 my-4'>
          <p >Discount</p>
          <p class='font-bold text-unl-yellow'>{gasContext.discount ? gasContext.discount : '0.00'}$</p>
        </div>

        <div class='flex flex-row justify-between m-8'>
          <button class='flex h-10 mr-4 w-full justify-center items-center border-2 bg-mid-green rounded-xl border-mid-green text-white' >Confirm</button>
          <button  onClick$={$(()=>{gasContext.discount = 0.00, gasContext.total = 0.00})} class='flex h-10 ml-4 w-full justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>
            <ClearSvg/>
            <p class='ml-2'>Clear</p>
          </button>
        </div>
      </div>

      <div class='flex flex-col justify-between rounded-3xl w-2/6'>
        <div class='flex flex-col justify-center items-center rounded-3xl bg-white w-full h-content mb-8'>
          {/* pie chart */}
          <PieChart/>
        </div>
        
        <div class='rounded-3xl bg-white w-full h-2/5'>
          {/*  bar chart */}
          <BarChart/>
        </div>  
      </div>
    </div>
  );
});

// interface gasItemProps{
//   mt: string
//   mb: string
//   fill: string
//   qty: number
//   gasType: string
//   gasOctane: number
// }

// export const GasItem = ((props: gasItemProps)=>{

//  return(
//   <div class={`flex flex-row justify-between items-center mx-8 ${props.mt ? props.mt : ''} ${props.mb ? props.mb : ''} p-4 border-2 rounded-xl`}>
//         <GasSvg fill={props.fill} height='100%' width='40px'/>
//         <div class='flex flex-col w-1/4'>
//           <p class='font-bold text-3xl'>{props.gasOctane}</p>
//           <p class='text-slate-400'>{props.gasType}</p>
//         </div>
//         <div class='flex flex-row items-center'>
//           <button class='flex w-10 h-10 justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>-</button>
//           <p class='flex justify-center items-center font-bold text-xl mx-4'>{props.qty}</p>
//           <button class='flex w-10 h-10 justify-center items-center bg-mid-green border-2 rounded-xl border-mid-green text-white'>+</button>
//         </div>
//       </div>
//  )
// })



export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
