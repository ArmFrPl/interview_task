import {Routes, Route} from "react-router-dom";
import '../styles/App.css';
import {Sidebar} from "./Sidebar";
import {MainScreen} from "./MainScreen";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainScreen />}/>
        <Route path="/boxes" element={<MainScreen />}/>
        <Route path="/clothes" element={<MainScreen />}/>
        <Route path="/hats" element={<MainScreen />}/>
        <Route path="/sinks" element={<MainScreen />}/>
        <Route path="/space" element={<MainScreen />}/>
        <Route path="/sunglasses" element={<MainScreen />}/>
        <Route path="/ties" element={<MainScreen />}/>
      </Routes>
    </div>
  );
}

export default App;
