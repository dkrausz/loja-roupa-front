import img from "../../assets/calca.png";
import {TemplatePage} from "../Template";
import {useContext, useEffect, useState} from "react";
import {ControllerContext, Product} from "../../providers/controllerContext";
import {Card} from "../../components/cardList/card";
import {AsideFilter} from "../../components/asideFilter";
import {useSearchParams} from "react-router-dom";

interface ProductsPageProps {
  pageTitle?: string;
}

export function ProductsPage({pageTitle = "Shop"}: ProductsPageProps) {
  const perPage = 20;
  const [page, setPage] = useState(1);
  const {getProducts} = useContext(ControllerContext);
  const [filteredProducts, setFiteredProducts] = useState<Array<Product>>([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState<Array<Product>>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]); //useSearchParams?
  const [minMax, setMinMax] = useState<[number, number]>([0, 0]);

  const [searchParams, setSearchParams] = useSearchParams({minPrice: "0", maxPrice: "0"});

  const searchProducts = searchParams.get("searchProduct");

  const updateProducts = () => {
    const newProductList = allProductsLoaded.filter((product) => product.price <= priceRange[1] * 100 && product.price >= priceRange[0] * 100);
    setFiteredProducts(newProductList);
  };

  const getURLParams = (maxPrice: number): [number, number] => {
    let min = Number(searchParams.get("minPrice"));
    let max = Number(searchParams.get("maxPrice"));

    if (min < 0 || min > maxPrice) min = 0;
    if (max < min || max > maxPrice || max == 0) max = maxPrice;

    return [min, max];
  };

  const updateURLParms = ([min, max]: [number, number]) => {
    setSearchParams((prev) => {
      prev.set("minPrice", min.toString());
      prev.set("maxPrice", max.toString());
      return prev;
    });
  };

  const updateMinMaxPrices = (data: Product[]) => {
    let maxPrice: number = 0;
    maxPrice = data[0].price;
    for (const product of data) {
      if (product.price > maxPrice) {
        maxPrice = product.price;
      }
    }
    maxPrice = Number((maxPrice / 100).toFixed(2));
    setMinMax(() => {
      return [0, maxPrice];
    });

    return maxPrice;
  };

  const loadProducts = async () => {
    const searchQuery = searchProducts ? searchProducts : undefined;
    const data = await getProducts(page, perPage, searchQuery);
    setAllProductsLoaded(() => {
      return data;
    });

    const maxPrice = updateMinMaxPrices(data);
    const filterMinMax = getURLParams(maxPrice);

    setPriceRange(() => {
      return filterMinMax;
    });
    updateURLParms(filterMinMax);
  };

  const loadMoreTwenty = async () => {
    const tempPage = page + 1;
    setPage(page + 1);

    const data = await getProducts(tempPage, perPage);
    setAllProductsLoaded((prevProducts) => {
      const updatedProducts = [...prevProducts, ...data];
      return updatedProducts;
    });

    const tempProducts = [...allProductsLoaded, ...data];
    updateProducts();
    updateMinMaxPrices(tempProducts);
  };

  useEffect(() => {
    loadProducts();
  }, [searchProducts]);

  useEffect(() => {
    updateProducts();
    if (priceRange[1] != 0) {
      updateURLParms(priceRange);
    }
  }, [priceRange]);

  return (
    <>
      <TemplatePage>
        <div className="flex flex-col   mx-auto p-4">
          <h2 className="text-center my-12 text-4xl font-medium ">{pageTitle}</h2>
          <main className="flex mx-8 my-4">
            <AsideFilter minMax={minMax} priceRange={priceRange} setPriceRange={setPriceRange} />
            <div className=" w-5/6 flex flex-col ">
              <ul className=" grid grid-cols-4 gap-8">
                {filteredProducts.map((card) => {
                  const abrevDescription = `${card.description.substring(0, 40)} ...`;
                  return <Card key={card.publicId} id={card.publicId} name={card.name} description={abrevDescription} img={img} price={card.price} />;
                })}
              </ul>

              <button className="border-2 p-1 w-32 h-10 my-8  mx-auto rounded-2xl border-neutral-800" onClick={() => loadMoreTwenty()}>
                Ver mais
              </button>
            </div>
          </main>
        </div>
      </TemplatePage>
    </>
  );
}
