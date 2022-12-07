import { component$ } from "@builder.io/qwik";

export default component$(()=>{
    return(
        <div class='my-8'>
            <div 
            class='flex justify-center items-center w-52 h-52 rounded-full' 
            style={`background: conic-gradient(#63c99e ${15.00}%, #fcc482 ${0.00}% ${42.00}%, #6492ec ${42.00}% ${82.00}%, white ${82.00}% ${100.00}%);`}>
                
                <div class='flex flex-col justify-center items-center w-40 h-40 bg-white rounded-full z-20' >
                    <p class='text-3xl font-bold'>82%</p>
                    <p class='text-slate-400' >Fuel Left</p>
                </div>
            </div>

            <div class='mt-4'>
            <GasStat title='UNLEADED' color='bg-unl-yellow' remainder={40}/>
            <GasStat title='MID-GRADE' color='bg-mid-green' remainder={15}/>
            <GasStat title='SUPER' color='bg-sup-blue' remainder={27}/>
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