import ScatterPlot from "./ScatterPlot";
import { Point } from "./ScatterPlot";
import { useState } from "react";
export default function KMeansVisualization() {
  const [points1, setPoints1] = useState({});
  const [points2, setPoints2] = useState({});
  const generateData = (centroid1: Point, centroid2: Point, n: number) => {
    // function adds noise to both centroids to generate n data points for each centroid
    let noisyPoints1 = Array.from({ length: n }, () => {
      let x = centroid1.x + Math.random();
      let y = centroid1.y + Math.random();
      return { x, y };
    });
    let noisyPoints2 = Array.from({ length: n }, () => {
      let x = centroid2.x + Math.random();
      let y = centroid2.y + Math.random();
      return { x, y };
    });
    setPoints1(noisyPoints1);
    setPoints2(noisyPoints2);
  };
}
