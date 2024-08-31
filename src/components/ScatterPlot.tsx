import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface Point {
  x: number;
  y: number;
}

interface ScatterPlotProps {
  centroids: Point[];
  points: Point[][];
  noisyPoints: Point[];
}

const COLORS = ["#dc2626", "#0284c7", "#fc6238", "#ff5c77"];
export default function ScatterPlot({
  centroids,
  points,
  noisyPoints,
}: ScatterPlotProps) {
  const renderLegend =
    noisyPoints.length !== 0 && points.every((point) => point.length !== 0);
  console.log(centroids);
  console.log(noisyPoints);
  console.log(points[0]);

  return (
    <ResponsiveContainer width="100%" height="100%" className="-ms-5">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" domain={[0, 4]} />
        <YAxis type="number" dataKey="y" domain={[0, 4]} />
        <Legend />
        {
          <Scatter
            name="Unknown Group"
            data={noisyPoints}
            fill="#1e40af"
            legendType={renderLegend ? "circle" : "none"}
          ></Scatter>
        }
        {centroids.map((centroid, i) => {
          return (
            <Scatter
              key={`Centroid ${i + 1}`}
              name={`Centroid ${i + 1}`}
              data={[centroid]}
              fill={COLORS[i]}
              shape="wye"
              legendType="wye"
            ></Scatter>
          );
        })}
        s
        {points.map((point, i) => {
          {
            return (
              point.length !== 0 && (
                <Scatter
                  key={`Group ${i + 1}`}
                  name={`Group ${i + 1}`}
                  data={point}
                  fill={COLORS[i]}
                  isAnimationActive={false}
                />
              )
            );
          }
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
