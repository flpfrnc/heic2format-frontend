import Footer from "./components/Footer";
import GithubCorner from "./components/GithubCorner";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <main className="bg-[#FEDEA9] min-w-[100vw]">
      <GithubCorner />
      <Header />
      <Home />
      <Footer />
    </main>
  );
}

export default App;
