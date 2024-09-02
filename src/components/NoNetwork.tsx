import noNetwork from "../assets/lotties/noNetwork.json";
import Lottie, { Options } from "react-lottie";

interface Props {
  reasone: string;
}

const options: Options = {
  loop: true,
  autoplay: true,
  animationData: noNetwork,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NoNetwork = ({ reasone }: Props) => {
  return (
    <div className="flex  flex-row  md:flex-col items-center      w-full  gap-4  md:gap-1 ">
      <div className="w-24 h-24 md:w-40 md:h-40 lg:w-44 lg:h-44 ">
        <Lottie options={options} />
      </div>
      <div className=" flex   flex-col items-center justify-center  gap-1   ">
        <h1 className="text-lg md:text-3xl text-center ">No Network</h1>
        <p className="text-sm md:text-xl   line-clamp-3">{reasone}</p>
      </div>
    </div>
  );
};

export default NoNetwork;
