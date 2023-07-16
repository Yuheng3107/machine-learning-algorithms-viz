import ScatterPlot from "./ScatterPlot";
import { Point } from "./ScatterPlot";
import { useEffect, useState } from "react";

export default function KMeansVisualization() {
  const [points1, setPoints1] = useState<Point[]>([]);
  const [points2, setPoints2] = useState<Point[]>([]);
  const [noisyPoints, setNoisyPoints] = useState<Point[]>([]);
  const [centroid1, setCentroid1] = useState({ x: 1, y: 1 });
  const [centroid2, setCentroid2] = useState({ x: 3, y: 3 });

  useEffect(() => {
    // generate the data by adding noise to predefined centroids
    generateData(centroid1, centroid2, 20);
    // after we are done generating the data, we start pick two random values for the centroids,
    // and use k means clustering to find the centroids
    setCentroid1({ x: Math.random(), y: Math.random() });
    setCentroid2({ x: Math.random(), y: Math.random() });
  }, []);

  const getDistanceFromCentroid = (point: Point, centroid: Point) => {
    // helper function to calculate distance
    let x = point.x - centroid.x;
    let y = point.y - centroid.y;
    // Euclidean Distance between two points
    let distance = Math.sqrt(x ** 2 + y ** 2);
    return distance;
  };
  const calculateNewCentroid = (group: Point[]) => {
    let x = group.reduce((sum, point) => sum + point.x, 0) / group.length;
    let y = group.reduce((sum, point) => sum + point.y, 0) / group.length;
    return { x, y };
  };
  const kMeansClustering = () => {
    // we first assign every point to a centroid depending on which centroid is closer
    let group1: Point[] = [];
    let group2: Point[] = [];
    noisyPoints.forEach((point) => {
      if (
        getDistanceFromCentroid(point, centroid1) <
        getDistanceFromCentroid(point, centroid2)
      ) {
        // means point is closer to centroid 1, we assign it to centroid1
        group1.push(point);
        setPoints1(group1);
      } else {
        group2.push(point);
        setPoints2(group2);
      }
    });
    // calculate average of the points
    setCentroid1(calculateNewCentroid(group1));
    setCentroid2(calculateNewCentroid(group2));
  };
  const generateData = (centroid1: Point, centroid2: Point, n: number) => {
    // function adds noise to both centroids to generate n data points for each centroid
    let noisyPoints1 = Array.from({ length: n }, () => {
      let x, y;
      Math.random() > 0.5
        ? (x = centroid1.x + Math.random())
        : (x = centroid1.x - Math.random());
      Math.random() > 0.5
        ? (y = centroid1.y + Math.random())
        : (y = centroid1.y - Math.random());
      return { x, y };
    });
    let noisyPoints2 = Array.from({ length: n }, () => {
      let x, y;
      Math.random() > 0.5
        ? (x = centroid2.x + Math.random())
        : (x = centroid2.x - Math.random());
      Math.random() > 0.5
        ? (y = centroid2.y + Math.random())
        : (y = centroid2.y - Math.random());
      return { x, y };
    });
    setNoisyPoints(noisyPoints1.concat(noisyPoints2));
  };

  return (
    <div style={{ width: "100vh", height: "100vh" }}>
      <ScatterPlot
        centroid1={centroid1}
        centroid2={centroid2}
        points1={points1}
        points2={points2}
        noisyPoints={noisyPoints}
      ></ScatterPlot>
      <button onClick={kMeansClustering}>Start K Means Clustering</button>
    </div>
  );
}
