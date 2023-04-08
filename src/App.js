import * as React from "react";
import AppThemeProvider from "./theme/ThemeProvider.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./components/AppBar";
import { useEffect } from "react";

import { restdbGet } from "./utils/api_client";
import { Routes, Route } from "react-router-dom";
//Pages
import Home from "./Pages/Home";
import Overview from "./Pages/Overview";
import Boldface from "./Pages/Boldface";
import Quiz from "./Pages/Quiz";
import Settings from "./Pages/Settings";
import Ably from "./utils/ablyWebSocket";

//recoil
import { useSetRecoilState } from "recoil";
import { QnBnkAtom } from "./state/quizState";
import { RecordsAtom } from "./state/recordsState";
import { BoldfaceAtom } from "./state/bfState";

import boldfaces from "./utils/bf.json";

const App = (props) => {
  const setRS = useSetRecoilState(RecordsAtom);
  const setQnBnk = useSetRecoilState(QnBnkAtom);
  const setBF = useSetRecoilState(BoldfaceAtom);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    getData(
      "records",
      '/records?q={}&h={"$orderby": {"Valid": -1, "User": 1 }}'
    );
    getData("QnBank", "/quiz");
    setBF(boldfaces);
  });

  const getData = async (hdr, query) => {
    const data = await restdbGet(query);
    //console.log(data);
    switch (hdr) {
      case "records":
        setRS(data);
        break;
      case "QnBank":
        setQnBnk(data);
        break;
      default:
      // code here
    }
  };
  return (
    <AppThemeProvider>
      <CssBaseline />
      <Ably />
      <AppBar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Overview" element={<Overview />} />
          <Route path="Boldface" element={<Boldface />} />
          <Route path="Quiz" element={<Quiz />} />
          <Route path="Settings" element={<Settings />} />
        </Routes>
      </React.Suspense>
    </AppThemeProvider>
  );
};

export default App;
