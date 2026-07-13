export interface TranslationSet {
  // Navigation
  navHome: string;
  navRequirements: string;
  navProperties: string;
  navGenerator: string;
  navLegal: string;
  contactBroker: string;
  zeroTourFees: string;

  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  viewCatalogBtn: string;
  learnMoreBtn: string;
  certifiedStamp: string;

  // Search/Discovery Section
  discoveryTitle: string;
  discoverySub: string;
  discoveryLabel: string;
  searchPlaceholder: string;
  searchBtn: string;
  searchingBtn: string;

  // Properties Catalog
  catalogTitle: string;
  catalogSubtitle: string;
  searchCatPlaceholder: string;
  allNeighborhoods: string;
  sortPrice: string;
  sortDefault: string;
  sortAsc: string;
  sortDesc: string;
  noPropFound: string;
  noPropSub: string;
  resetFiltersBtn: string;
  beds: string;
  baths: string;
  size: string;
  parking: string;
  security: string;
  consultDossier: string;
  shareBtn: string;
  copiedLink: string;
  copyLink: string;
  shareWhatsapp: string;

  // Neighborhood Explorer
  explorerBadge: string;
  explorerTitle: string;
  explorerSub: string;
  exploreAll: string;
  gombeDesc: string;
  ngaliemaDesc: string;
  limeteDesc: string;
  opportunitiesCount: string;

  // Testimonials
  testimonialBadge: string;
  testimonialTitle: string;
  testimonialSub: string;
  profileVerified: string;
  profileDiaspora: string;
  profileResident: string;
  leaseValidated: string;
  prestigeClient: string;
  testimonial1Name: string;
  testimonial1Role: string;
  testimonial1Location: string;
  testimonial1Text: string;
  testimonial2Name: string;
  testimonial2Role: string;
  testimonial2Location: string;
  testimonial2Text: string;
  testimonial3Name: string;
  testimonial3Role: string;
  testimonial3Location: string;
  testimonial3Text: string;

  // Legal / About Section
  legalBadge: string;
  legalTitle: string;
  legalText: string;
  compliancePoint1Title: string;
  compliancePoint1Text: string;
  compliancePoint2Title: string;
  compliancePoint2Text: string;
  legalDisclaimer: string;

  // Diaspora Security
  diasporaTitle: string;
  diasporaPoint1Title: string;
  diasporaPoint1Text: string;
  diasporaPoint2Title: string;
  diasporaPoint2Text: string;
  diasporaPoint3Title: string;
  diasporaPoint3Text: string;

  // Lead Generator Card
  leadGenTitle: string;
  leadGenSub: string;
  leadGenFormTitle: string;
  leadGenFormSub: string;
  selectNeighborhood: string;
  selectProjectType: string;
  enterBudget: string;
  enterAudience: string;
  enterDetails: string;
  generateCampaignBtn: string;
  generatingCampaignBtn: string;
  leadGenResultTitle: string;
  leadGenResultSub: string;
  copyTextBtn: string;
  copiedBtn: string;
  relaunchBtn: string;

  // Footer
  footerDesc: string;
  footerRights: string;
  footerCoordHeader: string;
  coordOffice: string;
  coordLaw: string;
  coordLicense: string;
  coordMobileMoney: string;
  coordPhone: string;
  coordEmail: string;
  coordSeniors: string;

  // Property Details Modal
  modalClose: string;
  modalSpecsTitle: string;
  modalDescription: string;
  modalGuarantees: string;
  modalCtaMessage: string;
  modalContactForm: string;
  modalFormName: string;
  modalFormEmail: string;
  modalFormPhone: string;
  modalFormMsg: string;
  modalFormSchedule: string;
  modalFormSubmit: string;
  modalFormSubmitting: string;
}

export const translations: Record<"FR" | "EN", TranslationSet> = {
  FR: {
    navHome: "Accueil",
    navRequirements: "Exigences & Recherche",
    navProperties: "Propriétés exclusives",
    navGenerator: "Générateur IA",
    navLegal: "Légalité & Certificat",
    contactBroker: "Contact Courtier",
    zeroTourFees: "Visite 100% Gratuite • Aucun Frais Requis",

    heroBadge: "Certifié Catégorie A par l'État RDC",
    heroTitle: "L'autorité Foncier d'élite à Kinshasa.",
    heroSub: "Trouvez votre bien d'exception à Gombe, Ngaliema ou Limete en toute confiance juridique et financière avec le courtier d'agrément Catégorie A certifié par l'État RDC.",
    viewCatalogBtn: "Consulter le Catalogue",
    learnMoreBtn: "Garanties Légales",
    certifiedStamp: "Italco Sarl • Conforme Loi 15/025",

    discoveryTitle: "Espace Découverte : Identifiez Votre Exigence Immobilière",
    discoverySub: "Nous croyons en un service transparent sans commissions mystères ni faux frais. Utilisez notre cadre intelligent ci-dessous pour identifier vos besoins ou lancer une recherche web intégrée sans quitter l'application. Nos conseillers d'élite organiseront ensuite votre visite privée, sans aucun frais à votre charge.",
    discoveryLabel: "Identifier l'exigence et lancer la recherche",
    searchPlaceholder: "Ex: Belle parcelle de terrain à Ngaliema ou appartement de luxe à Gombe...",
    searchBtn: "Scanner",
    searchingBtn: "Recherche...",

    catalogTitle: "Dernières Opportunités Foncier & Locatif",
    catalogSubtitle: "Dossiers Actifs • Portefeuille Privé",
    searchCatPlaceholder: "Ex. Penthouse, piscine, Gombe...",
    allNeighborhoods: "Tous les quartiers",
    sortPrice: "Prix",
    sortDefault: "Défaut",
    sortAsc: "Croissant",
    sortDesc: "Décroissant",
    noPropFound: "Aucune propriété trouvée",
    noPropSub: "Nous n'avons pas d'opportunité immédiate correspondant à vos critères actuels. Essayez de réinitialiser vos filtres.",
    resetFiltersBtn: "Réinitialiser les filtres",
    beds: "chambres",
    baths: "SDB",
    size: "m²",
    parking: "places sécurisées",
    security: "sécurité",
    consultDossier: "Consulter le dossier",
    shareBtn: "Partager",
    copiedLink: "Lien copié !",
    copyLink: "Copier le lien direct",
    shareWhatsapp: "Partager sur WhatsApp",

    explorerBadge: "Géographie & Secteurs Foncier Kinshasa",
    explorerTitle: "Quartiers Phares de l'Immobilier",
    explorerSub: "Cliquez sur un secteur clé ci-dessous pour filtrer instantanément le catalogue et voir les opportunités disponibles dans cette zone stratégique.",
    exploreAll: "Tout explorer",
    gombeDesc: "Le centre névralgique administratif et diplomatique de la capitale.",
    ngaliemaDesc: "Collines aérées et résidences de très haut standing pour les familles d'élite.",
    limeteDesc: "Quartier résidentiel arboré et zone industrielle à fort rendement locatif.",
    opportunitiesCount: "opportunités actives",

    testimonialBadge: "GARANTIE DE CONFIANCE & RETOURS D'EXPÉRIENCE",
    testimonialTitle: "Témoignages de Nos Clients d'Élite",
    testimonialSub: "Découvrez pourquoi la diaspora congolaise et les résidents de Kinshasa font confiance à l'intermédiation légale d'Italco Sarl pour sécuriser leurs projets de vie.",
    profileVerified: "Identité Vérifiée",
    profileDiaspora: "Profil Diaspora Vérifié",
    profileResident: "Résident de Kinshasa Vérifié",
    leaseValidated: "Bail Validé",
    prestigeClient: "Prestige",
    testimonial1Name: "Jean-Pierre Mwamba",
    testimonial1Role: "Bail Validé",
    testimonial1Location: "Kinshasa, Gombe",
    testimonial1Text: "Louer un appartement de haut standing à la Gombe sans subir la pression des intermédiaires informels semblait impossible. GO HOME nous a permis d'identifier une superbe opportunité et de contractualiser sous la Loi 15/025 dans leurs bureaux sécurisés.",
    testimonial2Name: "Sarah Bilonda",
    testimonial2Role: "Investisseur",
    testimonial2Location: "Bruxelles, Belgique",
    testimonial2Text: "Depuis l'étranger, j'avais énormément de doutes quant au placement foncier à Nsele. Grâce à l'expertise réglementée d'Italco, j'ai muté mon premier titre de propriété légal sans me déplacer. Aucun frais caché ni commission occulte n'a été demandé.",
    testimonial3Name: "Dieudonné Kabasele",
    testimonial3Role: "Prestige",
    testimonial3Location: "Kinshasa, Ngaliema",
    testimonial3Text: "La transparence d'Italco nous a conquis. Nous avons payé l'acompte de réservation de notre résidence à Ngaliema par Mobile Money sécurisé, avec reçu officiel immédiat et conformité juridique absolue de notre titre.",

    legalBadge: "Certificat d'Agrément d'Agence Immobilière N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Ministère de l'Urbanisme et Habitat, Catégorie A)",
    legalTitle: "Italco Inc Sarl : L'autorité institutionnelle de l'immobilier premium à Kinshasa",
    legalText: "En RDC, le secteur immobilier souffre fréquemment d'un manque d'encadrement juridique et d'acteurs informels. Italco Inc Sarl se positionne au sommet de la confiance institutionnelle. Nous disposons de l'Attestation Tenant Lieu de Certificat d'Agrément d'Agence Immobilière N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Ministère de l'Urbanisme et de l'Habitat, Catégorie A), assurant le plus grand sérieux tant dans l'intermédiation foncière que dans la valorisation de vastes projets d'habitation en RDC.",
    compliancePoint1Title: "Conformité Totale :",
    compliancePoint1Text: "Transactions garanties 100% transparentes sous la Loi de RDC n° 15/025.",
    compliancePoint2Title: "Sécurité Notariale :",
    compliancePoint2Text: "Signature finale exclusivement dans nos bureaux de la commune de Gombe.",
    legalDisclaimer: "* Italco Inc Sarl est enregistrée sous le R.C.M. de Kinshasa et dispose d'une reconnaissance d'autorité auprès du Ministère de l'Urbanisme et de l'Habitat.",

    diasporaTitle: "SÉCURISATION POUR LA DIASPORA",
    diasporaPoint1Title: "Dossier Foncier Pré-validé",
    diasporaPoint1Text: "Toutes nos parcelles et résidences possèdent leurs titres officiels vérifiés au Conservateur des Titres Immobiliers d'Afrique avant mise en ligne.",
    diasporaPoint2Title: "Facturation Normalisée de l'État",
    diasporaPoint2Text: "Chaque commission d'agence et paiement d'acompte donne lieu à l'émission d'une facture légale éligible pour déductibilité d'impôts ou comptabilité d'affaires.",
    diasporaPoint3Title: "Passerelle de Paiements Multi-Canal",
    diasporaPoint3Text: "Nous offrons aux acquéreurs basés à l'étranger la flexibilité de payer directement en monnaies convertibles ou Mobile Money directement géré de l'étranger.",

    leadGenTitle: "GÉNÉRATEUR DE CAMPAGNES IMMOBILIÈRES PAR IA",
    leadGenSub: "Générez instantanément des opportunités et des fiches publicitaires certifiées conformes aux garanties d'Italco Sarl à l'aide de l'IA Gemini.",
    leadGenFormTitle: "Configurer les paramètres de la fiche d'exigence",
    leadGenFormSub: "Notre algorithme rédigera une fiche technique commerciale d'exception intégrant les clauses juridiques de sécurité.",
    selectNeighborhood: "Quartier Cible Kinshasa",
    selectProjectType: "Type de Projet / Bien",
    enterBudget: "Budget Estimatif ou Loyer maximum",
    enterAudience: "Audience cible",
    enterDetails: "Détails personnalisés / Mots-clés (Facultatif)",
    generateCampaignBtn: "Générer la Campagne avec Gemini",
    generatingCampaignBtn: "Génération en cours...",
    leadGenResultTitle: "Votre Fiche Technique Générée par IA",
    leadGenResultSub: "Texte de campagne optimisé conforme aux standards de sécurité d'Italco Sarl.",
    copyTextBtn: "Copier la Fiche Technique",
    copiedBtn: "Fiche Copiée !",
    relaunchBtn: "Générer un autre concept",

    footerDesc: "L'autorité institutionnelle de l'immobilier de prestige et de confiance à Kinshasa. Sécurité, Excellence, Transparence. Une marque déposée d'Italco Inc Sarl.",
    footerRights: "© 2026 GO HOME RDC. Conforme à la Loi n° 15/025. Tous droits réservés.",
    footerCoordHeader: "INFORMATIONS LÉGALES & COORDONNÉES",
    coordOffice: "📍 Bureaux Clients : Av. du TSF, 01 réf. Premiere Mall, Q/Golf, C/Gombe, Kinshasa",
    coordLaw: "📄 Conforme Loi n° 15/025 (Baux & Loyers RDC)",
    coordLicense: "🛡️ Agrément Urbanisme & Habitat N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017",
    coordMobileMoney: "💳 Solutions Mobile Money intégrées (Airtel, Vodacom, Orange)",
    coordPhone: "📞 Administration / Téléphone : +243 999 549 981",
    coordEmail: "✉️ E-mail : italcoinc.sarl@gmail.com",
    coordSeniors: "💬 Courtiers Seniors disponibles 24h/24",

    modalClose: "Fermer",
    modalSpecsTitle: "Caractéristiques de la Propriété",
    modalDescription: "Description détaillée",
    modalGuarantees: "Garanties Juridiques & Transactionnelles",
    modalCtaMessage: "Ces biens d'exception font l'objet d'un audit complet par Italco Sarl. Les visites physiques sur place sont entièrement gratuites (aucun frais d'intermédiation préalable).",
    modalContactForm: "Demande de Visite Gratuite ou Infos",
    modalFormName: "Votre nom complet",
    modalFormEmail: "Votre adresse e-mail",
    modalFormPhone: "Votre numéro de téléphone (WhatsApp)",
    modalFormMsg: "Votre message ou créneaux de visite souhaités",
    modalFormSchedule: "Je souhaite planifier une visite sur place (100% Gratuite)",
    modalFormSubmit: "Envoyer ma demande sécurisée",
    modalFormSubmitting: "Transmission en cours..."
  },
  EN: {
    navHome: "Home",
    navRequirements: "Requirements & Search",
    navProperties: "Exclusive Properties",
    navGenerator: "AI Generator",
    navLegal: "Legal & Certification",
    contactBroker: "Contact Broker",
    zeroTourFees: "100% Free Tour • No Fees Required",

    heroBadge: "Certified Category A by the DRC State",
    heroTitle: "The Elite Land Authority in Kinshasa.",
    heroSub: "Find your exceptional property in Gombe, Ngaliema, or Limete with absolute legal and financial peace of mind with our state-approved Category A agency.",
    viewCatalogBtn: "Browse Catalog",
    learnMoreBtn: "Legal Guarantees",
    certifiedStamp: "Italco Sarl • Compliant with Law 15/025",

    discoveryTitle: "Discovery Space: Identify Your Real Estate Requirement",
    discoverySub: "We believe in clear services without hidden commissions or fake broker fees. Use our smart interface below to identify your needs or launch an integrated web search without leaving the app. Our elite brokers will then schedule your private visit, with absolutely zero fee to you.",
    discoveryLabel: "Identify requirements and start search",
    searchPlaceholder: "E.g. Great plot of land in Ngaliema or premium apartment in Gombe...",
    searchBtn: "Scan",
    searchingBtn: "Searching...",

    catalogTitle: "Latest Land & Rental Opportunities",
    catalogSubtitle: "Active Listings • Private Portfolio",
    searchCatPlaceholder: "E.g. Penthouse, pool, Gombe...",
    allNeighborhoods: "All neighborhoods",
    sortPrice: "Price",
    sortDefault: "Default",
    sortAsc: "Ascending",
    sortDesc: "Descending",
    noPropFound: "No properties found",
    noPropSub: "We have no matching listing for your current criteria. Please try to reset your search filters.",
    resetFiltersBtn: "Reset filters",
    beds: "bedrooms",
    baths: "bathrooms",
    size: "sqm",
    parking: "secured parking spots",
    security: "security",
    consultDossier: "Consult folder",
    shareBtn: "Share",
    copiedLink: "Link copied!",
    copyLink: "Copy direct link",
    shareWhatsapp: "Share on WhatsApp",

    explorerBadge: "Geography & Land Sectors of Kinshasa",
    explorerTitle: "Key Real Estate Districts",
    explorerSub: "Click on a key sector below to instantly filter our catalog and see available opportunities in that strategic area.",
    exploreAll: "Explore all",
    gombeDesc: "The administrative, business and diplomatic core of the capital city.",
    ngaliemaDesc: "Fresh hills and high-standing luxury residences for elite families.",
    limeteDesc: "Tree-lined residential avenue and high-yield commercial/industrial district.",
    opportunitiesCount: "active opportunities",

    testimonialBadge: "TRUST GUARANTEE & CLIENT FEEDBACK",
    testimonialTitle: "Testimonials from Our Elite Clients",
    testimonialSub: "Discover why the Congolese diaspora and local Kinshasa residents trust Italco Sarl's legal brokerage to secure their life projects.",
    profileVerified: "Verified Identity",
    profileDiaspora: "Verified Diaspora Profile",
    profileResident: "Verified Kinshasa Resident",
    leaseValidated: "Validated Lease",
    prestigeClient: "Prestige",
    testimonial1Name: "Jean-Pierre Mwamba",
    testimonial1Role: "Validated Lease",
    testimonial1Location: "Kinshasa, Gombe",
    testimonial1Text: "Renting a luxury apartment in Gombe without facing the pressure of informal brokers seemed impossible. GO HOME allowed us to identify an amazing opportunity and sign a lease compliant with Law 15/025 in their secured offices.",
    testimonial2Name: "Sarah Bilonda",
    testimonial2Role: "Investor",
    testimonial2Location: "Brussels, Belgium",
    testimonial2Text: "From abroad, I had so many doubts about buying land in Nsele. Thanks to Italco's regulated expertise, I obtained my first legal title deed without traveling. No hidden fees or commissions were requested.",
    testimonial3Name: "Dieudonné Kabasele",
    testimonial3Role: "Prestige",
    testimonial3Location: "Kinshasa, Ngaliema",
    testimonial3Text: "Italco's transparency won us over. We paid the reservation deposit for our Ngaliema residence using secure Mobile Money, receiving an immediate official receipt and absolute legal compliance for our title deed.",

    legalBadge: "Agency License N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Ministry of Urban Planning & Housing, Cat. A)",
    legalTitle: "Italco Inc Sarl: The institutional authority of premium real estate in Kinshasa",
    legalText: "In DRC, the real estate market frequently suffers from lack of legal frameworks and informal dealers. Italco Inc Sarl positions itself at the summit of institutional trust. We hold the official Real Estate Agency License N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Ministry of Urban Planning & Housing, Category A), guaranteeing absolute compliance for both land acquisition and large housing development programs.",
    compliancePoint1Title: "Total Compliance:",
    compliancePoint1Text: "Transactions guaranteed 100% transparent under DRC Law n° 15/025.",
    compliancePoint2Title: "Notarized Safety:",
    compliancePoint2Text: "Final signing ceremonies exclusively inside our Gombe corporate offices.",
    legalDisclaimer: "* Italco Inc Sarl is registered with the Kinshasa Registry of Commerce (RCM) and recognized by the Ministry of Urban Planning and Housing.",

    diasporaTitle: "SECURITY SECURED FOR THE DIASPORA",
    diasporaPoint1Title: "Pre-validated Land Portfolios",
    diasporaPoint1Text: "All our plots and residences possess official titles verified directly with the land registries before publication.",
    diasporaPoint2Title: "Standardized State Invoicing",
    diasporaPoint2Text: "Every agency commission and deposit payment issues a certified tax invoice fit for corporate expense claims and legal accounting.",
    diasporaPoint3Title: "Multi-channel Payment Gateways",
    diasporaPoint3Text: "We offer international buyers the flexibility of secure bank transfers, foreign debit cards, or global Mobile Money systems.",

    leadGenTitle: "AI REAL ESTATE CAMPAIGN GENERATOR",
    leadGenSub: "Instantly build commercial flyers and lead magnets compliant with Italco Sarl's legal guidelines using the power of Gemini AI.",
    leadGenFormTitle: "Configure lead requirement sheet parameters",
    leadGenFormSub: "Our algorithm will draft an exceptional commercial description emphasizing legal protection clauses.",
    selectNeighborhood: "Kinshasa Target Neighborhood",
    selectProjectType: "Project / Property Type",
    enterBudget: "Estimated Budget or Max Rent",
    enterAudience: "Target Audience",
    enterDetails: "Custom Details / Keywords (Optional)",
    generateCampaignBtn: "Generate Campaign with Gemini",
    generatingCampaignBtn: "Generating copy...",
    leadGenResultTitle: "Your AI-Generated Lead Sheet",
    leadGenResultSub: "Optimized commercial copywriting matching Italco Sarl's high safety standards.",
    copyTextBtn: "Copy Campaign Copy",
    copiedBtn: "Copied!",
    relaunchBtn: "Generate another concept",

    footerDesc: "The institutional authority of prestigious and trusted real estate in Kinshasa. Safety, Excellence, Transparency. A registered trademark of Italco Inc Sarl.",
    footerRights: "© 2026 GO HOME RDC. Compliant with Law n° 15/025. All rights reserved.",
    footerCoordHeader: "LEGAL INFORMATION & COORDINATES",
    coordOffice: "📍 Offices: Av. du TSF, 01 ref. Premiere Mall, Q/Golf, C/Gombe, Kinshasa",
    coordLaw: "📄 Compliant with Law n° 15/025 (Lease & Rent in DRC)",
    coordLicense: "🛡️ Certified License N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017",
    coordMobileMoney: "💳 Integrated Mobile Money solutions (Airtel, Vodacom, Orange)",
    coordPhone: "📞 Administration / Tel: +243 999 549 981",
    coordEmail: "✉️ Email: italcoinc.sarl@gmail.com",
    coordSeniors: "💬 Senior Brokers available 24/7",

    modalClose: "Close",
    modalSpecsTitle: "Property Specifications",
    modalDescription: "Detailed Description",
    modalGuarantees: "Legal & Transactional Guarantees",
    modalCtaMessage: "These premium properties are fully audited by Italco Sarl. Physical on-site tours are 100% free (no advance broker or visiting fees required).",
    modalContactForm: "Request Free Tour or Information",
    modalFormName: "Your Full Name",
    modalFormEmail: "Your E-mail Address",
    modalFormPhone: "Your Phone Number (WhatsApp)",
    modalFormMsg: "Your Message or Preferred Visiting Schedule",
    modalFormSchedule: "I wish to schedule an on-site visit (100% Free)",
    modalFormSubmit: "Submit Secured Request",
    modalFormSubmitting: "Submitting request..."
  }
};

import { Property } from "./types";

export function getLocalizedProperty(p: Property, lang: "FR" | "EN"): Property {
  if (lang === "FR") {
    return p;
  }

  // Define translations for the 6 static properties on client side
  const engProps: Record<string, Partial<Property>> = {
    "prop-gombe-penthouse": {
      title: "Horizon Penthouse Gombe",
      neighborhood: "Gombe (Downtown)",
      category: "Premium Residential",
      price: p.price.replace("/ mois", "/ month"),
      description: "Exceptional contemporary penthouse located in the heart of Gombe business district. Offers a breathtaking panoramic view of the Congo River and the Kinshasa skyline.",
      specs: {
        beds: "3 bedrooms",
        baths: "2 baths",
        size: "210 sqm",
        parking: "2 secured parking spots",
        security: "24/7 Security & Access Control"
      },
      roi: "12% average annual estimated yield",
      features: [
        "High-end Italian luxury finishes",
        "Fully equipped American open kitchen",
        "Shared swimming pool & Fitness room",
        "Power generator & Water tank regulator"
      ]
    },
    "prop-ngaliema-villa": {
      title: "Princes Residence Villa",
      neighborhood: "Ngaliema (Ma Campagne/Binza)",
      category: "Premium Residential",
      description: "Splendid contemporary architect-designed villa nestled on the heights of Ngaliema, offering absolute quietness, high-grade security, and a unique landscaped living environment for the Congolese elite and diaspora.",
      specs: {
        beds: "5 bedrooms",
        baths: "4 baths",
        size: "600 sqm",
        parking: "4-vehicle garage",
        security: "Secured fencing & Guard post"
      },
      roi: "15% to 18% estimated annual land appreciation",
      features: [
        "Olympic-size infinity swimming pool",
        "Large landscaped tropical garden",
        "Covered terraces with panoramic views",
        "Separate dependency for guard/caretaker"
      ]
    },
    "prop-limete-loft": {
      title: "Creative Industrial Loft",
      neighborhood: "Limete (Industrial/Residential)",
      category: "Mixed Commerce/Living",
      description: "Former industrial building fully renovated into an ultra-modern urban loft. Ideally designed to serve as a showroom for SMEs, a creative workspace, or a high-yield investment.",
      specs: {
        beds: "Flexible modular open space",
        baths: "2 baths",
        size: "150 sqm",
        parking: "Heavy truck access & private parking",
        security: "Monitored industrial area"
      },
      roi: "14% ROI via mixed commercial/residential lease",
      features: [
        "5-meter high ceilings",
        "Exposed brick walls and metallic structural beams",
        "Integrated mezzanine offices",
        "Large workshop-style glass windows"
      ]
    },
    "prop-socimat-locatif": {
      title: "Socimat Executive Apartments",
      neighborhood: "Gombe (Socimat/GLM)",
      category: "High-end Rental",
      price: p.price.replace("/ mois", "/ month"),
      description: "Executive apartments of unparalleled luxury in Socimat. Tailored for expatriate executives, diplomats, and institutions seeking first-class services.",
      specs: {
        beds: "2 master suites",
        baths: "2.5 baths",
        size: "165 sqm",
        parking: "Underground parking",
        security: "Inter-embassy military-grade security"
      },
      roi: "11.5% net rental yield guaranteed on corporate lease",
      features: [
        "High-speed passenger elevators",
        "Soundproof emergency power generator",
        "Centralized water osmosing and purification system",
        "Spacious balconies and acoustic double glazing"
      ]
    },
    "prop-mont-ngafula": {
      title: "Quiet Hills Residence",
      neighborhood: "Kintambo & Mont-Ngafula",
      category: "Accessibility & Calm",
      description: "Charming primary or secondary residence nestled in the breezy and peaceful hills of Mont-Ngafula. A peaceful haven far away from the hustle of downtown.",
      specs: {
        beds: "4 bedrooms",
        baths: "3 baths",
        size: "320 sqm on 800 sqm plot",
        parking: "Parking space for 5 cars",
        security: "Motorized gate and reinforced boundary wall"
      },
      roi: "Rapid road improvement & high capital growth (+10% annually)",
      features: [
        "Large tree-filled garden with fruit trees",
        "Autonomous water borehole with tower tank",
        "5 kVA hybrid solar power backup system",
        "Spacious viewing terrace"
      ]
    },
    "prop-nsele-terrain": {
      title: "Long-term Land Reserve Nsele",
      neighborhood: "Maluku / Nsele (East)",
      category: "Speculative Projects & Reserve",
      description: "Superbe flat plot of land of 2 hectares ideally situated in the growing residential and agro-industrial development corridor of Nsele. Perfect for highly speculative investments.",
      specs: {
        beds: "Empty constructible plot",
        baths: "N/A",
        size: "20,000 sqm (2 Hectares)",
        parking: "Direct highway access",
        security: "Beaconed, surveyed, and certified"
      },
      roi: "x3 to x5 growth potential within 5 to 8 years via eastern development corridor",
      features: [
        "Valid registration certificate stored at the African Real Estate Registry",
        "Fertile flat soil, ideal for residential or logistics setups",
        "Planned connection to SNEL electrical grid"
      ]
    }
  };

  const localizedOverride = engProps[p.id];
  if (localizedOverride) {
    return {
      ...p,
      ...localizedOverride,
      specs: {
        ...p.specs,
        ...localizedOverride.specs
      }
    };
  }

  // Fallback translation for dynamic properties generated via keywords
  const titleTranslated = p.title
    .replace("d'Architecte", "Architect Design")
    .replace("Terrain", "Land Plot")
    .replace("Belle parcelle", "Beautiful Plot")
    .replace("Appartement", "Apartment")
    .replace("Villa", "Villa")
    .replace("Maison", "House")
    .replace("Secteur Calme", "Calm Sector")
    .replace("Dossier Exclusif", "Exclusive File");

  const descTranslated = p.description
    .replace("Magnifique opportunité de très haut standing", "Beautiful luxury opportunity")
    .replace("proposée en exclusivité par GO HOME", "exclusively provided by GO HOME")
    .replace("Situé dans un secteur calme", "Located in a calm area")
    .replace("ce digne bien saura ravir les plus exigeants", "this fine asset will delight the most demanding clients")
    .replace("de la diaspora congolaise d'Europe et d'Amérique", "from the Congolese diaspora in Europe and America");

  const bedsVal = p.specs.beds.replace("chambres", "bedrooms").replace("chambre", "bedroom");
  const bathsVal = p.specs.baths.replace("SDB", "baths");
  const sizeVal = p.specs.size.replace("m²", "sqm");
  const parkingVal = p.specs.parking ? p.specs.parking.replace("places sécurisées", "secured spots") : "";
  const securityVal = p.specs.security ? p.specs.security.replace("sécurité", "security").replace("Sécurité 24h/24", "24/7 Security") : "";

  const roiVal = p.roi
    .replace("Rendement annuel garanti", "Guaranteed annual yield")
    .replace("sur bail certifié", "on certified lease")
    .replace("rendement", "yield");

  const featuresTranslated = p.features.map(f => f
    .replace("Infrastructures électriques et d'eau entièrement indépendantes", "Fully independent water & power grid hookups")
    .replace("Finitions intérieures élégantes", "Elegant interior finishes")
    .replace("Climatisation pré-installée avec régulateur de tension", "Pre-installed A/C with voltage regulator")
    .replace("Zéro Frais de Visite de dossier", "Zero file touring fees")
    .replace("Accès gratuit garanti", "Guaranteed free access")
  );

  return {
    ...p,
    title: titleTranslated,
    description: descTranslated,
    category: p.category.replace("Résidentiel", "Residential").replace("Locatif", "Rental").replace("Terrain", "Land"),
    price: p.price.replace("/ mois", "/ month"),
    specs: {
      beds: bedsVal,
      baths: bathsVal,
      size: sizeVal,
      parking: parkingVal,
      security: securityVal
    },
    roi: roiVal,
    features: featuresTranslated
  };
}
