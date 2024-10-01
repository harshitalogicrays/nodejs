import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routing.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {ChakraProvider} from '@chakra-ui/react'
import ChatProvider from './ChatProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
<ChakraProvider>
    <RouterProvider router={router}/>
 </ChakraProvider>,
)
