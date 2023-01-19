import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import Overlay from '~/components/overlays/overlay';
import Alert from '~/components/shared/alert';

export default component$(() => {
  return (
    <>
      <main class='flex flex-col lg:flex-row justify-center my-4 mx-4 2xl:w-5/6 2xl:mx-auto'>
        <Overlay/>
        <Alert/>
        <section class='lg:mr-4 xl:mr-8'>
          <Header/>
        </section>
        <section class='lg:w-4/5'>
          <Slot />
        </section>
      </main>
    </>
  );
});
