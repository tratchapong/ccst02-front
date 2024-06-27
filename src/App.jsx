import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const {loading} = useAuth()
  return (
    <div className="myapp">
      { loading && <p className="text-2xl">Loading...</p>}
      { !loading && <AppRouter /> }
    </div>
  );
}

export default App;
