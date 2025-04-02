import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
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

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 3) error = "Full name must be at least 3 characters";
        break;
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (value.length < 4) error = "Username must be at least 4 characters";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== inputs.password) error = "Passwords do not match";
        break;
      case "gender":
        if (!value) error = "Please select a gender";
        break;
      default:
        break;
    }
    return error;
  };

  const handleFormData = (key, value) => {
    setInputs({...inputs, [key]: value})
    // Remove the error when user starts typing 
    setErrors(prev => ({
      ...prev,
      [key]: ""
    }));
  }

  const handleBlur = (key, value) => {
    // Validate the field when the user leaves the field
    const error = validateField(key, value);
    setErrors(prev => ({
      ...prev,
      [key]: error
    }));
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      // Validate all fields
      const formErrors = {};
      Object.keys(inputs).forEach(key => {
        const error = validateField(key, inputs[key]);
        if (error) formErrors[key] = error;
      });

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        throw new Error("Please fix all errors before submitting");
      }

      // call signup api
      const response = await signup(inputs);
      console.log(response);
      if(!response.error) {
        toast.success("Sign up Successfull");
        resetForm(); // Only reset form on successful signup
        navigate("/");
      } else throw response.error
    } catch (error) {
       toast.error(error.message)
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
              className={`w-full input input-bordered h-10 ${errors.fullName ? 'input-error' : ''}`}
              value={inputs.fullName}
              onChange={(e) => handleFormData("fullName", e.target.value)}
              onBlur={(e) => handleBlur("fullName", e.target.value)}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}

          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className={`w-full input input-bordered h-10 ${errors.username ? 'input-error' : ''}`}
              value={inputs.username}
              onChange={(e) => handleFormData("username", e.target.value)}
              onBlur={(e) => handleBlur("username", e.target.value)}
            />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className={`w-full input input-bordered h-10 ${errors.password ? 'input-error' : ''}`}
              value={inputs.password}
              onChange={(e) => handleFormData("password", e.target.value)}
              onBlur={(e) => handleBlur("password", e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
              className={`w-full input input-bordered h-10 ${errors.confirmPassword ? 'input-error' : ''}`}
              value={inputs.confirmPassword}
              onChange={(e) => handleFormData("confirmPassword", e.target.value)}
              onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
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
