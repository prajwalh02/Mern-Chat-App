import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup, { handleInputErrors } from "../../hooks/useSignup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formInitialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  gender: "",
}

const SignUp = () => {
  const [inputs, setInputs] = useState(formInitialState);
  const navigate = useNavigate();


  const {loading, signup} = useSignup()

  const handleFormData = (key, value) => {
    setInputs({...inputs, [key]: value})
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // error handling
      handleInputErrors(inputs);
      // call signup api
      const response = await signup(inputs);
      console.log(response);
      if(!response.error) {
        toast.success("Sign up Successfull");
        // navigate to home page
        navigate("/");
      } else throw response.error
    } catch (error) {
       toast.error(error.message)
    } finally{
       resetForm()
    }
    
  };

  const resetForm = () => {
    setInputs(formInitialState)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          SignUp
          <span className="text-yellow-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => handleFormData("fullName", e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => handleFormData("username", e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => handleFormData("password", e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => handleFormData("confirmPassword", e.target.value)}
            />
          </div>

          <GenderCheckbox onCheckboxChange = {handleFormData} selectedGender={inputs.gender} />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-gray-100"
          >
            Already have an account?
          </Link>

          <div>
            <button className={`btn btn-sm btn-block mt-2 border border-slate-700 hover:text-white ${!loading ? "hover:bg-blue-600" : ""}`}>
              {loading ? <div className="loading loading-spinner"></div> : "Sign Up" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
