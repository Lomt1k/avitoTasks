import { lazy, Suspense, useEffect } from "react";
import { Header } from "./components";
import { LoadingPage } from "./pages/LoadingPage";
import { Navigate, Route, Routes } from "react-router";
import { useBoards } from "./hooks";
import RootStore from "./store/RootStore";

const LazyNotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LazyIssuesPage = lazy(() => import('./pages/IssuesPage'));
const LazyBoardsPage = lazy(() => import('./pages/BoardsPage'));
const LazyBoardPage = lazy(() => import('./pages/BoardPage'));

function App() {
  // Инфа о досках нам нужна на любой странице проекта
  const { data } = useBoards();
  useEffect(() => RootStore.boards.setBoards(data), [data]);

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="*" element={<LazyNotFoundPage />} />
          <Route path="/" element={<Navigate to='/issues' replace />} />
          <Route path="/issues" element={<LazyIssuesPage />} />
          <Route path="/boards" element={<LazyBoardsPage />} />
          <Route path="/board/:id" element={<LazyBoardPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;
