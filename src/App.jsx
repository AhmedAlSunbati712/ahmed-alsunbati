import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { BlogIndex } from "./pages/BlogIndex/BlogIndex";
import { BlogPost } from "./pages/BlogPost/BlogPost";
import { Toaster } from "@/components/Toaster/Toaster";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter basename={import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="blog" element={<BlogIndex />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </>
  );
}

export default App;