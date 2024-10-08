import { useWindowDimensions } from "../../hooks";

import type { ProductResponseData as Props } from "../../@types";
import VariationCard from "./VariationCard";
import { Link } from "react-router-dom";

const ProductCard = ({
  name,
  img,
  categoery,
  brand,
  colors,
  min_price,
  slug,
}: Props) => {
  console.log(slug);
  const { width } = useWindowDimensions();

  return (
    <div className="bg-white shadow-md font-ubuntu   group duration-500 overflow-hidden w-72   rounded-2xl  ">
      <Link to={`/single/${slug}/`}>
        <img
          src={img}
          alt="Product image"
          className={`${
            width < 769 ? "object-fill w-full h-80  " : "portrait"
          }`}
        />
      </Link>
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
        <p className="text-lg text-c  md:text-lg text-center text-black group-hover:text-pretty truncate block capitalize  ">
          {name}
        </p>
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {categoery}
        </span>

        {colors.length != 0 && (
          <VariationCard slug={slug} colors={colors} min_price={min_price} />
        )}

        <div className="flex items-center">
          {/* <div className="ml-auto">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
