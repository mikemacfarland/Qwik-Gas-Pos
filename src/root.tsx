import { component$, useContextProvider, createContext, useStore, useContext, useStyles$} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';

// export const GasContext = createContext('gascontext')
//   // @TODO set prices  of gas in settings
// export default component$(()=>{
  
//   interface GasStore{
//     gasTypes: object
//     gasQty: number
//     total: number
//     discount: number
//   }

//   const GasStore = useStore({
          
//           gasTypes:{
//           unleaded:{name:'unleaded', price:4.23, qty:0, octane:87},
//           midGrade:{name:'mid-grade', price:4.82, qty:0, octane:89},
//           super:{name:'super', price:5.42, qty:0, octane:91}
//           },
//           total:23.32,
//           gasQty: 0,
//           discount:0.05,
//         },{recursive: true}
//         )

//   useContextProvider(GasContext,GasStore)
//   useStyles$(globalStyles);

interface GasStore{
  // @TODO interface needs adittional descriptor for gastypes objects
  gasTypes: Array<{name:string,price:number,qty:number,octane:number}>
  gasQty: number
  total: number
  discount: number
}

export const GasContext = createContext<GasStore>('GasContext')
export default component$(()=>{
useStyles$(globalStyles);

const GasStore = useStore({
    gasTypes:[
        {name:'unleaded', price:4.23, qty:0, octane:87},
        {name:'mid-grade', price:4.82, qty:0, octane:89},
        {name:'super', price:5.43, qty:0, octane:91}
    ],
    total:12.00,
    gasQty: 0,
    discount:0,
  },{recursive:true})

  useContextProvider(
    GasContext,GasStore)

  return (
    <QwikCityProvider>
      <head>
        <div>{}</div>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;700&display=swap" rel="stylesheet"/>
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});


