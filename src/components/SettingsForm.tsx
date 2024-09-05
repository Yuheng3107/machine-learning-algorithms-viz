import Select from "react-select";

const centroidsOptions = Array.from({ length: 3 }, (_, i) => ({
  value: String(i + 2),
  label: String(i + 2),
}));

const dataPointsOptions = Array.from({ length: 6 }, (_, i) => ({
  value: String(15 + i * 5),
  label: String(15 + i * 5),
}));

const noiseScalingFactorOptions = Array.from({ length: 6 }, (_, i) => ({
  value: String(roundToNearestDp(0.2 + i * 0.2)),
  label: String(roundToNearestDp(0.2 + i * 0.2)),
}));

// to fix floating point no issue
function roundToNearestDp(num: number) {
  return Math.round(num * 10) / 10;
}

export default function SettingsForm({
  setCentroidCount,
  setDataPointsPerCentroid,
  setNoiseScaleFactor,
  isDisabled,
  loss,
  setVisibility,
}: {
  setCentroidCount: (value: number) => void;
  setDataPointsPerCentroid: (value: number) => void;
  setNoiseScaleFactor: (value: number) => void;
  isDisabled: boolean;
  loss: string;
  setVisibility?: (value: boolean) => void;
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
        By default, 20 data points are generated per centroid.
      </h2>
      <h3 className="p-3">Choose the number of centroids you want:</h3>
      <Select
        defaultValue={centroidsOptions[0]}
        options={centroidsOptions}
        onChange={(selectedOption) => {
          setCentroidCount(Number(selectedOption?.value));
          setVisibility?.(false);
        }}
        isDisabled={isDisabled}
      ></Select>
      <h2 className="p-3">Choose the number of data points per centroid:</h2>
      <Select
        options={dataPointsOptions}
        defaultValue={dataPointsOptions[1]}
        onChange={(selectedOption) => {
          setDataPointsPerCentroid(Number(selectedOption?.value));
          setVisibility?.(false);
        }}
        isDisabled={isDisabled}
      ></Select>
      <h2 className="p-3">Choose the scaling factor for noise added:</h2>
      <Select
        options={noiseScalingFactorOptions}
        defaultValue={noiseScalingFactorOptions[2]}
        onChange={(selectedOption) => {
          setNoiseScaleFactor(Number(selectedOption?.value));
          setVisibility?.(false);
        }}
        isDisabled={isDisabled}
      ></Select>
      {loss !== "" && (
        <h2 className="p-3 text-xl">
          Current loss for algorithm:{" "}
          <span className="font-bold underline">{loss}</span>
        </h2>
      )}
    </div>
  );
}
