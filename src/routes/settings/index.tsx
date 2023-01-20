import { component$,useContext,$} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { GasContext } from '~/root';
import SettingItem from '~/components/settings-components/SettingItem';

export default component$(() => {

  const gasContext = useContext(GasContext)

  const filterToNum = $((e:any)=>{
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    gasContext.gasTypes.forEach(type=>{
      if(type.stock > gasContext.settings.gasCapacity){
        e.target.value = gasContext.settings.gasCapacity
      }
    })

  })

  const handleCheck = $((e)=>{
    gasContext.settings.darkMode = e.target.checked
    if(gasContext.settings.darkMode === true){
      document.querySelector('html')?.classList.add('dark')
      localStorage.setItem('darkMode','true')
    }
    else{
      document.querySelector('html')?.classList.remove('dark')
      localStorage.setItem('darkMode','false')
    }
  })


  return (
    <div class='flex flex-col space-y-4 rounded-3xl bg-secondary-color transition-colors duration-300 dark:bg-slate-400 p-4 lg:p-8 font-bold w-full'>
      {/* @TODO @REFACTOR this output can be mapped instead of repeating all this code would have to add names of settings to settings in this case */}
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.noOfPumps = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Number of pumps' type={gasContext.settings.noOfPumps}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.taxRate = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Tax rate' type={gasContext.settings.taxRate}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.maxGasQty = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Max gas purchase qty' type={gasContext.settings.maxGasQty}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.maxFoodQty = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Max food purchase qty' type={gasContext.settings.maxFoodQty}/>
      <SettingItem onChange={$((e:any)=>{handleCheck(e)})} name='Dark mode' type={gasContext.settings.darkMode}/>
      <span class='border-b-2'></span>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.gasCapacity = e.target.value})} name='Gas Tank Sizes (gal)' type={gasContext.settings.gasCapacity}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.gasTypes[0].stock = e.target.value})} name='Unleaded Stock (gal)' type={gasContext.gasTypes[0].stock}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.gasTypes[1].stock = e.target.value})} name='Midgrade Stock (gal)' type={gasContext.gasTypes[1].stock}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.gasTypes[2].stock = e.target.value})} name='Super Stock (gal)' type={gasContext.gasTypes[2].stock}/>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'GasPos | Settings',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};



