import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppView } from './types';
import type { ColorSwatch, Palette, TranslatedColor, Language } from './types';
import { translateColorToPigments } from './services/geminiService';
import { CameraIcon, PaletteIcon, BackIcon, SaveIcon, PlusIcon, GoogleIcon, PigmentaraLogoIcon } from './components/icons';
import { ColorSwatch as ColorSwatchComponent } from './components/ColorSwatch';
import { locales } from './locales';

const TARGET_SWATCHES = 12;

// --- Helper Functions ---
const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// --- Sub-Components defined outside App to prevent re-renders ---

const LoginScreen = ({ onLogin, t }: { onLogin: () => void, t: typeof locales.es }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
    <div className="max-w-md w-full">
      <PigmentaraLogoIcon className="w-28 h-28 mx-auto" style={{filter: 'drop-shadow(0 0 1.5rem #f9731655)'}}/>
      <h1 className="text-5xl font-semibold text-white mt-6">{t.loginTitle}</h1>
      <p className="text-lg text-neutral-300 mt-4 mb-10 font-sans">
        {t.loginDescription}
      </p>
      <button
        onClick={onLogin}
        className="w-full bg-neutral-100 text-slate-800 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:scale-105"
      >
        <GoogleIcon className="w-6 h-6" />
        {t.loginButton}
      </button>
       <p className="text-xs text-neutral-500 mt-6 font-sans"> {t.loginDisclaimer} </p>
    </div>
  </div>
);

const HomeScreen = ({ onOpenCamera, t }: { onOpenCamera: () => void, t: typeof locales.es }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
    <h2 className="text-5xl font-bold text-white mb-4">{t.homeTitle}</h2>
    <p className="text-neutral-300 mb-10 max-w-lg text-lg">
      {t.homeDescription}
    </p>
    <button
      onClick={onOpenCamera}
      className="bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold py-4 px-10 rounded-full flex items-center gap-3 shadow-lg shadow-orange-700/30 hover:shadow-xl hover:shadow-orange-600/30 transition-all text-xl transform hover:scale-105 duration-300"
    >
      <CameraIcon className="w-8 h-8" />
      {t.openCamera}
    </button>
  </div>
);

const CameraView = ({ onCapture, onBack, t }: { onCapture: (dataUrl: string) => void, onBack: () => void, t: typeof locales.es }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        let activeStream: MediaStream | null = null;
        const enableStream = async () => {
            try {
                activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                setStream(activeStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = activeStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert(t.cameraError);
                onBack();
            }
        };

        enableStream();

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                onCapture(dataUrl);
            }
        }
    };

    return (
        <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <button onClick={onBack} className="absolute top-4 left-4 bg-black/50 p-3 rounded-full text-white hover:bg-black/75 transition-colors">
                <BackIcon className="w-6 h-6"/>
            </button>
            <div className="absolute bottom-8 flex justify-center w-full">
                <button
                    onClick={handleCapture}
                    className="w-20 h-20 bg-white/30 rounded-full p-1.5 shadow-lg flex items-center justify-center group backdrop-blur-sm"
                >
                    <div className="w-full h-full bg-white rounded-full group-hover:bg-orange-300 transition-colors duration-300"></div>
                </button>
            </div>
        </div>
    );
};

const ResultsView = ({
    imageSrc,
    swatches,
    onBack,
    onSave,
    language,
    t
}: {
    imageSrc: string;
    swatches: ColorSwatch[];
    onBack: () => void;
    onSave: (colors: TranslatedColor[]) => void;
    language: Language;
    t: typeof locales.es;
}) => {
    const [selectedSwatches, setSelectedSwatches] = useState<Set<string>>(new Set());
    const [translatedColors, setTranslatedColors] = useState<Map<string, TranslatedColor>>(new Map());
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectSwatch = (hex: string) => {
        setSelectedSwatches(prev => {
            const newSet = new Set(prev);
            if (newSet.has(hex)) {
                newSet.delete(hex);
            } else {
                newSet.add(hex);
            }
            return newSet;
        });
    };

    const handleTranslate = async () => {
        if (selectedSwatches.size === 0) {
            alert(t.alertSelectColor);
            return;
        }

        setIsLoading(true);
        const newTranslations = new Map(translatedColors);
        const swatchesToTranslate = swatches.filter(s => selectedSwatches.has(s.hex));

        for (const swatch of swatchesToTranslate) {
            if (!newTranslations.has(swatch.hex)) { // Avoid re-translating
                const formula = await translateColorToPigments(swatch, language);
                newTranslations.set(swatch.hex, { sourceColor: swatch, formula });
            }
        }
        
        setTranslatedColors(newTranslations);
        setIsLoading(false);
    };
    
    const handleSave = () => {
        const colorsToSave = Array.from(translatedColors.values())
                                .filter(tc => selectedSwatches.has(tc.sourceColor.hex));
        if (colorsToSave.length === 0) {
            alert(t.alertTranslateFirst);
            return;
        }
        onSave(colorsToSave);
    }
    
    const renderFormula = (formula: TranslatedColor) => (
        <div key={formula.sourceColor.hex} className="bg-slate-800/60 p-4 rounded-lg shadow-md border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-slate-600" style={{backgroundColor: formula.sourceColor.hex}}></div>
                <h3 className="text-lg font-bold font-mono text-white tracking-wider">{formula.sourceColor.hex.toUpperCase()}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-lg text-amber-300 mb-2">{t.acrylicFormula}</h4>
                    <ul className="text-sm text-neutral-300 space-y-1.5">
                        {formula.formula.acrylic.map((p, i) => <li key={i}><span className="text-amber-500 mr-2">•</span>{p.name}: {p.proportion}%</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-orange-300 mb-2">{t.oilFormula}</h4>
                    <ul className="text-sm text-neutral-300 space-y-1.5">
                        {formula.formula.oil.map((p, i) => <li key={i}><span className="text-orange-500 mr-2">•</span>{p.name}: {p.proportion}%</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-orange-400 font-semibold mb-6 hover:text-orange-300 transition-colors">
                <BackIcon className="w-5 h-5"/>
                {t.backToCamera}
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <img src={imageSrc} alt="Captured" className="rounded-xl shadow-2xl w-full object-cover" />
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-4">
                        <h3 className="text-2xl font-semibold text-white mb-3">{t.extractedPalette}</h3>
                        <p className="text-sm text-neutral-400 mb-4">{t.selectColorsPrompt}</p>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            {swatches.map(swatch => (
                                <ColorSwatchComponent
                                    key={swatch.hex}
                                    swatch={swatch}
                                    isSelected={selectedSwatches.has(swatch.hex)}
                                    onSelect={handleSelectSwatch}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-4 flex-grow">
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="text-2xl font-semibold text-white">{t.translationResults}</h3>
                             <button
                                onClick={handleTranslate}
                                disabled={isLoading || selectedSwatches.size === 0}
                                className="bg-gradient-to-br from-orange-500 to-red-600 text-white font-semibold py-2 px-5 rounded-lg disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:shadow-none hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300"
                            >
                                {isLoading ? t.translatingButton : t.translateButton(selectedSwatches.size)}
                            </button>
                        </div>

                        {translatedColors.size > 0 && !isLoading ? (
                            <div className="space-y-4">
                               {Array.from(translatedColors.values()).filter(tc => selectedSwatches.has(tc.sourceColor.hex)).map(renderFormula)}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4 text-center text-neutral-400 py-10">
                                {isLoading ? (
                                    <>
                                        <div className="relative w-12 h-12">
                                            <div className="absolute w-full h-full rounded-full bg-orange-400 opacity-60 animate-ping"></div>
                                            <div className="absolute w-full h-full rounded-full border-4 border-orange-500"></div>
                                        </div>
                                        <p className="font-semibold text-lg text-orange-300 mt-4">{t.aiIsMixing}</p>
                                    </>
                                ) : (
                                  <>
                                    <PaletteIcon className="w-16 h-16 text-slate-600"/>
                                    <p className="max-w-xs">{t.translationPlaceholder}</p>
                                  </>
                                )}
                            </div>
                        )}
                        
                        {Array.from(translatedColors.values()).filter(tc => selectedSwatches.has(tc.sourceColor.hex)).length > 0 && !isLoading &&(
                            <div className="mt-6 flex justify-end">
                                <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-br from-amber-500 to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                                    <SaveIcon className="w-5 h-5"/>
                                    {t.saveToPalette}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PalettesView = ({ palettes, onAddNew, onDeletePalette, t }: {
    palettes: Palette[];
    onSelectPalette: (id: string) => void;
    onAddNew: () => void;
    onDeletePalette: (id: string) => void;
    t: typeof locales.es;
}) => (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-semibold text-white">{t.savedPalettes}</h2>
            <button onClick={onAddNew} className="flex items-center gap-2 bg-gradient-to-br from-orange-500 to-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300">
                <PlusIcon className="w-5 h-5"/>
                {t.newPalette}
            </button>
        </div>

        {palettes.length === 0 ? (
            <div className="text-center text-neutral-400 py-20 bg-slate-900/50 border border-slate-700/80 rounded-lg">
                <PaletteIcon className="w-16 h-16 mx-auto text-neutral-500 mb-4"/>
                <p className="text-2xl mb-2">{t.noPalettes}</p>
                <p>{t.noPalettesHint}</p>
            </div>
        ) : (
            <div className="space-y-6">
                {palettes.map(palette => (
                    <div key={palette.id} className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-white">{palette.name}</h3>
                                <p className="text-sm text-neutral-400">{t.paletteCreated}: {new Date(palette.createdAt).toLocaleDateString()}</p>
                            </div>
                             <button onClick={() => onDeletePalette(palette.id)} className="text-red-500 hover:text-red-400 font-semibold transition-colors text-sm">{t.paletteDelete}</button>
                        </div>
                        <div className="flex flex-wrap items-center -space-x-3 pt-2">
                           {palette.colors.map(tc => (
                               <div key={tc.sourceColor.hex} className="w-12 h-12 rounded-full border-2 border-slate-800/80 shadow-md" style={{backgroundColor: tc.sourceColor.hex}} title={tc.sourceColor.hex}></div>
                           ))}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);


const App = () => {
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [language, setLanguage] = useState<Language>('es');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedSwatches, setExtractedSwatches] = useState<ColorSwatch[]>([]);
  const [palettes, setPalettes] = useState<Palette[]>([]);

  const t = locales[language];

  useEffect(() => {
    const savedPalettes = localStorage.getItem('pigment_palettes');
    if (savedPalettes) {
        setPalettes(JSON.parse(savedPalettes));
    }
  }, []);
  
  const savePalettesToLocal = (updatedPalettes: Palette[]) => {
      setPalettes(updatedPalettes);
      localStorage.setItem('pigment_palettes', JSON.stringify(updatedPalettes));
  }

  const handleLogin = () => setView(AppView.HOME);

  const handleCapture = useCallback((dataUrl: string) => {
    setCapturedImage(dataUrl);
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        
        const colorMap: { [key: string]: { count: number; r: number; g: number; b: number } } = {};
        const step = Math.floor(imageData.length / (TARGET_SWATCHES * 50));

        for (let i = 0; i < imageData.length; i += 4 * step) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const R = Math.round(r / 32) * 32;
            const G = Math.round(g / 32) * 32;
            const B = Math.round(b / 32) * 32;
            const key = `${R},${G},${B}`;
            if (!colorMap[key]) {
                colorMap[key] = { count: 0, r: 0, g: 0, b: 0 };
            }
            colorMap[key].count++;
            colorMap[key].r += r;
            colorMap[key].g += g;
            colorMap[key].b += b;
        }

        const sortedColors = Object.values(colorMap)
            .sort((a, b) => b.count - a.count)
            .slice(0, TARGET_SWATCHES)
            .map(c => {
                const r = Math.round(c.r / c.count);
                const g = Math.round(c.g / c.count);
                const b = Math.round(c.b / c.count);
                return { hex: rgbToHex(r,g,b), r, g, b };
            });

        setExtractedSwatches(sortedColors);
        setView(AppView.RESULTS);
    };
    img.src = dataUrl;
  }, []);

  const handleSaveToPalette = (colors: TranslatedColor[]) => {
      const paletteName = prompt(t.promptPaletteName, t.defaultPaletteName(new Date().toLocaleDateString()));
      if (paletteName) {
          const newPalette: Palette = {
              id: Date.now().toString(),
              name: paletteName,
              colors: colors,
              createdAt: new Date().toISOString()
          };
          savePalettesToLocal([...palettes, newPalette]);
          alert(t.alertPaletteSaved(paletteName));
          setView(AppView.PALETTES);
      }
  };
  
  const handleDeletePalette = (id: string) => {
      if (window.confirm(t.confirmDeletePalette)) {
        const updatedPalettes = palettes.filter(p => p.id !== id);
        savePalettesToLocal(updatedPalettes);
      }
  };

  const renderContent = () => {
    switch (view) {
      case AppView.LOGIN:
        return <LoginScreen onLogin={handleLogin} t={t}/>;
      case AppView.HOME:
        return <HomeScreen onOpenCamera={() => setView(AppView.CAMERA)} t={t}/>;
      case AppView.CAMERA:
        return <CameraView onCapture={handleCapture} onBack={() => setView(AppView.HOME)} t={t}/>;
      case AppView.RESULTS:
        if (capturedImage) {
          return <ResultsView imageSrc={capturedImage} swatches={extractedSwatches} onBack={() => setView(AppView.CAMERA)} onSave={handleSaveToPalette} language={language} t={t} />;
        }
        return null;
      case AppView.PALETTES:
          return <PalettesView palettes={palettes} onSelectPalette={()=>{}} onAddNew={() => setView(AppView.HOME)} onDeletePalette={handleDeletePalette} t={t}/>;
      default:
        return <LoginScreen onLogin={handleLogin} t={t}/>;
    }
  };
  
  const showNav = view !== AppView.LOGIN && view !== AppView.CAMERA;

  return (
    <div className="min-h-screen w-full flex flex-col">
        {showNav && (
            <header className="bg-slate-900/60 backdrop-blur-lg sticky top-0 z-20 shadow-md border-b border-slate-700/50">
                <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(AppView.HOME)}>
                        <PigmentaraLogoIcon className="w-10 h-10"/>
                        <span className="text-2xl font-semibold text-white">Pigmentara</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => setView(AppView.HOME)} className={`font-semibold transition-colors ${view === AppView.HOME ? 'text-orange-400' : 'text-neutral-300 hover:text-white'}`}>{t.navCapture}</button>
                        <button onClick={() => setView(AppView.PALETTES)} className={`font-semibold transition-colors ${view === AppView.PALETTES ? 'text-orange-400' : 'text-neutral-300 hover:text-white'}`}>{t.navMyPalettes}</button>
                        <button onClick={() => setLanguage(lang => lang === 'es' ? 'en' : 'es')} className="text-sm font-bold bg-slate-700/80 hover:bg-slate-600/80 text-white py-1.5 px-3 w-14 rounded-md transition-colors">
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>
                    </div>
                </nav>
            </header>
        )}
        <main className="flex-grow">
            {renderContent()}
        </main>
    </div>
  );
};

export default App;