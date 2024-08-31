import Select from "react-select";

const options = Array.from({ length: 3 }, (_, i) => ({
  value: String(i + 2),
  label: String(i + 2),
}));

export default function Form({
  setCentroidCount,
}: {
  setCentroidCount: (value: number) => void;
}) {
  return (
    <div className="lg:w-1/4">
      <h2 className="p-3">
        Default settings are 2 centroids, at positions (1,1) and (3,3)
      </h2>
      <h3>Choose the number of centroids you want:</h3>
      <Select
        defaultValue={options[0]}
        options={options}
        onChange={(selectedOption) => {
          setCentroidCount(Number(selectedOption?.value));
        }}
      ></Select>
    </div>
  );
}
