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

    // URL vers l'API v1 stable
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Recherche 3 offres immobilières réelles à Kinshasa pour : "${query}". Format court : Titre, Quartier, Prix, Contact.`
            }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Détails Erreur Google API:", JSON.stringify(data));
      throw new Error(data.error?.message || "Erreur lors de la requête Google API");
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
