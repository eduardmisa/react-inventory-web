import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FallbackPageSpinner from "./components/shared/FallbackPageSpinner";
import { ProductCreateContextProvider } from "./contexts/ProductCreateContext";
import { ServiceFactoryContext } from './contexts/ServiceFactoryContext';

const Dashboard = lazy(() =>  import("./pages/Dashboard"));
const Register = lazy(() =>  import('./pages/Register'));
const Login = lazy(() =>  import('./pages/Login'));
const PageNotFound = lazy(() =>  import("./pages/PageNotFound"));
const Location = lazy(() =>  import("./pages/maintenance/Location"));
const Category = lazy(() =>  import("./pages/maintenance/Category"));
const Vendor = lazy(() =>  import("./pages/maintenance/Vendor"));
const ProductBoard = lazy(() =>  import("./pages/product/ProductBoard"));
const Collection = lazy(() =>  import("./pages/maintenance/Collection"));
const ProductCreate = lazy(() =>  import("./pages/product/ProductCreate"));

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

              <Route path="/products" element={<ProductBoard/>} />

              <Route path="/products/create"
                     element={
                        <ProductCreateContextProvider>
                          <ProductCreate/>
                        </ProductCreateContextProvider>
              }/>

              <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ServiceFactoryContext>
  );
}

export default App;
