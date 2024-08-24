import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="bg-customYellow py-11">
      <div className="bg-white w-11/12 mx-auto rounded-xl px-16">
        <Header />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
