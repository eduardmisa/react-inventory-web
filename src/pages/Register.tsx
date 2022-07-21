import { ChangeEvent, MouseEvent, useState } from 'react'
import { useServiceFactoryContext } from '../contexts/ServiceFactoryContext'
import {
  Link, useNavigate
} from "react-router-dom";
import UnauthorizedLayout from '../layouts/UnauthorizedLayout';

const Register = () => {
  const { serviceFactory } = useServiceFactoryContext();
  const authenticationService = serviceFactory.authService;

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    country: '',
    street: '',
    city: '',
    state: '',
    postal: '',
    email: '',
    password: '',
  });

  const handleForm = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, ...{ [event.target.id]: event.target.value } });
  }

  const submit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await authenticationService.registerUser({
        email_mobile: form.email,
        password: form.password,
        name: `${form.lastname}, ${form.firstname}`,
        meta: {
            ...form
        }
      });

      alert('User registered')
      navigate('/login')

    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <>
      {/* <head>
        <title>Register</title>
        <meta name="description" content="Register page" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}
      <main>
      <div className="min-h-full flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          value={form.firstname}
                          onChange={handleForm}
                          type="text"
                          name="first-name"
                          id="firstname"
                          autoComplete="given-name"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          value={form.lastname}
                          onChange={handleForm}
                          type="text"
                          name="last-name"
                          id="lastname"
                          autoComplete="family-name"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          value={form.country}
                          onChange={handleForm}
                          type="text"
                          name="country"
                          id="country"
                          autoComplete="country"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <input
                          value={form.street}
                          onChange={handleForm}
                          type="text"
                          name="street-address"
                          id="street"
                          autoComplete="street-address"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          value={form.city}
                          onChange={handleForm}
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <input
                          value={form.state}
                          onChange={handleForm}
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <input
                          value={form.postal}
                          onChange={handleForm}
                          type="text"
                          name="postal-code"
                          id="postal"
                          autoComplete="postal-code"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email*
                        </label>
                        <input
                          value={form.email}
                          onChange={handleForm}
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password*
                        </label>
                        <input
                          value={form.password}
                          onChange={handleForm}
                          type="password"
                          name="password"
                          id="password"
                          className="px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 sm:px-6 grid grid-cols-6 gap-6">
                    <div className='col-span-3 mt-2'>
                      <Link to="/login" className="font-small font-bold text-red-600 hover:text-indigo-500">
                        Back to login 
                      </Link>
                    </div>

                    <div className='col-span-3 text-right'>
                      <button
                        onClick={submit}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Register
                      </button>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </main>
    </>
  )
}

export default UnauthorizedLayout(Register)
