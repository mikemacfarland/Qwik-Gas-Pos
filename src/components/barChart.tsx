import { component$ } from "@builder.io/qwik";

export default component$(()=>{


    const gasSales = [
        {day:'mon',
        super: 40,
        midGrade: 93,
        unleaded: 256
        },
        {day: 'tue',
        super: 62,
        midGrade: 154,
        unleaded: 325
        },
        {day: 'wed',
        super: 70,
        midGrade: 190,
        unleaded: 380
        },
        {day: 'thu',
        super: 60,
        midGrade: 180,
        unleaded: 312
        },
        {day: 'fri',
        super: 112,
        midGrade: 230,
        unleaded: 412
        },
        {day: 'sat',
        super: 100,
        midGrade: 242,
        unleaded: 402
        },
        {day: 'sun',
        super: 46,
        midGrade: 82,
        unleaded: 109
        }
    ]

    

    return(
        <div class='my-8 mx-8'>
            <div class='flex flex-row justify-between'>
                <p>Sales</p>
                <div>This week</div>
            </div>
            <div class='flex flex-row justify-between '>
                {
                gasSales.map((data)=>{
                    return (<DayData day={data.day}/>)
                })
                }
            </div>
        </div>
    )
})

interface dayDataProps{
    day: string
}

export const DayData = ((props:dayDataProps)=>{
    // use this component to create bars within barchart
    return(
        <div >
            <div class='flex flex-col justify-end items-center relative h-20'>
                <div class='absolute left-1/2 -translate-x-1/2 rounded-full h-full w-1 bg-slate-200 z-0'></div>
                <div class='w-2 h-4 bg-sup-blue z-10 rounded-full' ></div>
                <div class='w-2 h-5 bg-mid-green z-10 rounded-full mt-1' ></div>
                <div class='w-2 h-2 bg-unl-yellow z-10 rounded-full mt-1'></div>
            </div>
            <p>{props.day}</p>
        </div>
    )
})