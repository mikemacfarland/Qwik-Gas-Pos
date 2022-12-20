import { component$ } from "@builder.io/qwik";

export default component$(()=>{
    return(
        <div style='background:conic-gradient(#63c99e 0% 50%, white 50% 100%);' 
            class='flex justify-center items-center h-8 w-8 rounded-full animate-spin'>
            <div class='h-6 w-6 rounded-full bg-mid-green'></div>
        </div>
    )
})