import Slider from "rc-slider";
import {SliderProps} from "rc-slider";
import "rc-slider/assets/index.css";

interface MySliderProps extends SliderProps {
  label?: string;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  priceRange: [number, number];
  minMax: [number, number];
}

export function PriceSlider({setPriceRange, priceRange, label, minMax}: MySliderProps) {
  const fomatedMaxPrice = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(priceRange[1]);
  const fomatedMinPrice = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(priceRange[0]);

  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setPriceRange([values[0], values[1]] as [number, number]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {label && (
        <p>
          {label}: {fomatedMinPrice} - {fomatedMaxPrice}
        </p>
      )}
      {minMax[1] ? <Slider range defaultValue={priceRange} onChangeComplete={handleRangeChange} min={minMax[0]} max={minMax[1]} allowCross={false} /> : null}
    </div>
  );
}
