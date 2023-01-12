import { component$,useContext } from "@builder.io/qwik";
import { GasContext } from "~/root";

export default component$(()=>{
  const gasContext = useContext(GasContext)

  const singleLvl = (grade:number, percentage:number)=>{
    const percentageOfTotal = (grade / (gasContext.gasTypes[0].stock + gasContext.gasTypes[1].stock + gasContext.gasTypes[2].stock)) * percentage
    return percentageOfTotal
  }

  const totalFuel = ()=>{
    const currLvl = Math.floor(((gasContext.gasTypes[0].stock + gasContext.gasTypes[1].stock + gasContext.gasTypes[2].stock) / gasContext.settings.gasCapacity) * 100)
    return currLvl
  }
  
    return(
        <div class='my-8 md:mx-4 lg:mx-6 xl:mx-8'>
            <div 
            class='flex justify-center items-center md:w-48 md:h-48 xl:w-52 xl:h-52 rounded-full' 
            style={`background: conic-gradient(#fcc482 0% ${singleLvl(gasContext.gasTypes[0].stock,totalFuel())}%, 
            #63c99e ${singleLvl(gasContext.gasTypes[0].stock,totalFuel())}% ${singleLvl(gasContext.gasTypes[0].stock,totalFuel()) + singleLvl(gasContext.gasTypes[1].stock,totalFuel())}%, 
            #6492ec ${singleLvl(gasContext.gasTypes[1].stock,totalFuel())}% ${singleLvl(gasContext.gasTypes[0].stock,totalFuel()) + singleLvl(gasContext.gasTypes[1].stock,totalFuel()) + singleLvl(gasContext.gasTypes[2].stock,totalFuel())}%, 
            white ${singleLvl(gasContext.gasTypes[0].stock,totalFuel()) + singleLvl(gasContext.gasTypes[1].stock,totalFuel()) + singleLvl(gasContext.gasTypes[2].stock,totalFuel())}% ${100.00}%);`}>
                
                <div class='flex flex-col justify-center items-center md:w-36 md:h-36 xl:w-40 xl:h-40 bg-secondary-color  transition-colors duration-300 dark:bg-slate-400 rounded-full z-20' >
                    <p class='text-3xl font-bold'>{totalFuel()}%</p>
                    <p class='text-slate-400  transition-colors duration-300 dark:text-secondary-color' >Fuel Left</p>
                </div>
            </div>

            <div class='mt-4  lg:text-sm xl:text-base '>
            <GasStat title='UNLEADED' color='bg-unl-yellow' remainder={Math.floor(singleLvl(gasContext.gasTypes[0].stock,100))}/>
            <GasStat title='MID-GRADE' color='bg-mid-green' remainder={Math.floor(singleLvl(gasContext.gasTypes[1].stock,100))}/>
            <GasStat title='SUPER' color='bg-sup-blue' remainder={Math.floor(singleLvl(gasContext.gasTypes[2].stock,100))}/>
            </div>
        </div>
    )
})

interface gasStatProps{
    title: string
    remainder: number
    color: string
  }
  
  export const GasStat =((props: gasStatProps)=>{
    return(
      <div class='flex flex-row items-center'>
        <div class={`w-3 h-3 mr-2 ${props.color} rounded-full`}></div>
        <p>{props.title}</p><strong class='ml-auto'>{props.remainder}%</strong>
      </div>
    )
  })