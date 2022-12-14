import { component$, useContextProvider, createContext, useStore, useStyles$} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';

interface GasStore{
  gasTypes: Array<{name:string,price:number,qty:number,octane:number,pump:number,stock:number}>
  gasSales: Array<{day:string,super:number,midGrade:number,unleaded:number}>
  settings:{
    darkMode: boolean
    noOfPumps: number
    taxRate: number
    maxGasQty: number
    maxFoodQty: number
    gasCapacity: number
  }
  foodTypes: Array<{name:string,type:string,price:number,qty:number,sizes:Array<{name:string,price:number}>}>
  layout:{
    alert:string
    overlay:string
    message:any
  }
  payment:{
    card:boolean
    paymentProcessing: boolean
  }
  user:{
    userName:{first:string,last:string}
    admin:boolean
  }
  total: number
  merchTotal: number
  discount: number
}

export const GasContext = createContext<GasStore>('GasContext')
export default component$(()=>{
useStyles$(globalStyles);

const GasStore = useStore({
    gasTypes:[
        {name:'unleaded', price:4.23, qty:0, octane:87, pump:0, stock:4005},
        {name:'midgrade', price:4.82, qty:0, octane:89, pump:0, stock:3650},
        {name:'super', price:5.43, qty:0, octane:91, pump:0, stock:4900}
    ],
    gasSales:[
      {day:'mon',
      super: 602,
      midGrade: 930,
      unleaded: 2560
      },
      {day: 'tue',
      super: 620,
      midGrade: 1540,
      unleaded: 3250
      },
      {day: 'wed',
      super: 700,
      midGrade: 1900,
      unleaded: 3800
      },
      {day: 'thu',
      super: 600,
      midGrade: 1800,
      unleaded: 3120
      },
      {day: 'fri',
      super: 1120,
      midGrade: 2300,
      unleaded: 4120
      },
      {day: 'sat',
      super: 1000,
      midGrade: 2420,
      unleaded: 4020
      },
      {day: 'sun',
      super: 1700,
      midGrade: 1600,
      unleaded: 2600
      }
    ],
    foodTypes:[
      {name:'Pizza Slice', type:'Pizza', price:2.49, qty:0},
      {name:'Big Diesel Sausage', type:'Hot Dog',price:4.99,qty:0},
      {name:'Gas Mc-Double', type:'Burger',price:6.79,qty:0},
      {name:'Coffee', type:'Coffee',price:.99,qty:0,sizes:[{price:.99,name:'Sm'},{price:1.29,name:'Md'},{price:1.89,name:'Lg'}]},
      {name:'Tea', type:'Coffee',price:1.09,qty:0,sizes:[{price:1.09,name:'Sm'},{price:1.89,name:'Md'},{price:2.09,name:'Lg'}]},
      {name:'Fountain Drink', type:'Soda',price:1.39,qty:0,sizes:[{price:1.39,name:'Sm'},{price:1.99,name:'Md'},{price:2.29,name:'Lg'}]}
    ],
    settings:{
      darkMode: false,
      noOfPumps: 4,
      taxRate: 7,
      maxFoodQty: 20,
      maxGasQty: 200,
      gasCapacity: 15000
    },
    layout:{
      alert:'',
      overlay:'',
      message: null
    },
    payment:{
      card:true,
      paymentProcessing: false,
    },
    user:{
      userName:{first:'Nigel',last:'Nomad'}

    },
    total:0,
    merchTotal:0,
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
      <body lang="en" class='bg-neutral-200'>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});


