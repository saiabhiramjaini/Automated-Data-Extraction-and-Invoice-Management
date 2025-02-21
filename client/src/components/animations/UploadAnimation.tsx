import Lottie from "lottie-react";
import uploadData from "@/assets/lottie/upload.json";

export const UploadAnimation = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie animationData={uploadData} loop={true} className="h-44" />
      <div className="text-gray-600">Upload a file to see the Data</div>
    </div>
  );
};
