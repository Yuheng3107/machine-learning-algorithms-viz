import Hamburger from "hamburger-react";

export default function Header({
  isVisible,
  setVisibility,
}: {
  isVisible: boolean;
  setVisibility: (value: boolean) => void;
}) {
  return (
    <div className="h-[8vh] bg-[#38bdf8] mb-2 flex items-center px-2 justify-between xl:items-center">
      <h2 className="px-4 text-lg text-[#eff6ff]">
        Visualizing K-Means Clustering
      </h2>
      <div className="sm:hidden">
        <Hamburger
          toggled={isVisible}
          onToggle={setVisibility}
          color="#eff6ff"
        ></Hamburger>
      </div>
    </div>
  );
}
