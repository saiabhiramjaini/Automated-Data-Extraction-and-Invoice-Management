import Lottie from "lottie-react";
import errorData from "@/assets/lottie/error.json";

export const ErrorAnimation = () => {
  return (
    <div className="flex flex-col justify-center items-center h-44">
      <Lottie animationData={errorData} loop={true} className="h-28" />
      <div className="text-red-600">An error occured</div>
    </div>
  );
};
