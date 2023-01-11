import { component$,useContext,$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { GasContext } from '~/root';
import SettingItem from '~/components/settings-components/SettingItem';

export default component$(() => {

  const gasContext = useContext(GasContext)

  const filterToNum = $((e:any)=>{
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  })

  const handleCheck = $((e)=>{
    console.log('darkMode')
    gasContext.settings.darkMode = e.target.checked
  })
  return (
    <div class='flex flex-col space-y-4 rounded-3xl bg-secondary-color dark:bg-slate-400 mr-4 xl:mr-8 py-8 px-8 font-bold w-full'>
      {/* @TODO @REFACTOR this output can be mapped instead of repeating all this code would have to add names of settings to settings in this case */}
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.noOfPumps = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Number of pumps' type={gasContext.settings.noOfPumps}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.taxRate = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Tax rate' type={gasContext.settings.taxRate}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.maxGasQty = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Max gas qty' type={gasContext.settings.maxGasQty}/>
      <SettingItem onChange={$((e:any)=>{filterToNum(e),gasContext.settings.maxFoodQty = e.target.value})} 
      onKeyDown={$((e:any)=>{filterToNum(e)})} name='Max food qty' type={gasContext.settings.maxFoodQty}/>
      <SettingItem onChange={$((e:any)=>{handleCheck(e)})} name='Dark mode' type={gasContext.settings.darkMode}/>
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



