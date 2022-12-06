import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <main class='flex flex-row justify-between bg-neutral-100'>
        <section class='w-1/5 border-2 border-solid border-red-500'>
          <Header />
        </section>
        <section class='w-3/4 m-8 rounded-3xl bg-white'>
          <Slot />
        </section>
      </main>
    </>
  );
});
