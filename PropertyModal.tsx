import React, { useState } from "react";
import { Property } from "./types";
import { translations } from "./translations";
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Percent, 
  HelpCircle, 
  Phone, 
  Calendar, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Check, 
  Map, 
  Compass, 
  Navigation 
} from "lucide-react";

interface PropertyMapProps {
  property: Property;
  lang?: "FR" | "EN";
}

export function PropertyMap({ property, lang = "FR" }: PropertyMapProps) {
  const [zoomLevel, setZoomLevel] = useState<"global" | "focus">("global");
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const getNeighborhoodData = (neighborhoodStr: string) => {
    const lower = neighborhoodStr.toLowerCase();
    const isEn = lang === "EN";
    if (lower.includes("gombe")) {
      return { 
        name: "Gombe", 
        coords: { x: 190, y: 50 }, 
        lat: "-4.3025° S", 
        lon: "15.3074° E",
        landmarks: isEn
          ? ["30 Juin Boulevard", "Pullman Grand Hotel", "French Embassy", "Central Station"]
          : ["Boulevard du 30 Juin", "Pullman Grand Hôtel", "Ambassade de France", "Gare Centrale"],
        desc: isEn
          ? "Business District & Embassies • Consular-level Protection"
          : "Centre d'Affaires & Ambassades • Protection de niveau Consulaire"
      };
    }
    if (lower.includes("ngaliema")) {
      return { 
        name: "Ngaliema", 
        coords: { x: 90, y: 105 }, 
        lat: "-4.3512° S", 
        lon: "15.2531° E",
        landmarks: isEn
          ? ["Binza Pigeon", "Ma Campagne", "Matadi Road", "Mbinza Waterfalls"]
          : ["Binza Pigeon", "Ma Campagne", "Route de Matadi", "Chutes de la Mbinza"],
        desc: isEn
          ? "Residential Hills • Elite peaceful & green havens"
          : "Collines Résidentielles • Havres de paix et de verdure d'élite"
      };
    }
    if (lower.includes("limete")) {
      return { 
        name: "Limete", 
        coords: { x: 270, y: 100 }, 
        lat: "-4.3642° S", 
        lon: "15.3391° E",
        landmarks: isEn
          ? ["Limete Interchange", "Lumumba Boulevard", "14th Street Residential", "Industrial Avenue"]
          : ["Échangeur de Limete", "Boulevard Lumumba", "Résidences du 14ème Rue", "Avenue Industrielle"],
        desc: isEn
          ? "Orthogonal urban plan shaded by secular trees"
          : "Plan d'urbanisme orthogonal arboré d'arbres séculaires"
      };
    }
    if (lower.includes("nsele") || lower.includes("n'sele")) {
      return { 
        name: "Nsele", 
        coords: { x: 410, y: 70 }, 
        lat: "-4.2694° S", 
        lon: "15.5482° E",
        landmarks: isEn
          ? ["Safari Beach", "Airport Highway", "N'sele River", "Italco Imperial City"]
          : ["Safari Beach", "Route de l'Aéroport", "Rivière N'sele", "Cité Impériale d'Italco"],
        desc: isEn
          ? "Future diaspora growth sector • River Escapade & Quiet"
          : "Secteur d'avenir de la diaspora • Escapade & Calme Fluvial"
      };
    }
    if (lower.includes("mont-ngafula") || lower.includes("ngafula")) {
      return { 
        name: "Mont-Ngafula", 
        coords: { x: 130, y: 180 }, 
        lat: "-4.4328° S", 
        lon: "15.2754° E",
        landmarks: isEn
          ? ["University of Kinshasa (UNIKIN)", "By-Pass Road", "Kimwenza", "Ma Vallee Lake"]
          : ["Université de Kinshasa (UNIKIN)", "By-Pass Road", "Kimwenza", "Lac de Ma Vallée"],
        desc: isEn
          ? "Temperate Heights • Exceptional forest & residential setting"
          : "Hauteurs Tempérées • Cadre forestier et résidentiel d'exception"
      };
    }
    return { 
      name: "Kinshasa", 
      coords: { x: 220, y: 100 }, 
      lat: "-4.3276° S", 
      lon: "15.3136° E",
      landmarks: isEn
        ? ["Triomphal Boulevard", "People's Palace", "Liberation Avenue", "Martyrs Stadium"]
        : ["Boulevard Triomphal", "Palais du Peuple", "Avenue de la Libération", "Stade des Martyrs"],
      desc: isEn
        ? "Residential excellence zone audited and certified by Italco Sarl"
        : "Zone résidentielle d'excellence auditée et certifiée par Italco Sarl"
    };
  };

  const data = getNeighborhoodData(property.neighborhood);

  const zones = [
    { id: "Ngaliema", name: "Ngaliema", x: 90, y: 105, size: 24 },
    { id: "Gombe", name: "Gombe", x: 190, y: 50, size: 22 },
    { id: "Limete", name: "Limete", x: 270, y: 100, size: 26 },
    { id: "Nsele", name: "N'sele", x: 410, y: 70, size: 28 },
    { id: "Mont-Ngafula", name: "Mt Ngafula", x: 130, y: 180, size: 24 },
  ];

  const isActive = (zoneId: string) => {
    return data.name.toLowerCase() === zoneId.toLowerCase();
  };

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl text-slate-100 flex flex-col font-sans transition-all duration-300">
      <div className="p-4 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Map className="w-4 h-4 text-amber-500" />
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
            {lang === "EN" ? "Land Registry & Certified Location" : "Cadastre & Localisation Certifiée"}
          </h5>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
          <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{lang === "EN" ? "DRC Compliant Beacons" : "Bornage RDC Conforme"}</span>
        </div>
      </div>

      <div className="relative h-[220px] bg-slate-950/80 overflow-hidden group select-none">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-slate-800/10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-slate-800/15 pointer-events-none"></div>
        
        {zoomLevel === "global" ? (
          <svg className="w-full h-full p-4 relative z-10" viewBox="0 0 500 220">
            <path
              d="M -10 45 C 100 45, 120 15, 200 15 C 280 15, 300 45, 410 40 C 470 38, 490 20, 520 20"
              fill="none"
              stroke="#2563eb"
              strokeWidth="10"
              strokeLinecap="round"
              className="opacity-40"
            />
            <path
              d="M -10 45 C 100 45, 120 15, 200 15 C 280 15, 300 45, 410 40"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-60"
            />
            <text x="320" y="28" fill="#60a5fa" className="text-[10px] font-mono italic opacity-50 font-semibold uppercase tracking-wider" style={{ fontSize: '7px' }}>
              {lang === "EN" ? "Congo River" : "Fleuve Congo"}
            </text>

            <path
              d="M 90 105 L 190 50 L 270 100 L 410 70"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-40"
            />
            <path
              d="M 90 105 L 130 180 L 270 100"
              fill="none"
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="opacity-30"
            />

            {zones.map((z) => {
              const active = isActive(z.id);
              const hovered = hoveredZone === z.id;
              return (
                <g 
                  key={z.id}
                  className="cursor-pointer transition-all duration-250"
                  onMouseEnter={() => setHoveredZone(z.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <circle
                    cx={z.x}
                    cy={z.y}
                    r={z.size}
                    fill={active ? "rgba(245, 158, 11, 0.08)" : hovered ? "rgba(255, 255, 255, 0.04)" : "transparent"}
                    stroke={active ? "rgba(245, 158, 11, 0.35)" : hovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.04)"}
                    strokeWidth={active ? "2" : "1"}
                    className="transition-all"
                  />
                  <circle
                    cx={z.x}
                    cy={z.y}
                    r={active ? "5" : "3"}
                    fill={active ? "#f59e0b" : "#475569"}
                    className={active ? "animate-pulse" : ""}
                  />
                  <text
                    x={z.x}
                    y={z.y + z.size + 4}
                    textAnchor="middle"
                    fill={active ? "#f59e0b" : hovered ? "#f8fafc" : "#94a3b8"}
                    className="font-mono uppercase font-bold tracking-wider"
                    style={{ fontSize: '8px' }}
                  >
                    {z.name}
                  </text>
                </g>
              );
            })}

            <g transform={`translate(${data.coords.x}, ${data.coords.y - 12})`} className="pointer-events-none">
              <circle cx="0" cy="12" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="2" className="animate-ping opacity-40" />
              <path
                d="M12 0c-6.627 0-12 5.373-12 12 0 8.5 12 20 12 20s12-11.5 12-20c0-6.627-5.373-12-12-12zm0 15c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                fill="#f59e0b"
                transform="scale(0.5) translate(-12, -8)"
                className="drop-shadow-lg"
              />
            </g>
          </svg>
        ) : (
          <div className="w-full h-full p-4 flex flex-col justify-between relative z-10 animate-in zoom-in-95 duration-250">
            <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 200">
              <line x1="50" y1="-10" x2="350" y2="210" stroke="#94a3b8" strokeWidth="12" />
              <line x1="-10" y1="120" x2="410" y2="120" stroke="#94a3b8" strokeWidth="16" />
              <line x1="180" y1="-10" x2="180" y2="210" stroke="#94a3b8" strokeWidth="8" />

              <text x="210" y="114" fill="#cbd5e1" className="font-mono uppercase tracking-widest" style={{ fontSize: '6px' }}>
                {data.name === "Gombe" ? "BLVD DU 30 JUIN" : data.name === "Ngaliema" ? "ROUTE DE MATADI" : data.name === "Limete" ? "BOULEVARD LUMUMBA" : "AVENUE PRINCIPALE"}
              </text>
              <text x="90" y="60" fill="#cbd5e1" className="font-mono uppercase tracking-widest rotate-[36deg]" style={{ fontSize: '5px' }}>
                {data.name === "Gombe" ? "AVENUE DE LA GOMBE" : data.name === "Ngaliema" ? "RUE DE LA MONTAGNE" : data.name === "Limete" ? "14EME RUE RESIDENTIELLE" : "ALLÉE DU FLEUVE"}
              </text>
            </svg>

            <div className="absolute top-1/4 left-1/3 w-32 h-20 border border-amber-500/30 bg-amber-500/5 rounded-lg flex items-center justify-center pointer-events-none">
              <span className="text-[7px] text-amber-400 font-mono tracking-wider font-bold uppercase">
                {lang === "EN" ? "Parcel" : "Parcelle"} {property.id.slice(-6).toUpperCase()}
              </span>
            </div>
            
            <div className="absolute top-[10%] left-[10%] w-20 h-16 border border-slate-700/40 bg-slate-800/10 rounded pointer-events-none"></div>
            <div className="absolute top-[55%] left-[65%] w-28 h-20 border border-slate-700/40 bg-slate-800/10 rounded pointer-events-none"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <span className="absolute w-24 h-24 rounded-full border border-amber-500/40 animate-ping opacity-30"></span>
              <span className="absolute w-12 h-12 rounded-full border border-amber-500/60 animate-ping opacity-20"></span>
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 flex items-center justify-center border border-white">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-2 py-1 rounded text-[9px] font-mono font-medium text-slate-300 pointer-events-none">
              📍 {lang === "EN" ? "Exact Position After Land Audit" : "Position Exacte après Audit Foncier"}
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3 z-20 flex gap-1">
          <button
            type="button"
            onClick={() => setZoomLevel("global")}
            className={`px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border cursor-pointer transition-all ${zoomLevel === "global" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-100"}`}
          >
            Kinshasa
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel("focus")}
            className={`px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded border cursor-pointer transition-all ${zoomLevel === "focus" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-100"}`}
          >
            {lang === "EN" ? "Zoom Parcel" : "Zoom Parcelle"}
          </button>
        </div>

        <div className="absolute bottom-3 right-3 z-20 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-850 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
          <Navigation className="w-3 h-3 text-amber-500 animate-pulse" />
          <span>{data.lat} · {data.lon}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-850 space-y-3">
        <div>
          <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider">
            {lang === "EN" ? `District : ${data.name} (Kinshasa)` : `Secteur : ${data.name} (Kinshasa)`}
          </span>
          <p className="text-slate-300 text-xs mt-1 font-sans leading-relaxed">
            {data.desc}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-900 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
          <div className="col-span-2 text-slate-500 font-bold uppercase tracking-widest pb-1">
            {lang === "EN" ? "Notable nearby points of interest :" : "Points d'intérêt notables à proximité :"}
          </div>
          {data.landmarks.map((l, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="truncate" title={l}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  lang?: "FR" | "EN";
}

export default function PropertyModal({ property, onClose, lang = "FR" }: PropertyModalProps) {
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    viewingDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    referenceCode?: string;
  } | null>(null);

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = translations[lang];

  const getDirectLink = () => {
    return `${window.location.origin}?property=${property.id}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getDirectLink()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppShare = () => {
    const textMsg = lang === "EN"
      ? `Hello! Sharing this exceptional property found on GO HOME (Italco):\n\n🏡 *${property.title}*\n📍 District: ${property.neighborhood}\n💰 Price: ${property.price}\n📊 Category: ${property.category}\n\n🔗 View full certified details here:\n${getDirectLink()}\n\n100% free premium assistance from Italco.`
      : `Bonjour ! Je partage avec vous ce bien d'exception trouvé sur GO HOME (Italco) :\n\n🏡 *${property.title}*\n📍 Quartier : ${property.neighborhood}\n💰 Prix : ${property.price}\n📊 Catégorie : ${property.category}\n\n🔗 Découvrez tous les détails et le dossier certifié ici :\n${getDirectLink()}\n\nAccompagnement 100% gratuit d'excellence avec Italco.`;
    const url = `https://wa.me/?text=${encodeURIComponent(textMsg)}`;
    window.open(url, "_blank");
    setShowShareMenu(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingForm,
          propertyId: property.id,
          requestedViewing: bookingForm.viewingDate ? true : false,
          message: `Booking request for: ${property.title}. Message: ${bookingForm.message}`,
          lang
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmissionResult({
          success: true,
          message: lang === "EN" 
            ? `Thank you ${bookingForm.name}. Your request has been transmitted. A senior broker will contact you under 24 hours.`
            : data.message,
          referenceCode: data.referenceCode
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.error || (lang === "EN" ? "An error occurred during submission." : "Une erreur est survenue lors de l'envoi.")
        });
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        message: lang === "EN" 
          ? "Cannot reach server. Please check your internet connection."
          : "Impossible de joindre le serveur. Veuillez vérifier votre connexion."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-900 shrink-0">
          <div>
            <span className="text-amber-600 dark:text-amber-400 text-xs font-mono uppercase tracking-widest font-semibold block mb-1">
              {lang === "EN" ? `Referenced File • ${property.badge}` : `Dossier Référencé • ${property.badge}`}
            </span>
            <h2 className="text-slate-900 dark:text-white font-display font-semibold text-xl md:text-2xl tracking-tight">
              {property.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`p-2 rounded-full transition-all flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer border ${showShareMenu ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800"}`}
                title={t.shareBtn}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.shareBtn}</span>
              </button>
              
              {showShareMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowShareMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                      onClick={handleCopyLink}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">{t.copiedLink}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>{t.copyLink}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleWhatsAppShare}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-emerald-500 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.62.963 3.41 1.47 5.259 1.471h.005c5.479 0 9.936-4.457 9.94-9.94.002-2.657-1.03-5.153-2.902-7.027A9.878 9.878 0 0 0 12.002 1.84c-5.461 0-9.917 4.458-9.92 9.944-.001 1.814.473 3.586 1.372 5.161l-.903 3.3 3.38-.886zm12.316-7.062c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      </svg>
                      <span>{t.shareWhatsapp}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Context container */}
        <div className="overflow-y-auto p-6 md:p-8 flex-grow bg-white dark:bg-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: Images and Specs */}
            <div className="lg:col-span-7 space-y-6 text-slate-800 dark:text-slate-200">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 text-sm font-semibold rounded font-mono font-bold">
                  {property.price}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-slate-900 dark:text-white font-display font-semibold text-base mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  {t.modalDescription}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Detailed specs list */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                <h4 className="text-slate-900 dark:text-white font-semibold text-xs font-mono uppercase tracking-wider mb-4">
                  {t.modalSpecsTitle}
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-sans text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === "EN" ? "District:" : "Quartier :"}</span>
                    <span className="text-slate-950 dark:text-white font-medium">{property.neighborhood}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === "EN" ? "Category:" : "Catégorie :"}</span>
                    <span className="text-slate-950 dark:text-white font-medium">{property.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === "EN" ? "Interior:" : "Intérieur :"}</span>
                    <span className="text-slate-950 dark:text-white font-medium">{property.specs.beds} / {property.specs.baths}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === "EN" ? "Area:" : "Superficie :"}</span>
                    <span className="text-slate-950 dark:text-white font-medium">{property.specs.size}</span>
                  </div>
                  {property.specs.parking && (
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2 col-span-2">
                      <span className="text-slate-400">{lang === "EN" ? "Parking:" : "Stationnement :"}</span>
                      <span className="text-slate-950 dark:text-white font-medium">{property.specs.parking}</span>
                    </div>
                  )}
                  {property.specs.security && (
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2 col-span-2">
                      <span className="text-slate-400">{lang === "EN" ? "Security Measures:" : "Dispositif Sécurité :"}</span>
                      <span className="text-slate-950 dark:text-white font-medium">{property.specs.security}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Simplified location map */}
              <PropertyMap property={property} lang={lang} />

              {/* ROI & Plus value */}
              <div className="bg-amber-500/5 dark:bg-amber-500/10 rounded-xl p-5 border border-amber-500/20 flex gap-4">
                <Percent className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <h5 className="text-slate-950 dark:text-amber-400 font-semibold text-sm mb-1">
                    {lang === "EN" ? "Financial Opportunity & ROI" : "Opportunité Financière & ROI"}
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-sans font-medium">
                    {property.roi}. {lang === "EN" ? "Italco Sarl manages lease drafting and compliance in total transparency." : "Italco Sarl gère l'établissement du bail et l'assistance fiscale en toute conformité."}
                  </p>
                </div>
              </div>

              {/* Extra Features list */}
              <div>
                <h4 className="text-slate-950 dark:text-white font-semibold text-xs font-mono uppercase tracking-wider mb-3">
                  {lang === "EN" ? "Additional amenities included" : "Prestations additionnelles incluses"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Contact / Form */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Agency Credentials card */}
              <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <h5 className="text-white font-display font-semibold text-sm tracking-wide uppercase">
                    Italco Inc Sarl • GO HOME
                  </h5>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {lang === "EN" 
                    ? "Real estate agency specializing in luxury properties in Kinshasa. Licensed N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Ministry of Urban Planning & Housing, Category A), securing complete compliance for acquisitions, development and rentals."
                    : "Agence immobilière spécialisée dans le haut de gamme à Kinshasa. Titulaire du Certificat d'Agrément d'Agence Immobilière N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Ministère de l'Urbanisme et Habitat, Catégorie A), assurant une fiabilité absolue."
                  }
                </p>
                <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 space-y-1.5 font-mono">
                  <p>📍 {lang === "EN" ? "Client Offices: Av. du TSF, 01 ref. Premiere Mall, Q/Golf, C/Gombe, Kinshasa · +243 999 549 981" : "Bureaux Clients : Av. du TSF, 01 réf. Premiere Mall, Q/Golf, C/Gombe, Kinshasa · +243 999 549 981"}</p>
                  <p>📄 {lang === "EN" ? "DRC Law n° 15/025 compliant (Baux RDC)" : "Conforme Loi n° 15/025 (Baux RDC)"}</p>
                  <p>💳 {lang === "EN" ? "Mobile Money and International Wire support" : "Mobile Money et Virement international"}</p>
                </div>
              </div>

              {/* Direct Booking Form */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-slate-900 dark:text-white font-display font-semibold text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-500 animate-pulse animate-duration-1000" />
                    {t.modalContactForm}
                  </h4>
                  <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg p-2.5 text-xs font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping shrink-0"></span>
                    <span><strong>{lang === "EN" ? "Tour Fee: $0 (Free)" : "Frais de Visite : Gratuit ($0)"}</strong>. {lang === "EN" ? "GO HOME does not charge any transportation or coordination fees." : "GO HOME ne facture aucun frais de transport ni d'organisation de visite."}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs font-sans font-medium">
                  {lang === "EN" 
                    ? "Get personalized support with an official senior broker at our Gombe offices."
                    : "Bénéficiez d'un accompagnement personnalisé avec un courtier senior officiel dans nos bureaux de Gombe."
                  }
                </p>

                {submissionResult ? (
                  <div className={`p-4 rounded-lg flex flex-col gap-2 ${submissionResult.success ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border border-emerald-500/20" : "bg-red-500/10 text-red-900 dark:text-red-300 border border-red-500/20"}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${submissionResult.success ? "text-emerald-500" : "text-red-500"}`} />
                      <p className="text-xs font-medium">{submissionResult.message}</p>
                    </div>
                    {submissionResult.referenceCode && (
                      <p className="text-[11px] font-mono text-amber-600 dark:text-amber-400 mt-2 bg-slate-950/20 p-2 rounded">
                        <strong>{lang === "EN" ? "Dossier Code:" : "Code Dossier :"}</strong> {submissionResult.referenceCode}
                      </p>
                    )}
                    <button 
                      onClick={() => setSubmissionResult(null)}
                      className="text-xs font-bold text-center underline uppercase mt-3 hover:text-slate-900 dark:hover:text-white"
                    >
                      {lang === "EN" ? "Submit another request" : "Refaire une autre demande"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">{t.modalFormName} *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={bookingForm.name}
                        onChange={handleInputChange}
                        placeholder={lang === "EN" ? "E.g. John Mukendi" : "Ex: Jean Mukendi"}
                        className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-transparent text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">{t.modalFormEmail} *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={bookingForm.email}
                          onChange={handleInputChange}
                          placeholder="Ex: jean@example.com"
                          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-transparent text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">{t.modalFormPhone} *</label>
                        <input
                          type="text"
                          name="phone"
                          required
                          value={bookingForm.phone}
                          onChange={handleInputChange}
                          placeholder="Ex: +243 ..."
                          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-transparent text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">{lang === "EN" ? "Preferred tour date (Optional)" : "Date souhaitée pour visite (Optionnelle)"}</label>
                      <input
                        type="date"
                        name="viewingDate"
                        value={bookingForm.viewingDate}
                        onChange={handleInputChange}
                        className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono bg-transparent text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">{lang === "EN" ? "Special instructions or requests" : "Instructions ou requêtes spéciales"}</label>
                      <textarea
                        name="message"
                        rows={2}
                        value={bookingForm.message}
                        onChange={handleInputChange}
                        placeholder={lang === "EN" ? "Indicate if this is a direct purchase, a rental from abroad, etc." : "Indiquez s'il s'agit d'un achat direct, d'un investissement locatif depuis l'étranger, etc."}
                        className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-transparent text-slate-900 dark:text-slate-100"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? t.modalFormSubmitting : t.modalFormSubmit}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
