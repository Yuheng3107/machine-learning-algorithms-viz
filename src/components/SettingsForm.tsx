import Select from "react-select";

const centroidsOptions = Array.from({ length: 3 }, (_, i) => ({
  value: String(i + 2),
  label: String(i + 2),
}));

const dataPointsOptions = Array.from({ length: 6 }, (_, i) => ({
  value: String(15 + i * 5),
  label: String(15 + i * 5),
}));

export default function SettingsForm({
  setCentroidCount,
  setDataPointsPerCentroid,
}: {
  setCentroidCount: (value: number) => void;
  setDataPointsPerCentroid: (value: number) => void;
}) {
  return (
    <div className="w-full">
      <h2 className="p-3">
        <p>
          Default settings are 2 centroids, at positions (1,1) and (3,3),
          optional 3rd and 4th centroid are at (1,3) and (3,1).
        </p>
      </h2>
      <h2 className="p-3">
        By default, 10 data points are generated per centroid.
      </h2>
      <h3 className="p-3">Choose the number of centroids you want:</h3>
      <Select
        defaultValue={centroidsOptions[0]}
        options={centroidsOptions}
        onChange={(selectedOption) => {
          setCentroidCount(Number(selectedOption?.value));
        }}
      ></Select>
      <h2 className="p-3">Choose the number of data points per centroid:</h2>
      <Select
        options={dataPointsOptions}
        defaultValue={dataPointsOptions[1]}
        onChange={(selectedOption) => {
          setDataPointsPerCentroid(Number(selectedOption?.value));
        }}
      ></Select>
    </div>
  );
}
