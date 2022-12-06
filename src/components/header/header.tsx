import { component$, 
  // useStylesScoped$
 } from '@builder.io/qwik';

export default component$(() => {

  return (
    <header class='flex flex-col h-screen items-center'>
      <div class='rounded-2xl'>
        <h1 class='w-11/12 font-bold text-4xl text-center mt-4 mb-6'>Gas Pos System</h1>
      </div>
      <ul class='w-11/12'>
        <li class='h-14 bg-white'>
          <a href='/'>
            Fuel
          </a>
        </li>
        <li class='h-14 bg-white'>
          <a href='/food-drinks'>
            Food & Drinks
          </a>
        </li>
        <li class='h-14 bg-white'>
          <a href='/settings'>
            Settings
          </a>
        </li>
      </ul>
      <div class='h-14 w-11/12 bg-white'>
        sync status
      </div>
      <div class='h-14 w-11/12 bg-white'>
        Cashier
      </div>
    </header>
  );
});
