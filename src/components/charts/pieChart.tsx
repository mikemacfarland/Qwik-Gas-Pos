import { component$ } from "@builder.io/qwik";



// interface pieChartProps{
//   unleaded: number,
//   midGrade: number,
//   super: number
// }

export default component$(()=>{

  //based on 20k gal tanks? idk.. 
  const gasLevels ={
    unleaded: 20000,
    midGrade: 20000,
    super: 20000
  }

  const singleLvl = (grade:number, percentage:number)=>{
    const percentageOfTotal = (grade / (gasLevels.unleaded + gasLevels.midGrade + gasLevels.super)) * percentage
    return percentageOfTotal
  }

  const totalFuel = ()=>{
    const currLvl = Math.floor(((gasLevels.midGrade + gasLevels.super + gasLevels.unleaded) / 60000) * 100)
    console.log(currLvl)
    return currLvl
  }


    return(
        <div class='my-8'>
            <div 
            class='flex justify-center items-center w-52 h-52 rounded-full' 
            style={`background: conic-gradient(#fcc482 0% ${singleLvl(gasLevels.unleaded,totalFuel())}%, 
            #63c99e ${singleLvl(gasLevels.unleaded,totalFuel())}% ${singleLvl(gasLevels.unleaded,totalFuel()) + singleLvl(gasLevels.midGrade,totalFuel())}%, 
            #6492ec ${singleLvl(gasLevels.midGrade,totalFuel())}% ${singleLvl(gasLevels.unleaded,totalFuel()) + singleLvl(gasLevels.midGrade,totalFuel()) + singleLvl(gasLevels.super,totalFuel())}%, 
            white ${singleLvl(gasLevels.unleaded,totalFuel()) + singleLvl(gasLevels.midGrade,totalFuel()) + singleLvl(gasLevels.super,totalFuel())}% ${100.00}%);`}>
                
                <div class='flex flex-col justify-center items-center w-40 h-40 bg-white rounded-full z-20' >
                    <p class='text-3xl font-bold'>{totalFuel()}%</p>
                    <p class='text-slate-400' >Fuel Left</p>
                </div>
            </div>

            <div class='mt-4'>
            <GasStat title='UNLEADED' color='bg-unl-yellow' remainder={Math.floor(singleLvl(gasLevels.unleaded,100))}/>
            <GasStat title='MID-GRADE' color='bg-mid-green' remainder={Math.floor(singleLvl(gasLevels.midGrade,100))}/>
            <GasStat title='SUPER' color='bg-sup-blue' remainder={Math.floor(singleLvl(gasLevels.super,100))}/>
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