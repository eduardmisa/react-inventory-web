
import AuthorizedLayout from '../layouts/AuthorizedLayout';

function Dashboard() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="m-auto content-center">
          <span className="text-5xl text-indigo-100 font-bold">Dashboard</span>
        </div>
      </div>
    </>
  )
}

export default AuthorizedLayout(Dashboard)