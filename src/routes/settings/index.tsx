import { component$,useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { GasContext } from '~/root';
// import { Link } from '@builder.io/qwik-city';

// darkMode: false,
//       noOfPumps: 4,
//       metric: false,
//       taxRate: .07


export default component$(() => {

  const gasContext = useContext(GasContext)

  return (
    <div class='flex flex-col rounded-3xl bg-white mr-4 xl:mr-8 w-full'>
      <div>
        <label for="darkMode">Dark Mode</label>
        <input id='darkMode' type="checkbox" />
      </div>
      <div>
        <label for="metric">Metric Measurements</label>
        <input id='metric' type="checkbox" />
      </div>
      <div>
        <label for='noOfPumps'>Number of Pumps</label>
        <input id='noOfPumps' type="text" value={gasContext.settings.noOfPumps}/>
      </div>
      <div>
        <label for='taxRate'>Tax Rate</label>
        <input id='taxRate' type="text" value={gasContext.settings.taxRate}/>
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
