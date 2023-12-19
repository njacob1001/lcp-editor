import * as Pages from "@/components/pages";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages.Controls />,
    children: [
      {
        path: "datamodel/finder",
        element: <Pages.Finder />,
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
