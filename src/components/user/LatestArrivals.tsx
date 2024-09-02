import { useData } from "../../hooks";

import type { LatestArrival, ProductResponseData } from "../../@types";
import ProductCard from "./ProductCard";

const LatestArrivals = () => {
  const { data: latestArrivals } = useData<ProductResponseData>(
    "shop/product-latest/"
  );

  return (
    <>
      {/* title */}
      <div className="text-center p-10">
        <h1 className=" text-3xl lg:text-6xl    mb-1 md:mb-4 font-ubuntu">
          Latest Arrivals
        </h1>
        {/* <h1 className="text-3xl">Tailwind CSS</h1> */}
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4 place-items-center   min-w-sm   mx-auto mt-0 md:mt-5 gap-2 lg:gap-5 ">
        {latestArrivals.map((item: ProductResponseData) => (
          <ProductCard
            id={item.id}
            brand={item.brand}
            img={item.img}
            name={item.name}
            slug={item.slug}
            categoery={item.categoery}
            colors={item.colors}
            discription={item.discription}
            min_price={item.min_price}
            key={"item-" + item.slug + item.id}
          />
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
