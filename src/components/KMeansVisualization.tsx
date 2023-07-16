import ScatterPlot from "./ScatterPlot";
import { Point } from "./ScatterPlot";
import { useEffect, useState } from "react";
export default function KMeansVisualization() {
  const [points1, setPoints1] = useState<Point[]>([]);
  const [points2, setPoints2] = useState<Point[]>([]);
  const centroid1 = { x: 0, y: 0 };
  const centroid2 = { x: 2, y: 2 };
  useEffect(() => {
    generateData(centroid1, centroid2, 20);
  }, []);
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

  return (
    <div style={{ width: "100vh" }}>
      <ScatterPlot
        centroid1={centroid1}
        centroid2={centroid2}
        points1={points1}
        points2={points2}
      ></ScatterPlot>
    </div>
  );
}
