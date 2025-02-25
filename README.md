# Automated Data Extraction and Invoice Management

Automated Data Extraction and Invoice Management is a React-based web application designed for **Swipe** to automate the extraction, processing, and management of invoice data from multiple file formats. The app uses **AI-powered extraction** to organize the extracted data into three primary sections:
- **Invoices**
- **Products**
- **Customers**

The application is designed to ensure real-time synchronization using **Redux Toolkit** for consistent updates across tabs.


### Links

- **Live Website:** [Visit](https://swipe.abhiramverse.tech/)
- **Backend API:** [API Endpoint](https://swipe-server.abhiramverse.tech/api/v1/data)
- **Docker Hub:** [View Image](https://hub.docker.com/repository/docker/saiabhiramjaini/swipe-server/general)
- **GitHub Repository:** [View on GitHub](https://github.com/saiabhiramjaini/Automated-Data-Extraction-and-Invoice-Management)

### How It Works
1. 📂 Upload your invoice file (Excel, PDF, or Image)
2. 🤖 Our AI will extract all the relevant details
3. 🔍 View your organized data in the tabs below

#### **Invoices Tab**:
- **Serial Number**
- **Customer Name**
- **Product Name**
- **Quantity**
- **Tax**
- **Total Amount**
- **Date**

#### **Products Tab**: 
- **Product Name**
- **Quantity**
- **Unit Price**
- **Tax**
- **Price with Tax**
- **Discount (optional)**

#### **Customers Tab**: 
- **Customer Name**
- **Phone Number**
- **Total Purchase Amount**


### Tech Stack
#### Frontend (Client)
- React (Vite + TypeScript)
- Redux Toolkit (State Management)
- Tailwind CSS (UI Design)
- ShadCN

#### Backend (Server)
- Flask (Python)
- Google Gemini AI API (Data Extraction)
- Pandas (Data Processing)
- Flask-CORS (Cross-Origin Support)
- Docker (Containerization)

#### Infrastructure & Deployment
- AWS EC2 (t2.micro)
- Dockerized backend
- Vercel for frontend deployment










## Workflow:

![image](https://github.com/user-attachments/assets/d7719592-2280-478d-89a5-04bb7a92446b)

### **Client-Side Processing (React + Redux)**
The frontend of the application is built using **React** with **Redux** for state management. Below is the detailed workflow:

#### **1. User initiates data extraction through the UI**
- The user uploads a file through the UI.
- A button click (`onClick`) triggers the data extraction process.
- The selected file, along with its metadata, is sent to the backend for processing.

#### **2. Handling the event using Redux (onClick dispatches fetchData)**
- The `fetchData` action is dispatched when the user clicks the extract button.
- This action sends the uploaded file to the backend.

#### **3. Async Processing with createAsyncThunk**
- `createAsyncThunk` is used to handle the asynchronous API request.
- It sends a `POST` request to `/api/v1/data` with the file’s Base64-encoded data.



#### **4. Redux Store Manages Application State**
- The **global store** manages different states of the application.
- State includes:
  - **Loading state** (when API call is in progress)
  - **Success state** (data received and stored)
  - **Error state** (if API call fails)

#### **5. extraReducers Handle Different States**
- Redux handles three states of the async request:
  - **pending**: Displays a loading indicator.
  - **fulfilled**: Stores extracted data in the Redux store.
  - **rejected**: Shows an error message.


### **Server-Side Processing (Flask Backend with Gemini AI)**
The backend is implemented using **Flask** and integrates **Google Gemini AI** for data extraction.

#### **1. Endpoint `/api/v1/data` Receives POST Requests**
- The backend exposes an API endpoint (`/api/v1/data`) to handle file uploads.
- Requests contain:
  - File name
  - File MIME type
  - Base64-encoded file content

#### **2. Input Validation Ensures Data Integrity**
- The backend first checks if the required fields (`fileName`, `fileData`, `mimeType`) exist.
- If any field is missing, it returns an error response (`400 Bad Request`).


#### **3. File MIME Type Verification**
- The backend only allows specific file types (`PDF, JPG, CSV, XLSX`).
- If an unsupported file type is received, it returns an error.


#### **4. Base64 Decoding of Received Files**
- The file data received in Base64 format is decoded into bytes.


#### **5. Integration with Google Gemini AI for Processing**
- The decoded file data is sent to **Google Gemini AI**.
- A structured prompt is used to extract relevant invoice-related details.



#### **6. Response Conversion to JSON Format**
- The AI-generated response is extracted and cleaned to ensure valid JSON formatting.
- The response is returned to the client.

### **Docker Workflow and EC2(Backend Deployment)**
The backend is containerized and deployed using **Docker** on an AWS EC2 instance.

#### **1. Flask Application Containerized Using Docker**
- A **Dockerfile** is used to package the Flask application.
- The `requirements.txt` file ensures all dependencies are installed.


#### **2. Image Pushed to Docker Hub Repository**
- The Docker image is built and pushed to **Docker Hub**.


#### **3. AWS EC2 Instance Pulls Latest Image**
- On the AWS EC2 instance, the latest Docker image is pulled and run.


## Video Demonstration

[![Watch Video](https://img.youtube.com/vi/K8SXr5RFfhA/0.jpg)](https://www.youtube.com/watch?v=K8SXr5RFfhA)

[Click here to watch the video](https://www.youtube.com/watch?v=K8SXr5RFfhA)





### Installation & Setup

#### 1. Clone the Repository
```sh
git clone https://github.com/saiabhiramjaini/Automated-Data-Extraction-and-Invoice-Management.git 
cd Automated-Data-Extraction-and-Invoice-Management
```


#### 2. Setting up the Backend

##### **Environment Variables**
Before starting the backend, create a `.env` file inside the `server` directory and add the following:

```sh
GEMINI_API_KEY=your_google_gemini_api_key
```

##### **Using Docker**
```sh
docker pull saiabhiramjaini/swipe-server:latest
docker run -p 5000:5000 -d saiabhiramjaini/swipe-server:latest
```

##### **Manual Setup (Without Docker - Using Virtual Environment)**
- Navigate to the `server` directory:

   ```sh
   cd server
   ```

- Create a virtual environment:
   ```sh
   python -m venv myenv
   ```

- Activate the virtual environment:
   ```sh
   source myenv/bin/activate   # For macOS/Linux
   myenv\Scripts\activate      # For Windows (use Command Prompt)
   ```

- Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

- Run the backend server:
   ```sh
   python app.py
   ```

- To deactivate the virtual environment:
   ```sh
   deactivate
   ```


#### 3. Setting up the Frontend

##### **Environment Variables**
Before starting the frontend, create a `.env` file inside the `client` directory and add the following:

```sh
VITE_BACKEND_URL=http://localhost:5000
```

##### **Running the Frontend**
```sh
cd client
npm install
npm run dev
```


## Author

- [@saiabhiramjaini](https://github.com/saiabhiramjaini)

- Repo - https://github.com/saiabhiramjaini/Automated-Data-Extraction-and-Invoice-Management

## Feedback

If you have any feedback, please reach out me at abhiramjaini28@gmail.com
