import { Outlet } from "react-router-dom"

function FormLayout({children}) {
  return (
    <div className="bg-white dark:bg-slate-800 py-6 px-5 rounded-xl mt-10 md:mt-0 shadow-2xl">
        {children}
    </div>
  )
}

export default FormLayout
