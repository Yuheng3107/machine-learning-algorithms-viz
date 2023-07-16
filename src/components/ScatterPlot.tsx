import * as d3 from "d3";

type ScatterPlotProps = {
  width: number;
  height: number;
  data: { x: number; y: number }[];
};

export default function ScatterPlot({ width, height, data }: ScatterPlotProps) {
  return (
    <div>
      <svg width={width} height={height}></svg>
    </div>
  );
}
