import KMeansVisualization from "./components/KMeansVisualization";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex-col">
      <Header></Header>
      <KMeansVisualization></KMeansVisualization>
    </div>
  );
}

export default App;
