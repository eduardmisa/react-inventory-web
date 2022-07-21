import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="m-auto content-center">
          <span className="text-5xl text-red-700 font-bold">4 0 4 <span className="text-gray-500 font-normal">|</span></span>
          <span className="text-3xl ml-2 text-gray-500">Page not found</span>
          <br />
          <br />
          <Link to="/" className="text-md font-extralight text-gray-500 hover:underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
