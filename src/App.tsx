import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExplorePage from "./components/ExploreInterface/ExplorePage/ExplorePage";

const router = createBrowserRouter([
  { path: "/", element: <div>This is the Home page</div> },
  { path: "explore", element: <ExplorePage /> },
  { path: "*", element: <div>Error 404: Page not Found</div> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
