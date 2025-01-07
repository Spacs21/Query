import { useRoutes } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Layout from "../pages/layout/Layout"

const Routers = () => {
  return (
    <>
    {
        useRoutes([
            {
                path: "/",
                element: <Layout/>,
                children: [
                    {
                        path: "/",
                        element: <Home/>
                    },
                    {
                        path: "/about",
                        element: <About/>
                    },
                    {
                        path: "*",
                        element: <div className="text-white justify-center items-center h-[88vh] w-full">
                            <div className="flex justify-center items-center h-full flex-col gap-2">
                                <h2 className="text-5xl">404</h2>
                                <p>This page does not exist...</p>
                            </div>
                        </div>
                    }
                ]   
            },
        ])
    } 
</>
  )
}

export default Routers