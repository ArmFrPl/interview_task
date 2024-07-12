import {createBrowserRouter, RouterProvider} from "react-router-dom";
import '../styles/App.css';
import {MainScreen} from "./MainScreen";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainScreen />,
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
