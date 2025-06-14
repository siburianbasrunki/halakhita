import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import { HomeView } from "./pages/Home";
import Converter from "./pages/Converter";
import { AboutView } from "./pages/About";
import { QuizView } from "./pages/Quiz";
import { AksaraView } from "./pages/Aksara";
import MatchingGame from "./pages/MatchingGame";

function App() {
  return (
    <>
      <SplashScreen />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/convertor" element={<Converter />} />
        <Route path="/aksara" element={<AksaraView />} />
        <Route path="/about" element={<AboutView/>} />
        <Route path="/mini-quiz" element={<QuizView />} />
        <Route path="/mini-game" element={<MatchingGame />} />
      </Routes>
      <Nav />
    </>
  );
}

export default App;
