import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Controls } from "./components/pages/controls";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Controls />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
