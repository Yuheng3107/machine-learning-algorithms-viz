import ScatterPlot from "./ScatterPlot";
import { Point } from "./ScatterPlot";
import SettingsForm from "./SettingsForm";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

// to remove dependency on centroids
const centroidPositions = [
  { x: 1, y: 1 },
  { x: 3, y: 3 },
  { x: 1, y: 3 },
  { x: 3, y: 1 },
];
export default function KMeansVisualization() {
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
  // centroidCount stores how many centroids we WANT
  const [centroidCount, setCentroidCount] = useState(2);
  // count will store the index of the iteration, it starts from 0, -1 means iteration is not yet started
  const [count, setCount] = useState<number>(-1);
  // dataPointsPerCentroid stores how many data points we want per centroid
  const [dataPointsPerCentroid, setDataPointsPerCentroid] = useState(20);
  // scaling factor
  const [noiseScaleFactor, setNoiseScaleFactor] = useState(0.6);

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
    // when settings change we want to rerun the data generation

    // generate centroids depending on centroid count
    generateCentroids();
    // after centroids are generated, data will automatically update, as we add a hook for it
    generateData();
    // need to set points
    const pointsArray = [];
    for (let i = 0; i < centroidCount; i++) {
      pointsArray.push([]);
    }
    setPoints(pointsArray);
  }, [centroidCount, dataPointsPerCentroid, noiseScaleFactor]);

  // this hook is used for generating the centroids
  useEffect(() => {
    // after we are done generating the data (when noisyPoints changes), we start pick random values for the centroids,
    // and use k means clustering to find the centroids
    const centroidArray: Point[] = [];
    for (let i = 0; i < centroidCount; i++) {
      // this sets each centroid to a random value
      centroidArray.push({
        x: Math.random() * (i + 1),
        y: Math.random() * (i + 1),
      });
    }
    setCentroids(centroidArray);
  }, [noisyPoints]);
  // this hook is used for rendering the assigning of points in k-means clustering
  useEffect(() => {
    // ideally, we want the dots to render one at a time, so we shall break up K means clustering to do it step by step

    // if count is -1, means the iteration is completed/has not started -> stable state, don't execute anything
    if (count == -1) return;

    const point = noisyPoints[count];

    // we want to assign each point to the nearest centroid

    // we find the nearest centroid first
    let nearestCentroidIndex = -1;
    let distance = Infinity;

    for (let i = 0; i < centroidCount; i++) {
      const centroid_distance = getDistanceFromCentroid(point, centroids[i]);
      if (centroid_distance < distance) {
        distance = centroid_distance;
        nearestCentroidIndex = i;
      }
    }

    // remove the point from its previous centroid
    // we do it naively by filtering all the points in that centroid
    const pointsArray = [];
    for (let i = 0; i < centroidCount; i++) {
      pointsArray.push(
        points[i].filter((p) => p.x != point.x && p.y != point.y)
      );
    }
    // assign it to the nearest centroid
    pointsArray[nearestCentroidIndex].push(point);
    setPoints(pointsArray);

    if (count == noisyPoints.length - 1) {
      // we have completed iterating through all the points
      // calculate average of the points, and set them as the new centroids
      const centroidsArray = [];
      for (let i = 0; i < centroidCount; i++) {
        centroidsArray.push(calculateNewCentroid(points[i]));
      }
      setCentroids(centroidsArray);
      // reset to -1 to break out of the loop
      setCount(-1);
      return;
    }
    setTimeout(() => setCount(count + 1), 100);
  }, [count]);

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

    // we set count to 0 to start the loop that will break once we have iterated through all the points
    setCount(0);
  };
  const generateData = () => {
    // function adds noise to both centroids to generate n data points for each centroid
    let noisyPointsArray: Point[] = [];
    for (let i = 0; i < centroidCount; i++) {
      // iterate through each centroid, generating noisy points []
      const noisyPoints = Array.from({ length: dataPointsPerCentroid }, () => {
        let x = -1;
        let y = -1;
        // keep rerolling so that its not 0 or 4, for a more uniform distribution
        while (x < 0 || y < 0 || x > 4 || y > 4) {
          // noise added allows points to be +-1 from centroid
          Math.random() > 0.5
            ? (x = centroidPositions[i].x + Math.random() * noiseScaleFactor)
            : (x = centroidPositions[i].x - Math.random() * noiseScaleFactor);
          Math.random() > 0.5
            ? (y = centroidPositions[i].y + Math.random() * noiseScaleFactor)
            : (y = centroidPositions[i].y - Math.random() * noiseScaleFactor);
        }

        return { x, y };
      });
      noisyPointsArray = noisyPointsArray.concat(noisyPoints);
    }
    setNoisyPoints(noisyPointsArray);
  };

  return (
    <div className="flex-col justify-center">
      <div className="h-[80vh] w-screen flex-col justify-center items-center m-2 p-2">
        <div className="h-full w-full flex">
          <div className="hidden md:block w-1/3">
            <SettingsForm
              setCentroidCount={setCentroidCount}
              setDataPointsPerCentroid={setDataPointsPerCentroid}
              setNoiseScaleFactor={setNoiseScaleFactor}
              isDisabled={count !== -1}
            ></SettingsForm>
          </div>
          <div className="w-screen">
            <ScatterPlot
              centroids={centroids}
              points={points}
              noisyPoints={noisyPoints}
            ></ScatterPlot>
            <div className="flex justify-center">
              {count === -1 ? (
                <button
                  onClick={kMeansClustering}
                  className="bg-[#38bdf8] p-2 rounded-md text-[#eff6ff]"
                >
                  Start 1 Iteration
                </button>
              ) : (
                <RotatingLines
                  visible={true}
                  width="24"
                  strokeWidth="5"
                  strokeColor="grey"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden w-full mt-10 p-2 px-10 mb-4">
        <SettingsForm
          setCentroidCount={setCentroidCount}
          setDataPointsPerCentroid={setDataPointsPerCentroid}
          setNoiseScaleFactor={setNoiseScaleFactor}
          isDisabled={count !== -1}
        ></SettingsForm>
      </div>
    </div>
  );
}
