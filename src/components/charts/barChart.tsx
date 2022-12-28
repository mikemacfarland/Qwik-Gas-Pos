import { component$, useContext } from "@builder.io/qwik";
import { GasContext } from "~/root";

export default component$(()=>{
    const gasContext = useContext(GasContext)
        
    const gasSalesChartData = ()=>{
        const dayTotals = gasContext.gasSales.map(day=>{
            const dayTotal = day.midGrade + day.super + day.unleaded
            return dayTotal
        })
        const highest = Math.max(...dayTotals)
        const gasSalesChartData = gasContext.gasSales.map(day=>{
            return {
                day:day,
                unleaded: Math.floor((day.unleaded / highest) * 100),
                midGrade: Math.floor((day.midGrade / highest) * 100),
                super: Math.floor((day.super / highest) * 100)
            }
        })
        return gasSalesChartData
    }

    return(
        <div class='my-8 md:mx-4 lg:mx-6 xl:mx-8'>
            <div class='flex flex-row justify-between'>
                <p>Sales</p>
                <div>This week</div>
            </div>
            <div class='flex flex-row justify-between mt-2'>
                {
                gasSalesChartData().map(data=>{
                    return (<DayData 
                        key={data.day.day}
                        day={data.day.day}
                        superHeight={data.super}
                        midGradeHeight={data.midGrade}
                        unleadedHeight={data.unleaded}
                    />)
                })
                }
            </div>
        </div>
    )
})

interface dayDataProps{
    key:string
    day: string
    unleadedHeight: number
    midGradeHeight: number
    superHeight: number
}

export const DayData = ((props:dayDataProps)=>{
    // use this component to create bars within barchart
    return(
        <div key={props.key}>
            <div class='flex flex-col justify-end items-center relative h-20'>
                <div class='absolute left-1/2 -translate-x-1/2 rounded-full h-full w-1 bg-slate-200 z-0'></div>
                <div style={`height:${props.superHeight}%;`} class='w-1.5 bg-sup-blue z-10 rounded-full'></div>
                <div style={`height:${props.midGradeHeight}%;`} class='w-1.5 bg-mid-green z-10 rounded-full mt-0.5' ></div>
                <div style={`height:${props.unleadedHeight}%;`} class='w-1.5 bg-unl-yellow z-10 rounded-full mt-0.5'></div>
            </div>
            <p class='mt-1 md:text-sm lg-text-base' >{props.day}</p>
        </div>
    )
})