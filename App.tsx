import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppView } from './types';
import type { ColorSwatch, Palette, TranslatedColor, Language } from './types';
import { translateColorToPigments } from './services/geminiService';
import { CameraIcon, PaletteIcon, BackIcon, SaveIcon, PlusIcon, GoogleIcon, PigmentaraLogoIcon, EyeIcon, EyeOffIcon, UserCircleIcon, LogoutIcon, SettingsIcon, TrashIcon } from './components/icons';
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

const LoginScreen = ({ onNavigate, t }: { onNavigate: (view: AppView) => void, t: typeof locales.es }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation for demo purposes
        if (email && password) {
            onNavigate(AppView.HOME);
        } else {
            alert(t.loginFormError);
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm sm:max-w-md p-8 space-y-6 bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl">
                <div>
                    <h1 className="text-3xl font-bold text-white">{t.loginTitle}</h1>
                    <p className="mt-2 text-sm text-neutral-400">
                        {t.loginSubtitle}{' '}
                        <button onClick={() => onNavigate(AppView.CREATE_ACCOUNT)} className="font-medium text-orange-400 hover:text-orange-300 transition-colors">
                           {t.loginCreateAccount}
                        </button>
                    </p>
                </div>

                <div className="flex justify-center">
                    <button onClick={() => onNavigate(AppView.HOME)} className="w-full max-w-xs inline-flex justify-center items-center gap-3 py-2.5 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                       <GoogleIcon className="w-5 h-5"/>
                       <span>Google</span>
                    </button>
                </div>

                <div className="flex items-center">
                    <hr className="w-full border-slate-600"/>
                    <span className="px-2 text-xs text-neutral-500 font-semibold">{t.loginOr}</span>
                    <hr className="w-full border-slate-600"/>
                </div>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">{t.loginUserLabel}</label>
                        <input id="email" name="email" type="email" autoComplete="email" required 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="appearance-none rounded-md relative block w-full px-3 py-2.5 bg-slate-800 border border-slate-600 placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-300">{t.loginPasswordLabel}</label>
                        <div className="relative">
                           <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-md relative block w-full px-3 py-2.5 bg-slate-800 border border-slate-600 placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"/>
                           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white">
                              {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                           </button>
                        </div>
                    </div>
                     <div className="text-right text-sm">
                        <button onClick={() => onNavigate(AppView.FORGOT_PASSWORD)} type="button" className="font-medium text-orange-400 hover:text-orange-300 transition-colors">
                            {t.loginForgotPassword}
                        </button>
                    </div>

                    <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 transition-all transform hover:scale-105">
                        {t.loginButtonAction}
                    </button>
                </form>
            </div>
        </div>
    );
}

const CreateAccountScreen = ({ onNavigate, t }: { onNavigate: (view: AppView) => void, t: typeof locales.es }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            alert(t.createAccountFormError);
            return;
        }
        if (password !== confirmPassword) {
            alert(t.createAccountPasswordMismatch);
            return;
        }
        alert(t.alertAccountCreated);
        onNavigate(AppView.HOME);
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm sm:max-w-md p-8 space-y-6 bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl">
                <div>
                    <h1 className="text-3xl font-bold text-white">{t.createAccountTitle}</h1>
                    <p className="mt-2 text-sm text-neutral-400">
                        {t.createAccountSubtitle}{' '}
                        <button onClick={() => onNavigate(AppView.LOGIN)} className="font-medium text-orange-400 hover:text-orange-300 transition-colors">
                           {t.createAccountLoginLink}
                        </button>
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="email-create" className="block text-sm font-medium text-neutral-300 mb-1">{t.createAccountEmailLabel}</label>
                        <input id="email-create" name="email" type="email" autoComplete="email" required 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="appearance-none rounded-md relative block w-full px-3 py-2.5 bg-slate-800 border border-slate-600 placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password-create" className="block text-sm font-medium text-neutral-300">{t.createAccountPasswordLabel}</label>
                        <div className="relative">
                           <input id="password-create" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-md relative block w-full px-3 py-2.5 bg-slate-800 border border-slate-600 placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"/>
                           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white">
                              {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                           </button>
                        </div>
                    </div>
                     <div className="space-y-1">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-300">{t.createAccountConfirmPasswordLabel}</label>
                        <div className="relative">
                           <input id="confirm-password" name="confirm-password" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="appearance-none rounded-md relative block w-full px-3 py-2.5 bg-slate-800 border border-slate-600 placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"/>
                           <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white">
                              {showConfirmPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                           </button>
                        </div>
                    </div>

                    <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500 transition-all transform hover:scale-105">
                        {t.createAccountButtonAction}
                    </button>
                </form>
            </div>
        </div>
    );
};

const ForgotPasswordScreen = ({ onNavigate, t }: { onNavigate: (view: AppView) => void, t: typeof locales.es }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-white">{t.forgotPasswordTitle}</h1>
            <p className="text-neutral-400">{t.forgotPasswordSubtitle}</p>
            <button onClick={() => onNavigate(AppView.LOGIN)} className="font-medium text-orange-400 hover:text-orange-300 transition-colors">
                {t.backToLogin}
            </button>
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
            <div>
                <h4 className="font-semibold text-lg text-amber-300 mb-3">{t.paintsToUse}</h4>
                <ul className="text-sm text-neutral-200 space-y-2.5">
                    {formula.formula.pigments.map((p, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-md border border-slate-500/50 shadow-inner" style={{backgroundColor: p.hex}}></div>
                            <span className="flex-grow text-neutral-300">{p.name}</span>
                            <span className="font-semibold text-white">{p.proportion}%</span>
                        </li>
                    ))}
                </ul>
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

const SettingsView = ({ onDeleteAllPalettes, onDeleteAccount, t }: {
    onDeleteAllPalettes: () => void;
    onDeleteAccount: () => void;
    t: typeof locales.es;
}) => (
    <div className="p-4 md:p-6 max-w-3xl mx-auto text-white">
        <h2 className="text-4xl font-semibold mb-8">{t.settingsTitle}</h2>
        
        <div className="space-y-8">
            {/* Edit Profile Card */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-6">
                <h3 className="text-2xl font-semibold mb-4">{t.settingsProfile}</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-neutral-400">{t.settingsName}</label>
                        <input type="text" defaultValue="Demo User" disabled className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white sm:text-sm cursor-not-allowed"/>
                    </div>
                    <button disabled className="font-semibold py-2 px-4 rounded-lg bg-slate-600 text-neutral-400 cursor-not-allowed">{t.settingsSave}</button>
                </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-6">
                <h3 className="text-2xl font-semibold mb-4">{t.settingsChangePassword}</h3>
                <div className="space-y-4">
                     <div>
                        <label className="text-sm font-medium text-neutral-400">{t.settingsCurrentPassword}</label>
                        <input type="password" disabled className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white sm:text-sm cursor-not-allowed"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-neutral-400">{t.settingsNewPassword}</label>
                        <input type="password" disabled className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white sm:text-sm cursor-not-allowed"/>
                    </div>
                    <button disabled className="font-semibold py-2 px-4 rounded-lg bg-slate-600 text-neutral-400 cursor-not-allowed">{t.settingsUpdatePassword}</button>
                </div>
            </div>

            {/* Danger Zone Card */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-red-500/50 rounded-xl shadow-2xl p-6">
                 <h3 className="text-2xl font-semibold text-red-400 mb-2">{t.settingsDangerZone}</h3>
                 <p className="text-neutral-400 mb-6 text-sm">{t.settingsDangerZoneDesc}</p>
                 <div className="flex flex-col sm:flex-row gap-4">
                     <button onClick={onDeleteAllPalettes} className="font-semibold py-2 px-4 rounded-lg bg-red-800/60 text-red-300 hover:bg-red-800/90 border border-red-600/80 transition-colors flex items-center justify-center gap-2">
                        <TrashIcon className="w-5 h-5"/> {t.settingsDeletePalettes}
                     </button>
                      <button onClick={onDeleteAccount} className="font-semibold py-2 px-4 rounded-lg bg-red-900 text-red-300 hover:bg-red-800 border border-red-600 transition-colors flex items-center justify-center gap-2">
                         <TrashIcon className="w-5 h-5"/> {t.settingsDeleteAccount}
                      </button>
                 </div>
            </div>
        </div>
    </div>
);

const UserMenu = ({ onLogout, onNavigate, t }: {
    onLogout: () => void;
    onNavigate: (view: AppView) => void;
    t: typeof locales.es
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    const navigateAndClose = (view: AppView) => {
        onNavigate(view);
        setIsOpen(false);
    };

    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full bg-slate-700/80 text-white flex items-center justify-center hover:bg-slate-600/80 transition-colors">
                <UserCircleIcon className="w-7 h-7" />
            </button>
            {isOpen && (
                 <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 border border-slate-700">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                        <a href="#" onClick={() => navigateAndClose(AppView.PALETTES)} className="text-neutral-200 hover:bg-slate-700/70 hover:text-white group flex items-center gap-3 px-4 py-2 text-sm" role="menuitem">
                           <PaletteIcon className="w-5 h-5"/> {t.navMyPalettes}
                        </a>
                         <a href="#" onClick={() => navigateAndClose(AppView.SETTINGS)} className="text-neutral-200 hover:bg-slate-700/70 hover:text-white group flex items-center gap-3 px-4 py-2 text-sm" role="menuitem">
                           <SettingsIcon className="w-5 h-5"/> {t.settingsTitle}
                        </a>
                        <div className="border-t border-slate-700 my-1"></div>
                        <a href="#" onClick={onLogout} className="text-red-400 hover:bg-red-500/20 hover:text-red-300 group flex items-center gap-3 px-4 py-2 text-sm" role="menuitem">
                           <LogoutIcon className="w-5 h-5"/> {t.logout}
                        </a>
                    </div>
                 </div>
            )}
        </div>
    );
}

const Footer = ({ t }: { t: typeof locales.es }) => (
    <footer className="w-full py-4 text-center text-xs text-neutral-500">
        <span>
            {t.footerText}{' '}
            <a href="http://www.nicolascolombero.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-400/80 hover:text-orange-400 hover:underline">
                {t.footerAuthor}
            </a> - 2025
        </span>
    </footer>
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

  const handleLogout = () => {
      if(window.confirm(t.confirmLogout)) {
        setView(AppView.LOGIN);
      }
  };

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

  const handleDeleteAllPalettes = () => {
    if(window.confirm(t.confirmDeleteAllPalettes)) {
        savePalettesToLocal([]);
        alert(t.alertPalettesDeleted)
    }
  }

  const handleDeleteAccount = () => {
    if(window.confirm(t.confirmDeleteAccount)) {
        savePalettesToLocal([]);
        setView(AppView.LOGIN);
    }
  }

  const renderContent = () => {
    switch (view) {
      case AppView.LOGIN:
        return <LoginScreen onNavigate={setView} t={t}/>;
      case AppView.CREATE_ACCOUNT:
        return <CreateAccountScreen onNavigate={setView} t={t}/>;
      case AppView.FORGOT_PASSWORD:
        return <ForgotPasswordScreen onNavigate={setView} t={t}/>;
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
      case AppView.SETTINGS:
          return <SettingsView onDeleteAllPalettes={handleDeleteAllPalettes} onDeleteAccount={handleDeleteAccount} t={t}/>;
      default:
        return <LoginScreen onNavigate={setView} t={t}/>;
    }
  };
  
  const showNav = view !== AppView.LOGIN && view !== AppView.CAMERA && view !== AppView.CREATE_ACCOUNT && view !== AppView.FORGOT_PASSWORD;

  return (
    <div className="min-h-screen w-full flex flex-col">
        {showNav && (
            <header className="bg-slate-900/60 backdrop-blur-lg sticky top-0 z-20 shadow-md border-b border-slate-700/50">
                <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(AppView.HOME)}>
                        <PigmentaraLogoIcon className="w-10 h-10"/>
                        <span className="text-xl sm:text-2xl font-semibold text-white">Pigmentara</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={() => setView(AppView.HOME)}
                            className={`flex items-center gap-2 p-2 rounded-lg font-semibold transition-colors ${view === AppView.HOME ? 'text-orange-400 bg-orange-500/10' : 'text-neutral-300 hover:text-white hover:bg-slate-700/50'}`}
                            aria-label={t.navCapture}
                        >
                            <CameraIcon className="w-6 h-6"/>
                            <span className="hidden sm:inline">{t.navCapture}</span>
                        </button>
                        <UserMenu onLogout={handleLogout} onNavigate={setView} t={t} />
                        <button
                            onClick={() => setLanguage(lang => lang === 'es' ? 'en' : 'es')}
                            className="text-sm font-bold bg-slate-700/80 hover:bg-slate-600/80 text-white py-2 px-3 w-12 text-center rounded-lg transition-colors"
                        >
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>
                    </div>
                </nav>
            </header>
        )}
        <main className="flex-grow">
            {renderContent()}
        </main>
        <Footer t={t} />
    </div>
  );
};

export default App;