import { component$, 
  // useStylesScoped$
 } from '@builder.io/qwik';
import { Content } from '@builder.io/qwik-city';

export default component$(() => {

  return (
    <header class='flex flex-col h-screen items-center'>
      <div class='rounded-2xl'>
        <h1 class='w-11/12 font-bold text-4xl text-center mt-8 mb-6'>Gas Pos System</h1>
      </div>
      <ul class='w-11/12'>
        <li class='h-14 mb-8'>
          <AnchorItem content='Fuel' linkto='/'/>
        </li>
        <li class='h-14 mb-8'>
          <AnchorItem content='Food & Drinks' linkto='/food-drinks'/>
        </li>
        <li class='h-14 mb-8'>
          <AnchorItem content='Settings' linkto='/settings'/>
        </li>
      </ul>
      <div class='h-14 w-11/12 mb-8'>
        sync status
      </div>
      <div class='h-14 w-11/12'>
        <AnchorItem content='Cashier - name' linkto='/'/>
      </div>
    </header>
  );
  
});

interface linkProps{
  linkto:string,
  content:string
}

export const AnchorItem = ((props:linkProps)=>{
  return(
      <a class='flex w-full h-full justify-center items-center bg-white rounded-2xl' href={props.linkto}>
        {props.content}
      </a>
  )
})
