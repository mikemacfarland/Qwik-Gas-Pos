import { component$, $} from "@builder.io/qwik";

interface settingsItemProps{
    name:string
    type:any
    onChange:any
    onKeyDown:any
    class?:string
}

export default component$((props:settingsItemProps)=>{

    const htmlFor = props.name.split(' ').map((word)=>{
        return word.charAt(0).toUpperCase() + word.substring(1)
    }).join('')

    const inputFocus = $((e:any)=>{
        const prevVal = props.type
        e.type === 'focus' ? e.target.value = '' : e.target.value === '' ? e.target.value = prevVal : e.target.value
    })

    return(
        <div class={`flex flex-row justify-start w-1/3 ${props.class}`}>
            {/* @TODO needs event listener can use the same onchange if you add condition to accept a booolean*/}
            <label class='mr-auto' for={htmlFor}>{props.name}</label>
            {
            props.type.typeof === 'boolean' ? <input id={htmlFor} type="checkbox" /> :
            <input onChange$={props.onChange} onKeyup$={props.onKeyDown} 
                onFocus$={$((e)=>{inputFocus(e)})} 
                onFocusout$={$((e)=>{inputFocus(e)})} 
                class='w-14 bg-gray-100 rounded-md text-center' id={htmlFor} type="text" value={props.type}
            />
            }
      </div>
    )
})