// // --- File: server.js ---
// // This is your Node.js backend using the Express framework.

// // 1. Import necessary packages
// import dotenv from "dotenv";
// dotenv.config();
// import express from 'express';
// import cors from 'cors';
// import Groq from 'groq-sdk';

// // 2. Setup Express App
// const app = express();
// const port = 3001; // We'll run this on a different port than the React app

// // 3. Configure Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing so your React app can talk to this server
// app.use(express.json({ limit: '10mb' })); // Allow the server to read JSON from requests, with a generous size limit for the PDF text

// // 4. Securely Initialize Grok API
// // IMPORTANT: Store your API key in an environment variable, not directly in the code.
// const groq = new Groq({
//     apiKey: process.env.GROQ_API_KEY || "YOUR_GROQ_API_KEY", // Fallback for simplicity
// });

// // 5. Create the API Endpoint
// app.post('/api/parse-pdf', async (req, res) => {
//     // Get the text extracted from the PDF, which the frontend will send
//     const { text } = req.body;

//     if (!text) {
//         return res.status(400).json({ error: 'No text provided to parse.' });
//     }

//     // --- IMPROVED PROMPT ---
//     // This new prompt is much more specific to guide the AI.
//     const prompt = `
//         From the following Indian Railways ticket text, you must extract these specific details: 
//         PNR, Train Number, Passenger Name, Source Station, Destination Station, Coach, and Seat/Berth.

//         Return the data ONLY as a valid JSON object with these exact keys:
//         "pnr", "trainNo", "name", "src", "dest", "coach", "seat".

//         - For "pnr", find the 10-digit number labeled "PNR".
//         - For "trainNo", find the 5-digit number labeled "Train No.".
//         - For "name", find the name listed under "Passenger Name".
//         - For "src", find the station name labeled "From".
//         - For "dest", find the station name labeled "To".
//         - For "coach", find the value like "A1", "B2", "S5".
//         - For "seat", find the number and berth type, like "22 / UPPER".

//         If any detail cannot be found, the value for its key must be the string "Not found".
//         Do not add any extra text, explanation, or markdown formatting. Only return the raw JSON object.

//         Here is the ticket text:
//         ---
//         ${text}
//         ---
//     `;

//     try {
//         // Securely call the Grok API from the server
//         const completion = await groq.chat.completions.create({
//             messages: [{ role: "user", content: prompt }],
//             model: "llama3-8b-8192",
//             temperature: 0.1,
//             // This is a crucial addition: it forces the model to return valid JSON
//             response_format: { type: "json_object" }, 
//         });

//         const content = completion.choices[0].message.content;
//         const parsedJson = JSON.parse(content);

//         // Send the clean JSON data back to the React frontend
//         res.json(parsedJson);

//     } catch (error) {
//         console.error("Error calling Grok API from backend:", error);
//         res.status(500).json({ error: 'Failed to parse ticket details with AI.' });
//     }
// });

// // 6. Start the Server
// app.listen(port, () => {
//     console.log(`✅ Backend server listening on http://localhost:${port}`);
// });
