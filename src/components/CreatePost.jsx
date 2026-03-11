import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function CreatePost() {
    const [loading, setLoading] = useState(false);

    const testAI = async () => {
        console.log("Button Clicked!"); 
        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            console.log("API Key loaded:", apiKey ? "Yes" : "No"); 

            if (!apiKey) {
                alert("API Key is missing in .env file!");
                setLoading(false);
                return;
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            // Stable model use kar rahe hain taaki 404 error na aaye
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            console.log("Sending request to Gemini..."); 
            const result = await model.generateContent("Hello Gemini, are you working?");
            const response = await result.response;
            const text = response.text();

            console.log("AI Response Received:", text); 
            alert("Success! AI says: " + text);

        } catch (error) {
            console.error("Detailed Error:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Blogger.ai Test</h2>
            <button 
                onClick={testAI} 
                disabled={loading}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                {loading ? "Checking..." : "Check AI Response"}
            </button>
        </div>
    );
}

export default CreatePost;