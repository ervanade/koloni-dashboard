import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Discovery from "./pages/Discovery";
import Analyser from "./pages/Analyser";
import Analytics from "./pages/Analytics";
import Users from "./pages/admin/Users";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Layout/ProtectedRoutes";
import Faq from "./pages/Faq";
import Logs from "./pages/admin/Logs";
import Favorites from "./pages/admin/Favorites";
import Credits from "./pages/admin/Credits";
import HistoryAnalyser from "./pages/history/HistoryAnalyser";
import HistoryDiscovery from "./pages/history/HistoryDiscovery";

function App() {
  const [count, setCount] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/analyser" element={<Analyser />} />
              {/* <Route path="/analytics" element={<Analytics />} /> */}
              <Route path="/history" element={<History />} />
              <Route path="/history/analyser/:id" element={<HistoryAnalyser />} />
              <Route path="/history/discovery/:id" element={<HistoryDiscovery type="filter" />} />
              <Route path="/history/similiar/:id" element={<HistoryDiscovery type="similiar" />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/users" element={<Users />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/faq" element={<Faq />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
