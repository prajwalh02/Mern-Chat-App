import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          SignUp
          <span className="text-yellow-500"> ChatApp</span>
        </h1>

        <form >
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10" />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input type="text" placeholder="johndoe" className="w-full input input-bordered h-10" />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input type="text" placeholder="Enter Password" className="w-full input input-bordered h-10" />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Confirm Password</span>
            </label>
            <input type="text" placeholder="Confirm Password" className="w-full input input-bordered h-10" />
          </div>

          <GenderCheckbox />

          <a href="#" className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-gray-100">
            Already have an account?
          </a>

          <div>
            <button className="btn btn-sm btn-block mt-2 border border-slate-700 hover:bg-blue-600 hover:text-white">Sign Up</button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default SignUp;