
import { GoogleGenAI } from "@google/genai";

// IMPORTANT: Replace with your actual API key, preferably from an environment variable.
const API_KEY = "AIzaSyCrQcFc2NNH7r-GUKNmR0OpdeFQp3crq08";

const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

export const runLLM = async (prompt: string) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });;
    const response =
      result.candidates?.length &&
        result.candidates[0]?.content?.parts?.length &&
        typeof result.candidates[0].content.parts[0]?.text === "string"
        ? result.candidates[0].content.parts[0].text.replace(/`/g, '').replace('json', '')
        : '';

    if (!response) throw new Error("No response from Gemini API.")
      const data = JSON.parse(response)
    console.log("Response from Gemini API:", data)
    // const text = response.text();
    return data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error: Unable to get response from Gemini API.";
  }
};
