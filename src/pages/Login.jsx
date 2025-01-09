import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    captcha: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const postApiLogin = async () => {
    try {
      // Step 1: Login dan dapatkan token
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        {
          email: formData?.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access_token, refresh_token } = loginResponse.data;

      // Step 2: Gunakan access_token untuk mendapatkan data pengguna
      // const userResponse = await axios.get(
      //     `${import.meta.env.VITE_APP_API_URL}/user`,
      //     {
      //         headers: {
      //             Authorization: `Bearer ${access_token}`,
      //         },
      //     }
      // );

      const userData = loginResponse.data.user;

      // Gabungkan data token dan user
      const fullUserData = {
        ...userData,
      };

      // Simpan ke Redux dan localStorage
      dispatch(loginUser(fullUserData));
      localStorage.setItem("user", JSON.stringify(fullUserData));
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      // Redirect sesuai role atau kondisi lain
      navigate("/");
    } catch (error) {
      setError("Login gagal, Email atau Password Salah.");
      setLoading(false);
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    // navigate("/");
    postApiLogin();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({ ...prev, tanggal: event.target.value }));
  };
  return (
    <div className="w-full !dark:bg-boxdark-2 flex justify-center items-center min-h-[calc(100vh-0px)] bg-transparent object-cover bg-center py-6 !bg-[#F7F9FA]">
      <div className="flex-1 items-center justify-center px-6 hidden lg:flex">
        <img
          src="/koloni-illustration.png"
          className=" max-h-[90vh] w-auto"
          alt=""
        />
      </div>
      <div className="w-full flex-[2_2_0%] max-w-lg bg-white shadow-md rounded-md  pt-8 pb-12 mb-4 mx-6">
        <div className="px-5 sm:px-8">
          <div className="title mb-6">
            <h1 className="text-textBold text-xl sm:text-2xl mb-2 font-medium text-center">
              Welcome To KOLONI Inlfuencer Analytics!
            </h1>
            <p className="text-textThin text-sm mb-6 font-normal text-center">
              Please sign-in to your account and start the adventure
            </p>
          </div>
          <form
            className="mt-5"
            onSubmit={handleLogin}
            onKeyDown={handleKeyDown}
          >
            {error && (
              <div className="mb-3 bg-red-100 p-2 rounded-md">
                <p className="text-center text-red-500">{error}</p>
              </div>
            )}

            <div className="mb-3">
              <label
                className="block text-[#728294] text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded w-full py-3 px-3 text-[#728294] mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                type="email"
                required
                placeholder="Email Anda"
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-[#728294] text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
        "border-red-500" 
        rounded w-full py-3 px-3 text-[#728294] mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="*******"
                />
                <button
                  className="absolute right-4 top-3.5"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <FaEye size={16} className="text-bodydark2" />
                  ) : (
                    <FaEyeSlash size={16} className="text-bodydark2" />
                  )}
                </button>
              </div>
              <button
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                className="w-full bg-sky-500  text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
