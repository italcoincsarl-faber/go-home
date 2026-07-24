import React, { useState, useEffect, useRef } from "react";
import { Property } from "./types";
import PropertyCard from "./PropertyCard";
import PropertyModal from "./PropertyModal";
import LeadGenerator from "./LeadGenerator";
import { translations, getLocalizedProperty } from "./translations";
import { 
  Building, 
  MapPin, 
  Search, 
  Filter, 
  Award, 
  ShieldCheck, 
  Coins, 
  PhoneCall, 
  Compass, 
  Building2, 
  ChevronRight, 
  ChevronDown,
  Info,
  Layers,
  ArrowUpDown,
  Home,
  Briefcase,
  TrendingUp,
  UserCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Star,
  Quote,
  ArrowUp,
  Sun,
  Moon
} from "lucide-react";

// Dynamically generate properties when filter returns zero results
function generateDynamicProperties(query: string, neighborhood: string, category: string): Property[] {
  const cleanQuery = query.trim() ? query.trim() : "Premium";
  const finalNeighborhood = neighborhood !== "Tous" ? neighborhood : "Gombe (Centre)";
  const finalCategory = category !== "Tous" ? category : "Résidentiel Premium";

  // Determine rental vs sale
  const isRental = finalCategory.toLowerCase().includes("locatif") || 
                   cleanQuery.toLowerCase().includes("louer") || 
                   cleanQuery.toLowerCase().includes("location") || 
                   cleanQuery.toLowerCase().includes("mois");
  
  // Custom estimated rates
  const price1Value = isRental ? 3500 : 380000;
  const price2Value = isRental ? 2200 : 190000;
  const price1 = isRental ? `$${price1Value.toLocaleString()} / mois` : `$${price1Value.toLocaleString()}`;
  const price2 = isRental ? `$${price2Value.toLocaleString()} / mois` : `$${price2Value.toLocaleString()}`;

  // Image selectors depending on type
  let img1 = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600";
  let img2 = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600";
  
  const lowType = finalCategory.toLowerCase() + " " + cleanQuery.toLowerCase();
  if (lowType.includes("terrain") || lowType.includes("parcelle") || lowType.includes("sol")) {
    img1 = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600";
    img2 = "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=600";
  } else if (lowType.includes("bureau") || lowType.includes("commerce") || lowType.includes("loft") || lowType.includes("limete")) {
    img1 = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600";
    img2 = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600";
  } else if (lowType.includes("villa") || lowType.includes("maison") || lowType.includes("châteaux")) {
    img1 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600";
    img2 = "https://images.unsplash.com/photo-151291774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600";
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return [
    {
      id: `dynamic-gen-${Date.now()}-1`,
      title: `${capitalize(cleanQuery)} d'Architecte - ${finalNeighborhood}`,
      neighborhood: `${finalNeighborhood} (Secteur Calme)`,
      category: finalCategory,
      price: price1,
      priceValue: price1Value,
      isRental: isRental,
      status: "Disponible",
      badge: "NOUVEAUTÉ",
      description: `Magnifique opportunité de très haut standing proposée en exclusivité par GO HOME (Italco Sarl). Situé dans un secteur calme et très sécurisant de ${finalNeighborhood}, ce digne bien saura ravir les plus exigeants de la diaspora congolaise d'Europe et d'Amérique.`,
      specs: {
        beds: "3 chambres",
        baths: "2 SDB",
        size: "175 m²",
        parking: "2 places sécurisées",
        security: "Sécurité 24h/24 par Italco"
      },
      roi: "Rendement annuel garanti de +12% sur bail certifié",
      features: [
        "Infrastructures électriques et d'eau entièrement indépendantes",
        "Finitions intérieures élégantes en grès cérame importé",
        "Climatisation pré-installée avec régulateur de tension",
        "Zéro Frais de Visite de dossier - Accès gratuit garanti"
      ],
      imageUrl: img1
    },
    {
      id: `dynamic-gen-${Date.now()}-2`,
      title: `Résidence Prestige - Spécial ${capitalize(cleanQuery)}`,
      neighborhood: `${finalNeighborhood} (Résidentiel)`,
      category: finalCategory,
      price: price2,
      priceValue: price2Value,
      isRental: isRental,
      status: "Disponible",
      badge: "VERIFIED LEGAL",
      description: `Bénéficiez d'une fiche foncière certifiée conforme par Italco Sarl. Idéalement dimensionné pour un investissement familial ou professionnel haut de gamme dans le secteur recherché de ${finalNeighborhood}.`,
      specs: {
        beds: "4 chambres",
        baths: "3 SDB",
        size: "260 m²",
        parking: "Garage fermé avec portail électrique",
        security: "Clôtures de sécurité robustes sans aucun litige foncier"
      },
      roi: "+14.5% de rendement locatif annuel moyen estimé",
      features: [
        "Accompagnement notarié entièrement offert par Italco",
        "Grande terrasse extérieure avec superbe panorama dégagé",
        "Forage d'eau moderne avec ballon de surpression",
        "Garantie légale complète sans aucun frais caché"
      ],
      imageUrl: img2
    }
  ];
}

export default function App() {
  const [lang, setLang] = useState<"FR" | "EN">("FR");
  const t = translations[lang];
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  
  // Filtering & Sorting States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Tous");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortByPrice, setSortByPrice] = useState<"neutral" | "asc" | "desc">("neutral");
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  // Determine if we are currently looking at rental-only properties
  const matchesOnlyRentals = React.useMemo(() => {
    let temp = [...properties];
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.neighborhood.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }
    if (selectedNeighborhood !== "Tous") {
      temp = temp.filter((p) => p.neighborhood.startsWith(selectedNeighborhood));
    }
    if (selectedCategory !== "Tous") {
      temp = temp.filter((p) => p.category.includes(selectedCategory) || p.specs.beds.includes(selectedCategory));
    }
    return temp.length > 0 && temp.every((p) => p.priceValue <= 10000);
  }, [properties, searchQuery, selectedNeighborhood, selectedCategory]);

  const sliderMax = matchesOnlyRentals ? 10000 : 1000000;
  const sliderStep = matchesOnlyRentals ? 100 : 10000;
  
  // Integrated Discovery and Search Desk States
  const [exigenceType, setExigenceType] = useState("Tous");
  const [exigenceNeighborhood, setExigenceNeighborhood] = useState("Tous");
  const [exigenceBudget, setExigenceBudget] = useState("Tous");
  const [webQuery, setWebQuery] = useState("");
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [webSearchResult, setWebSearchResult] = useState<{
    aiSummary: string;
    estimatedWebPriceRange: string;
    securityAdvice: string;
    matchingCategory: string;
    localMatchIds: string[];
    scrapedOpportunities?: Array<{
      id: string;
      source: string;
      title: string;
      price: string;
      quartier: string;
      description: string;
      matchScore: number;
      contactStatus: string;
      imageUrl?: string;
      specs?: {
        beds?: string;
        baths?: string;
        space?: string;
      }
    }>;
  } | null>(null);
  const [webSearchError, setWebSearchError] = useState<string | null>(null);
  const [exigenceSearchInitiated, setExigenceSearchInitiated] = useState(false);
  const [exigenceLoading, setExigenceLoading] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState<"exigence" | "web">("exigence");
  
  // General Booking / Visit Request Modal (offering zero fee visits)
  const [generalBookingOpen, setGeneralBookingOpen] = useState(false);
  const [generalBookingSuccess, setGeneralBookingSuccess] = useState<string | null>(null);
  const [generalBookingForm, setGeneralBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    viewingDate: "",
    message: ""
  });
  const [generalBookingSubmitting, setGeneralBookingSubmitting] = useState(false);
  
  // Selected Property modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // FAQ interactive state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Floating back-to-top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("go-home-dark-mode");
      return saved === "true";
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem("go-home-dark-mode", String(next));
      return next;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Bottom scroll references
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const propertiesSectionRef = useRef<HTMLDivElement>(null);
  const generatorSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  // Fetch properties from proxy on load
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        const json = await res.json();
        if (json.success) {
          setProperties(json.data);
          setFilteredProperties(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch properties from server, using backing fallback.", err);
      } finally {
        setLoadingProperties(false);
      }
    }
    fetchProperties();
  }, []);

  // Auto-open property on deep-link parameter
  useEffect(() => {
    if (properties.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const propId = params.get("property");
      if (propId) {
        const found = properties.find((p) => p.id === propId || String(p.id) === String(propId));
        if (found) {
          setSelectedProperty(found);
        }
      }
    }
  }, [properties]);

  // Monitor scroll height to show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter application
  useEffect(() => {
    let result = [...properties];

    // Text search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.neighborhood.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Neighborhood select
    if (selectedNeighborhood !== "Tous") {
      result = result.filter((p) => p.neighborhood.startsWith(selectedNeighborhood));
    }

    // Category select
    if (selectedCategory !== "Tous") {
      result = result.filter((p) => p.category.includes(selectedCategory) || p.specs.beds.includes(selectedCategory));
    }

    // Price budget filter
    if (maxPrice < 1000000) {
      result = result.filter((p) => p.priceValue <= maxPrice);
    }

    // Sorting
    if (sortByPrice === "asc") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortByPrice === "desc") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    }

    if (result.length === 0) {
      const dynamicFallback = generateDynamicProperties(searchQuery, selectedNeighborhood, selectedCategory);
      const filteredFallback = maxPrice < 1000000
        ? dynamicFallback.filter((p) => p.priceValue <= maxPrice)
        : dynamicFallback;
      setFilteredProperties(filteredFallback);
    } else {
      setFilteredProperties(result);
    }
  }, [searchQuery, selectedNeighborhood, selectedCategory, sortByPrice, maxPrice, properties]);

  // Jump handlers
  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Quick select dynamic area filter
  const selectNeighborhoodAndScroll = (areaName: string) => {
    setSelectedNeighborhood(areaName);
    scrollToRef(propertiesSectionRef);
  };

  const handleExigenceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setExigenceLoading(true);
    setExigenceSearchInitiated(true);
    setTimeout(() => {
      setExigenceLoading(false);
      
      // Sync choice with main portfolio list
      if (exigenceNeighborhood !== "Tous") {
        setSelectedNeighborhood(exigenceNeighborhood);
      }
      if (exigenceType !== "Tous") {
        setSelectedCategory(exigenceType);
      }
      
      scrollToRef(propertiesSectionRef);
    }, 1200);
  };

  const handleWebSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (webQuery.trim() === "") return;
    setIsSearchingWeb(true);
    setWebSearchError(null);
    setWebSearchResult(null);
    try {
      const response = await fetch("/api/web-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: webQuery, lang })
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setWebSearchResult(resData.data);
        // Pre-apply filtering locally based on predicted class
        if (resData.data.matchingCategory) {
          setSelectedCategory(resData.data.matchingCategory);
        }
      } else {
        setWebSearchError(
          lang === "EN" 
            ? "An error occurred while scanning the Kinshasa real estate web." 
            : "Une erreur est survenue lors de l'interrogation du web kinois."
        );
      }
    } catch (err) {
      setWebSearchError(
        lang === "EN" 
          ? "The integrated web analysis server did not respond." 
          : "Le serveur d'analyse web intégré n'a pas répondu."
      );
    } finally {
      setIsSearchingWeb(false);
    }
  };

  const handleGeneralBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralBookingSubmitting(true);
    setGeneralBookingSuccess(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: generalBookingForm.name,
          email: generalBookingForm.email,
          phone: generalBookingForm.phone,
          viewingDate: generalBookingForm.viewingDate,
          requestedViewing: true,
          message: lang === "EN"
            ? `Tour request initiated via Discovery Space. Type: ${exigenceType} at ${exigenceNeighborhood}. Note: ${generalBookingForm.message}`
            : `Demande de visite initiée via Espace Découverte. Type: ${exigenceType} à ${exigenceNeighborhood}. Note: ${generalBookingForm.message}`,
          lang
        })
      });
      const data = await response.json();
      if (data.success) {
        setGeneralBookingSuccess(data.message);
      } else {
        setGeneralBookingSuccess(data.error || (lang === "EN" ? "An error occurred." : "Une erreur est survenue."));
      }
    } catch (e) {
      setGeneralBookingSuccess(
        lang === "EN" 
          ? "A network error prevented the submission." 
          : "Une erreur de réseau empêche l'envoi."
      );
    } finally {
      setGeneralBookingSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden pb-12 md:pb-0 transition-colors duration-300 ${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Dynamic TopAppBar / Header */}
      <header className="fixed top-0 w-full z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-7xl mx-auto">
          
          {/* Logo & Corporate Tag */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-lg bg-slate-950 dark:bg-amber-500 flex items-center justify-center text-white dark:text-slate-950 font-serif font-black text-lg shadow-sm border border-slate-850">
              GH
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-bold font-display tracking-tight text-slate-950 dark:text-white uppercase">GO HOME</span>
                <span className="text-[9px] bg-amber-500 text-slate-950 font-mono font-bold px-1 rounded uppercase">PRO</span>
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-serif font-semibold uppercase tracking-wider block mt-0.5">
                Italco Inc Sarl Group
              </span>
            </div>
          </div>

          {/* Navigation Links for big screens */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase font-mono font-bold tracking-wider">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-950 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 cursor-pointer"
            >
              {t.navHome}
            </button>
            <button 
              onClick={() => scrollToRef(searchSectionRef)}
              className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 cursor-pointer flex items-center gap-1.5"
            >
              {t.navRequirements}
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            </button>
            <button 
              onClick={() => scrollToRef(propertiesSectionRef)}
              className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 cursor-pointer"
            >
              {t.navProperties}
            </button>
            <button 
              onClick={() => scrollToRef(generatorSectionRef)}
              className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              {t.navGenerator}
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            </button>
            <button 
              onClick={() => scrollToRef(aboutSectionRef)}
              className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 cursor-pointer"
            >
              {t.navLegal}
            </button>
          </nav>

          {/* Interactive Courtier call button & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 font-mono text-[10px] font-bold">
              <button
                onClick={() => setLang("FR")}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${lang === "FR" ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
              >
                FR
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${lang === "EN" ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-center bg-transparent active:scale-[0.95]"
              title={darkMode ? (lang === "EN" ? "Activate light mode" : "Activer le mode clair") : (lang === "EN" ? "Activate dark mode" : "Activer le mode sombre")}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => {
                setGeneralBookingOpen(true);
                setGeneralBookingForm(prev => ({
                  ...prev,
                  message: lang === "EN"
                    ? "Hello, I wish to get in touch with a senior broker from GO HOME (Italco Sarl) to discuss my real estate needs or plan a 100% free visit."
                    : "Bonjour, je souhaite entrer en contact direct avec un courtier senior de GO HOME (Italco Sarl) pour discuter de mes besoins ou planifier une visite entièrement gratuite ($0 frais)."
                }));
              }}
              className="bg-slate-950 dark:bg-amber-500 hover:bg-slate-900 dark:hover:bg-amber-600 text-white dark:text-slate-950 rounded-lg px-4.5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              {t.contactBroker}
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[640px] md:h-[720px] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Villa d'architecte à Ngaliema Kinshasa" 
            className="w-full h-full object-cover object-center scale-105 select-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9UVcXggXi6JiQ_YEjXTQXqI90Mj6zO8GTHHiNFbzh-0AQvZY3mSmsUYKY7zfgU8ZvPR8vkabV99G1wDlEidPaXCU5Jh6wHfq6CZXpSxG4qo7qHN-bxEgT1U7vQ50Wuvd6PncociQ2SqqttCm7yN6E48WdiRedbS8dnWcoQPX3q_EOn1Sjmyg8ZMTytWTjUsinadNYuyuhcv0x0lU9WqaFrKKcMoo2m1Xfp6l2SMzLDCvY0CfWYQNlgOdj9Z3dShq8XzpwdMzvbDs"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/40"></div>
        </div>

        <div className="relative z-10 px-4 md:px-10 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl text-white">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-widest rounded mb-6 select-none animate-fade-in">
              <Award className="w-3.5 h-3.5" />
              {lang === "EN" ? "Approved Real Estate Agency • Italco Inc Sarl" : "Agence Immobilière Agréée • Italco Inc Sarl"}
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] mb-6 text-white">
              {lang === "EN" ? "Your Prestigious Real Estate Agency in Kinshasa" : "Votre Agence Immobilière de Prestige à Kinshasa"}
            </h1>
            
            <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-2xl font-sans font-medium">
              {lang === "EN" 
                ? "Italco Inc Sarl presents GO HOME: legal transactional security and real estate excellence in Kinshasa. Explore our land and rental opportunities certified in compliance with local legislation."
                : "Italco Inc Sarl présente GO HOME : la sécurité transactionnelle légale et l'excellence immobilière à Kinshasa. Explorez nos opportunités foncières et locatives certifiées conformes à la législation."}
              <span className="block mt-3 text-amber-400 font-bold font-mono text-sm uppercase tracking-wider">
                {lang === "EN" 
                  ? "★ ZERO TOURING FEES: All on-site property visits are 100% free."
                  : "★ ZÉRO FRAIS DE VISITE : Toutes nos visites de biens sont entièrement gratuites."}
              </span>
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToRef(searchSectionRef)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-7 py-3.5 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-amber-500/10"
              >
                {lang === "EN" ? "Identify your requirements" : "Identifier vos exigences"}
                <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
              </button>
              <button 
                onClick={() => scrollToRef(generatorSectionRef)}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white px-7 py-3.5 font-mono text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2"
              >
                {lang === "EN" ? "Generate sales pitch" : "Générer pitch de vente"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ESPACE DÉCOUVERTE ET IDENTIFICATION DES EXIGENCES (Zéro Frais de Visite) */}
      <section ref={searchSectionRef} className="py-16 px-4 md:px-10 max-w-7xl mx-auto scroll-mt-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-md">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-400 font-mono text-[10px] font-bold uppercase rounded-md tracking-wider inline-flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
              {t.zeroTourFees}
            </span>
            <h2 className="text-slate-900 dark:text-white font-display font-bold text-2xl md:text-3xl tracking-tight">
              {t.discoveryTitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
              {t.discoverySub}
            </p>
          </div>

          {/* Tab Title instead of tab selector buttons */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8 max-w-lg mx-auto justify-center">
            <div className="pb-3 text-xs uppercase font-mono font-bold tracking-widest border-b-2 border-amber-500 text-slate-950 dark:text-amber-400 text-center pb-2.5 px-6 font-semibold">
              {t.discoveryLabel}
            </div>
          </div>

          <div className="space-y-6">
              <form onSubmit={handleWebSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={webQuery}
                  onChange={(e) => setWebQuery(e.target.value)}
                  className="flex-1 text-xs p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={isSearchingWeb}
                  className="px-6 bg-slate-950 dark:bg-amber-500 hover:bg-slate-900 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  {isSearchingWeb ? t.searchingBtn : t.searchBtn}
                </button>
              </form>

              {isSearchingWeb && (
                <div className="p-8 bg-slate-950 text-white rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-amber-500 animate-spin"></div>
                  <div>
                    <h5 className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                      {lang === "EN" ? "GO HOME Web-Insight Engine" : "Moteur GO HOME Web-Insight"}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-md">
                      {lang === "EN" 
                        ? "Semantic screening of the Kinshasa web and verification against our physical client portfolios at our Gombe offices..."
                        : "Interrogation sémantique du web kinois et confrontation avec nos dossiers d'études physiques à nos Bureaux Clients..."}
                    </p>
                  </div>
                </div>
              )}

              {webSearchError && (
                <div className="p-4 bg-red-50 text-red-900 border border-red-100 rounded-xl text-center text-xs">
                  {webSearchError}
                </div>
              )}

              {webSearchResult && (
                <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 space-y-5 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="text-[9px] font-mono font-bold bg-amber-400 text-slate-950 py-0.5 px-2 rounded uppercase tracking-wider inline-block">
                      {lang === "EN" ? "Integrated Web Search Analysis" : "Analyse de Recherche Web Intégrée"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono italic">
                      {lang === "EN" ? `Search: “${webQuery}”` : `Recherche : « ${webQuery} »`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-4">
                      <div>
                        <h4 className="text-amber-400 font-mono text-[10px] uppercase tracking-wider mb-1">
                          {lang === "EN" ? "Estimated Trends & Availability" : "Tendances & Disponibilité Estimées"}
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed text-justify">
                          {webSearchResult.aiSummary}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                          <span className="text-[10px] text-slate-400 block mb-0.5 font-mono uppercase">
                            {lang === "EN" ? "Observed Price Range" : "Gamme de Prix Constatée"}
                          </span>
                          <span className="text-white font-mono font-bold text-xs">{webSearchResult.estimatedWebPriceRange}</span>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                          <span className="text-[10px] text-slate-400 block mb-0.5 font-mono uppercase">
                            {lang === "EN" ? "Legality & Key Guarantee" : "Légalité & Garantie Clé"}
                          </span>
                          <span className="text-emerald-400 text-xs font-semibold block">{webSearchResult.securityAdvice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                          {lang === "EN" ? "INTEGRATED RE-FILTERING" : "RE-FILTRAGE INTÉGRÉ"}
                        </h5>
                        <div className="text-amber-400 font-bold text-xs uppercase bg-amber-400/10 p-2 border border-amber-400/20 rounded text-center">
                          {webSearchResult.matchingCategory}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed text-center">
                          {lang === "EN" 
                            ? "All matching portfolios are immediately consultable without any hassle at our Gombe office."
                            : "Tous les dossiers correspondants sont consultables immédiatement sans prise de tête à notre agence à Gombe."}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setGeneralBookingOpen(true);
                          setGeneralBookingForm(prev => ({
                            ...prev,
                            message: lang === "EN" 
                              ? `Following my web search for: "${webQuery}". I wish to schedule a free visit for matching listings.`
                              : `Suite à ma recherche web pour: "${webQuery}". Je souhaite planifier une visite gratuite pour les parcelles/logements correspondants.`
                          }));
                        }}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider rounded-lg transition-all active:scale-[0.98]"
                      >
                        {lang === "EN" ? "Schedule Visit ($0 fee)" : "Planifier Visite ($0 frais)"}
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Web Scraped Opportunities selection */}
                  {webSearchResult.scrapedOpportunities && webSearchResult.scrapedOpportunities.length > 0 && (
                    <div className="pt-5 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-amber-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          {lang === "EN" ? "Opportunities Found on Real Estate Web (Active Scraping)" : "Opportunités Retrouvées sur le Web Immobilier (Scraping Actif)"}
                        </h4>
                        <span className="text-[9px] text-slate-400 font-mono bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-850">
                          {lang === "EN" 
                            ? `${webSearchResult.scrapedOpportunities.length} opportunities identified`
                            : `${webSearchResult.scrapedOpportunities.length} opportunités identifiées`}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {webSearchResult.scrapedOpportunities.map((op) => {
                          // Translate contact status
                          let localizedStatus = op.contactStatus;
                          if (lang === "EN") {
                            if (op.contactStatus === "Vérifié par Italco") localizedStatus = "Verified by Italco";
                            else if (op.contactStatus === "Disponible pour Visite") localizedStatus = "Available for Visit";
                            else if (op.contactStatus === "En Attente de Titre") localizedStatus = "Title Deed Pending";
                          }
                          return (
                            <div key={op.id} className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3 hover:translate-y-[-2px]">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-500">
                                    {lang === "EN" ? "✦ Certified Opportunity" : "✦ Opportunité Certifiée"}
                                  </span>
                                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold shrink-0">
                                    ★ {op.matchScore}% Match
                                  </span>
                                </div>
                                
                                {op.imageUrl && (
                                  <div className="relative h-28 w-full rounded-lg overflow-hidden shrink-0 border border-slate-900/40">
                                    <img 
                                      src={op.imageUrl} 
                                      alt={op.title} 
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                )}

                                <h5 className="text-white font-sans text-xs font-bold leading-snug line-clamp-2">
                                  {op.title}
                                </h5>
                                <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                                  <span className="truncate">{op.quartier}</span>
                                </div>
                                <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2 italic">
                                  "{op.description}"
                                </p>
                                {op.specs && (
                                  <div className="flex gap-2.5 pt-1 text-[9px] text-slate-300 font-mono">
                                    {op.specs.beds && op.specs.beds !== "N/A" && (
                                      <span>🛏 {op.specs.beds} {lang === "EN" ? (Number(op.specs.beds) > 1 ? "Beds" : "Bed") : "Ch."}</span>
                                    )}
                                    {op.specs.baths && op.specs.baths !== "N/A" && (
                                      <span>🚿 {op.specs.baths} {lang === "EN" ? (Number(op.specs.baths) > 1 ? "Baths" : "Bath") : "Sdb."}</span>
                                    )}
                                    {op.specs.space && op.specs.space !== "N/A" && <span>📐 {op.specs.space}</span>}
                                  </div>
                                )}
                                <div className="pt-1">
                                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase ${op.contactStatus === "Vérifié par Italco" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : op.contactStatus === "Disponible pour Visite" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                                    ● {localizedStatus}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-slate-900/80 flex items-center justify-between gap-2">
                                <div>
                                  <span className="text-[8px] text-slate-500 block font-mono uppercase">
                                    {lang === "EN" ? "Price Estimate" : "Estimation Prix"}
                                  </span>
                                  <span className="text-amber-400 font-mono font-bold text-xs">{op.price}</span>
                                </div>
                                <button
                                  onClick={() => {
                                    setGeneralBookingOpen(true);
                                    setGeneralBookingForm(prev => ({
                                      ...prev,
                                      message: lang === "EN"
                                        ? `I wish to schedule an entirely free tour ($0 fee) for the scanned opportunity “${op.title}” located in ${op.quartier} estimated at ${op.price}. Please certify this file at the Gombe land registry.`
                                        : `Je souhaite planifier une visite entièrement gratuite ($0 frais) pour l'opportunité scannée « ${op.title} » située à ${op.quartier} estimée à ${op.price}. Veuillez certifier ce dossier au cadastre de Gombe.`
                                    }));
                                  }}
                                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500 hover:text-white text-slate-300 text-[9px] font-mono font-bold py-1 px-2.5 rounded transition-all cursor-pointer"
                                >
                                  {lang === "EN" ? "Certify & Visit ($0)" : "Certifier & Visiter ($0)"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Suggest inline portfolio match */}
                  {webSearchResult.localMatchIds && webSearchResult.localMatchIds.length > 0 && (
                    <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 mt-2">
                      <span className="text-[10px] font-mono text-amber-400 block mb-2 uppercase tracking-wide">
                        {lang === "EN" ? "🔍 ANALOGOUS PROPERTY IMMEDIATELY AVAILABLE:" : "🔍 BIEN ANALOGUE IMMÉDIATEMENT DISPONIBLE :"}
                      </span>
                      {properties.filter(p => webSearchResult.localMatchIds.includes(p.id)).slice(0, 1).map(matchedProp => (
                        <div key={matchedProp.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img src={matchedProp.imageUrl} className="w-12 h-12 object-cover rounded-md" alt="" referrerPolicy="no-referrer" />
                            <div>
                              <h5 className="text-xs font-bold text-white leading-tight">{matchedProp.title}</h5>
                              <p className="text-[10px] text-slate-500 mt-0.5">{matchedProp.neighborhood} • <span className="text-amber-400 font-mono font-semibold">{matchedProp.price}</span></p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedProperty(matchedProp)}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-mono text-[9px] font-bold py-1.5 px-3 rounded uppercase border border-slate-700 w-full sm:w-auto cursor-pointer"
                          >
                            {lang === "EN" ? "Consult & Visit Free of Charge" : "Consulter & Visiter Gratuitement"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
        </div>
      </section>

      {/* Bento Grid: Les 3 Piliers de Confiance */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-12">
          <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "EN" ? "Zero risk, Absolute transparency" : "Zéro risque, Transparence absolue"}
          </span>
          <h2 className="text-slate-900 font-display font-bold text-3xl tracking-tight">
            {lang === "EN" ? "The 3 Pillars of Trust GO HOME" : "Les 3 Piliers de Confiance GO HOME"}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mt-3 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-8 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/30 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-900 mb-6 relative">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-slate-950 font-display font-semibold text-lg mb-3 uppercase tracking-wide">
              {lang === "EN" ? "Gombe Client Offices" : "Bureaux Clients Gombe"}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {lang === "EN" 
                ? "Guaranteed local anchor with our permanent client offices located at Av. du TSF, 01 ref. Premiere Mall, Q/Golf, C/Gombe, Kinshasa · +243 999 549 981. No makeshift meetups: negotiate and sign your leases in a secure professional setting."
                : "Ancrage local garanti avec nos bureaux clients permanents situés au Av. du TSF, 01 réf. Premiere Mall, Q/Golf, C/Gombe, Kinshasa · +243 999 549 981. Pas de rendez-vous de fortune : négociez et signez vos baux dans un cadre professionnel sécurisé."}
            </p>
          </div>

          {/* Pillar 2 (High-contrast Callout Pillar) */}
          <div className="p-8 bg-slate-950 text-white border border-slate-900 rounded-xl shadow-lg relative overflow-hidden group md:scale-[1.03]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full translate-x-8 -translate-y-8"></div>
            <div className="w-12 h-12 bg-amber-500/15 rounded-lg flex items-center justify-center text-amber-400 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-amber-400 font-display font-semibold text-lg mb-3 uppercase tracking-wide">
              {lang === "EN" ? "Certified Legality" : "Légalité Certifiée"}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {lang === "EN"
                ? "Perfect compliance with Law No. 15/025 on rent leases in the DRC. Each lease or purchase transaction is sealed by a notarized contract with structured invoicing issued directly by Italco Inc Sarl."
                : "Parfaite conformité avec la Loi n° 15/025 sur les baux à loyer en RDC. Chaque transaction de location ou d'achat est scellée par contrat notarié avec facturation normalisée émise directement par Italco Inc Sarl."}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/30 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-700 mb-6 relative">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-slate-950 font-display font-semibold text-lg mb-3 uppercase tracking-wide">
              {lang === "EN" ? "Digital Flexibility" : "Flexibilité Digitale"}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {lang === "EN"
                ? "A modern platform facilitating the payment of fees, premiums, or real estate deposits via local Mobile Money solutions (Airtel Money, M-Pesa/Vodacom, Orange Money) or international SWIFT wire."
                : "Une plateforme moderne facilitant le paiement des frais, primes ou acomptes immobiliers via des solutions de Mobile Money locales (Airtel Money, M-Pesa/Vodacom, Orange Money) ou virement international SWIFT."}
            </p>
          </div>

        </div>
      </section>

      {/* Elegant & Minimalist FAQ Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="px-4 md:px-10 max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
              {lang === "EN" ? "Frequently Asked Questions · Absolute Clarity" : "Foire Aux Questions · Clarté Absolue"}
            </span>
            <h2 className="text-slate-900 font-display font-bold text-3xl tracking-tight">
              {lang === "EN" ? "Frequently Asked Questions" : "Questions Fréquentes"}
            </h2>
            <div className="w-16 h-1 bg-amber-500 mt-4 mx-auto"></div>
          </div>

          <div className="space-y-4">
            
            {/* FAQ Item 1: Délais de transaction */}
            <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                className="w-full text-left p-5 md:p-6 flex justify-between items-center bg-white hover:bg-slate-50/60 transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-display font-semibold text-slate-900 text-sm md:text-base pr-4">
                  {lang === "EN" 
                    ? "What are the average real estate transaction delays in Kinshasa?" 
                    : "Quels sont les délais moyens de transaction immobilière à Kinshasa ?"}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center shrink-0 text-slate-500 transition-colors">
                  {openFaqIndex === 0 ? <ChevronDown className="w-4 h-4 text-amber-600" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>
              {openFaqIndex === 0 && (
                <div className="px-5 pb-6 md:px-6 md:pb-7 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/20">
                  <p>
                    {lang === "EN" 
                      ? "For the acquisition or conclusion of a residential or commercial lease certified by Italco, count an ultra-fast delay of 48 to 72 hours from the validation of documents. For land transactions with title deed transfer, official notarized legal conclusion at the Land Affairs office in Kinshasa generally requires 3 to 6 weeks, managed from end to end in a fully transparent manner."
                      : "Pour l'acquisition ou la conclusion d'un bail de location résidentiel ou commercial certifié par Italco, comptez un délai ultra-rapide de 48 à 72 heures à partir de la validation des pièces. Pour les dossiers de transactions foncières avec mutation de titre de propriété, l'aboutissement légal notarié officiel auprès du service des Affaires Foncières à Kinshasa requiert généralement entre 3 et 6 semaines, géré de bout en bout de manière parfaitement transparente."}
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 2: Documents requis pour la location */}
            <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                className="w-full text-left p-5 md:p-6 flex justify-between items-center bg-white hover:bg-slate-50/60 transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-display font-semibold text-slate-900 text-sm md:text-base pr-4">
                  {lang === "EN" 
                    ? "What documents are required to rent a property?" 
                    : "Quels sont les documents requis pour la location d'un bien ?"}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center shrink-0 text-slate-500 transition-colors">
                  {openFaqIndex === 1 ? <ChevronDown className="w-4 h-4 text-amber-600" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>
              {openFaqIndex === 1 && (
                <div className="px-5 pb-6 md:px-6 md:pb-7 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/20">
                  <p className="mb-3">
                    {lang === "EN" 
                      ? "In compliance with official DRC regulations and Italco's best practices, the rental file requires:"
                      : "Conformément aux directives officielles en RDC et aux bonnes pratiques d'Italco, le dossier locatif requiert :"}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-500">
                    {lang === "EN" ? (
                      <>
                        <li>A copy of a valid ID card (Voter Card or Passport).</li>
                        <li>Proof of income (last 3 payslips or professional certificate).</li>
                        <li>For companies, organizations, or embassies: Copy of official articles of association or a formal institutional guarantee letter.</li>
                      </>
                    ) : (
                      <>
                        <li>Une copie de la pièce d’identité en cours de validité (Carte d'Électeur ou Passeport).</li>
                        <li>Un justificatif de solvabilité (3 dernières fiches de paie ou attestation professionnelle).</li>
                        <li>Pour les entreprises, organisations ou ambassades : Copie des statuts constitutifs officiels ou une lettre formelle de prise en charge institutionnelle de l'organisme rattaché.</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* FAQ Item 3: Zones d'investissement */}
            <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                className="w-full text-left p-5 md:p-6 flex justify-between items-center bg-white hover:bg-slate-50/60 transition-colors cursor-pointer focus:outline-none"
              >
                <span className="font-display font-semibold text-slate-900 text-sm md:text-base pr-4">
                  {lang === "EN" 
                    ? "What specific geographic areas are recommended for investment?" 
                    : "Quelles sont les zones géographiques spécifiques recommandées pour l'investissement ?"}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center shrink-0 text-slate-500 transition-colors">
                  {openFaqIndex === 2 ? <ChevronDown className="w-4 h-4 text-amber-600" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>
              {openFaqIndex === 2 && (
                <div className="px-5 pb-6 md:px-6 md:pb-7 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/20">
                  <p>
                    {lang === "EN"
                      ? "Three major geographic poles currently stand out in Kinshasa from a profitability and security standpoint:"
                      : "Trois grands pôles géographiques se démarquent actuellement à Kinshasa d'un point de vue rentabilité et sécurité :"}
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-500">
                    {lang === "EN" ? (
                      <>
                        <li><strong>Gombe</strong>: The diplomatic and business hub, essential for high rental yields on top-tier leases (premium apartments and office headquarters).</li>
                        <li><strong>Ngaliema (Binza Pigeon, Binza Ma Campagne, GB) & Limete (Residential Areas)</strong>: Perfect for highly appreciative residential acquisitions or long-term expat leases.</li>
                        <li><strong>Nsele & Maluku (East Kinshasa)</strong>: Ideal for large-scale investment, offering high speculative land scouting potential in the medium term as well as emerging agro-industrial spaces.</li>
                      </>
                    ) : (
                      <>
                        <li><strong>La Gombe</strong> : Le carrefour diplomatique et des affaires, incontournable pour un excellent rendement locatif sur baux de haute volée (appartements premium et sièges professionnels).</li>
                        <li><strong>Ngaliema (Binza Pigeon, Binza Ma Campagne, GB) & Limete (Secteurs Résidentiels)</strong> : Parfait pour des projets d’acquisition à forte plus-value patrimoniale ou des baux d’expatriés de longue durée.</li>
                        <li><strong>Nsele & Maluku (Est de Kinshasa)</strong> : Idéal pour l’investissement d'envergure, offrant un fort potentiel spéculatif de prospection foncière à moyen terme ainsi que d'espaces agro-industriels en devenir.</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-150 dark:border-slate-900">
        <div className="px-4 md:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2 font-semibold">
              {t.testimonialBadge}
            </span>
            <h2 className="text-slate-900 dark:text-white font-display font-bold text-3xl tracking-tight">
              {t.testimonialTitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              {t.testimonialSub}
            </p>
            <div className="w-16 h-1 bg-amber-500 mt-4 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-slate-50/60 dark:bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-100/80 dark:border-slate-800 relative hover:border-amber-500/30 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase">
                    <Award className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.leaseValidated}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-amber-500/10 absolute -top-4 -left-2" />
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic relative z-10">
                    "{t.testimonial1Text}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-900 to-amber-500 flex items-center justify-center text-white font-mono text-xs font-bold leading-none shrink-0">
                  JM
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm">{t.testimonial1Name}</h4>
                    <span className="flex items-center text-emerald-600 dark:text-emerald-400" title={t.profileResident}>
                      <UserCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">{t.testimonial1Location}</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50/60 dark:bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-100/80 dark:border-slate-800 relative hover:border-amber-500/30 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="flex items-center gap-1 bg-amber-100/50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase">
                    <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span>{t.testimonial2Role}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-amber-500/10 absolute -top-4 -left-2" />
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic relative z-10">
                    "{t.testimonial2Text}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white font-mono text-xs font-bold leading-none shrink-0">
                  SB
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm">{t.testimonial2Name}</h4>
                    <span className="flex items-center text-emerald-600 dark:text-emerald-400" title={t.profileDiaspora}>
                      <UserCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">{t.testimonial2Location}</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50/60 dark:bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-100/80 dark:border-slate-800 relative hover:border-amber-500/30 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="flex items-center gap-1 bg-slate-900 dark:bg-slate-800 text-amber-400 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border border-slate-800 dark:border-slate-700">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{t.prestigeClient}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-amber-500/10 absolute -top-4 -left-2" />
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic relative z-10">
                    "{t.testimonial3Text}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-900 to-amber-500 flex items-center justify-center text-white font-mono text-xs font-bold leading-none shrink-0">
                  DK
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm">{t.testimonial3Name}</h4>
                    <span className="flex items-center text-emerald-600 dark:text-emerald-400" title={t.profileResident}>
                      <UserCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">{t.testimonial3Location}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Neighborhood Explorer: Quartiers Phares */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="px-4 md:px-10 max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                {t.explorerBadge}
              </span>
              <h2 className="text-white font-display font-bold text-3xl tracking-tight">
                {t.explorerTitle}
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                {t.explorerSub}
              </p>
            </div>
            
            <button 
              onClick={() => { setSelectedNeighborhood("Tous"); scrollToRef(propertiesSectionRef); }}
              className="text-amber-400 font-mono text-xs uppercase font-bold flex items-center gap-1 hover:underline cursor-pointer tracking-wider"
            >
              {t.exploreAll} <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Gombe card selector */}
            <div 
              onClick={() => selectNeighborhoodAndScroll("Gombe")}
              className="group relative h-80 overflow-hidden rounded-xl shadow-md cursor-pointer border border-slate-800"
            >
              <img 
                alt="La Gombe Business District" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKDT1xDwXKOnWLuDlgr_nazwZa5vm6gRnaBOFqGxKgUyBXBHm34AjCjlQ7n2Xjxb4Mh_hsA1lEWOX9HPptDEZZ9LV5AQduhOLQcQ6xZOZnUqEsa6AQmqlaGRQD2OvNd_DNGnBY-Rhqm23whUU5pTDOZpkfc3g8wKDiU_SRAjHk3aCf0XwSaXC-Y2S76r_zGSACkpWaDuwdC_oGGD6LQXavS196q1Wr1yfqfoiXkEGw9vtbxWiOm0cpQ0PWf_4CvzWroCIyeCWlxTM"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:via-slate-950/50 transition-all"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider block mb-1">
                  {lang === "EN" ? "PRESTIGE & HIGH-END RENTAL" : "PRESTIGE & LOCATIF HIGH-END"}
                </span>
                <h4 className="text-xl font-bold font-display text-white mb-1 group-hover:text-amber-400 transition-colors">
                  {lang === "EN" ? "La Gombe (Downtown & Socimat)" : "La Gombe (Centre & Socimat)"}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {lang === "EN" ? "Target: Multinationals, expat executives, high-yield investment." : "Cible : Multinationales, cadres expatriés, investissement à fort rendement."}
                </p>
              </div>
            </div>

            {/* Ngaliema card selector */}
            <div 
              onClick={() => selectNeighborhoodAndScroll("Ngaliema")}
              className="group relative h-80 overflow-hidden rounded-xl shadow-md cursor-pointer border border-slate-800"
            >
              <img 
                alt="Ngaliema Residential Area" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCUz6ay2NpVvyVkU3nvRh1VYdosBvTMrt_27LxwNNZ5GOYDScWIPm5eded6VgLr5f7IqKyj-EYka5wWQLMSxtMuoNF49Z-RdFMFHLdxdrc9LcDLaZF5TNxH_zXKnnii4tvTPqO5s7OExEXwgafEWAcfC8OssRBYMzuKhivhpEHzlsSwL4EJgZFkAUtJ-pIJm-8QwFhbr730fkyrkjnB2RozjzvmmdWAg1v6YcpuX_aHACHQGP6Nj4Nf-am9-aTjV6YUPH9k-U7u74"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:via-slate-950/50 transition-all"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider block mb-1">
                  {lang === "EN" ? "PREMIUM ELITE RESIDENTIAL" : "RÉSIDENTIEL PREMIUM D'ÉLITE"}
                </span>
                <h4 className="text-xl font-bold font-display text-white mb-1 group-hover:text-amber-400 transition-colors">
                  Ngaliema (Binza & Ma Campagne)
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {lang === "EN" ? "Target: Congolese elite, wealthy diaspora families, executives." : "Cible : Élite congolaise, familles aisées de la diaspora, cadres dirigeants."}
                </p>
              </div>
            </div>

            {/* Limete card selector */}
            <div 
              onClick={() => selectNeighborhoodAndScroll("Limete")}
              className="group relative h-80 overflow-hidden rounded-xl shadow-md cursor-pointer border border-slate-800"
            >
              <img 
                alt="Limete Business Mixed Zone" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7wkYATpQG6IJQrithWOBV-0ZP3qyUb_I7o8Mf6eW5yI3Ykr0MfDQqwq9L1ZfaKYO6Erm_6XM7JpbUZ-0v0Ro4VqUOmxBY7ETdAPiXXvInGRwndtg5zOumB1g8wS9BTq91rw8nPVrd2GSK98m-Uds1XU1r7qxFPCl5wa-n6Nxe1Yvk_g9Co-I5ExEYXh1D3w8cwkOKlTD7i9Ja_U9IBdw_888k9tTuVQHZ1xEcNaqqHozMs0D099BkJ60WuDfJ_2egMhGTCZUsOM8"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:via-slate-950/50 transition-all"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider block mb-1">
                  {lang === "EN" ? "COMMERCE & STRATEGIC LIVING" : "COMMERCE ET LOGIS STRATÉGIQUE"}
                </span>
                <h4 className="text-xl font-bold font-display text-white mb-1 group-hover:text-amber-400 transition-colors">
                  Limete (Industriel & Résidentiel)
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {lang === "EN" ? "Target: Upper middle class, entrepreneurs, SMEs, high-end storage." : "Cible : Classe moyenne haute, entrepreneurs, PME, stockage haut de standing."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Core Catalogue Section */}
      <section ref={propertiesSectionRef} className="py-20 px-4 md:px-10 max-w-7xl mx-auto scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6 border-b border-slate-100 dark:border-slate-900 pb-6">
          <div>
            <span className="text-amber-600 font-mono text-xs font-bold uppercase tracking-wider block">
              {t.catalogSubtitle}
            </span>
            <h2 className="text-slate-950 dark:text-white font-display font-bold text-2xl md:text-3xl tracking-tight mt-1">
              {t.catalogTitle}
            </h2>
          </div>

          {/* Interactive Search Tool */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto items-stretch sm:items-center">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.searchCatPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 h-[42px]"
              />
            </div>

            {/* Neighborhood select */}
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="text-xs p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono h-[42px]"
            >
              <option value="Tous">{t.allNeighborhoods}</option>
              <option value="Gombe">Gombe</option>
              <option value="Ngaliema">Ngaliema</option>
              <option value="Limete">Limete</option>
              <option value="Kintambo">{lang === "EN" ? "Kintambo & Mont-Ngafula" : "Kintambo & Mont-Ngafula"}</option>
              <option value="Maluku">{lang === "EN" ? "Nsele & Maluku" : "Nsele & Maluku"}</option>
            </select>

            {/* Price Range Slider */}
            <div className="flex flex-col justify-center min-w-[180px] sm:w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 px-3 h-[42px]">
              <div className="flex justify-between items-center text-[9px] font-mono uppercase text-slate-400 leading-none mb-1 select-none">
                <span>{lang === "EN" ? "Max Budget" : "Budget Max"}</span>
                <span className="text-amber-500 dark:text-amber-400 font-bold">
                  {maxPrice >= 1000000 
                    ? (lang === "EN" ? "No limit" : "Pas de limite") 
                    : `$${Math.min(maxPrice, sliderMax).toLocaleString()}${matchesOnlyRentals ? (lang === "EN" ? "/mo" : "/mois") : ""}`}
                </span>
              </div>
              <input
                type="range"
                min={matchesOnlyRentals ? 1000 : 10000}
                max={sliderMax}
                step={sliderStep}
                value={Math.min(maxPrice, sliderMax)}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val === sliderMax) {
                    setMaxPrice(1000000); // Represents no limit
                  } else {
                    setMaxPrice(val);
                  }
                }}
                className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 dark:accent-amber-400"
              />
            </div>

            {/* Price Sorting toggles */}
            <button
              onClick={() => {
                if (sortByPrice === "neutral") setSortByPrice("asc");
                else if (sortByPrice === "asc") setSortByPrice("desc");
                else setSortByPrice("neutral");
              }}
              className={`px-3.5 py-2.5 border rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors h-[42px] ${sortByPrice !== "neutral" ? "bg-slate-950 dark:bg-amber-500 text-white dark:text-slate-950 border-slate-950 dark:border-amber-500" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {t.sortPrice}: {sortByPrice === "asc" ? t.sortAsc : sortByPrice === "desc" ? t.sortDesc : t.sortDefault}
            </button>
          </div>
        </div>

        {/* Catalog grid display */}
        {loadingProperties ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl">
            <div className="inline-block w-8 h-8 border-4 border-slate-100 border-t-amber-500 rounded-full animate-spin mb-3"></div>
            <p className="text-xs text-slate-400 font-mono">{lang === "EN" ? "Loading exclusive portfolios..." : "Chargement des fiches exclusives..."}</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-900 dark:text-white font-semibold mb-1">{t.noPropFound}</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {t.noPropSub}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedNeighborhood("Tous");
                setSelectedCategory("Tous");
                setSortByPrice("neutral");
                setMaxPrice(1000000);
              }}
              className="mt-6 px-4 py-2 border border-slate-950 dark:border-slate-100 text-slate-950 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs uppercase font-bold tracking-wider"
            >
              {t.resetFiltersBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={getLocalizedProperty(prop, lang)}
                lang={lang}
                onOpenDetails={(p) => setSelectedProperty(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* AI Campaign & Copywriter Generation Panel */}
      <section ref={generatorSectionRef} className="py-20 bg-slate-100 border-y border-slate-200/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <LeadGenerator lang={lang} />
        </div>
      </section>

      {/* Corporate Compliance, Legal framework, and Category A highlight card */}
      <section ref={aboutSectionRef} className="py-20 px-4 md:px-10 max-w-7xl mx-auto scroll-mt-20">
        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-850">
          {/* Subtle design element */}
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-500/5 rounded-full select-none pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded font-mono text-[10px] font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {t.legalBadge}
              </div>

              <h2 className="text-white font-display font-bold text-3xl tracking-tight leading-tight">
                {t.legalTitle}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed font-sans font-medium">
                {t.legalText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-xs">
                    <strong>{t.compliancePoint1Title}</strong> {t.compliancePoint1Text}
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-xs">
                    <strong>{t.compliancePoint2Title}</strong> {t.compliancePoint2Text}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                {t.legalDisclaimer}
              </p>
            </div>

            {/* Right side credentials display */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
              <h4 className="text-amber-400 font-mono uppercase tracking-widest text-xs font-semibold">
                {t.diasporaTitle}
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-[10px] font-bold mt-1">
                    01
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-xs uppercase font-mono mb-1">{t.diasporaPoint1Title}</h5>
                    <p className="text-slate-400 text-xs text-justify">
                      {t.diasporaPoint1Text}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-[10px] font-bold mt-1">
                    02
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-xs uppercase font-mono mb-1">{t.diasporaPoint2Title}</h5>
                    <p className="text-slate-400 text-xs text-justify">
                      {t.diasporaPoint2Text}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono text-[10px] font-bold mt-1">
                    03
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-xs uppercase font-mono mb-1">{t.diasporaPoint3Title}</h5>
                    <p className="text-slate-400 text-xs text-justify">
                      {t.diasporaPoint3Text}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Elegant Footer matching visual layout */}
      <footer className="w-full bg-slate-950 text-white px-4 md:px-10 py-12 border-t border-slate-900 mt-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          
          {/* Logo & description column */}
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-500 inline-block"></span>
              <span className="text-white text-xl font-bold font-display uppercase tracking-wider">GO HOME</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              {t.footerRights}
            </div>
          </div>

          {/* Quick links and physical coordinates column */}
          <div className="space-y-4">
            <h5 className="text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
              {t.footerCoordHeader}
            </h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs text-slate-400 font-sans animate-fade-in">
              <li>{t.coordOffice}</li>
              <li>{t.coordLaw}</li>
              <li>{t.coordLicense}</li>
              <li>{t.coordMobileMoney}</li>
              <li>{t.coordPhone}</li>
              <li>{t.coordEmail}</li>
              <li>{t.coordSeniors}</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Bottom Nav Bar - Mobile screens only */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center justify-center gap-1 text-slate-950 font-bold transition-transform active:scale-95"
        >
          <Home className="w-5 h-5 text-amber-500" />
          <span className="text-[9px] font-mono tracking-widest font-bold uppercase">{lang === "EN" ? "Home" : "Accueil"}</span>
        </button>
        <button 
          onClick={() => scrollToRef(propertiesSectionRef)}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-950 transition-transform active:scale-95"
        >
          <Building2 className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-mono tracking-widest font-bold uppercase">{lang === "EN" ? "Properties" : "Biens"}</span>
        </button>
        <button 
          onClick={() => scrollToRef(generatorSectionRef)}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-950 transition-transform active:scale-95 relative"
        >
          <span className="absolute top-0 right-3.5 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          <Sparkles className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-mono tracking-widest font-bold uppercase">{lang === "EN" ? "AI Generator" : "IA Générateur"}</span>
        </button>
        <button 
          onClick={() => scrollToRef(aboutSectionRef)}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-950 transition-transform active:scale-95"
        >
          <ShieldCheck className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-mono tracking-widest font-bold uppercase">{lang === "EN" ? "Guarantees" : "Garanties"}</span>
        </button>
      </nav>

      {/* Active dossier details modal */}
      {selectedProperty && (
        <PropertyModal
          property={getLocalizedProperty(selectedProperty, lang)}
          onClose={() => setSelectedProperty(null)}
          lang={lang}
        />
      )}

      {/* General Free Visit Booking Modal */}
      {generalBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative shadow-2xl border border-slate-100 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => { setGeneralBookingOpen(false); setGeneralBookingSuccess(null); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full cursor-pointer text-sm font-bold w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase rounded inline-block mb-2">
                {lang === "EN" ? "📂 100% FREE TOUR ($0 FEES)" : "📂 VISITE 100% GRATUITE ($0 FRAIS)"}
              </span>
              <h3 className="text-slate-950 font-display font-bold text-xl">
                {lang === "EN" ? "Schedule a Private Turnover Visit" : "Planifier une Visite Privée Clé en Main"}
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                {lang === "EN"
                  ? "No informal brokers. Meet our certified senior brokers for a completely free tour and legal support inside our offices."
                  : "Aucun intermédiaire informel. Rencontrez nos courtiers seniors officiels pour une visite entièrement gratuite et un accompagnement notarié dans nos bureaux."}
              </p>
            </div>

            {generalBookingSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto font-bold text-lg select-none">
                  ✓
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {lang === "EN" ? "Your Free Tour is Registered!" : "Votre Visite Gratuite est Enregistrée !"}
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">{generalBookingSuccess}</p>
                <button
                  onClick={() => { setGeneralBookingOpen(false); setGeneralBookingSuccess(null); }}
                  className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 hover:underline"
                >
                  {lang === "EN" ? "Close window" : "Fermer la fenêtre"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleGeneralBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    {lang === "EN" ? "Your Full Name" : "Votre Nom & Prénom"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "EN" ? "E.g. Christian Katanga" : "Ex. Christian Katanga"}
                    value={generalBookingForm.name}
                    onChange={(e) => setGeneralBookingForm({ ...generalBookingForm, name: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      {lang === "EN" ? "Email Address" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="christian@company.com"
                      value={generalBookingForm.email}
                      onChange={(e) => setGeneralBookingForm({ ...generalBookingForm, email: e.target.value })}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                      {lang === "EN" ? "WhatsApp Phone Number" : "Téléphone Whatsapp"}
                    </label>
                    <input
                      type="tel"
                      placeholder={lang === "EN" ? "E.g. +243 89..." : "Ex. +243 89..."}
                      value={generalBookingForm.phone}
                      onChange={(e) => setGeneralBookingForm({ ...generalBookingForm, phone: e.target.value })}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    {lang === "EN" ? "Preferred Viewing Date (Secure Physical Office Meetings)" : "Date Souhaitée de Visite (Visites Sûres en Bureau Physique)"}
                  </label>
                  <input
                    type="date"
                    required
                    value={generalBookingForm.viewingDate}
                    onChange={(e) => setGeneralBookingForm({ ...generalBookingForm, viewingDate: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-semibold">
                    {lang === "EN" ? "Specific Requirements & Budgets" : "Exigences Spécifiques (et Budgets)"}
                  </label>
                  <textarea
                    rows={3}
                    value={generalBookingForm.message}
                    onChange={(e) => setGeneralBookingForm({ ...generalBookingForm, message: e.target.value })}
                    placeholder={
                      lang === "EN"
                        ? "Please detail here the property, office, land, or villa you wish to tour..."
                        : "Précisez ici les détails de la parcelle, du bureau, du terrain ou de la villa que vous souhaitez visiter..."
                    }
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                  />
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-[11px] text-emerald-800 leading-normal flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse mt-1 shrink-0"></span>
                  <span>
                    {lang === "EN"
                      ? "Transparency Guarantee: We never require upfront broker fees. All legal agreements are signed at our secure headquarters in Gombe."
                      : "Garantie Transparence : Nous ne demandons aucune commission préalable. Tous les contrats officiels s'opèrent dans nos bureaux permanents sécurisés Gombe."}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={generalBookingSubmitting}
                  className="w-full py-3 bg-slate-950 hover:bg-slate-900 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  {generalBookingSubmitting
                    ? (lang === "EN" ? "Submitting request..." : "Enregistrement en cours...")
                    : (lang === "EN" ? "Confirm my free appointment ($0)" : "Valider mon rendez-vous gratuit ($0)")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 active:scale-95 flex items-center justify-center cursor-pointer border border-amber-400/30 group"
          title={lang === "EN" ? "Back to top" : "Retour en haut"}
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}
