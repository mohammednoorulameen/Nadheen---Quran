import Homepage from "@/Pages/User/Home/Home";
import Error from "../Components/Error";
import LayoutPage from "../Pages/User/LayoutPage/LayoutPage";
import Quran from "@/Pages/User/Quran/Quran";
// import GetSurah from "@/Pages/User/Surah/GetSurah";
import SurahPage from "@/Pages/User/Surah/GetSurah";
import SettingsPage from "@/Pages/User/Settings/Settings";
import CounterPage from "@/Pages/User/Counter/Counter";
import SurahInfoPage from "@/Pages/User/Surah/[Number]/SurahInfo";




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
        path: "/surah/:number",
        element: <SurahPage/>
      },
       {
        path: "/counter",
        element: <CounterPage/>
      },
       {
        path: "/surah/:surahNumber/info",
        element: <SurahInfoPage/>
      },
      {
        path: "/settings",
        element: <SettingsPage/>
      },
     
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];

export default UserRouters;