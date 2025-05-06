// This file configures the Medusa server

const { loadEnv, defineConfig } = require('@medusajs/framework/utils')

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/**
 * @type {import('@medusajs/medusa').ConfigModule}
 */
module.exports = defineConfig({
  projectConfig: {
    store_cors: process.env.STORE_CORS || "http://localhost:8000",
    admin_cors: process.env.ADMIN_CORS || "http://localhost:9000",
    auth_cors: process.env.AUTH_CORS || "http://localhost:9000",
    database_url: process.env.DATABASE_URL,
    database_type: "postgres",
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  },
  admin: {
    serve: process.env.NODE_ENV !== "production" || process.env.DISABLE_MEDUSA_ADMIN !== "true",
    path: "/app",
    autoRebuild: true, 
  },
  plugins: []
}) 