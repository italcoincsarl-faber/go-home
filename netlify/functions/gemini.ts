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

// 3. Appel à l'IA Gemini avec prompt optimisé pour la rapidité
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Recherche rapidement 3 offres immobilières réelles à Kinshasa pour : "${query}". Donne une réponse courte : Titre, Quartier, Prix, Contact.`,
      config: {
        tools: [{ googleSearch: {} }],
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
