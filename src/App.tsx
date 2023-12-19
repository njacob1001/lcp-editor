import * as Pages from "@/components/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages.Controls />,
    children: [
      {
        path: ":moduleType/finder/:finderId?",
        element: <Pages.Finder />,
      },
      {
        path: ":moduleType/editor/:finderId",
        element: <Pages.EditorDataModel />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
