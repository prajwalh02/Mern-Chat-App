import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-1g shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          Login
          <span className="text-yellow-500"> ChatApp</span>
        </h1>

        <form action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10" />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white ">Password</span>
            </label>
            <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
          </div>

          <Link to="/signup" className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-white">
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-sm btn-block mt-2 border border-slate-700 hover:bg-blue-600 hover:text-white">Login</button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default Login;