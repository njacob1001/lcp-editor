import { Controls } from "@/components/pages/controls";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Controls />,
    children: [
      {
        path: "finder",
        element: <div>1</div>,
      },
      {
        path: "editor",
        element: <div>2</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
