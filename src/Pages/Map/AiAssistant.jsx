/* eslint-disable react/prop-types */
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiAssistant = ({ isOpen }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_AI_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() === "") {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      let systemPrompt = `You are a farming assistant AI. You should only answer questions related to farming, agriculture, gardening, and closely related topics. If the user's question is not related to these topics, politely inform them that you can only assist with farming-related queries. Your knowledge covers topics such as crop management, soil health, irrigation techniques, farm equipment, livestock care, sustainable farming practices, and agricultural economics.`;

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\n\nUserQuery: " + prompt }],
          },
        ],
      });
      const responseText = result.response.text();
      setResponse(responseText);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  // Corrected return statement
  return (
    isOpen && (
      <div
        className={`relative border-base-300 bg-green-100 text-green-800 w-full p-2 rounded-lg`}
      >
        <div className='collapse-title sm:text-xl text-base font-medium w-full cursor-pointer'>
          AI Assistant{" "}
          <span className='text-xs text-gray-500 block'>
            Ask the whole question in one prompt; the assistant can&apos;t
            remember past conversations.
          </span>
        </div>

        <div className='w-full'>
          {error && <p className='text-red-500 mb-2'>{error}</p>}
          {loading ? (
            <span className='loading loading-spinner loading-sm'></span>
          ) : response ? (
            <p className='text-sm mb-4'>{response}</p>
          ) : null}

          <form onSubmit={handleSubmit} className='w-full sticky bottom-0'>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered input-sm bg-transparent w-full h-12'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type='submit' className='hidden'></button>
          </form>
        </div>
      </div>
    )
  );
};

export default AiAssistant;
