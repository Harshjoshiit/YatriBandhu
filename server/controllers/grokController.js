// --- File: controllers/grokController.js ---
// Isolates the Grok API PDF parsing logic.

import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// @desc    Parse PDF text using Grok API
// @route   POST /api/tickets/parse-pdf
export const parsePdfWithGrok = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'No text provided to parse.' });
    }

    const prompt = `
        From the following Indian Railways ticket text, you must extract these specific details: 
        PNR, Train Number, Passenger Name, Source Station, Destination Station, Coach, and Seat/Berth.
        Return the data ONLY as a valid JSON object with these exact keys:
        "pnr", "trainNo", "name", "src", "dest", "coach", "seat".
        If any detail cannot be found, the value for its key must be the string "Not found".
        Do not add any extra text, explanation, or markdown formatting. Only return the raw JSON object.
        Here is the ticket text: --- ${text} ---
    `;

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
            temperature: 0.1,
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;
        const parsedJson = JSON.parse(content);
        res.json(parsedJson);

    } catch (error) {
        console.error("Error calling Grok API from backend:", error);
        res.status(500).json({ error: 'Failed to parse ticket details with AI.' });
    }
};
