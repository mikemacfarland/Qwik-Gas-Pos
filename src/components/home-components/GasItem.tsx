import { component$,$,useContext } from "@builder.io/qwik"
import { GasSvg } from "../icons/gasPump"
import { DownSvg } from '../icons/down'
import { GasContext } from "~/root"

interface gasItemProps{
    fill: string
    gasType: {qty:number, name:string, octane:number, price:number}
    class:string
  }
  
  export default component$((props:gasItemProps)=>{
    const gasContext = useContext(GasContext)

    const decrement = $(()=>{
        props.gasType.qty > 0 ? props.gasType.qty-- : props.gasType.qty === 0
        //@TODO make this a reusable function ?
        gasContext.total = gasContext.gasTypes.map((grade)=>{
          const gradeTotal = grade.price * grade.qty
          return gradeTotal
          })
          .reduce((a,b)=>{
              const sum = parseFloat((a + b).toFixed(2))
              
              return sum
          })

        console.log(gasContext.total)
    })

    const increment = $(()=>{props.gasType.qty++
        gasContext.total = gasContext.gasTypes.map((grade)=>{
            const gradeTotal = grade.price * grade.qty
            return gradeTotal
            })
            .reduce((a,b)=>{
                const sum = parseFloat((a + b).toFixed(2))
                
                return sum
            })


        console.log(gasContext.total)
    })

    const inputChange = $((e)=>{
      props.gasType.qty = parseInt(e.target.value)

      const newGasTotals = gasContext.gasTypes.map((type)=>{
        return (type.qty * type.price)
      }).reduce((a,b)=>{
        return parseFloat((a + b).toFixed(2))
      })

    
      console.log(newGasTotals)

      gasContext.total = newGasTotals
    })

   return(
    <div class={`flex flex-row justify-left items-center md:mx-4 lg:mx-8 lg:text-sm p-4 border-2 rounded-xl ${props.class}`}>
          <GasSvg class={`md:hidden lg:block h-12 ${props.fill} `}/>
          <div class='flex flex-col w-1/4 lg:ml-7 mr-auto'>
            <p class='font-bold md:text-2xl xl:text-3xl'>{props.gasType.octane}</p>
            <p class='text-slate-400'>{(props.gasType.name).toUpperCase()}</p>
          </div>
          <p class='mr-4 text-xl font-bold'>{props.gasType.price}$</p>
          <div class='flex flex-row mr-2 cursor-pointer justify-center items-center h-10 px-4 border-mid-green border-2 rounded-xl '>
            <p class='mr-1'>Pump</p>
            <DownSvg/>
          </div>
          {/* @TODO add pump # selection HERE */}
          <div class='flex flex-row items-center'>
            <button onClick$={$(()=>decrement())} class='flex w-10 h-10 justify-center items-center border-2 rounded-xl border-mid-green text-mid-green'>-</button>
            {/* add listener on input to change qtys on manual input */}
            <input onChange$={$((e)=>{inputChange(e)})} type='text' value={props.gasType.qty} class='text-center font-bold text-xl mx-2 w-9'></input>
            <button onClick$={$(()=>increment())} class='flex w-10 h-10 justify-center items-center bg-mid-green border-2 rounded-xl border-mid-green text-white'>+</button>
          </div>
        </div>
   )
  })