
import { createBrowserRouter} from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../page/home/Home/Home";
import AthenticationLayOut from "../layout/AthenticationLayOut";
import Login from "../page/home/Home/Authentication/Login/Login";
import RegisterForm from "../page/home/Home/Authentication/Register/RegisterForm";
import Coverage from "../page/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Rootlayout,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
          path:'coverage',
          Component:Coverage,
          loader:()=>fetch('./serviceCenter.json')
        },
    ]
 },
 //authentication router setup
 {
  path:'/',
  Component:AthenticationLayOut,
  children:[
    {
      path:'login',
      Component:Login,
    },
     {
      path:'register',
      Component:RegisterForm,
    },
  ]
 },
]);