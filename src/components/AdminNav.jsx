import { NavLink } from "react-router-dom";

function AdminNav() {
     
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-10 font-bold">
            <NavLink
                to="/admin/profile"
                className={({isActive}) => (isActive ? 'dark:text-white border-b-4 border-white' : 'text-zinc-800 dark:text-zinc-400')}
            >
                Profile
            </NavLink>

            <NavLink
                to="/admin/update-password"
                className={({isActive}) => (isActive ? 'dark:text-white border-b-4 border-white' : 'text-zinc-800 dark:text-zinc-400')}
            >
                Update Password
            </NavLink>
        </div>
    )
}

export default AdminNav