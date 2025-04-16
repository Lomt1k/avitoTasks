import { lazy, Suspense } from "react";
import { Header } from "./components";
import { LoadingPage } from "./pages/LoadingPage";
import { Navigate, Route, Routes } from "react-router";

const LazyNotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LazyIssuesPage = lazy(() => import('./pages/IssuesPage'));
const LazyBoardsPage = lazy(() => import('./pages/BoardsPage'));

function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="*" element={<LazyNotFoundPage />} />
          <Route path="/" element={<Navigate to='/issues' replace />} />
          <Route path="/issues" element={<LazyIssuesPage />} />
          <Route path="/boards" element={<LazyBoardsPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;
