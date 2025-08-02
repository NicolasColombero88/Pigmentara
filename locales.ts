export const locales = {
  es: {
    // Login
    loginTitle: "Pigmentara",
    loginDescription: "Captura colores del mundo real y conviértelos en fórmulas de pintura.",
    loginButton: "Ingresar con Google",
    loginDisclaimer: "(Inicio de sesión simulado para la demostración)",
    
    // Home
    homeTitle: "Comenzar una Nueva Paleta",
    homeDescription: "Apunta tu cámara a cualquier escena para capturar sus colores. Nuestra IA analizará la imagen y extraerá una hermosa paleta de colores para ti.",
    openCamera: "Abrir Cámara",

    // Camera
    cameraError: "No se pudo acceder a la cámara. Por favor, asegúrate de haber otorgado los permisos.",

    // Results
    backToCamera: "Volver a la Cámara",
    extractedPalette: "Paleta Extraída",
    selectColorsPrompt: "Selecciona los colores que deseas convertir en fórmulas de pigmentos.",
    translationResults: "Fórmulas de Pigmentos",
    translateButton: (count: number) => `Mezclar (${count})`,
    translatingButton: "Mezclando...",
    aiIsMixing: "El artista digital está mezclando tus pigmentos...",
    translationPlaceholder: "Selecciona colores y pulsa 'Mezclar' para ver la magia.",
    saveToPalette: "Guardar en Paleta",
    acrylicFormula: "Fórmula Acrílica",
    oilFormula: "Fórmula Óleo",
    alertSelectColor: "Por favor, selecciona al menos un color para mezclar.",
    alertTranslateFirst: "Por favor, crea una fórmula para algunos colores antes de guardar.",
    
    // Palettes
    savedPalettes: "Mis Paletas",
    newPalette: "Nueva Captura",
    noPalettes: "Aún no has guardado ninguna paleta.",
    noPalettesHint: "¡Captura algunos colores y guárdalos para comenzar tu colección!",
    paletteCreated: "Creado",
    paletteDelete: "Eliminar",

    // App/Global
    navCapture: "Capturar",
    navMyPalettes: "Mis Paletas",
    promptPaletteName: "Ingresa un nombre para tu nueva paleta:",
    defaultPaletteName: (date: string) => `Paleta del ${date}`,
    alertPaletteSaved: (name: string) => `¡Paleta "${name}" guardada!`,
    confirmDeletePalette: "¿Estás seguro de que quieres eliminar esta paleta? Esta acción no se puede deshacer.",
    
    // Gemini Service
    pigmentError: "Error procesando color",
    geminiErrorLog: "Error al traducir color a pigmentos:",
    geminiLanguageInstruction: "Provide a complete formula for both acrylic and oil paints using common, standard pigment names in Spanish (e.g., 'Blanco de Titanio', 'Rojo de Cadmio', 'Azul Ultramar')."
  },
  en: {
    // Login
    loginTitle: "Pigmentara",
    loginDescription: "Capture real-world colors and turn them into paint formulas.",
    loginButton: "Sign in with Google",
    loginDisclaimer: "(Simulated login for demo purposes)",

    // Home
    homeTitle: "Start a New Palette",
    homeDescription: "Point your camera at any scene to capture its colors. Our AI will analyze the image and extract a beautiful color palette for you.",
    openCamera: "Open Camera",

    // Camera
    cameraError: "Could not access the camera. Please ensure permissions are granted.",

    // Results
    backToCamera: "Back to Camera",
    extractedPalette: "Extracted Palette",
    selectColorsPrompt: "Select the colors you want to turn into pigment formulas.",
    translationResults: "Pigment Formulas",
    translateButton: (count: number) => `Mix (${count})`,
    translatingButton: "Mixing...",
    aiIsMixing: "The digital artist is mixing your pigments...",
    translationPlaceholder: "Select colors and press 'Mix' to see the magic.",
    saveToPalette: "Save to Palette",
    acrylicFormula: "Acrylic Formula",
    oilFormula: "Oil Formula",
    alertSelectColor: "Please select at least one color to mix.",
    alertTranslateFirst: "Please create a formula for some colors before saving.",

    // Palettes
    savedPalettes: "My Palettes",
    newPalette: "New Capture",
    noPalettes: "You haven't saved any palettes yet.",
    noPalettesHint: "Capture some colors and save them to start your collection!",
    paletteCreated: "Created",
    paletteDelete: "Delete",

    // App/Global
    navCapture: "Capture",
    navMyPalettes: "My Palettes",
    promptPaletteName: "Enter a name for your new palette:",
    defaultPaletteName: (date: string) => `Palette from ${date}`,
    alertPaletteSaved: (name: string) => `Palette "${name}" saved!`,
    confirmDeletePalette: "Are you sure you want to delete this palette? This action cannot be undone.",

    // Gemini Service
    pigmentError: "Error processing color",
    geminiErrorLog: "Error translating color to pigments:",
    geminiLanguageInstruction: "Provide a complete formula for both acrylic and oil paints using common, standard pigment names in English (e.g., 'Titanium White', 'Cadmium Red', 'Ultramarine Blue')."
  }
};