import React, { useState } from "react";
import { Property } from "../types";
import { translations } from "../translations";
import { Bed, ShowerHead, Maximize2, Share2, Copy, Check } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onOpenDetails: (property: Property) => void;
  lang?: "FR" | "EN";
  key?: any;
}

export default function PropertyCard({ property, onOpenDetails, lang = "FR" }: PropertyCardProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = translations[lang];

  // Determine badge styling based on value
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "VERIFIED LEGAL":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      case "SOUS OFFRE":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
      case "VENDU":
        return "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
      case "PRESTIGE":
        return "bg-indigo-100 text-indigo-900 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20";
      default:
        return "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20";
    }
  };

  const getDirectLink = () => {
    return `${window.location.origin}?property=${property.id}`;
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(getDirectLink()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textMsg = lang === "EN"
      ? `Hello! Sharing this exceptional property found on GO HOME (Italco):\n\n🏡 *${property.title}*\n📍 District: ${property.neighborhood}\n💰 Price: ${property.price}\n📊 Category: ${property.category}\n\n🔗 View full certified details here:\n${getDirectLink()}\n\n100% free premium assistance from Italco.`
      : `Bonjour ! Je partage avec vous ce bien d'exception trouvé sur GO HOME (Italco) :\n\n🏡 *${property.title}*\n📍 Quartier : ${property.neighborhood}\n💰 Prix : ${property.price}\n📊 Catégorie : ${property.category}\n\n🔗 Découvrez tous les détails et le dossier certifié ici :\n${getDirectLink()}\n\nAccompagnement 100% gratuit d'excellence avec Italco.`;
    const url = `https://wa.me/?text=${encodeURIComponent(textMsg)}`;
    window.open(url, "_blank");
    setShowShareMenu(false);
  };

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl overflow-hidden hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Status Badge */}
        <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold font-mono tracking-wider border rounded-md shadow-sm ${getBadgeStyle(property.badge)}`}>
          {property.badge}
        </span>
        
        {/* Pricing overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <p className="text-white font-mono font-bold text-lg tracking-wide">{property.price}</p>
          <p className="text-slate-300 text-xs font-sans mt-0.5">{property.category}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-secondary text-xs font-mono font-medium mb-2 uppercase tracking-wider dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
          {property.neighborhood}
        </div>
        
        <h3 className="text-slate-900 dark:text-white font-display font-semibold text-lg mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
          {property.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        {/* Specs summary list */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 mb-6 text-slate-600 dark:text-slate-300 text-xs mt-auto font-sans">
          <div className="flex items-center gap-1.5" title={lang === "EN" ? "Bedrooms" : "Chambres"}>
            <Bed className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium truncate">{property.specs.beds}</span>
          </div>
          <div className="flex items-center gap-1.5" title={lang === "EN" ? "Bathrooms" : "Salles de bain"}>
            <ShowerHead className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium truncate">{property.specs.baths}</span>
          </div>
          <div className="flex items-center gap-1.5" title={lang === "EN" ? "Area" : "Superficie habitable"}>
            <Maximize2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium truncate">{property.specs.size}</span>
          </div>
        </div>

        <div className="flex gap-2 relative">
          <button
            onClick={() => onOpenDetails(property)}
            className="flex-grow py-3 px-4 border border-slate-950 dark:border-slate-100 text-slate-950 dark:text-slate-100 rounded-lg hover:bg-slate-950 hover:text-white dark:hover:bg-slate-100 dark:hover:text-slate-950 transition-all duration-300 font-semibold text-xs tracking-wider uppercase active:scale-[0.98] cursor-pointer"
          >
            {t.consultDossier}
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className={`p-3 border rounded-lg transition-all duration-300 active:scale-[0.95] cursor-pointer ${showShareMenu ? "bg-amber-500 text-slate-950 border-amber-500" : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
              title={t.shareBtn}
            >
              <Share2 className="w-4 h-4" />
            </button>
            
            {showShareMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowShareMenu(false)}
                />
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-20 animate-in fade-in slide-in-from-bottom-2 duration-150">
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
        </div>
      </div>
    </div>
  );
}
