import { component$, useContext, $} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import { Link } from '@builder.io/qwik-city';
// import { GasSvg } from '../components/icons/gasPump'
import GasItem from '~/components/home-components/GasItem';
import { ClearSvg } from '../components/icons/clear'
import PieChart from '../components/charts/pieChart'
import BarChart from '~/components/charts/barChart';
import { GasContext }  from '~/root';

export default component$(() => {
  const gasContext = useContext(GasContext)

  // const darkMode = settingsContext.darkMode
  // @TODO add a pump selection buttons maybe up to 4? or 8?
  // @TODO put # of pumps in settings
  return (
    <div class='relative flex flex-row w-full justify-between'>
      <div class='flex flex-col rounded-3xl bg-white mr-4 xl:mr-8 w-4/6'>
        <GasItem class='mt-8 mb-4' fill='fill-unl-yellow' gasType={gasContext.gasTypes[0]}/>
        <GasItem class='' fill='fill-mid-green' gasType={gasContext.gasTypes[1]}/>
        <GasItem class='mt-4 mb-8' fill='fill-sup-blue' gasType={gasContext.gasTypes[2]}/>
        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4' >
          <p>Total Balance</p>
          <p class='font-bold'>{parseFloat((gasContext.total + gasContext.merchTotal).toFixed(2))}$</p>
        </div>

        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4'>
          <p >Discount</p>
          <p class='font-bold text-unl-yellow'>{gasContext.discount ? gasContext.discount : '0.00'}$</p>
        </div>

        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 m-8'>
          {/* @TODO if balance is zero grey out confirm button or something */}
          <button onClick$={$(()=>gasContext.layout.overlay = true)} class='flex h-10 mr-4 w-full justify-center items-center border-2 bg-mid-green rounded-xl border-mid-green text-white' >Confirm</button>
          <button onClick$={$(()=>{gasContext.gasTypes.forEach(type=>{type.qty = 0}), gasContext.total = 0, gasContext.merchTotal = 0, gasContext.discount = 0})} class='flex h-10 ml-4 w-full justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>
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

export const head: DocumentHead = {
  title: 'GasPos | Fuel',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
