import ScatterPlot from "./ScatterPlot";
import { Point } from "./ScatterPlot";
import { useEffect, useState } from "react";

export default function KMeansVisualization() {
  const [points1, setPoints1] = useState<Point[]>([]);
  const [points2, setPoints2] = useState<Point[]>([]);
  // this stores the points corresponding to each centroid
  // points[i][j] stores the jth point of the ith centroid, starting index from 0
  const [points, setPoints] = useState<Point[][]>([]);
  // the noisy points are the points we are going to generate from the centroids by adding noise to them
  // noisy points are FIXED
  const [noisyPoints, setNoisyPoints] = useState<Point[]>([]);
  // centroids[i] stores the x, y points of the ith centroid
  const [centroids, setCentroids] = useState<Point[]>([
    { x: 1, y: 1 },
    { x: 3, y: 3 },
  ]);
  const [centroid1, setCentroid1] = useState({ x: 1, y: 1 });
  const [centroid2, setCentroid2] = useState({ x: 3, y: 3 });
  const [centroidCount, setCentroidCount] = useState(2);

  // count will store the index of the iteration, it starts from 0, -1 means iteration is not yet started
  const [count, setCount] = useState<number>(-1);

  const generateCentroids = () => {
    // function to generate centroids
    // for best visualisation we hard code positions of 4 centroids
    const positions = [
      { x: 1, y: 1 },
      { x: 3, y: 3 },
      { x: 1, y: 3 },
      { x: 3, y: 1 },
    ];

    setCentroids(positions.slice(0, centroidCount));
  };

  // this hook is used for data generation
  useEffect(() => {
    // generate centroids depending on centroid count
    generateCentroids();

    // generate the data by adding noise to predefined centroids, putting 10 data points for each centroid
    generateData(20);
    // after we are done generating the data, we start pick random values for the centroids,
    // and use k means clustering to find the centroids
    for (let i = 0; i < centroidCount; i++) {
      // this sets each centroid to a random value
      setCentroids([...centroids, { x: Math.random(), y: Math.random() }]);
    }
  }, [centroidCount]);

  // this hook is used for rendering the assigning of points in k-means clustering
  useEffect(() => {
    // ideally, we want the dots to render one at a time, so we shall break up K means clustering to do it step by step

    // if count is -1, means the iteration is completed/has not started -> stable state, don't execute anything
    if (count == -1) return;

    const point = noisyPoints[count];

    // we want to assign each point to the nearest centroid

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

    if (count == noisyPoints.length - 1) {
      // we have completed iterating through all the points
      // calculate average of the points
      setCentroid1(calculateNewCentroid(points1));
      setCentroid2(calculateNewCentroid(points2));
      // reset to -1 to break out of infinite loop
      setCount(-1);
      return;
    }
    setTimeout(() => setCount(count + 1), 100);
  });

  const getDistanceFromCentroid = (point: Point, centroid: Point) => {
    // helper function to calculate distance
    const x = point.x - centroid.x;
    const y = point.y - centroid.y;
    // Euclidean Distance between two points
    const distance = Math.sqrt(x ** 2 + y ** 2);
    return distance;
  };
  const calculateNewCentroid = (group: Point[]) => {
    const x = group.reduce((sum, point) => sum + point.x, 0) / group.length;
    const y = group.reduce((sum, point) => sum + point.y, 0) / group.length;
    return { x, y };
  };
  const kMeansClustering = () => {
    // we assign every point to a centroid depending on which centroid is closer
    // this is done in useEffect to make sure each point renders individually

    // we set count to 0 to start the infinite loop that will break once we have iterated through all the points
    setCount(0);
  };

  const generateData = (n: number) => {
    // function adds noise to both centroids to generate n data points for each centroid
    let noisyPointsArray: Point[] = [];
    for (let i = 0; i < centroidCount; i++) {
      // iterate through each centroid, generating noisy points []
      const noisyPoints = Array.from({ length: n }, () => {
        let x, y;
        // noise added allows points to be +-1 from centroid
        Math.random() > 0.5
          ? (x = centroids[i].x + Math.random())
          : (x = centroids[i].x - Math.random());
        Math.random() > 0.5
          ? (y = centroids[i].y + Math.random())
          : (y = centroids[i].y - Math.random());

        // check that it doesn't exceed points of (0,0) (4,4), setting it to the closer bound
        x = Math.max(0, Math.min(x, 4));
        y = Math.max(0, Math.min(y, 4));
        return { x, y };
      });
      noisyPointsArray = noisyPointsArray.concat(noisyPoints);
    }
    setNoisyPoints(noisyPointsArray);
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
        <div className="flex justify-center">
          <button
            onClick={kMeansClustering}
            className="bg-[#38bdf8] p-2 rounded-md text-[#eff6ff]"
          >
            Start 1 Iteration of the Algorithm
          </button>
        </div>
      </div>
    </div>
  );
}
