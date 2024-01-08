import { Link, useLocation } from "react-router-dom";
import UserIcon from "../../assets/icons/UserIcon";
import { useContext } from "react";
import { UserContext } from "../../UserContext"


export default function AccountAdmin() {
  const { pathname } = useLocation();
  const { logout, user } = useContext(UserContext);

  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
  }

  function linkClasses(type = null) {
    let classes = 'flex py-2 px-8 gap-2 text-white hover:bg-primary ';
    if (type === subpage) {
      classes += 'bg-lightPrimary';
    }
    return classes;
  }

  return (
    <nav className="left-0 top-0 h-full flex flex-col justify-between custom-gradient-admin">
      <div>
        <div className="flex flex-col items-center gap-2 mt-10">
          <div className="p-4 rounded-full bg-lightPrimary mt-20 ">
            <UserIcon size={35} color={"white"}></UserIcon>
          </div>
          <p className="text-white font-semibold">{user?.name}</p>
        </div>
        <ul className="py-6">
          <Link to="/dashboard">
            <div className={linkClasses("profile")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <div>panel</div>
            </div>
          </Link>
        </ul>
        <div className="w-full p-8">
          <button className="bg-lightPrimary w-full text-white p-2 rounded-xl text-center" onClick={logout}>
            Log Ud
          </button>
        </div>
      </div>
    </nav>
  )
}