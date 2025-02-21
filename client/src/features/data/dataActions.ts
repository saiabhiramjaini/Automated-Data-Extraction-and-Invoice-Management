import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { backendURL } from "@/config";


const readFileAsBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1];
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

export const fetchData = createAsyncThunk('fetchData', async (file: File, { rejectWithValue }) => {
    try {
        const base64String = await readFileAsBase64(file);

        const response = await axios.post(`${backendURL}/api/v1/data`, {
            fileName: file.name,
            fileData: base64String,
            mimeType: file.type 
        });

        return response.data;
    } catch (error: any) {
        console.error("Error uploading file:", error);
        return rejectWithValue(error.response?.data || "An error occurred while uploading the file.");
    }
});
