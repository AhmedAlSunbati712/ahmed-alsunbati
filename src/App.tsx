import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { BlogIndex } from "./pages/BlogIndex/BlogIndex";
import { BlogPost } from "./pages/BlogPost/BlogPost";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";

const RouteEffects = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document
          .querySelector(location.hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.hash, location.pathname]);

  return null;
};

function App() {
  const basename =
    import.meta.env.BASE_URL === "/"
      ? ""
      : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <BrowserRouter basename={basename}>
      <RouteEffects />
      <div className="app-frame">
        <Routes>
          <Route index element={<Home />} />
          <Route path="writing" element={<BlogIndex />} />
          <Route path="writing/:slug" element={<BlogPost />} />
          <Route path="blog/*" element={<Navigate replace to="/writing" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </div>
    </BrowserRouter>
  );
}

export default App;
