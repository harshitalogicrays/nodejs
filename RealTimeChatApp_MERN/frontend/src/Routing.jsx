import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";

const router =createBrowserRouter([
    {path:'/',element:<App/>,
        children:[
            {path:'',element:<Home/>,
                children:[
                    {path:'',element:<Login/>},
                    {path:'login',element:<Login/>},
                    {path:'register',element:<Register/>}
                ]
            },
           
        ]
    },
    {path:"*",element:<PageNotFound/>}
])

export default router