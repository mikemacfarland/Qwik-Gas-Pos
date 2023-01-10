import { component$,useContext ,$, useStore} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import FoodItem from '~/components/food-drinkp-components/foodItem';
import { GasContext } from '~/root';
import { ClearSvg } from '~/components/icons/clear';
import { DownSvg } from '~/components/icons/down';

export default component$(() => {

  const gasContext = useContext(GasContext)

  const foodStore = useStore({
    createItem:false,
    dropdown:false,
    editItems: false,
    types:['Pizza','Coffee','Hot Dog','Bkfst','Burger','Salad','Misc','Soda','Tea','Drink','Food'],
    newItem:{name:'',type:'',price:0,qty:0,sizes:[{name:'Sm',price:0},{name:'Md',price:0},{name:'Lg',Price:0}]}
  })

  const createItem = $(()=>{
    // ISSUE SOLVED - shallow copy of foodstore.item was causing gasContext.foodtypes to use same reference for every object in array
    // use spread opperator to make a copy with no reference to original.
    // const newItem = JSON.parse(JSON.stringify(foodStore.newItem))
    // console.log(foodStore.newItem)
    // @TODO issue with type on line 26 see difference in foodstore.newItem vs context item it gets pushed to
    if(foodStore.newItem.type === ''){
      foodStore.newItem.type = 'Food'
    }
    console.log(foodStore.newItem)
    foodStore.newItem.name === '' ? alert('New item requires unique name') :
    foodStore.newItem.price === 0 ? alert('New item requires price') :
    gasContext.foodTypes.push({...foodStore.newItem})
    // @TODO inputs in create new item needs to be set to 0 
    foodStore.newItem = {name:'',type:'',price:0,qty:0,sizes:[{name:'Sm',price:0},{name:'Md',price:0},{name:'Lg',price:0}]}
    foodStore.createItem = false
  })

  const filterPrice = $((e:any,idx:number)=>{
    // on keyup
    if(e.type === 'keyup'){
      e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    }
    // on focusin and focusout
    if(e.type === 'focusin' || e.type === 'focusout'){
      e.type === 'focusin' ? e.target.value = '' : 
      e.target.value === '' && idx !== 0 ? e.target.value = foodStore.newItem.sizes[idx].price : 
      e.target.value === '' ? e.target.value = foodStore.newItem.price : e.target.value
    }
    // on change
    if(e.type === 'change'){
      idx === 0 ? (foodStore.newItem.price = e.target.value,foodStore.newItem.sizes[0].price = e.target.value) :
      foodStore.newItem.sizes[idx].price = e.target.value 
    }
  })

  const setNewItemName = $((e)=>{
    const prevVal = foodStore.newItem.name
    const foodNames = gasContext.foodTypes.map((type)=>{
      return type.name.toUpperCase()
    })

    // on focusin and focusout
    if(e.type === 'focus' || e.type === 'focusout'){
      console.log(e.type)
      e.type === 'focus' ? e.target.value = '' : e.target.value === '' && !foodStore.newItem.name ? e.target.value = 'Name' :
      prevVal ? e.target.value = prevVal : e.target.value
      
    }
    // on change
    if(e.type === 'change'){
      console.log(foodNames)
      console.log(e.target.value)

      console.log(e.type)
    foodNames.includes(e.target.value.toUpperCase()) ? alert('error item already exists') : foodStore.newItem.name = e.target.value
    }
  })

  return (
    <div class='relative flex flex-row w-full justify-between'>
      <div class='flex flex-col rounded-3xl bg-white mr-4 xl:mr-8 w-full'>
        <div>
          <div class='md:my-4'>
          {gasContext.foodTypes.map((item)=>{
            return(
              <FoodItem key={item.name + item.price} foodItem={item} class='h-10'/>
            )
          })}
          </div>

          <div class={`${foodStore.createItem? 'hidden' : 'flex'} flex-row justify-start md:mx-4 lg:mx-8 my-4`}>
            <button onClick$={()=>foodStore.createItem = true} class='w-1/3 h-10 rounded-xl text-white bg-mid-green'>Create Item</button>
            <button onClick$={()=>foodStore.editItems ? foodStore.editItems = false : foodStore.editItems = true} class='block ml-8  h-10 rounded-xl text-mid-green w-1/3 border-2 border-mid-green bg-white'>Edit Items</button>
          </div>
          <div class={` ${foodStore.createItem? 'flex' : 'hidden'} flex-row justify-start md:m-4 lg:m-8 h-10`}>
            <input 
              onChange$={(e)=>{setNewItemName(e)}} 
              onFocus$={(e)=>{setNewItemName(e)}} 
              onFocusout$={(e)=>{setNewItemName(e)}} 
              type="text" value={foodStore.newItem.name ? foodStore.newItem.name : 'Name'} class='mr-4 bg-gray-100 rounded-xl indent-2'
            />

            {/* input for small and price */}
            <label class='flex align-center items-center ml-auto' for="price">{`${foodStore.newItem.type === 'Coffee' || foodStore.newItem.type === 'Tea' || foodStore.newItem.type === 'Drink' ? 'Sm:' : 'Price:'}`}</label>
            <input
              onChange$={(e)=>{filterPrice(e,0)}}
              onFocusin$={(e)=>{filterPrice(e,0)}}
              onFocusOut$={(e)=>{filterPrice(e,0)}}
              onKeyUp$={(e)=>{filterPrice(e,0)}}
              type="text" 
              value={foodStore.newItem.price} 
              id='price'
              class='w-14 ml-2 mr-4 bg-gray-100 rounded-xl indent-2' 
            />

            {/* element holding Md and Lg sizes */}
            <div class={`${foodStore.newItem.type === 'Coffee' || foodStore.newItem.type === 'Tea' || foodStore.newItem.type === 'Drink' ? 'flex flex-row' : 'hidden'}`}>

              <label for="medium" class='flex align-center items-center mr-2'>Md:</label>
              <input 
                onChange$={(e)=>{filterPrice(e,1)}}
                onFocusin$={(e)=>{filterPrice(e,1)}}
                onFocusOut$={(e)=>{filterPrice(e,1)}}
                onKeyUp$={(e)=>{filterPrice(e,1)}}
                class='w-14 mr-4 bg-gray-100 rounded-xl indent-2' type="text" value={foodStore.newItem.sizes[1].price} id='medium'
              />

              <label for="large" class='flex align-center items-center mr-2'>Lg:</label>
              <input 
                onChange$={(e)=>{filterPrice(e,2)}}
                onFocusin$={(e)=>{filterPrice(e,2)}}
                onFocusOut$={(e)=>{filterPrice(e,2)}}
                onKeyUp$={(e)=>{filterPrice(e,2)}}
                class='w-14 mr-4 bg-gray-100 rounded-xl indent-2' type="text" value={foodStore.newItem.sizes[2].price} id='large'
              />

            </div>


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
            
            <button onClick$={()=>{foodStore.createItem = false,foodStore.newItem = {name:'',type:'',price:0,qty:0,sizes:[{name:'Sm',price:0},{name:'Md',price:0},{name:'Lg',price:0}]}}} class='h-10 w-10 border-2 border-mid-green rounded-xl text-mid-green'>x</button>
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
          <button onClick$={$(()=>gasContext.layout.overlay = 'payment')} class='flex h-10 mr-4 w-full justify-center items-center border-2 bg-mid-green rounded-xl border-mid-green text-white' >Confirm</button>
          <button onClick$={$(()=>{gasContext.foodTypes.forEach(type=>{type.qty = 0}), gasContext.total = 0, gasContext.merchTotal = 0, gasContext.discount = 0})} class='flex h-10 ml-4 w-full justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>
            <ClearSvg/>
            <p class='ml-2'>Clear</p>
          </button>
        </div>
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
