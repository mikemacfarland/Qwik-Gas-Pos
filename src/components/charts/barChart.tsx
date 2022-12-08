import { component$ } from "@builder.io/qwik";

export default component$(()=>{

    // dummy data for week of sales
    const gasSales = [
        {day:'mon',
        super: 602,
        midGrade: 930,
        unleaded: 2560
        },
        {day: 'tue',
        super: 620,
        midGrade: 1540,
        unleaded: 3250
        },
        {day: 'wed',
        super: 700,
        midGrade: 1900,
        unleaded: 3800
        },
        {day: 'thu',
        super: 600,
        midGrade: 1800,
        unleaded: 3120
        },
        {day: 'fri',
        super: 1120,
        midGrade: 2300,
        unleaded: 4120
        },
        {day: 'sat',
        super: 1000,
        midGrade: 2420,
        unleaded: 4020
        },
        {day: 'sun',
        super: 1700,
        midGrade: 1600,
        unleaded: 2600
        }
    ]

    const gasSalesChartData = ()=>{
        const dayTotals = gasSales.map(day=>{
            const dayTotal = day.midGrade + day.super + day.unleaded
            return dayTotal
        })
        const highest = Math.max(...dayTotals)
        const gasSalesChartData = gasSales.map(day=>{
            // @TODO check/correct structure of this object and gasSalesChartData array
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
        <div class='my-8 mx-8'>
            <div class='flex flex-row justify-between'>
                <p>Sales</p>
                <div>This week</div>
            </div>
            <div class='flex flex-row justify-between mt-2'>
                {
                gasSalesChartData().map(data=>{
                    return (<DayData 
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
    day: string
    unleadedHeight: number
    midGradeHeight: number
    superHeight: number
}

export const DayData = ((props:dayDataProps)=>{
    // use this component to create bars within barchart
    return(
        <div>
            <div class='flex flex-col justify-end items-center relative h-20'>
                <div class='absolute left-1/2 -translate-x-1/2 rounded-full h-full w-1 bg-slate-200 z-0'></div>
                <div style={`height:${props.superHeight}%;`} class='w-1.5 bg-sup-blue z-10 rounded-full'></div>
                <div style={`height:${props.midGradeHeight}%;`} class='w-1.5 bg-mid-green z-10 rounded-full mt-0.5' ></div>
                <div style={`height:${props.unleadedHeight}%;`} class='w-1.5 bg-unl-yellow z-10 rounded-full mt-0.5'></div>
            </div>
            <p class='mt-1' >{props.day}</p>
        </div>
    )
})