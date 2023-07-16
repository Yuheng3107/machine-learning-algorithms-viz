import ScatterPlot from "./ScatterPlot";
import { Point } from "./ScatterPlot";
import { useEffect, useState } from "react";

export default function KMeansVisualization() {
  const [points1, setPoints1] = useState<Point[]>([]);
  const [points2, setPoints2] = useState<Point[]>([]);
  const [noisyPoints, setNoisyPoints] = useState<Point[]>([]);
  const [centroid1, setCentroid1] = useState({ x: 1, y: 1 });
  const [centroid2, setCentroid2] = useState({ x: 3, y: 3 });
  const [i, setI] = useState<number>(-1);
  useEffect(() => {
    // generate the data by adding noise to predefined centroids
    generateData(centroid1, centroid2, 20);
    // after we are done generating the data, we start pick two random values for the centroids,
    // and use k means clustering to find the centroids
    setCentroid1({ x: Math.random(), y: Math.random() });
    setCentroid2({ x: Math.random(), y: Math.random() });
  }, []);

  useEffect(() => {
    // ideally, we want the dots to render one at a time, so we shall break up K means clustering to do it step by step

    if (i == -1) return;
    let point = noisyPoints[i];
    if (
      getDistanceFromCentroid(point, centroid1) <
      getDistanceFromCentroid(point, centroid2)
    ) {
      // means point is closer to centroid 1, we assign it to centroid1
      // if point in points 2, remove it
      setPoints2(points2.filter((p) => p.x !== point.x && p.y !== point.y));
      // make sure point is added to points1
      setPoints1([
        ...points1.filter((p) => p.x !== point.x && p.y !== point.y),
        point,
      ]);
    } else {
      // means point is closer to centroid 2, we assign it to centroid 2
      // if point in points 1, remove it
      setPoints1(points1.filter((p) => p.x !== point.x && p.y !== point.y));
      // make sure point is added to points2
      setPoints2([
        ...points2.filter((p) => p.x !== point.x && p.y !== point.y),
        point,
      ]);
    }
    if (i == noisyPoints.length - 1) {
      // we have completed iterating through all the points
      // calculate average of the points
      setCentroid1(calculateNewCentroid(points1));
      setCentroid2(calculateNewCentroid(points2));
      // reset to -1 to break out of infinite loop
      setI(-1);
      return;
    }
    setTimeout(() => setI(i + 1), 100);
  });

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
    // we assign every point to a centroid depending on which centroid is closer
    // this is done in useEffect to make sure each point renders individually
    setI(0);
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
    <div className="flex justify-center">
      <div className="h-[80vh] lg:w-3/5 w-screen flex-col justify-center items-center">
        <ScatterPlot
          centroid1={centroid1}
          centroid2={centroid2}
          points1={points1}
          points2={points2}
          noisyPoints={noisyPoints}
        ></ScatterPlot>
        <button onClick={kMeansClustering}>Start K Means Clustering</button>
      </div>
    </div>
  );
}
