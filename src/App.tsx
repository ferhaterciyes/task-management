import AppRouter from "./router";
import Navbar from "./components/organisms/Navbar.tsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
