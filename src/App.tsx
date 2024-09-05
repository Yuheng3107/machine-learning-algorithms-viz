import KMeansVisualization from "./components/KMeansVisualization";
import Header from "./components/Header";
import { useState } from "react";
function App() {
  // this is used to set visibility of the settings form in mobile, when settings form is visible, viz will be hidden
  const [isVisible, setVisibility] = useState<boolean>(false);
  return (
    <div className="flex-col">
      <Header isVisible={isVisible} setVisibility={setVisibility}></Header>
      <KMeansVisualization
        isVisible={isVisible}
        setVisibility={setVisibility}
      ></KMeansVisualization>
    </div>
  );
}

export default App;
