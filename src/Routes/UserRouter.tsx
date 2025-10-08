import Homepage from "@/Pages/User/Home/Home";
import Error from "../Components/Error";
import LayoutPage from "../Pages/User/LayoutPage/LayoutPage";
import Quran from "@/Pages/User/Quran/Quran";


const UserRouters = [
  {
      path:"/",
        element: (
            <>
           <LayoutPage />
            </>
        ),
    children: [
      {
        path: "/",
        element: <Homepage/>
      },
      {
        path: "/quran",
        element: <Quran/>
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];

export default UserRouters;