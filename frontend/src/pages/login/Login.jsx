import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useLogin();  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await login(username, password);
      if(!data.error) {
        toast.success("Login Successful");
        // navigate to home page
        navigate("/");
      } else throw data.error 
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-1g shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          Login
          <span className="text-yellow-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white ">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-white"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-sm btn-block mt-2 border border-slate-700 hover:bg-blue-600 hover:text-white">
              {loading ? <div className="loading loading-spinner"></div> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
