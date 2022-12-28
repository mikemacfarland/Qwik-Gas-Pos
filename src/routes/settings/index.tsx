import { component$,useContext,$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { GasContext } from '~/root';
// import { Link } from '@builder.io/qwik-city';

// darkMode: false,
//       noOfPumps: 4,
//       metric: false,
//       taxRate: .07


export default component$(() => {

  const gasContext = useContext(GasContext)

  const changePumps = $((e)=>{
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  })



  return (
    <div class='flex flex-col rounded-3xl bg-white mr-4 xl:mr-8 py-8 px-8 font-bold w-full'>
      <div class='flex flex-row justify-between w-1/3 mb-3'>
        <label for="darkMode">Dark Mode</label>
        <input id='darkMode' type="checkbox" />
      </div>
      <div class='flex flex-row justify-between w-1/3 mb-3'>
        <label for='noOfPumps'>Number of Pumps</label>
        <input class='w-8' onKeyUp$={$((e)=>{changePumps(e)})} onChange$={$((e)=>{gasContext.settings.noOfPumps = e.target.value})} id='noOfPumps' type="text" value={gasContext.settings.noOfPumps} pattern='[0-9]+'/>
      </div>
      <div class='flex flex-row justify-start w-1/3'>
        <label class='mr-auto' for='taxRate'>Tax Rate</label>
        <input class='w-8' onKeyUp$={$((e)=>{changePumps(e)})} onChange$={$((e)=>{gasContext.settings.taxRate = e.target.value})} id='taxRate' type="text" value={gasContext.settings.taxRate}/><p>%</p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'GasPos | Settings',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
