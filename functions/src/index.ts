// @ts-nocheck
/* eslint-disable */

import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

// Inicializa Firebase
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Middleware de autenticación
async function authenticate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decoded = await auth.verifyIdToken(idToken);
    (req as any).uid = decoded.uid;
    next();
  } catch {
    console.error("Error verifying ID token");
    res.status(401).json({ error: "Unauthorized" });
  }
}

// Routers
const authRouter = express.Router();
const paletteRouter = express.Router();

// Registro con email/password
authRouter.post("/register", async (req: express.Request, res: express.Response): Promise<void> => {
  const { email, password, displayName } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }
  try {
    const user = await auth.createUser({ email, password, displayName });
    await db.collection("users").doc(user.uid).set({
      email,
      displayName: displayName || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ uid: user.uid, email: user.email, displayName: user.displayName });
  } catch (err: any) {
    console.error("Error creating user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Envío link de recuperación de contraseña
authRouter.post("/resetPassword", async (req: express.Request, res: express.Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required." });
    return;
  }
  try {
    const settings = { url: "https://pigmentarapp.web.app/", handleCodeInApp: false };
    const link = await auth.generatePasswordResetLink(email, settings);
    res.status(200).json({ resetLink: link });
  } catch (err: any) {
    console.error("Error generating password reset link:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Google Sign-In (crea perfil si no existe)
authRouter.post("/googleSignin", async (req: express.Request, res: express.Response): Promise<void> => {
  const { idToken } = req.body;
  if (!idToken) {
    res.status(400).json({ error: "ID token required" });
    return;
  }
  try {
    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const userDoc = db.collection("users").doc(uid);
    if (!(await userDoc.get()).exists) {
      const userRecord = await auth.getUser(uid);
      await userDoc.set({
        email: userRecord.email,
        displayName: userRecord.displayName || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    res.status(200).json({ uid, email: decoded.email, displayName: decoded.name });
  } catch (err: any) {
    console.error("Error Google sign-in:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
});

// Protege rutas de paletas
paletteRouter.use(authenticate);

// Crear paleta
paletteRouter.post("/", async (req: express.Request, res: express.Response): Promise<void> => {
  const uid = (req as any).uid;
  const { name, colors } = req.body;
  if (!name || !Array.isArray(colors)) {
    res.status(400).json({ error: "Name and colors array are required." });
    return;
  }
  try {
    const ref = await db.collection("users").doc(uid).collection("palettes").add({ name, colors, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.status(201).json({ id: ref.id });
  } catch (err: any) {
    console.error("Error saving palette:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Obtener paletas
paletteRouter.get("/", async (req: express.Request, res: express.Response): Promise<void> => {
  const uid = (req as any).uid;
  try {
    const snap = await db.collection("users").doc(uid).collection("palettes").orderBy("createdAt", "desc").get();
    const palettes = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.status(200).json({ palettes });
  } catch (err: any) {
    console.error("Error fetching palettes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Actualizar paleta
paletteRouter.put("/:id", async (req: express.Request, res: express.Response): Promise<void> => {
  const uid = (req as any).uid;
  const { id } = req.params;
  const { name, colors } = req.body;
  try {
    await db.collection("users").doc(uid).collection("palettes").doc(id).update({ name, colors });
    res.status(200).json({ message: "Palette updated." });
  } catch (err: any) {
    console.error("Error updating palette:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar paleta
paletteRouter.delete("/:id", async (req: express.Request, res: express.Response): Promise<void> => {
  const uid = (req as any).uid;
  const { id } = req.params;
  try {
    await db.collection("users").doc(uid).collection("palettes").doc(id).delete();
    res.status(200).json({ message: "Palette deleted." });
  } catch (err: any) {
    console.error("Error deleting palette:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Montar routers
app.use("/auth", authRouter);
app.use("/palettes", paletteRouter);

// Exportar Cloud Function
export const api = functions.region("southamerica-east1").https.onRequest(app);
