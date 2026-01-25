
import GymTrafficDashBoard from "./GymTrafficDashBaord"; // Or whatever your main component is
import { ThemeProvider } from "@/components/ThemeProvider"; // Import the fixed provider

function App() {
  return (
    // Wrap everything in ThemeProvider
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <GymTrafficDashBoard />
    </ThemeProvider>
  );
}

export default App;