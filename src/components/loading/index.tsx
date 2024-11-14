import {CSSProperties} from "react";
import {MoonLoader} from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function Loading() {
  return (
    <div role="dialog" className="w-full h-screen bg-gray-950/[0.9] inset-0 z-[9999] fixed flex justify-center items-center">
      <MoonLoader color={"#1e40af"} loading={true} cssOverride={override} size={100} aria-label="Loading Spinner" speedMultiplier={0.2} data-testid="loader" />
    </div>
  );
}
