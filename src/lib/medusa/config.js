import Medusa from "@medusajs/medusa-js"

// Get publishable API key from environment variables
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

// Initialize Medusa client
export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
  publishableApiKey: PUBLISHABLE_API_KEY,
})

// Helper function to handle errors
export const handleError = (error) => {
  console.error("Medusa Error:", error)
  throw error
} 