import React, { useState, useEffect } from "react";
import { GeneratorParams, GeneratedLead } from "../types";
import { translations } from "../translations";
import { Sparkles, Copy, Info, CornerDownRight, RotateCcw, ClipboardCheck } from "lucide-react";

interface LeadGeneratorProps {
  lang?: "FR" | "EN";
}

export default function LeadGenerator({ lang = "FR" }: LeadGeneratorProps) {
  const t = translations[lang];

  const [params, setParams] = useState<GeneratorParams>({
    neighborhood: "Gombe (Centre)",
    projectType: lang === "EN" ? "Premium Residential" : "Résidentiel Premium",
    budget: "$250,000",
    targetAudience: lang === "EN" 
      ? "Congolese business diaspora (Belgium, France, USA) seeking legal security" 
      : "Diaspora congolaise d'affaires (Belgique, France, USA) cherchant la sécurité juridique",
    customDetails: ""
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedLead | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync default targetAudience and projectType when lang changes
  useEffect(() => {
    setParams(prev => ({
      ...prev,
      projectType: lang === "EN" ? "Premium Residential" : "Résidentiel Premium",
      targetAudience: lang === "EN" 
        ? "Congolese business diaspora (Belgium, France, USA) seeking legal security" 
        : "Diaspora congolaise d'affaires (Belgique, France, USA) cherchant la sécurité juridique",
    }));
  }, [lang]);

  // Stepper steps for premium RDC copywriting
  const steps = lang === "EN" ? [
    "Analyzing target positioning & land registry...",
    "Verifying legal compliance with DRC Law n° 15/025...",
    "Evaluating average rental yields & ROI of selected neighborhood...",
    "Applying Italco Inc Sarl elite business branding standards...",
    "Drafting elite copywriting and psychological calls to action..."
  ] : [
    "Analyse du positionnement et du cadastre foncier...",
    "Vérification de l'alignement légal sur la Loi RDC n° 15/025...",
    "Évaluation des taux de rendement locatifs et ROI du quartier...",
    "Application du chartisme d'affaires Italco Inc Sarl...",
    "Rédaction du copywriting d'élite et de l'appel à l'action..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading, steps.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/leads/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params, lang })
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || (lang === "EN" ? "An error occurred with Gemini." : "Une erreur est survenue lors de la génération avec Gemini."));
      }
    } catch (err) {
      setError(lang === "EN" ? "Unable to connect to lead generator backend." : "Impossible de contacter le serveur de génération d'opportunités.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const isEn = lang === "EN";
    const fullText = `📍 ${result.accrocheTitle}

━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ${isEn ? "TECHNICAL SHEET" : "FICHE TECHNIQUE"} :
• ${isEn ? "District" : "Quartier"} : ${result.technicalSheet.quartier}
• ${isEn ? "Project Type" : "Type de Projet"} : ${result.technicalSheet.typeProjet}
• ${isEn ? "Estimated Budget" : "Budget Estimatif"} : ${result.technicalSheet.budgetEstimatif}
• ${isEn ? "Estimated ROI" : "ROI / Rendement"} : ${result.technicalSheet.potentialRoi}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 ${isEn ? "CAMPAIGN COPYWRITING" : "TEXTE DE CAMPAGNE"} :
"${result.copywritingText}"

━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ ${isEn ? "TRUST GUARANTEES" : "LES GARANTIES DE CONFIANCE"} (GO HOME & Italco Inc Sarl) :
• ${result.assuranceSection.points[0]}
• ${result.assuranceSection.points[1]}
• ${result.assuranceSection.points[2]}

━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 ${isEn ? "CALL TO ACTION" : "APPEL À L'ACTION"} :
${result.callToAction}

📍 ${isEn ? "Client Offices: Av. du TSF, 01 ref. Premiere Mall, Q/Golf, C/Gombe, Kinshasa · +243 999 549 981. National License N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Category A)." : "Bureaux Clients : Av. du TSF, 01 réf. Premiere Mall, Q/Golf, C/Gombe, Kinshasa · +243 999 549 981. Agrément National d'Agence Immobilière N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Ministère de l'Urbanisme et Habitat, Catégorie A)."}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-950 dark:text-amber-400 font-mono text-[10px] font-bold uppercase rounded-md tracking-widest inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 inline" />
          {lang === "EN" ? "Generative Technology Gemini 3.5" : "Technologie Générative Gemini 3.5"}
        </span>
        <h2 className="text-slate-900 dark:text-white font-display font-bold text-2xl md:text-3xl tracking-tight">
          {lang === "EN" ? "Elite AI Lead Generator « GO HOME »" : "Générateur d'Opportunités d’Élite « GO HOME »"}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-sans text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          {lang === "EN" 
            ? "For senior brokers and diaspora investors: generate high-converting landing copies and pre-vetted campaign structures instantly."
            : "Pour les courtiers seniors d'Italco Sarl et investisseurs de la diaspora : structurez des campagnes d’accroche et des fiches foncières normalisées en quelques secondes."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Parameters input column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-6 rounded-xl shadow-sm">
          <h3 className="text-slate-900 dark:text-white font-display font-semibold text-sm mb-4 border-b border-slate-50 dark:border-slate-900 pb-2">
            {lang === "EN" ? "Opportunity parameters" : "Paramètres de l'opportunité"}
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4 text-slate-800 dark:text-slate-200">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                {t.selectNeighborhood}
              </label>
              <select
                name="neighborhood"
                value={params.neighborhood}
                onChange={handleInputChange}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans text-slate-900 dark:text-slate-100"
              >
                <option value="Gombe (Centre)">Gombe (Centre) : {lang === "EN" ? "Prestige & Offices" : "Prestige & Bureaux"}</option>
                <option value="Gombe (Socimat/GLM)">Gombe (Socimat/GLM) : {lang === "EN" ? "High-end rental" : "Locatif haut de gamme"}</option>
                <option value="Ngaliema (Ma Campagne/Binza)">Ngaliema (Ma Campagne/Binza) : {lang === "EN" ? "Premium Residential" : "Résidentiel Premium"}</option>
                <option value="Limete (Industriel/Résidentiel)">Limete (Industriel/Résidentiel) : {lang === "EN" ? "Mixed Commerce/Living" : "Mixte Commerce/Logis"}</option>
                <option value="Kintambo & Mont-Ngafula">Kintambo & Mont-Ngafula : {lang === "EN" ? "Accessibility & Calm" : "Accessibilité & calme"}</option>
                <option value="Maluku / Nsele (Est)">Maluku / Nsele (Est) : {lang === "EN" ? "Speculative land reserve" : "Projets spéculatifs & réserve foncière"}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                {t.selectProjectType}
              </label>
              <select
                name="projectType"
                value={params.projectType}
                onChange={handleInputChange}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans text-slate-900 dark:text-slate-100"
              >
                <option value="Résidentiel Premium">{lang === "EN" ? "Premium Residential" : "Résidentiel Premium"}</option>
                <option value="Commercial / Bureaux">{lang === "EN" ? "Commercial / Offices" : "Commercial / Bureaux"}</option>
                <option value="Appartement Locatif Multi-Unit">{lang === "EN" ? "Multi-Unit Apartment Investment" : "Appartement Locatif Multi-Unit / Investissement"}</option>
                <option value="Terrain nu / Placement Foncier">{lang === "EN" ? "Empty Plot / Land Reserve" : "Terrain nu / Placement Foncier"}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                {t.enterBudget}
              </label>
              <input
                type="text"
                name="budget"
                value={params.budget}
                onChange={handleInputChange}
                placeholder={lang === "EN" ? "E.g. $450,000 or $3,500 / month" : "Ex: $450,000 ou $3,500 / mois"}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                {t.enterAudience}
              </label>
              <input
                type="text"
                name="targetAudience"
                value={params.targetAudience}
                onChange={handleInputChange}
                placeholder={lang === "EN" ? "E.g. European diaspora seeking trust" : "Ex: Diaspora de France cherchant de la réassurance"}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                {t.enterDetails}
              </label>
              <textarea
                name="customDetails"
                rows={3}
                value={params.customDetails}
                onChange={handleInputChange}
                placeholder={lang === "EN" ? "E.g. Infinity pool overlooking hills, clear land registration certificate." : "Ex: Piscine à débordement sur les collines, titre de propriété validé par le conservateur, agrément catégorie A."}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-900 dark:text-slate-100"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-950 dark:bg-amber-500 hover:bg-slate-900 dark:hover:bg-amber-600 border border-slate-950 dark:border-amber-600 text-white dark:text-slate-950 rounded-lg transition-all duration-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400 dark:text-slate-950" />
              {loading ? t.generatingCampaignBtn : t.generateCampaignBtn}
            </button>
          </form>

          {/* Institutional note */}
          <div className="mt-4 p-3 bg-indigo-50 dark:bg-slate-900 border border-indigo-100/50 dark:border-slate-800 rounded-lg flex gap-2.5">
            <Info className="w-4 h-4 text-indigo-900 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-indigo-950 dark:text-slate-300 leading-relaxed font-sans">
              {lang === "EN" 
                ? "The AI automatically includes our triple legal safeguards aligned with License N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Category A) and our registered Gombe offices."
                : "L'IA applique automatiquement notre triple sécurité légale conjointe à l'Agrément de l'Urbanisme & Habitat N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Catégorie A) d'Italco Sarl (Nuova Italia Sarlu) et notre adresse client officielle."
              }
            </p>
          </div>
        </div>

        {/* Output Generation workspace column */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[460px] text-center">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-900 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h4 className="text-slate-950 dark:text-white font-display font-semibold text-base mb-2">
                {lang === "EN" ? "Generating elite campaign copy..." : "Génération de l'accroche d'affaires..."}
              </h4>
              <p className="text-slate-400 text-xs font-mono max-w-sm">
                RDC Immobilier AI Engine : {steps[loadingStep]}
              </p>
              
              <div className="w-48 bg-slate-100 dark:bg-slate-900 h-1 rounded-full overflow-hidden mt-6">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 rounded-xl p-8 text-center shrink-0 min-h-[460px] flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="text-red-950 dark:text-red-400 font-semibold mb-2">{lang === "EN" ? "Configuration required" : "Configuration requise"}</h4>
              <p className="text-red-800 dark:text-red-300 text-xs font-sans max-w-md leading-relaxed whitespace-pre-line mb-6">
                {error}
              </p>
              <div className="text-slate-400 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-lg max-w-md">
                {lang === "EN" ? (
                  <>
                    <strong>Deployment advice:</strong> Add the <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-red-600 font-bold">GEMINI_API_KEY</code> variable in the <strong>Settings &gt; Secrets</strong> tab to activate autonomous real estate analysis.
                  </>
                ) : (
                  <>
                    <strong>Conseil de déploiement :</strong> Ajoutez la variable <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-red-600 font-bold">GEMINI_API_KEY</code> dans l'onglet <strong>Settings &gt; Secrets</strong> pour activer l'analyse immobilière autonome de Kinshasa.
                  </>
                )}
              </div>
            </div>
          ) : result ? (
            <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl shadow-lg p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
              
              {/* Output Header */}
              <div className="flex justify-between items-start gap-4 border-b border-slate-100 dark:border-slate-900 pb-4">
                <div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono py-0.5 px-2 rounded font-bold tracking-wide">
                    {lang === "EN" ? "EXCLUSIVE CAMPAIGN • READY TO USE" : "CAMPAGNE EXCLUSIVE • PRÊTE À L'EMPLOI"}
                  </span>
                  <h4 className="text-slate-900 dark:text-white font-display font-bold text-lg leading-tight mt-1">
                    {result.accrocheTitle}
                  </h4>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 text-xs font-semibold cursor-pointer"
                  title={lang === "EN" ? "Copy campaign dossier" : "Copier le dossier de campagne"}
                >
                  {copied ? (
                    <>
                      <ClipboardCheck className="w-4 h-4 text-emerald-600 animate-bounce" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[10px]">{lang === "EN" ? "Copied" : "Copié"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="font-mono text-[10px]">{lang === "EN" ? "Copy" : "Copier"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Visual Suggestion wrapper */}
              <div className="bg-slate-950 text-white p-5 rounded-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3">
                  <span className="text-[9px] font-mono font-bold bg-amber-400 text-slate-950 py-0.5 px-1.5 uppercase rounded tracking-wider">
                    {lang === "EN" ? "Art Direction" : "Direction Artistique"}
                  </span>
                </div>
                <h5 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <CornerDownRight className="w-3 h-3 text-amber-400" /> {lang === "EN" ? "Recommended conceptual illustration image" : "Image d'illustration conceptuelle recommandée"}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed italic font-sans pr-16 font-medium">
                  "{result.visualConcept.imageType}"
                </p>
                <div className="mt-3 text-[10px] text-slate-500 font-sans">
                  * {lang === "EN" ? "Note: Suggested visuals act as modern luxury architectural inspiration." : "Note: Les visuels suggérés servent d'inspiration architecturale moderne de grand luxe."}
                </div>
              </div>

              {/* Technical Sheet Block */}
              <div>
                <h5 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-3">
                  {lang === "EN" ? "Key Data & Estimated Profitability" : "Données Clés & Rentabilité Estimée"}
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-lg">
                    <span className="block text-[10px] text-slate-400 uppercase font-mono mb-0.5">{lang === "EN" ? "District" : "Secteur"}</span>
                    <span className="text-slate-950 dark:text-white font-bold text-xs">{result.technicalSheet.quartier}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-lg">
                    <span className="block text-[10px] text-slate-400 uppercase font-mono mb-0.5">Type</span>
                    <span className="text-slate-950 dark:text-white font-bold text-xs">{result.technicalSheet.typeProjet}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-lg">
                    <span className="block text-[10px] text-slate-400 uppercase font-mono mb-0.5">Budget</span>
                    <span className="text-slate-950 dark:text-white font-bold text-xs font-mono">{result.technicalSheet.budgetEstimatif}</span>
                  </div>
                  <div className="bg-amber-50/50 dark:bg-amber-500/10 border border-amber-100/50 dark:border-amber-500/20 p-3.5 rounded-lg">
                    <span className="block text-[10px] text-amber-800 dark:text-amber-400 uppercase font-mono mb-0.5">{lang === "EN" ? "Est. ROI" : "ROI estimé"}</span>
                    <span className="text-amber-950 dark:text-amber-400 font-bold text-xs">{result.technicalSheet.potentialRoi}</span>
                  </div>
                </div>
              </div>

              {/* Copywriting Pitch text */}
              <div className="space-y-2 text-slate-800 dark:text-slate-200">
                <h5 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2">
                  {lang === "EN" ? "Pitch & Campaign Copywriting" : "Pitch & Copywriting de Diffusion"}
                </h5>
                <div className="bg-[#FAF8F5] dark:bg-slate-900 border-l-4 border-amber-500 p-4 rounded-r-lg text-slate-800 dark:text-slate-100 text-xs md:text-sm leading-relaxed font-sans font-medium whitespace-pre-wrap italic">
                  "{result.copywritingText}"
                </div>
              </div>

              {/* Trust assurances block */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-xl space-y-3.5">
                <h6 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  {result.assuranceSection.titre}
                </h6>
                <div className="space-y-2">
                  {result.assuranceSection.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-slate-800 text-amber-400 text-[10px] font-mono shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-slate-300 leading-normal font-sans text-xs">
                        {pt}
                      </p>
                    </div>
                  ))}
                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-slate-800 text-amber-400 text-[10px] font-mono shrink-0">
                      ★
                    </span>
                    <p className="text-slate-300 leading-normal font-sans text-xs">
                      {lang === "EN" ? (
                        <>
                          <strong>Certified License:</strong> Italco Sarl holds the official Real Estate Agency License N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Category A) issued by the Ministry of Urban Planning and Housing in DRC.
                        </>
                      ) : (
                        <>
                          <strong>Certificat d'Agrément :</strong> Italco Sarl (sous Nuova Italia Sarlu) détient l'Agrément d'Agence Immobilière N° MIN.AT.UH/SG/DIR.HAB/019/AZ/002/2017 (Catégorie A) délivré par le Ministère de l'Urbanisme et de l'Habitat en RDC.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA output */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-slate-900 dark:text-white font-bold text-xs tracking-wide">
                  👉 {result.callToAction}
                </p>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {lang === "EN" ? "Clear" : "Effacer"}
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[460px]">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-pulse" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-display font-semibold text-lg mb-1">
                {lang === "EN" ? "Waiting for your parameters" : "En attente de vos critères"}
              </h4>
              <p className="text-slate-400 text-sm max-w-sm">
                {lang === "EN" 
                  ? "Select the target neighborhood and details on the left, then click 'Generate' to run the elite GO HOME AI copywriter."
                  : "Sélectionnez le quartier cible et les détails à privilégier à gauche, puis cliquez sur 'Générer' pour invoquer l'algorithme d'élite GO HOME."
                }
              </p>
              <div className="mt-8 flex gap-3 text-[11px] text-slate-500 font-mono">
                <span>Gombe</span> • <span>Ngaliema</span> • <span>Limete</span> • <span>Nsele</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
