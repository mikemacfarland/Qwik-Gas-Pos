import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      user
    </div>
  );
});

export const head: DocumentHead = {
  title: 'GasPos | UserPage',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
