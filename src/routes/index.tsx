import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import { Link } from '@builder.io/qwik-city';
import { GasSvg } from '../img/gasPump'

export default component$(() => {
  return (
    <div class='flex flex-col'>
      <GasItem fill='#fcc482'/>
      <GasItem fill='#63c993'/>
      <GasItem fill='#6492ec'/>
      <div class='flex-row'>
        <p>Total Pay</p>
        <p>$125.98</p>
      </div>

      <div class='flex-row'>
        <p>Discount</p>
        <p>$3.13</p>
      </div>

      <div class='flex-row'>
        <button>Confirm</button>
        <button>
          <img src="" alt="" />
          Clear  
        </button>
      </div>
    </div>
  );
});

interface gasItemProps{
  fill: string
}

export const GasItem = ((props: gasItemProps)=>{
 return(
  <div class='flex-row'>
        <GasSvg fill={props.fill}/>
        <div class='flex flex-col'>
          <p>87</p>
          <p>UNLEADED</p>
        </div>
        <div class='flex flex-row'>
          <button>-</button>
          <p>0</p>
          <button>+</button>
        </div>
      </div>
 )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
