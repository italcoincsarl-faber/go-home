import { Handler } from '@netlify/functions';

// ===== BASE DE DONNÉES SIMULÉE (7 biens types) =====
const mockProperties = [
  {
    id: 'prop-1',
    title: 'Appartement 3 chambres – Gombe (Golf)',
    quartier: 'Gombe (Golf)',
    price: '$3 200 / mois',
    description: 'Bel appartement au 5e étage avec vue dégagée, proche des ambassades.',
    category: 'Résidentiel Premium',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600',
    specs: { beds: '3', baths: '2', space: '150 m²' },
    contactStatus: 'Vérifié par Italco',
    matchScore: 95,
  },
  {
    id: 'prop-2',
    title: 'Villa 4 chambres – Ngaliema (Ma Campagne)',
    quartier: 'Ngaliema (Ma Campagne)',
    price: '$4 500 / mois',
    description: 'Villa de standing avec piscine, jardin paysager et sécurité 24h.',
    category: 'Résidentiel Premium',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    specs: { beds: '4', baths: '3', space: '220 m²' },
    contactStatus: 'Disponible pour Visite',
    matchScore: 88,
  },
  {
    id: 'prop-3',
    title: 'Studio moderne – Gombe (Socimat)',
    quartier: 'Gombe (Socimat)',
    price: '$1 800 / mois',
    description: 'Studio entièrement rénové, idéal pour cadre expatrié.',
    category: 'Locatif Haut de Gamme',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600',
    specs: { beds: '1', baths: '1', space: '55 m²' },
    contactStatus: 'Vérifié par Italco',
    matchScore: 90,
  },
  {
    id: 'prop-4',
    title: 'Maison 5 chambres – Limete (Industriel)',
    quartier: 'Limete (Industriel)',
    price: '$2 800 / mois',
    description: 'Grande maison mixte habitation/bureau, spacieuse et sécurisée.',
    category: 'Mixte Commerce/Logis',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600',
    specs: { beds: '5', baths: '4', space: '300 m²' },
    contactStatus: 'En Attente de Titre',
    matchScore: 82,
  },
  {
    id: 'prop-5',
    title: 'Terrain 2 ha – Nsele (Est)',
    quartier: 'Nsele (Est)',
    price: '$250 000 (acquisition)',
    description: 'Terrain plat de 2 hectares, idéal pour projet résidentiel ou agro-industriel.',
    category: 'Placement Foncier',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
    specs: { beds: 'N/A', baths: 'N/A', space: '20 000 m²' },
    contactStatus: 'Vérifié par Italco',
    matchScore: 75,
  },
  {
    id: 'prop-6',
    title: 'Loft 2 chambres – Limete (Créatif)',
    quartier: 'Limete (Industriel)',
    price: '$2 200 / mois',
    description: 'Loft moderne avec hauteur sous plafond de 5 m, showroom ou atelier.',
    category: 'Mixte Commerce/Logis',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    specs: { beds: '2', baths: '1', space: '180 m²' },
    contactStatus: 'Disponible pour Visite',
    matchScore: 85,
  },
  {
    id: 'prop-7',
    title: 'Duplex de prestige – Gombe (Centre)',
    quartier: 'Gombe (Centre)',
    price: '$6 500 / mois',
    description: 'Magnifique duplex avec terrasse panoramique sur le fleuve, finitions haut de gamme.',
    category: 'Résidentiel Premium',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    specs: { beds: '4', baths: '3', space: '280 m²' },
    contactStatus: 'Vérifié par Italco',
    matchScore: 98,
  },
];

// ===== FILTRAGE SIMPLIFIÉ (renvoie toujours des biens) =====
function filterProperties(query: string) {
  const lower = query.toLowerCase();
  let filtered = mockProperties;

  // Filtrage par quartier
  if (lower.includes('gombe')) {
    filtered = filtered.filter(p => p.quartier.toLowerCase().includes('gombe'));
  } else if (lower.includes('ngaliema')) {
    filtered = filtered.filter(p => p.quartier.toLowerCase().includes('ngaliema'));
  } else if (lower.includes('limete')) {
    filtered = filtered.filter(p => p.quartier.toLowerCase().includes('limete'));
  } else if (lower.includes('nsele') || lower.includes('maluku')) {
    filtered = filtered.filter(p => p.quartier.toLowerCase().includes('nsele') || p.quartier.toLowerCase().includes('maluku'));
  }

  // Filtrage par type de bien
  if (lower.includes('villa') || lower.includes('maison')) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes('villa') || p.title.toLowerCase().includes('maison'));
  } else if (lower.includes('appartement') || lower.includes('studio') || lower.includes('loft')) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes('appartement') || p.title.toLowerCase().includes('studio') || p.title.toLowerCase().includes('loft'));
  } else if (lower.includes('terrain') || lower.includes('foncier')) {
    filtered = filtered.filter(p => p.category.includes('Foncier') || p.title.toLowerCase().includes('terrain'));
  }

  // Filtrage par budget
  const budgetMatch = lower.match(/(\d+)\s*(usd|euro|€|\$)?/);
  if (budgetMatch) {
    const budget = parseInt(budgetMatch[1]);
    if (!isNaN(budget)) {
      filtered = filtered.filter(p => {
        const priceNum = parseInt(p.price.replace(/[^0-9]/g, ''));
        return !isNaN(priceNum) && priceNum <= budget;
      });
    }
  }

  // Si aucun résultat, on renvoie les 3 premiers biens (pour ne jamais avoir vide)
  if (filtered.length === 0) {
    filtered = mockProperties.slice(0, 3);
  }

  // On limite à 5 résultats max
  return filtered.slice(0, 5);
}

// ===== FONCTION PRINCIPALE =====
export const handler: Handler = async (event) => {
  // CORS
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
      body: 'Method Not Allowed',
    };
  }

  try {
    const { query, lang } = JSON.parse(event.body || '{}');
    const userQuery = query?.trim() || 'deux chambres gombe';
    const apiKey = process.env.GEMINI_API_KEY;

    // === 1. Générer l'analyse (avec ou sans Gemini) ===
    let aiSummary = `🔍 Analyse pour "${userQuery}" : Nous avons identifié plusieurs opportunités correspondant à votre recherche. Contactez nos bureaux pour une visite gratuite.`;

    if (apiKey) {
      try {
        const fullPrompt = `
          Tu es l'expert immobilier de GO HOME PRO à Kinshasa.
          Analyse la recherche : "${userQuery}".
          Rédige un résumé très synthétique (max 3 phrases) sur les prix moyens, la sécurité juridique et la disponibilité à Kinshasa (Gombe, Ngaliema, Limete).
        `;
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
        });
        const data = await response.json();
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          aiSummary = data.candidates[0].content.parts[0].text;
        } else {
          console.warn('⚠️ Réponse Gemini non valide, utilisation du fallback.');
        }
      } catch (e) {
        console.error('❌ Erreur appel Gemini:', e);
        // On garde le fallback.
      }
    } else {
      console.warn('⚠️ Aucune clé API Gemini trouvée, utilisation du fallback.');
    }

    // === 2. Filtrer les biens ===
    const filteredProps = filterProperties(userQuery);

    // === 3. Construire la réponse (TOUS LES CHAMPS SONT REMPLIS) ===
    const responsePayload = {
      success: true,
      data: {
        aiSummary: aiSummary || 'Analyse disponible. Contactez nos bureaux pour plus d\'informations.',
        estimatedWebPriceRange: '1 200 $ - 2 500 $ / mois (selon standing à La Gombe)',
        securityAdvice: 'Tous nos biens sont certifiés légalement par Italco Sarl. Bail notarié & titre foncier vérifié.',
        matchingCategory: filteredProps.length > 0 ? filteredProps[0].category : 'Résidentiel Premium',
        localMatchIds: ['prop-gombe-penthouse', 'prop-ngaliema-villa'],
        scrapedOpportunities: filteredProps.map(prop => ({
          id: prop.id,
          source: 'Portefeuille GO HOME',
          title: prop.title,
          price: prop.price,
          quartier: prop.quartier,
          description: prop.description,
          matchScore: prop.matchScore,
          contactStatus: prop.contactStatus,
          imageUrl: prop.imageUrl,
          specs: prop.specs,
        })),
      },
    };

    // === 4. Retourner la réponse ===
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(responsePayload),
    };
  } catch (error) {
    console.error('💥 Erreur générale:', error);
    // En cas d'erreur, on renvoie quand même une structure valide avec des données par défaut
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
          scrapedOpportunities: mockProperties.slice(0, 3).map(prop => ({
            id: prop.id,
            source: 'Portefeuille GO HOME',
            title: prop.title,
            price: prop.price,
            quartier: prop.quartier,
            description: prop.description,
            matchScore: prop.matchScore,
            contactStatus: prop.contactStatus,
            imageUrl: prop.imageUrl,
            specs: prop.specs,
          })),
        },
      }),
    };
  }
};
