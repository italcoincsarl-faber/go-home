import { GoogleGenAI } from "@google/genai";

// Initialisation de l'API avec la clé d'environnement définie dans Netlify
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function handler(event: any) {
  // 1. Gestion des requêtes CORS (pour autoriser les appels depuis votre site)
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
    // 2. Récupération de la recherche saisie par l'utilisateur
    const { query } = JSON.parse(event.body || "{}");

    if (!query) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false, error: "Requête de recherche manquante" }),
      };
    }

    // 3. Appel à l'IA Gemini avec l'outil de recherche Web (Google Search Grounding)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Tu es l'assistant de recherche immobilière pour GO HOME PRO à Kinshasa. 
Recherche sur le web des offres immobilières réelles et récentes à Kinshasa correspondant à cette demande : "${query}".
Extrais et formate les résultats trouvés de manière claire (titre, commune/quartier, prix, description et lien si disponible).`,
      config: {
        tools: [{ googleSearch: {} }], // Activation de la recherche web en temps réel
      },
    });

    // 4. Renvoi de la réponse au client
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
    console.error("Erreur Netlify Function Gemini:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        error: error.message || "Erreur lors de l'analyse du serveur web.",
      }),
    };
  }
}
