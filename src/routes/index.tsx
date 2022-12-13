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
      <div class='flex flex-col rounded-3xl bg-white mr-4 xl:mr-8 w-4/6'>
        <GasItem class='mt-8 mb-4' fill='unl-yellow' gasType={gasContext.gasTypes[0]}/>
        <GasItem class='' fill='mid-green' gasType={gasContext.gasTypes[1]}/>
        <GasItem class='mt-4 mb-8' fill='sup-blue' gasType={gasContext.gasTypes[2]}/>
        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4' >
          <p>Total Pay</p>
          <p class='font-bold'>{gasContext.total ? gasContext.total : '0.00'}$</p>
        </div>

        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4'>
          <p >Discount</p>
          <p class='font-bold text-unl-yellow'>{gasContext.discount ? gasContext.discount : '0.00'}$</p>
        </div>

        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 m-8'>
          <button class='flex h-10 mr-4 w-full justify-center items-center border-2 bg-mid-green rounded-xl border-mid-green text-white' >Confirm</button>
          <button  onClick$={$(()=>{gasContext.gasTypes.forEach(type=>{type.qty = 0}), gasContext.total = 0, gasContext.discount = 0})} class='flex h-10 ml-4 w-full justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>
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
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
