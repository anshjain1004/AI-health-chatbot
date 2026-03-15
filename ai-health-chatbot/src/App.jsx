import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import DiseaseLibrary from "./pages/DiseaseLibrary";
import Navbar from "./components/layout/Navbar";
import DiseaseDetail from "./pages/DiseaseDetail";
import MythBuster from "./pages/MythBuster";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/diseases" element={<DiseaseLibrary />} />
        <Route path="/disease/:name" element={<DiseaseDetail />} />
        <Route path="/myths" element={<MythBuster />} />
      </Routes>
    </>
  );
}

export default App;