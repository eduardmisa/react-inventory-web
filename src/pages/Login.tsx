import {
  Link, useNavigate
} from "react-router-dom";
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useServiceFactoryContext } from '../contexts/ServiceFactoryContext';
import UnauthorizedLayout from "../layouts/UnauthorizedLayout";

const Login = () => {
  const { serviceFactory } = useServiceFactoryContext();
  const authenticationService = serviceFactory.authService;

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleForm = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, ...{ [event.target.id]: event.target.value } });
  }

  const submit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await authenticationService.loginUser(form);
      navigate('/');

    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <>
      {/* <head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}
      <main>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true"/>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input value={form.username} onChange={handleForm} id="username" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input value={form.password} onChange={handleForm} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm flex items-center">
                  <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Create your account
                  </Link>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-indigo-700 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button onClick={submit} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default UnauthorizedLayout(Login)