import { component$, useContext} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import GasItem from '~/components/home-components/GasItem';
import PieChart from '../components/charts/pieChart'
import BarChart from '~/components/charts/barChart';
import PaymentConfirmation from '~/components/shared/paymentConfirmation';
import { GasContext }  from '~/root';

export default component$(() => {
  const gasContext = useContext(GasContext)

  return (
    <div class='relative flex flex-row w-full justify-between'>
      <div class='flex flex-col rounded-3xl bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 mr-4 xl:mr-8 w-4/6'>
        <GasItem class='mt-4 mb-4' fill='fill-unl-yellow' gasType={gasContext.gasTypes[0]}/>
        <GasItem class='' fill='fill-mid-green' gasType={gasContext.gasTypes[1]}/>
        <GasItem class='mt-4 mb-8' fill='fill-sup-blue' gasType={gasContext.gasTypes[2]}/>
        <div class='flex flex-row justify-end'>
          <button onClick$={()=>{gasContext.layout.overlay = 'true',gasContext.layout.overlay = 'cart'}} class='w-1/3 h-10 rounded-xl text-white bg-mid-green mx-8'>View cart</button>
        </div>
        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4' >
          <p>Total Balance</p>
          <p class='font-bold'>{parseFloat((gasContext.total + gasContext.merchTotal).toFixed(2))}$</p>
        </div>

        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4'>
          <p >Discount</p>
          <p class='font-bold text-unl-yellow'>{gasContext.discount ? gasContext.discount : '0.00'}$</p>
        </div>
        <PaymentConfirmation/>
      </div>

      <div class='flex flex-col justify-between rounded-3xl w-2/6'>
        <div class='flex flex-col justify-center items-center rounded-3xl bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 w-full h-content md:mb-4 xl:mb-8'>
          {/* pie chart */}
          <PieChart/>
        </div>
        
        <div class='rounded-3xl bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 w-full h-2/5'>
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
