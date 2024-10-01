import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./ChatProvider";

const router =createBrowserRouter([
    {path:'/',element:<ChatProvider><App/></ChatProvider>,
        children:[
            {path:'',element:<Home/>,
                children:[
                    {path:'',element:<Login/>},
                    {path:'login',element:<Login/>},
                    {path:'register',element:<Register/>},
                ]
            },
           {path:'/chats',element:<ChatPage/>}
        ]
    },
    {path:"*",element:<PageNotFound/>}
])

export default router