import { component$,$, useContext } from "@builder.io/qwik";
import { GasContext } from "~/root";

export default component$(()=>{

    const gasContext = useContext(GasContext)

    return(
        <div onClick$={$((e)=>{e.stopPropagation()})} class=' h-content p-8 md:w-1/2 lg:w-1/2 xl:w-1/3 bg-white rounded-3xl'>
            <div>
                <h1 class='text-xl font-bold text-center' >Admin contact info</h1>
                <ul class='flex flex-col space-y-4 mt-4 pl-6'>
                    <li>
                        <p class='font-bold'>Name:</p>
                        <p>John Doe</p>
                    </li>
                    <li>
                        <p class='font-bold' >Phone:</p>
                        <p>222-222-2222</p>
                    </li>
                    <li>
                        <p class='font-bold'>Email:</p>
                        <p>johndoe@gasstation.com</p>
                    </li>
                </ul>
            </div>
            <button onClick$={()=>gasContext.layout.overlay = ''} class='block text-mid-green border-mid-green border-2 h-14 px-5 rounded-xl mx-auto mt-6'>Close</button>
        </div>
    )
})