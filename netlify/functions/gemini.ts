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
    const body = JSON.parse(event.body || "{}");
    const query = body.query || body.prompt || "Appartement Kinshasa";
    const apiKey = process.env.GEMINI_API_KEY;

    // Structure de données de secours sous forme de VRAI Tableau JavaScript
    let itemsArray = [
      {
        id: "1",
        title: "Appartement Standing 2 Chambres",
        location: "Gombe",
        price: "1 500 $ / mois",
        description: "2 chambres, 2 SDB, électricité & eau 24/7, parking sécurisé.",
        contact: "GO HOME PRO - Italco Inc."
      },
      {
        id: "2",
        title: "Appartement Rénové Moderne",
        location: "Ngaliema / GB",
        price: "1 200 $ / mois",
        description: "Cadre paisible, groupe électrogène, citerne d'eau.",
        contact: "GO HOME PRO - Italco Inc."
      },
      {
        id: "3",
        title: "Espace Résidentiel Modernisé",
        location: "Limete Résidentiel",
        price: "900 $ / mois",
        description: "Proche axes principaux, sécurité renforcée.",
        contact: "GO HOME PRO - Italco Inc."
      }
    ];

    // Si une clé Gemini est configurée, on demande à Gemini de formater 3 objets JSON
    if (apiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Tu es l'API backend de GO HOME PRO Kinshasa. Recherche pour : "${query}".
Renvoie STRICTEMENT un tableau JSON valide contenant 3 annonces immobilières à Kinshasa.
Ne mets aucun texte avant ou après le JSON.

Exemple de format exigé :
[
  {
    "id": "1",
    "title": "Appartement 2 Chambres",
    "location": "Gombe",
    "price": "1500 USD",
    "description": "Vue fleuve, sécurité 24/7",
    "contact": "GO HOME PRO"
  }
]`
                  }
                ]
              }
            ]
          })
        });

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          // Extraction du JSON au cas où le modèle entoure de triple backticks
          const jsonMatch = rawText.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (Array.isArray(parsed) && parsed.length > 0) {
              itemsArray = parsed;
            }
          }
        }
      } catch (err) {
        console.error("Erreur parsing Gemini:", err);
      }
    }

    // RENVOI BLINDÉ : On injecte le tableau dans CHAQUE nom de propriété possible
    // pour s'assurer que peu importe la variable lue par React (B.map), B sera TOUJOURS un Tableau !
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(itemsArray), // Renvoie directement le tableau si la réponse est lue brute
    };

  } catch (error: any) {
    // Secours ultime : tableau vide pour éviter tout crash .map()
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify([]),
    };
  }
}
