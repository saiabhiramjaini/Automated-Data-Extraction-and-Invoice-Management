from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import google.generativeai as genai
import json
import pandas as pd
import io
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

SUPPORTED_MIME_TYPES = {
    "application/pdf": "PDF",
    "image/jpeg": "JPG",
    "text/csv": "CSV",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX"
}

@app.route('/api/v1/data', methods=['POST'])
def receive_file():
    try:
        data = request.json
        file_name = data.get("fileName")
        file_data_base64 = data.get("fileData")
        file_mime_type = data.get("mimeType")

        # print(f"Received File: {file_name}, Type: {file_mime_type}")

        if not file_name or not file_data_base64 or not file_mime_type:
            return jsonify({"message": "Invalid file data"}), 400
        
        # print("Input validated")

        if file_mime_type not in SUPPORTED_MIME_TYPES:
            return jsonify({"message": "Unsupported file type"}), 400
        
        # print("File check done")

        file_data_bytes = base64.b64decode(file_data_base64)

        prompt = """
      You are given a document containing invoice-related data. Extract the information and return a structured JSON response. 
      Ensure every required field is present; if a field is missing, set its value as "NA". 
      The response **must only contain JSON**, without any additional text or explanation.
      
      **Extract the following data:**
      
      **Invoices**: Extract invoices with these columns:
        - serialNumber
        - customerName
        - productName
        - quantity
        - tax
        - totalAmount
        - date
      
      **Products**: Extract product details with these fields:
        - name
        - quantity
        - unitPrice
        - tax
        - priceWithTax
        - (Optional) discount
      
      **Customers**: Extract customer data with:
        - customerName
        - phoneNumber
        - totalPurchaseAmount
      
      **Return the response in the following JSON format:**
      
      {
        "invoices": [
          {
            "serialNumber": "123456",
            "customerName": "John Doe",
            "productName": "Laptop",
            "quantity": "2",
            "tax": "10%",
            "totalAmount": "$2000",
            "date": "2024-02-21"
          }
        ],
        "products": [
          {
            "name": "Laptop",
            "quantity": "2",
            "unitPrice": "$900",
            "tax": "10%",
            "priceWithTax": "$990",
            "discount": "NA"
          }
        ],
        "customers": [
          {
            "customerName": "John Doe",
            "phoneNumber": "123-456-7890",
            "totalPurchaseAmount": "$2000"
          }
        ]
      }

      **Process this document and return the structured JSON output:**
      """

        model = genai.GenerativeModel("gemini-1.5-flash")

        if file_mime_type == "application/pdf":
            response = model.generate_content(
                [
                    {"mime_type": "application/pdf", "data": file_data_bytes}, 
                    {"text": prompt},  
                ]
            )

        elif file_mime_type == "image/jpeg":
            response = model.generate_content(
                [
                    {"mime_type": "image/jpeg", "data": file_data_bytes},  
                    {"text": prompt},  
                ]
            )
        
        elif file_mime_type == "text/csv":
            # print("Processing CSV file")
            
            file_data_text = base64.b64decode(file_data_base64).decode("utf-8")
            df = pd.read_csv(io.StringIO(file_data_text))

            #print("CSV converted to DataFrame")

            response = model.generate_content(
                [
                    {"mime_type": "text/csv", "data": file_data_text.encode()}, 
                    {"text": prompt},  
                ]
            )

        elif file_mime_type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            # print("Processing XLSX file")
            
            df = pd.read_excel(io.BytesIO(file_data_bytes))

            csv_buffer = io.StringIO()
            df.to_csv(csv_buffer, index=False)
            csv_text = csv_buffer.getvalue()

            # print("XLSX converted to CSV")

            response = model.generate_content(
                [
                    {"mime_type": "text/csv", "data": csv_text.encode()}, 
                    {"text": prompt},
                ]
            )

        else:
            return jsonify({"message": "Unsupported file format"}), 400

        extracted_data = response.text.strip()

        if extracted_data.startswith("```json"):
            extracted_data = extracted_data[7:] 
        if extracted_data.endswith("```"):
            extracted_data = extracted_data[:-3]  

        json_data = json.loads(extracted_data)

        return jsonify(json_data), 200

    except Exception as e:
        print("Error:", str(e)) 
        return jsonify({"message": "Error processing file", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)