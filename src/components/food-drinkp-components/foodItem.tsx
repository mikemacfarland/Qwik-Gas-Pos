import { component$ } from "@builder.io/qwik";

interface foodItemProps{
    class: string
}

export default component$((props:foodItemProps)=>{
    return(
        <div class={`flex flex-row justify-left items-center md:mx-4 lg:mx-8 lg:text-sm p-4 border-2 rounded-xl ${props.class}`}>
            <div>
                fooditem
            </div>
        </div>
    )
})