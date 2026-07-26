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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Clé API GEMINI_API_KEY manquante sur Netlify");
    }

    // STEP 1: Recherche d'annonces réelles via l'API HTML DuckDuckGo (Ultra stable, pas de blocage)
    const searchQuery = encodeURIComponent(`immobilier Kinshasa ${query}`);
    const searchResponse = await fetch(`https://html.duckduckgo.com/html/?q=${searchQuery}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    const htmlContext = await searchResponse.text();

    // Nettoyage rapide du HTML pour extraire le texte utile
    const cleanContext = htmlContext.replace(/<[^>]*>?/gm, ' ').substring(0, 4000);

    // STEP 2: Traitement intelligent par Gemini (Appel v1 standard ultra-fiable)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Tu es l'assistant de recherche immobilière pour l'application GO HOME PRO à Kinshasa.
Voici les données extraites du web kinois pour la recherche "${query}" :
---
${cleanContext}
---
Analyse ces données et extrait 3 offres immobilières réelles ou pertinentes correspondant à la demande.
Si les données web sont limitées, utilise ta connaissance du marché immobilier de Kinshasa (Gombe, Ngaliema, Limete, etc.) pour formuler 3 propositions très réalistes au format court et professionnel.

Format exigé pour chaque offre :
- Titre
- Quartier / Commune
- Prix (en USD ou FC)
- Contact / Source`
            }
          ]
        }
      ]
    };

    const aiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("Détails Erreur Gemini:", JSON.stringify(data));
      throw new Error(data.error?.message || "Erreur lors du traitement IA");
    }

    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucun résultat trouvé.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        result: textResult,
      }),
    };
  } catch (error: any) {
    console.error("Erreur Netlify Function:", error.message);
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
