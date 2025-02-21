import Lottie from "lottie-react";
import loadingData from "@/assets/lottie/loading.json";

export const LoadingAnimation = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie animationData={loadingData} loop={true} className="h-44" />
    </div>
  );
};
