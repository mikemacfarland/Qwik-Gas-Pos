import { component$ } from "@builder.io/qwik"

import { BowlSvg } from "../icons/bowl";
import { CoffeeSvg } from "../icons/coffee";
import { DrinkSvg } from "../icons/drink";
import { FruitSvg } from "../icons/fruit";
import { PizzaSvg } from "../icons/pizza";
import { BurgerSvg } from "../icons/burger";
import { HotdogSvg } from "../icons/hotDog";
import { FoodSvg } from "../icons/food";
import { CookieSvg } from "../icons/cookie";

interface foodIconProops{
    type:string
    class:string
}

export default component$((props:foodIconProops)=>{
    
    return(
        <>{
            props.type === 'Coffee' || props.type === 'Tea'? <CoffeeSvg class={props.class}/> : 
            props.type === 'Cookie' ? <CookieSvg class={props.class}/> :
            props.type === 'Soda' ? <DrinkSvg class={props.class}/> :
            props.type === 'Salad' ? <BowlSvg class={props.class}/> :
            props.type === 'Soda' ? <DrinkSvg class={props.class}/> :
            props.type === 'Burger' ? <BurgerSvg class={props.class}/> :
            props.type === 'Hot Dog' ? <HotdogSvg class={props.class}/> :
            props.type === 'Fruit' ?  <FruitSvg class={props.class}/> :
            props.type === 'Food' ? <FoodSvg class={props.class}/> :
            props.type === 'Drink' ? <DrinkSvg class={props.class}/> : 
            props.type === 'Pizza' ? <PizzaSvg class={props.class}/> : <div>icon</div>
        }</>
    )
  })