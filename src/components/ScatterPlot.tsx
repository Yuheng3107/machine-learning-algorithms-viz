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
  centroid1: Point;
  centroid2: Point;
  points1: Point[];
  points2: Point[];
  noisyPoints: Point[];
}

export default function ScatterPlot({
  centroid1,
  centroid2,
  points1,
  points2,
  noisyPoints,
}: ScatterPlotProps) {
  let renderLegend =
    noisyPoints.length !== 0 && points1.length === 0 && points2.length === 0;
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
            name="Unknown Points"
            data={noisyPoints}
            fill="#1e40af"
            legendType={renderLegend ? "circle" : "none"}
          ></Scatter>
        }
        {points1.length !== 0 && (
          <Scatter
            name="Points 1"
            data={points1}
            fill="#dc2626"
            isAnimationActive={false}
          />
        )}
        {points2.length !== 0 && (
          <Scatter
            name="Points 2"
            data={points2}
            fill="#0284c7"
            isAnimationActive={false}
          />
        )}

        <Scatter
          name="Centroid 1"
          data={[centroid1]}
          fill="#dc2626"
          shape="wye"
          legendType="wye"
        ></Scatter>
        <Scatter
          name="Centroid 2"
          data={[centroid2]}
          fill="#0284c7"
          shape="wye"
          legendType="wye"
        ></Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
