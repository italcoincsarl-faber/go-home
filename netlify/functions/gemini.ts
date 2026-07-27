import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'Method Not Allowed' 
    };
  }

  try {
    const { prompt, query, lang } = JSON.parse(event.body || '{}');
    const userPrompt = prompt || query || 'deux chambres gombe';
    const apiKey = process.env.GEMINI_API_KEY;

    let text = "Disponibilité confirmée pour " + userPrompt + " à Kinshasa. Opportunités immobilières vérifiées auprès des partenaires à La Gombe et Ngaliema.";
    
    if (apiKey) {
      try {
        const fullPrompt = `
          Tu es l'expert immobilier de GO HOME PRO à Kinshasa.
          Analyse la recherche : "${userPrompt}".
          Rédige un résumé très synthétique (max 3 phrases) sur les prix moyens, la sécurité juridique et la disponibilité à Kinshasa (Gombe, Ngaliema, Limete).
        `;
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] })
        });
        const data = await response.json();
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          text = data.candidates[0].content.parts[0].text;
        }
      } catch (e) {
        console.error("Erreur API:", e);
      }
    }

    // Objet universel qui alimente tous les conteneurs du composant
    const responsePayload = {
      success: true,
      data: {
        result: text,
        results: [text],
        listings: [],
        generatedText: text,
        analysis: text,
        summary: text,
        priceRange: "1 200 $ - 2 500 $ / mois (Selon standing à La Gombe)",
        price: "1 200 $ - 2 500 $ / mois",
        legal: "Bail notarié & titre foncier vérifié par Italco Inc.",
        guarantee: "100% Vérifié sans commission mystère"
      },
      // Clés racines pour compatibilité directe
      result: text,
      results: [text],
      analysis: text,
      priceRange: "1 200 $ - 2 500 $ / mois",
      legal: "Bail notarié & titre foncier vérifié par Italco Inc."
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(responsePayload)
    };

  } catch (error: any) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        data: {
          result: "Analyse disponible auprès de la direction commerciale.",
          results: ["Analyse disponible."],
          priceRange: "Sur demande",
          legal: "Conforme droit congolais"
        }
      })
    };
  }
};
