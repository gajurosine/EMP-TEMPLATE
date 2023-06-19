import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import activeHome from "../../assets/images/white-home-icon.svg";
import home from "../../assets/images/blued-home-icon.svg";
import user_ from "../../assets/images/user.svg";
import activeUser from "../../assets/images/active-user.svg";
import department from "../../assets/images/cluster.svg";
import activeDepartment from "../../assets/images/active-cluster.svg";
import "../../assets/scss/dashboardLayout.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { selectUser, logout, loadUser } from "../../store/modules/authSlice";
import Modal from "../Modal";
import toast from "react-hot-toast";
import AppServices from "../../services";
import { useDispatch, useSelector } from "react-redux";

const DashboardLayout = ({ children }) => {
  const childRef = useRef(null);

  const toggleModal = () => {
    if (childRef.current) childRef.current.toggleModal();
  };

  const [menuStatus, setMenuStatus] = useState(false);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState({});
  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
  };
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(loadUser());
      setLoaded(true);
    } else if (!user) {
      navigate("/login");
    }
  }, [loaded]);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  useEffect(() => {
    if (sidebarStatus) {
      toggleSidebar();
    }
  }, [useLocation().pathname]);

  const updateUser = () => {
    toast.promise(AppServices.updateUser(admin, user?.id), {
      loading: "Updating account ...",
      success: (response) => {
        dispatch(loadUser());
        toggleModal();
        return "Account updated successfully";
      },
      error: (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if (message.includes("required pattern"))
          if (message.includes("phone")) return "invalid phone number";
          else return "invalid nationalId";
        return message;
      },
    });
  };

  return (
    <>
      <div className="flex">
        <div
          className={`full-height sidebar ${
            sidebarStatus ? "absolute" : "hidden"
          } md:block`}
        >
          <div id="logo" className="flex justify-center">
            <img alt="Coat of Arms of Rwanda logo" src={logo} />
          </div>
          <ul className="list-reset text-left flex flex-col h-4/6">
            <li className="dropdown" id="dropdown">
              <NavLink
                className={`link-item colored-link ${
                  useLocation().pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                <img
                  src={useLocation().pathname === "/" ? activeHome : home}
                  alt=""
                />
                <span className="menu-link">Home</span>
              </NavLink>
            </li>
            <li className="dropdown" id="dropdown">
              <NavLink
                className={`link-item colored-link ${
                  useLocation().pathname === "/users" ? "active" : ""
                }`}
                to="/employees"
              >
                <img
                  src={
                    useLocation().pathname === "/employees" ? activeUser : user_
                  }
                  alt=""
                />
                <span className="menu-link">Employee</span>
              </NavLink>
            </li>
            <li className="dropdown" id="dropdown">
              <NavLink
                className={`link-item colored-link ${
                  useLocation().pathname === "/departments" ? "active" : ""
                }`}
                to="/laptops"
              >
                <img
                  src={
                    useLocation().pathname === "/laptops"
                      ? activeDepartment
                      : department
                  }
                  alt=""
                />
                <span className="menu-link">Laptops</span>
              </NavLink>
            </li>
          </ul>
          <div
            className="dropdown mt-auto relative flex h-1/4"
            id="dropdown"
            onClick={toggleMenu}
          >
            {menuStatus ? (
              <div className="absolute">
                <button
                  onClick={() => {
                    toggleModal();
                    if (user)
                      setAdmin({
                        names: user.names,
                        email: user.email,
                        phone: user.phone,
                        nationalId: user.nationalId,
                      });
                  }}
                >
                  Settings
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              ""
            )}
            <div className="avatar">
              <div className="mt-2">{user?.names ? user?.names[0] : ""}</div>
            </div>
            <div className="user-name ml-2 mt-1">
              {user?.names?.split(" ")[0]} ...
            </div>
          </div>
        </div>
        <div className=" full-height w-full bg-customBg">{children}</div>
      </div>
      <Modal
        ref={childRef}
        width="767px"
        children={
          <div>
            <div className="modal-title text-center my-10">Settings</div>
            <div className="modal-body">
              <form>
                <div className="">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Names`
                        </label>
                        <input
                          defaultValue={user?.names}
                          onChange={(e) => {
                            setAdmin({ ...admin, names: e.target.value || "" });
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
                          defaultValue={user?.email}
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
                          defaultValue={user?.phone}
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
                          defaultValue={user?.nationalId}
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
                      {/* <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <input defaultValue={""} onChange={(e) => { setAdmin({ ...admin, password: e.target.value || "" }) }} type="password" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                      <input defaultValue={""} onChange={(e) => { setAdmin({ ...admin, confirmPassword: e.target.value || "" }) }} type="password" id="confirmPassword" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div> */}
                    </div>
                  </div>
                  <div className="">
                    <button type="submit" hidden></button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer my-10">
              <div className="flex justify-center">
                <button className="cancel mr-9" onClick={toggleModal}>
                  Cancel
                </button>
                <button onClick={updateUser}>Submit</button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default DashboardLayout;
