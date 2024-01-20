import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExplorePage from "./components/ExploreInterface/ExplorePage/ExplorePage";
import FormPage from "./components/FormInterface/FormPage/FormPage";
import NotFound from "./components/NotFoundpage";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <FormPage /> },
  { path: "explore", element: <ExplorePage /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
