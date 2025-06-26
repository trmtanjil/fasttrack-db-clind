
import { createBrowserRouter} from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../page/home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Rootlayout,
    children:[
        {
            index:true,
            Component:Home,
        }
    ]
 },
]);