import { component$, useContextProvider, useContext, createContext, useStore, useStyles$} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';


interface GasStore{
    price: number
    discount:number
  }

export const GasContext = createContext<GasStore>('GasContext')
export default component$(()=>{
  useStyles$(globalStyles);
  useContextProvider(
    GasContext,
    useStore<GasStore>({
      price:23.32,
      discount:0
    })
  )  

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
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
