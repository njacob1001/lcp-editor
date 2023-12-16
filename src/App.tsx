import { Controls } from "@/components/pages/controls";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
