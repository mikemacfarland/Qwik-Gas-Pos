import { component$,$,useContext } from "@builder.io/qwik"
import { GasSvg } from "../icons/gasPump"
import { DownSvg } from '../icons/down'
import { GasContext } from "~/root"

// interface gasItemProps{
//     mt: string
//     mb: string
//     fill: string
//     gasType: object
//   }
  
  export default component$((props:any)=>{
    const gasContext = useContext(GasContext)

    const decrement = $(()=>{
        props.gasType.qty > 0 ? props.gasType.qty-- : props.gasType.qty === 0
        gasContext.total = gasContext.gasTypes.map((grade)=>{
            const gradeTotal = grade.price * grade.qty
            return gradeTotal
            }).reduce((a,b)=>{
                const sum = a + b
                return sum
            })

        console.log(gasContext.total)
    })

    const increment = $(()=>{props.gasType.qty++
        gasContext.total = gasContext.gasTypes.map((grade)=>{
            const gradeTotal = grade.price * grade.qty
            return gradeTotal
            }).reduce((a,b)=>{
                const sum = a + b
                return sum
            })

        console.log(gasContext.total)
    })

    

   return(
    <div class={`flex flex-row justifyleft items-center mx-8 ${props.mt ? props.mt : ''} ${props.mb ? props.mb : ''} p-4 border-2 rounded-xl`}>
          <GasSvg fill={props.fill} height='100%' width='40px'/>
          <div class='flex flex-col w-1/4 ml-10'>
            <p class='font-bold text-3xl'>{props.gasType.octane}</p>
            <p class='text-slate-400'>{(props.gasType.name).toUpperCase()}</p>
          </div>
          <p class=' mr-10 text-xl font-bold'>{props.gasType.price}$</p>
          <div class='flex flex-row mr-auto cursor-pointer justify-center items-center h-10 px-4 border-mid-green border-2 rounded-xl '>
            <p class='mr-3'>Pump</p>
            <DownSvg/>
          </div>
          {/* @TODO add pump # selection HERE */}
          <div class='flex flex-row items-center'>
            <button onClick$={$(()=>decrement())} class='flex w-10 h-10 justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>-</button>
            <p class='flex justify-center items-center font-bold text-xl mx-2'>{props.gasType.qty}</p>
            <button onClick$={$(()=>increment())} class='flex w-10 h-10 justify-center items-center bg-mid-green border-2 rounded-xl border-mid-green text-white'>+</button>
          </div>
        </div>
   )
  })