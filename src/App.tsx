import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FallbackPageSpinner from "./components/shared/FallbackPageSpinner";
import { ProductCreateContextProvider } from "./contexts/product/ProductCreateContext";
import { ServiceFactoryContext } from './contexts/ServiceFactoryContext';
import {SiteContextProvider} from "./contexts/site/SiteContext";
import {SiteComponentContextProvider} from "./contexts/site_component/SiteComponentContext";

const Dashboard = lazy(() =>  import("./pages/Dashboard"));
const Register = lazy(() =>  import('./pages/Register'));
const Login = lazy(() =>  import('./pages/Login'));
const PageNotFound = lazy(() =>  import("./pages/PageNotFound"));
const Location = lazy(() =>  import("./pages/maintenance/Location"));
const Category = lazy(() =>  import("./pages/maintenance/Category"));
const Vendor = lazy(() =>  import("./pages/maintenance/Vendor"));
const InventoryBoard = lazy(() =>  import("./pages/inventory/InventoryBoard"));
const ProductBoard = lazy(() =>  import("./pages/product/ProductBoard"));
const Collection = lazy(() =>  import("./pages/maintenance/Collection"));
const ProductCreate = lazy(() =>  import("./pages/product/ProductCreate"));

const Site = lazy(() =>  import("./pages/site/index"));
const SiteComponent = lazy(() =>  import("./pages/site_component"));

function App() {
  return (
    <ServiceFactoryContext>
      <BrowserRouter>
        <Suspense fallback={<FallbackPageSpinner/>}>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={<Dashboard/>} />

              <Route path="/categories" element={<Category/>} />
              <Route path="/locations" element={<Location/>} />
              <Route path="/vendors" element={<Vendor/>} />
              <Route path="/collections" element={<Collection/>} />

              <Route path="/inventory" element={<InventoryBoard/>} />
              <Route path="/products" element={<ProductBoard/>} />

              <Route path="/products/create"
                     element={
                        <ProductCreateContextProvider>
                          <ProductCreate/>
                        </ProductCreateContextProvider>
              }/>

            <Route path="/site"
                   element={
                     <SiteContextProvider>
                       <Site/>
                     </SiteContextProvider>
            }/>

            <Route path="/component"
                   element={
                     <SiteComponentContextProvider>
                       <SiteComponent/>
                     </SiteComponentContextProvider>
                   }/>

              <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ServiceFactoryContext>
  );
}

export default App;
