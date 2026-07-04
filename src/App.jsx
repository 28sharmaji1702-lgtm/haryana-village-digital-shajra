import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import VillagePage from "./pages/VillagePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Coverage from "./pages/Coverage";
import NotFound from "./pages/NotFound";
import BackButton from "./components/BackButton";
function App() {
  return (
    <>
      <ScrollToTop />
 <BackButton />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/village/:code"
          element={<VillagePage />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/coverage"
          element={<Coverage />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;