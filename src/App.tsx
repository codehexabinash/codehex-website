import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import { MainLayout } from "./layouts/main-layout";
import { Home } from "./pages/home";
import { Services } from "./pages/services";
import { Contact } from "./pages/contact";
import { CaseStudies } from "./pages/case-studies";
import { About } from "./pages/about";
import { Testimonials } from "./pages/testimonials";
import { Blog } from "./pages/blog";
import { AdminDashboard } from "./pages/admin/dashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="about" element={<About />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="blog" element={<Blog />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
