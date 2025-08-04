export const locales = {
  es: {
    // Login
    loginTitle: "Iniciar Sesión",
    loginSubtitle: "¿Nuevo en PigmentarApp?",
    loginCreateAccount: "Crear una cuenta",
    loginOr: "O",
    loginUserLabel: "Usuario",
    loginPasswordLabel: "Contraseña",
    loginForgotPassword: "¿Olvidaste tu contraseña?",
    loginButtonAction: "Ingresar",
    loginFormError: "Por favor, ingresa tu correo y contraseña.",
    loginWithGoogle: "Iniciar con Google",
    forgotPasswordFormError: "Por favor ingresa un correo electrónico",

    // Create Account
    createAccountTitle: "Crear Nueva Cuenta",
    createAccountSubtitle: "¿Ya tienes una cuenta?",
    createAccountLoginLink: "Inicia Sesión",
    createAccountEmailLabel: "Correo Electrónico",
    createAccountPasswordLabel: "Contraseña",
    createAccountConfirmPasswordLabel: "Confirmar Contraseña",
    createAccountButtonAction: "Crear Cuenta",
    createAccountPasswordMismatch: "Las contraseñas no coinciden.",
    createAccountFormError: "Por favor, completa todos los campos.",
    alertAccountCreated: "¡Cuenta creada con éxito! Serás redirigido a la página principal.",
    backToLogin: "Volver a Iniciar Sesión",

    // Forgot Password
    forgotPasswordTitle: "Recuperar Contraseña",
    forgotPasswordSubtitle: "Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.",
    forgotPasswordEmailLabel: "Correo Electrónico",
    forgotPasswordSendCode: "Enviar Código",
    alertCodeSent: (email: string) => `Se ha enviado un código a ${email}. Para fines de esta demostración, el código es: 123456`,
    
    // Reset Password
    resetPasswordTitle: "Restablecer Contraseña",
    resetPasswordSubtitle: "Revisa tu correo, ingresa el código de recuperación y elige una nueva contraseña.",
    resetPasswordCodeLabel: "Código de Recuperación",
    resetPasswordNewPasswordLabel: "Nueva Contraseña",
    resetPasswordConfirmNewPasswordLabel: "Confirmar Nueva Contraseña",
    resetPasswordButtonAction: "Cambiar Contraseña",
    alertPasswordMismatch: "Las nuevas contraseñas no coinciden.",
    alertInvalidCode: "El código de recuperación es incorrecto.",
    alertPasswordResetSuccess: "¡Contraseña actualizada con éxito! Ahora puedes iniciar sesión.",
    resetPasswordFormError: "Por favor, completa todos los campos.",

    //AuthMessages
    authInvalidEmail:           'El formato del correo es inválido.',
    authInvalidCredentials:     'Email o contraseña incorrectos.',
    authOperationNotAllowed:    'Método de autenticación no permitido.',
    authTooManyRequests:        'Demasiados intentos. Intenta de nuevo más tarde.',
    authUnexpectedError:        (code: string) => `Se produjo un error inesperado: ${code}`,

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
    paintsToUse: "Pinturas a Utilizar",
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
    settingsProfileSaved: "Perfil actualizado correctamente",
    settingsPasswordMismatch:       "Las contraseñas no coinciden.",
    settingsPasswordChanged:        "La contraseña se ha cambiado correctamente.",
    settingsSaving:                 "Guardando…",
    settingsConfirmNewPassword:     "Confirmar nueva contraseña",
    settingsChangingPassword:       "Cambiando contraseña…",

    // Footer
    footerText: "Un desarrollo de",
    footerAuthor: "Nicolás Colombero",

    // Gemini Service
    pigmentError: "Error procesando color",
    geminiErrorLog: "Error al traducir color a pigmentos:",
    geminiLanguageInstruction: "Provide a single formula using common, standard pigment names in Spanish (e.g., 'Blanco de Titanio', 'Rojo de Cadmio', 'Azul Ultramar'). Include the hex color code for each pure pigment."
  },
  en: {
    // Login
    loginTitle: "Log in",
    loginSubtitle: "New to PigmentarApp?",
    loginCreateAccount: "Create an account",
    loginOr: "OR",
    loginUserLabel: "User",
    loginPasswordLabel: "Password",
    loginForgotPassword: "Forgot your password?",
    loginButtonAction: "Log in",
    loginFormError: "Please enter your email and password.",

    // Create Account
    createAccountTitle: "Create New Account",
    createAccountSubtitle: "Already have an account?",
    createAccountLoginLink: "Log In",
    createAccountEmailLabel: "Email",
    createAccountPasswordLabel: "Password",
    createAccountConfirmPasswordLabel: "Confirm Password",
    createAccountButtonAction: "Create Account",
    createAccountPasswordMismatch: "Passwords do not match.",
    createAccountFormError: "Please fill out all fields.",
    alertAccountCreated: "Account created successfully! You will be redirected to the home page.",
    backToLogin: "Back to Login",

    // Forgot Password
    forgotPasswordTitle: "Recover Password",
    forgotPasswordSubtitle: "Enter your email and we'll send you a code to reset your password.",
    forgotPasswordEmailLabel: "Email",
    forgotPasswordSendCode: "Send Code",
    alertCodeSent: (email: string) => `A code has been sent to ${email}. For the purpose of this demo, the code is: 123456`,
    
    // Reset Password
    resetPasswordTitle: "Reset Password",
    resetPasswordSubtitle: "Check your email, enter the recovery code, and choose a new password.",
    resetPasswordCodeLabel: "Recovery Code",
    resetPasswordNewPasswordLabel: "New Password",
    resetPasswordConfirmNewPasswordLabel: "Confirm New Password",
    resetPasswordButtonAction: "Change Password",
    alertPasswordMismatch: "The new passwords do not match.",
    alertInvalidCode: "The recovery code is incorrect.",
    alertPasswordResetSuccess: "Password successfully updated! You can now log in.",
    resetPasswordFormError: "Please fill out all fields.",

    //AuthMessages
    authInvalidEmail:           'Invalid email format.',
    authInvalidCredentials:     'Email or password is incorrect.',
    authOperationNotAllowed:    'Authentication method not allowed.',
    authTooManyRequests:        'Too many attempts. Try again later.',
    authUnexpectedError:        (code: string) => `Unexpected error: ${code}`,

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
    paintsToUse: "Paints to Use",
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
    settingsProfileSaved: "Profile updated successfully",
    settingsPasswordMismatch:       "Passwords do not match.",
    settingsPasswordChanged:        "Password changed successfully.",
    settingsSaving:                 "Saving…",
    settingsConfirmNewPassword:     "Confirm new password",
    settingsChangingPassword:       "Changing password…",

    // Footer
    footerText: "A development by",
    footerAuthor: "Nicolás Colombero",

    // Gemini Service
    pigmentError: "Error processing color",
    geminiErrorLog: "Error translating color to pigments:",
    geminiLanguageInstruction: "Provide a single formula using common, standard pigment names in English (e.g., 'Titanium White', 'Cadmium Red', 'Ultramarine Blue'). Include the hex color code for each pure pigment."
  }
};