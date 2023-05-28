import { useTransmission } from "@/hooks/use-transmission";
import Home from "@/pages/home";
import Login from "@/pages/login";

function App() {
  const { isLoggedIn } = useTransmission();

  if (isLoggedIn === false) {
    return <Login />;
  }

  return <Home />;
}

export default App;
