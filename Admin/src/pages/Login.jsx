import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="flex items-center justify-center mt-[5%]">
      <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-[500px] w-[500px] transition-transform duration-700 ease-in-out transform hover:scale-105">
          <img
            src="https://images.pexels.com/photos/8054395/pexels-photo-8054395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Login"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-10  w-[500px]">
          <h2 className="text-xl font-bold text-gray-700 mb-5">Login</h2>
          <form className="space-y-5">
          
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d55fbb]"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d55fbb]"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#d55fbb] text-white font-bold rounded-md transition-transform duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transform hover:scale-105"
            >Login</button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <span>Don`t have an account? </span>
            <Link to="/create-account" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login