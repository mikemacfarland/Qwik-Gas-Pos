import { component$, useContextProvider, createContext, useStore, useStyles$} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';

interface GasStore{
  // @TODO interface needs adittional descriptor for gastypes objects
  gasTypes: Array<{name:string,price:number,qty:number,octane:number,stock:number}>
  settings:{
    darkMode: boolean
    noOfPumps: number
    metric: boolean
    taxRate: number
  }
  layout:{
    overlay:boolean
    message:any
  }
  payment:{
    card:boolean
    paymentProcessing: boolean
  }
  total: number
  merchTotal: number
  discount: number
}

export const GasContext = createContext<GasStore>('GasContext')
export default component$(()=>{
useStyles$(globalStyles);

// @TODO can separate this store into separate stores depending on component sets that use store to limit re-renders?
const GasStore = useStore({
    gasTypes:[
        {name:'unleaded', price:4.23, qty:0, octane:87, stock:18200},
        {name:'midgrade', price:4.82, qty:0, octane:89, stock:10400},
        {name:'super', price:5.43, qty:0, octane:91, stock:15600}
    ],
    settings:{
      darkMode: false,
      noOfPumps: 4,
      metric: false,
      taxRate: .07
    },
    layout:{
      overlay:false,
      message: null
    },
    payment:{
      card:true,
      paymentProcessing: false
    },
    total:0,
    merchTotal:3.99,
    discount:0,
  },{recursive:true})

  useContextProvider(
    GasContext,GasStore)

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;700&display=swap" rel="stylesheet"/>
        <RouterHead />
      </head>
      <body lang="en" class='bg-neutral-100'>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});


