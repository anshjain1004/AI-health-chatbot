import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import DiseaseLibrary from "./pages/DiseaseLibrary";
import Navbar from "./components/layout/Navbar";
import MythBuster from "./pages/MythBuster";
import { ChatHistory } from "./pages/ExtraPages";
import { AboutUs } from "./pages/ExtraPages";
import { ModelStats } from "./pages/ExtraPages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Landing />} />
        <Route path="/chat"     element={<Chat />} />
        <Route path="/diseases" element={<DiseaseLibrary />} />
        <Route path="/myths"    element={<MythBuster />} />
        <Route path="/history"  element={<ChatHistory />} />
        <Route path="/about"    element={<AboutUs />} />
        <Route path="/model"    element={<ModelStats />} />
      </Routes>
    </>
  );
}

export default App;