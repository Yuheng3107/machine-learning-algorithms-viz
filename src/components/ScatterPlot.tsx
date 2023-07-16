import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
  Cross,
} from "recharts";

interface Point {
  x: number;
  y: number;
}

interface ScatterPlotProps {
  centroid1: Point;
  centroid2: Point;
  points1: Point[];
  points2: Point[];
}
export default function ScatterPlot({
  centroid1,
  centroid2,
  points1,
  points2,
}: ScatterPlotProps) {
  <ResponsiveContainer width="100%" height="100%">
    <ScatterChart>
      <CartesianGrid />
      <XAxis />
      <YAxis />
      <Scatter name="Points 1" data={points1} fill="#dc2626" />
      <Scatter name="Points 2" data={points2} fill="#0284c7" />
      <ReferenceDot {...centroid1} fill="#dc2626" shape={<Cross />} />
      <ReferenceDot {...centroid2} fill="#0284c7" shape={<Cross />} />
    </ScatterChart>
  </ResponsiveContainer>;
}
