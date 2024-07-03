import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "@/components/ui/toaster"

function App() {
  const {loading} =useAuth()

  return (
    <div className="myapp">
     { loading && <p className="text-2xl">Loading</p> }
     { !loading && <AppRouter />}
     <Toaster />
    </div>
  );
}

export default App;
