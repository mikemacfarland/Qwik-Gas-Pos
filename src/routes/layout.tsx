import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import Overlay from '~/components/overlays/overlay';

export default component$(() => {
  return (
    <>
      <main class='flex flex-col lg:flex-row justify-between m-4 xl:m-8'>
        <Overlay/>
        <section class='lg:mr-4 xl:mr-8'>
          <Header />
        </section>
        <section class='lg:w-4/5'>
          <Slot />
        </section>
      </main>
    </>
  );
});
