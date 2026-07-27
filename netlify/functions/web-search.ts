import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // Gestion CORS pour les requêtes OPTIONS (préflight)
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

  // Seulement les requêtes POST sont autorisées
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'Method Not Allowed',
    };
  }

  try {
    // Récupérer la requête et la langue depuis le body
    const { query, lang } = JSON.parse(event.body || '{}');
    const userQuery = query?.trim() || 'recherche immobilière à Kinshasa';

    // Construire une réponse structurée pour le frontend
    // (peut être améliorée avec un vrai scraping ou une API externe)
    const responsePayload = {
      success: true,
      data: {
        // Résumé général (peut être généré par Gemini si tu veux)
        aiSummary: `Nous avons analysé votre recherche pour : "${userQuery}". Des opportunités sont disponibles dans les quartiers de Gombe, Ngaliema et Limete. Contactez nos bureaux pour une visite gratuite.`,

        // Gamme de prix estimée (statique ou dynamique)
        estimatedWebPriceRange: '1 200 $ - 2 500 $ / mois (selon standing)',

        // Message sur la sécurité juridique
        securityAdvice: 'Tous nos biens sont certifiés légalement par Italco Sarl. Bail notarié & titre foncier vérifié.',

        // Catégorie suggérée pour le filtrage du catalogue
        matchingCategory: 'Résidentiel Premium',

        // IDs des propriétés du catalogue à mettre en avant (correspondant à la recherche)
        localMatchIds: ['prop-gombe-penthouse', 'prop-ngaliema-villa'],

        // Liste d'opportunités "scrappées" (simulées ici)
        scrapedOpportunities: [
          {
            id: 'scraped-1',
            source: 'Annonce en ligne',
            title: 'Appartement 3 chambres à Gombe',
            price: '$3 200 / mois',
            quartier: 'Gombe (Golf)',
            description: 'Bien récent avec vue imprenable sur la ville.',
            matchScore: 92,
            contactStatus: 'Vérifié par Italco',
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600',
            specs: { beds: '3', baths: '2', space: '150 m²' },
          },
          {
            id: 'scraped-2',
            source: 'Portefeuille GO HOME',
            title: 'Villa 4 chambres à Ngaliema',
            price: '$4 500 / mois',
            quartier: 'Ngaliema (Ma Campagne)',
            description: 'Villa de standing avec piscine et jardin paysager.',
            matchScore: 88,
            contactStatus: 'Disponible pour Visite',
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
            specs: { beds: '4', baths: '3', space: '220 m²' },
          },
        ],
      },
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(responsePayload),
    };
  } catch (error) {
    console.error('Erreur dans web-search :', error);
    // En cas d'erreur, renvoyer une réponse minimale pour ne pas bloquer l'UI
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        data: {
          aiSummary: 'Analyse disponible auprès de la direction commerciale. Contactez nos bureaux.',
          estimatedWebPriceRange: 'Sur demande',
          securityAdvice: 'Conforme droit congolais & Italco Sarl',
          matchingCategory: 'Résidentiel',
          localMatchIds: [],
          scrapedOpportunities: [],
        },
      }),
    };
  }
};
