import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import GymTrafficDashboard from "./pages/GymTrafficDashBaord"; 
import Methodology from "./pages/Methodology"; // Import the new page

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<GymTrafficDashboard />} />
          
          {/* Methodology Route */}
          <Route path="/methodology" element={<Methodology />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;