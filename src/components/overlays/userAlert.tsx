import { component$ ,useContext} from "@builder.io/qwik";
import { GasContext } from "~/root";

export default component$(()=>{
    const gasContext = useContext(GasContext)

    return(
        <div>
            <p class={`text-2xl absolute top-40 left-1/2 -translate-x-1/2 ${gasContext.layout.message ? 'block' : 'hidden'}`}>{gasContext.layout.message}</p>
        </div>
    )
})