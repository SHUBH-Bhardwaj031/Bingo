import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const initFirebase = () => {
  if (getApps().length > 0) return

  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
  const jsonString = Buffer.from(base64, 'base64').toString('utf-8')
  const serviceAccount = JSON.parse(jsonString)

  initializeApp({
    credential: cert(serviceAccount),
  })
}

export const getFirebaseAuth = () => {
  initFirebase()
  return getAuth()
}