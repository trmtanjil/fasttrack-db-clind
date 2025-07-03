
import { createBrowserRouter} from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../page/home/Home/Home";
import AthenticationLayOut from "../layout/AthenticationLayOut";
import Login from "../page/home/Home/Authentication/Login/Login";
import RegisterForm from "../page/home/Home/Authentication/Register/RegisterForm";
import Coverage from "../page/Coverage/Coverage";
import PrivetRoute from "../routes/PrivetRoute";
import SendParcel from "../page/SendParcel/SendParcel";
import DeshBoardLayOut from "../layout/DeshBoardLayOut";
import MyParchels from "../page/DesgBoard/MyParchels/MyParchels";
import Payment from "../page/DesgBoard/Payment/Payment";

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
        {
          path:'sendparcel',
          element:<PrivetRoute><SendParcel></SendParcel></PrivetRoute>,
          loader:()=>fetch('./serviceCenter.json')

        }
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
 //deshbosar routs
 {
  path:'/deshboard',
  element:<PrivetRoute>
    <DeshBoardLayOut></DeshBoardLayOut>
  </PrivetRoute>,
  children:[
   { path:'myparchels',
    Component:MyParchels,
  },
  {
    path:'payment/:id',
    Component:Payment,
  },
  ]
 },
]);