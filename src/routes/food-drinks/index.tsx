import { component$,useContext ,$, useStore} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import FoodItem from '~/components/food-drinkp-components/foodItem';
import { GasContext } from '~/root';
import { ClearSvg } from '~/components/icons/clear';
import { DownSvg } from '~/components/icons/down';
// import { Link } from '@builder.io/qwik-city';


// @TODO items to add here items to select
//  fountain drinks | sm | md | lg
//  breakfast sandwich
//  pizza slices
//  hot dog 
//  misc food item - customizable name  

export default component$(() => {
  const gasContext = useContext(GasContext)

  const foodStore = useStore({
    createItem:false,
    dropdown:false,
    editItems: false,
    types:['Pizza','Coffee','Hot Dog','Bkfst','Salad','Misc','Soda','Coffee'],
    newItem:{name:'',type:'',price:'',qty:0}
  })

  const createItem = $(()=>{
    // ISSUE SOLVED - shallow copy of foodstore.item was causing gasContext.foodtypes to use same reference for every object in array
    // use spread opperator to make a copy with no reference to original.
    // const newItem = JSON.parse(JSON.stringify(foodStore.newItem))
    gasContext.foodTypes.push({...foodStore.newItem})
    foodStore.newItem = {name:'',type:'',price:'',qty:0}
    foodStore.createItem = false
  })

  return (
    <div class='relative flex flex-row w-full justify-between'>
      <div class='flex flex-col rounded-3xl bg-white mr-4 xl:mr-8 w-4/6'>
        <div>
          <div class='md:my-4'>
          {gasContext.foodTypes.map((type)=>{
            return(
              <FoodItem key={type.name + type.price} type={type.type} class='h-10' name={type.name} price={type.price} qty={type.qty}/>
            )
          })}
          </div>


          <div class={`${foodStore.createItem? 'hidden' : 'flex'} flex-row justify-start mx-4 my-4`}>
            <button onClick$={()=>foodStore.createItem = true} class='w-1/3 h-10 rounded-xl text-white bg-mid-green'>Create Item</button>
            <button onClick$={()=>foodStore.editItems ? foodStore.editItems = false : foodStore.editItems = true} class='block ml-8  h-10 rounded-xl text-mid-green w-1/3 border-2 border-mid-green bg-white'>Edit Items</button>
          </div>
          {/* Create item section */}
          {/* @TODO put create item and edit items inside the same container as create item dialog, refactor */}
          {/* @TODO when item is added make sure fields are filled out with unique name that isnt in store already */}
          <div class={` ${foodStore.createItem? 'flex' : 'hidden'} flex-row justify-start md:m-4 lg:m-8 h-10`}>
            {/* @TODO make text dissapear when click into inputs */}
            <input onChange$={(e)=>{foodStore.newItem.name = e.target.value}} type="text" value='Name' class='mr-4'/>
            {/* @TODO price needs to be parsed in a function to make sure its a number */}
            <input onChange$={(e)=>{foodStore.newItem.price = e.target.value}} type="text" value='Price $' class='w-12 mr-auto' />

            <div class={`flex flex-col w-24 mr-2 border-2 border-mid-green rounded-xl cursor-pointer bg-white z-10 ${foodStore.dropdown ? 'h-fit' :'overflow-hidden h-10'}`}>
              <ul class='items-center justify-between w-full h-fit'> 
                <li onClick$={()=>{foodStore.dropdown ? foodStore.dropdown = false : foodStore.dropdown = true}} class='indent-2 flex flex-row justify-left items-center h-10 w-full'>
                  <p>{foodStore.newItem.type ? foodStore.newItem.type : 'Type'}</p>
                  <DownSvg class='ml-auto mr-2 fill-mid-green w-4 h-4'/>
                </li>
                {foodStore.types.map((type)=>{
                  return(
                  <li onClick$={$(()=>{foodStore.newItem.type = type, foodStore.dropdown = false})} class='indent-2 hover:bg-mid-green h-8'>{type}</li>
                  )
                })}
              </ul>
            </div>
            <button onClick$={()=>{foodStore.createItem = false, foodStore.newItem.name = '', foodStore.newItem.price = '', foodStore.newItem.type = ''}} class='h-10 w-10 border-2  border-mid-green rounded-xl text-mid-green'>x</button>
            <button onClick$={()=>createItem()} class='h-10 w-10  ml-2 bg-mid-green text-white rounded-xl'>+</button>
          </div>

          <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4' >
            <p>Total Balance</p>
            <p class='font-bold'>{parseFloat((gasContext.total + gasContext.merchTotal).toFixed(2))}$</p>
          </div>

          <div class='flex flex-row justify-between md:mx-4 lg:mx-8 my-4'>
            <p >Discount</p>
            <p class='font-bold text-unl-yellow'>{gasContext.discount ? gasContext.discount : '0.00'}$</p>
          </div>

        </div>
        {/* @TODO this div could be a reusable component to refactor */}
        <div class='flex flex-row justify-between md:mx-4 lg:mx-8 m-8'>
          <button onClick$={$(()=>gasContext.layout.overlay = true)} class='flex h-10 mr-4 w-full justify-center items-center border-2 bg-mid-green rounded-xl border-mid-green text-white' >Confirm</button>
          <button onClick$={$(()=>{gasContext.foodTypes.forEach(type=>{type.qty = 0}), gasContext.total = 0, gasContext.merchTotal = 0, gasContext.discount = 0})} class='flex h-10 ml-4 w-full justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>
            <ClearSvg/>
            <p class='ml-2'>Clear</p>
          </button>
        </div>
      </div>

      <div>
        soda chart here<br/>
        other thing here
      </div>      
    </div>
  );
});

export const head: DocumentHead = {
  title: 'GasPos | Food & Drinks',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
