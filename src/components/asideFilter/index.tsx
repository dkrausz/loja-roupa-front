import {PriceSlider} from "../priceSlider";

interface AsideFilterProps {
  minMax: [number, number];
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export function AsideFilter({minMax, priceRange, setPriceRange}: AsideFilterProps) {
  return (
    <aside className="w-80 border-solid border-zinc-300 border-2 p-4 h-72  rounded-lg mr-8">
      <PriceSlider label={"Preço"} setPriceRange={setPriceRange} priceRange={priceRange} minMax={minMax} />
      <div className="mt-6 flex flex-col items-center">
        <h3>Tamanho</h3>
        <div className="flex flex-wrap gap-4 mt-4 ">
          <div>
            <input type="checkbox" id="sizeP" name="sizeP" />
            <label htmlFor="sizeP"> P</label>
          </div>
          <div>
            <input type="checkbox" id="sizeM" name="SizeM" />
            <label htmlFor="sizeM"> M</label>
          </div>
          <div>
            <input type="checkbox" id="sizeL" name="sizeL" />
            <label htmlFor="sizeL"> G</label>
          </div>
          <div>
            <input type="checkbox" id="sizeXL" name="SizeXL" />
            <label htmlFor="sizeXL"> GG</label>
          </div>
          <div>
            <input type="checkbox" id="sizeXXL" name="SizeXXL" />
            <label htmlFor="sizeXXL"> 3G</label>
          </div>
        </div>
      </div>
    </aside>
  );
}
