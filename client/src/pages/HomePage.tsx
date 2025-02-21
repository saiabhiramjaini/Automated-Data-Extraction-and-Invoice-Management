import { TabBar } from "@/components/TabBar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/features/data/dataActions";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "@/assets/lottie/animation.json";

export const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch: any = useDispatch();

  const state = useSelector((state: any) => state.data);
  console.log(state);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(fetchData(selectedFile));
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Title Section */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            Automated Data Extraction and Invoice Management
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
                How It Works
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li> 1. 📂 Upload your invoice file (Excel, PDF, or Image)</li>
                <li> 2. 🤖 Our AI will extract all the relevant details </li>
                <li> 3. 🔍 View your organized data in the tabs below</li>
              </ul>

              <div className="flex justify-center items-center">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="h-32"
                />
              </div>
            </div>

            {/* File Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
                Upload your file
              </h2>

              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 ">
                      Excel, PDF, or Image files
                    </p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf, .jpg, .jpeg, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    className="hidden"
                  />
                </label>
              </div>

              {selectedFile && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Selected File: {selectedFile.name}
                </p>
              )}

              <div className="flex justify-center mt-4">
                <Button onClick={handleUpload} disabled={!selectedFile}>
                  Extract Data
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
              Extracted Data
            </h2>
            <TabBar />
          </div>
        </div>
      </div>
    </div>
  );
};
