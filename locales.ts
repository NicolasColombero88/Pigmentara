export const locales = {
  es: {
    // Login
    loginTitle: "Iniciar Sesión",
    loginSubtitle: "¿Nuevo en Pigmentara?",
    loginCreateAccount: "Crear una cuenta",
    loginOr: "O",
    loginEmail: "Correo electrónico",
    loginPassword: "Contraseña",
    loginForgotPassword: "¿Olvidaste tu contraseña?",
    loginButtonAction: "Ingresar",
    loginOrg: "Ingresar con email de organización",
    loginFormError: "Por favor, ingresa tu correo y contraseña.",

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

    // App/Global & User Menu
    navCapture: "Capturar",
    navMyPalettes: "Mis Paletas",
    settingsTitle: "Configuración",
    logout: "Cerrar Sesión",
    confirmLogout: "¿Estás seguro de que quieres cerrar sesión?",
    promptPaletteName: "Ingresa un nombre para tu nueva paleta:",
    defaultPaletteName: (date: string) => `Paleta del ${date}`,
    alertPaletteSaved: (name: string) => `¡Paleta "${name}" guardada!`,
    confirmDeletePalette: "¿Estás seguro de que quieres eliminar esta paleta? Esta acción no se puede deshacer.",
    
    // Settings
    settingsProfile: "Editar Perfil",
    settingsName: "Nombre",
    settingsSave: "Guardar Cambios",
    settingsChangePassword: "Cambiar Contraseña",
    settingsCurrentPassword: "Contraseña Actual",
    settingsNewPassword: "Nueva Contraseña",
    settingsUpdatePassword: "Actualizar Contraseña",
    settingsDangerZone: "Zona de Peligro",
    settingsDangerZoneDesc: "Estas acciones son permanentes y no se pueden deshacer.",
    settingsDeletePalettes: "Borrar Todas las Paletas",
    settingsDeleteAccount: "Borrar Cuenta",
    confirmDeleteAllPalettes: "¡ADVERTENCIA! ¿Estás seguro de que quieres borrar TODAS tus paletas? Esta acción no se puede deshacer.",
    alertPalettesDeleted: "Todas tus paletas han sido borradas.",
    confirmDeleteAccount: "¡ADVERTENCIA FINAL! ¿Estás seguro de que quieres borrar tu cuenta y todas tus paletas? Esta acción no se puede deshacer.",


    // Gemini Service
    pigmentError: "Error procesando color",
    geminiErrorLog: "Error al traducir color a pigmentos:",
    geminiLanguageInstruction: "Provide a complete formula for both acrylic and oil paints using common, standard pigment names in Spanish (e.g., 'Blanco de Titanio', 'Rojo de Cadmio', 'Azul Ultramar')."
  },
  en: {
    // Login
    loginTitle: "Log in",
    loginSubtitle: "New to Pigmentara?",
    loginCreateAccount: "Create an account",
    loginOr: "OR",
    loginEmail: "Email address",
    loginPassword: "Password",
    loginForgotPassword: "Forgot your password?",
    loginButtonAction: "Log in",
    loginOrg: "Log in with your organization's email",
    loginFormError: "Please enter your email and password.",
    
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

    // App/Global & User Menu
    navCapture: "Capture",
    navMyPalettes: "My Palettes",
    settingsTitle: "Settings",
    logout: "Log Out",
    confirmLogout: "Are you sure you want to log out?",
    promptPaletteName: "Enter a name for your new palette:",
    defaultPaletteName: (date: string) => `Palette from ${date}`,
    alertPaletteSaved: (name: string) => `Palette "${name}" saved!`,
    confirmDeletePalette: "Are you sure you want to delete this palette? This action cannot be undone.",

    // Settings
    settingsProfile: "Edit Profile",
    settingsName: "Name",
    settingsSave: "Save Changes",
    settingsChangePassword: "Change Password",
    settingsCurrentPassword: "Current Password",
    settingsNewPassword: "New Password",
    settingsUpdatePassword: "Update Password",
    settingsDangerZone: "Danger Zone",
    settingsDangerZoneDesc: "These actions are permanent and cannot be undone.",
    settingsDeletePalettes: "Delete All Palettes",
    settingsDeleteAccount: "Delete Account",
    confirmDeleteAllPalettes: "WARNING! Are you sure you want to delete ALL of your palettes? This action cannot be undone.",
    alertPalettesDeleted: "All your palettes have been deleted.",
    confirmDeleteAccount: "FINAL WARNING! Are you sure you want to delete your account and all your data? This action cannot be undone.",

    // Gemini Service
    pigmentError: "Error processing color",
    geminiErrorLog: "Error translating color to pigments:",
    geminiLanguageInstruction: "Provide a complete formula for both acrylic and oil paints using common, standard pigment names in English (e.g., 'Titanium White', 'Cadmium Red', 'Ultramarine Blue')."
  }
};