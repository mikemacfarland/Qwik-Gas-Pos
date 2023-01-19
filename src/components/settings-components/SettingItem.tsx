import { component$, $,} from "@builder.io/qwik";

interface settingsItemProps{
    name:string
    type:any
    onChange:any
    onKeyDown?:any
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
        <div class={`flex flex-row justify-start w-content space-x-4 ${props.class}`}>
            {/* @TODO needs event listener can use the same onchange if you add condition to accept a booolean*/}
            <label class='whitespace-nowrap mr-auto' for={htmlFor}>{props.name}</label>
            {typeof(props.type) === 'boolean' ? 
            <input class='settingsCheckbox w-14 ' onChange$={props.onChange} type='checkbox' checked={props.type === true ? true : false} id={htmlFor}/> :
            <input onChange$={props.onChange} onKeyup$={props.onKeyDown} 
                onFocus$={$((e)=>{inputFocus(e)})}
                onFocusout$={$((e)=>{inputFocus(e)})} 
                class='w-14 bg-quadrary-color  transition-colors duration-300 dark:bg-tertiary-color rounded-md text-center' id={htmlFor} type="text" value={props.type}
            />
            }
      </div>
    )
})