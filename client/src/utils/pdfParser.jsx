// --- File: pdfParser.js ---
// This utility file now calls your own backend, which then calls the Grok API.

import { pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url"; // ✅ Vite-compatible worker import

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// --- Function to call YOUR backend server ---
const callBackendAPI = async (text) => {
    // The URL of the new Node.js server you just created
    const backendUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/tickets/parse-pdf`;

    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Send the extracted text in the request body
            body: JSON.stringify({ text: text }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`Backend API request failed: ${errorBody.error}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error calling backend API:", error);
        throw new Error("Failed to connect to the backend server. Is it running?");
    }
};

// --- Main parsing function - now updated to use the backend ---
export const parsePDF = async (file) => {
    if (!file) throw new Error("No file provided.");
    if (file.type !== "application/pdf") throw new Error("Invalid file type. Please upload a valid PDF ticket.");

    // Step 1: Extract text from the PDF (this part remains the same)
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + "\n";
    }

    // Step 2: Call your backend with the extracted text
    const result = await callBackendAPI(text);

    // Step 3: Validate the response from the backend
    if (!result || result.pnr === "Not found" || result.trainNo === "Not found") {
        throw new Error("AI could not extract essential ticket details (PNR, Train No). Please try another ticket.");
    }

    return result;
};
