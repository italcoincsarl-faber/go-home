import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function handler(event: any) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    };
  }

  try {
    const { query } = JSON.parse(event.body || "{}");

    if (!query) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, error: "Requête manquante" }),
      };
    }

    // Utilisation de l'alias 'gemini-flash' qui pointe vers la version stable en cours
    const response = await ai.models.generateContent({
      model: "gemini-flash",
      contents: `Recherche 3 offres immobilières réelles à Kinshasa pour : "${query}". Format court : Titre, Quartier, Prix, Contact.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        result: response.text,
      }),
    };
  } catch (error: any) {
    console.error("Erreur Gemini:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        error: error.message || "Erreur interne",
      }),
    };
  }
}
