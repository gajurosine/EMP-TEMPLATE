import { useEffect, useState, useRef } from "react";

import logo from "../assets/images/logostudent.png";
import "../assets/scss/login.scss";
import toast from "react-hot-toast";
import AppServices from "../services";
import Modal from "../components/Modal";

import { loadUser, selectIsLoggedIn } from "../store/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, SetEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [password, SetPassword] = useState("");
  const [admin, setAdmin] = useState({});
  const dispatch = useDispatch();

  const childRef = useRef(null);

  const toggleModal = () => {
    if (childRef.current) childRef.current.toggleModal();
  };
  dispatch(loadUser());
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");

    } else {
      dispatch(loadUser());
    }
  }, [isLoggedIn]);

  const onChangeEmail = (e) => {
    SetEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    SetPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (submitted) return;
    setSubmitted(true);

    toast.promise(AppServices.login({ email, password }), {
      loading: "Logging in ...",
      success: (response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch(loadUser());
        }
        navigate("/");
        setSubmitted(false);
        return "Login in successfully";
      },
      error: (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSubmitted(false);
        return message;
      },
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (admin.password !== admin.confirmPassword)
      return toast.error("passwords should match");

    if (submitted) return;
    setSubmitted(true);

    toast.promise(
      AppServices.register({ ...admin, confirmPassword: undefined }),
      {
        loading: "Registering ...",
        success: () => {
          toggleModal();
          setSubmitted(false);
          return "successful to register";
        },
        error: (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setSubmitted(false);
          if (message.includes("required pattern"))
            if (message.includes("phone")) return "invalid phone number";
            else return "invalid nationalId";
          return message;
        },
      }
    );
  };

  return (
    <div className="bg-[#0F5A65] h-screen flex justify-center">
      <div className="form bg-main flex max-w-md w-screen h-max justify-center p-8 m-auto">
        <form className="text-center" onSubmit={handleLogin}>
          <img src={logo} className="mb-8 h-1/6 mx-auto" alt="" />
          <div className="title mb-3">
            Hello, <br />
            <div className="small">Welcome Back!</div>
          </div>
          <div className="input-container  mb-8 focus:border-black-500">
            <input
              onChange={onChangeEmail}
              className="bg"
              placeholder="example@gmail.com"
              type="text"
              name=""
              id=""
              />
          </div>
          <div className="input-container focus:border-black-700 mb-3">
            <input
              onChange={onChangePassword}
              className="bg"
              placeholder="password"
              type="password"
              name=""
              id=""
            />
          </div>
          <div className="input-container  mb-8">
            <input
              className="submit bg-[#0F5A65] rounded-sm  text-main cursor-pointer"
              type="submit"
              value="submit"
            />
          </div>
          <div
            onClick={toggleModal}
            className="input-container  mb-[-60px] cursor-pointer"
          >
            Don't have an account? <span className="underline">Create Account</span>
          </div>
        </form>
      </div>
      <Modal
        ref={childRef}
        width="767px"
        children={
          <div>
            <div className="modal-title text-center text-green-700 my-9">Signup</div>
            <div className="modal-body">
              <form>
                <div className="">
                  <div className="px-4 py-5 bg-[#F5F5F5] sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              firstName: e.target.value || "",
                            });
                          }}
                          type="text"
                          id="first-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-800 block w-full shadow-sm sm:text-sm border-black-900 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-black-700"
                        >
                          Last name
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              lastName: e.target.value || "",
                            });
                          }}
                          type="text"
                          id="first-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({ ...admin, email: e.target.value || "" });
                          }}
                          type="email"
                          id="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({ ...admin, phone: e.target.value || "" });
                          }}
                          type="text"
                          id="phone"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="nid"
                          className="block text-sm font-medium text-gray-700"
                        >
                          NationalId
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              nationalId: e.target.value || "",
                            });
                          }}
                          type="string"
                          id="nid"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium text-gray-70"
                        >
                          Position
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              position: e.target.value || "",
                            });
                          }}
                          type="string"
                          id="nid"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-gray-70"
                        >
                          Department
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              department: e.target.value || "",
                            });
                          }}
                          type="string"
                          id="nid"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-70"
                        >
                          Password
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              password: e.target.value || "",
                            });
                          }}
                          type="password"
                          id="password"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm Password
                        </label>
                        <input
                          onChange={(e) => {
                            setAdmin({
                              ...admin,
                              confirmPassword: e.target.value || "",
                            });
                          }}
                          type="password"
                          id="confirmPassword"
                          className="mt-9 focus:ring-indigo-00 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" ">
                    <button type="submit" hidden></button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer my-14">
              <div className="flex justify-center">
                <button className="cancel mr-9 text-green-700" onClick={toggleModal}>
                  Login
                </button>
                <button onClick={handleRegister} className=" text-green-700">Submit</button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Login;
