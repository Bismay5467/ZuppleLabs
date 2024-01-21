import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import FormPage from "./components/FormInterface/FormPage/FormPage";
import LoadingPage from "./components/LoadingPage";
import "./index.css";

const NotFound = lazy(() => import("./components/NotFoundPage"));
const ExplorePage = lazy(
  () => import("./components/ExploreInterface/ExplorePage/ExplorePage")
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
