const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the admin directory exists to prevent errors
const adminDir = path.join(__dirname, '.medusa/server/public/admin');
if (!fs.existsSync(adminDir)) {
  console.log('Creating admin directory to prevent errors...');
  fs.mkdirSync(adminDir, { recursive: true });
  fs.writeFileSync(path.join(adminDir, 'index.html'), '<!-- Placeholder file -->');
}

// Check if we're running a command that needs admin access
const isAdminCommand = process.argv.length > 2 && 
                      (process.argv.includes('exec') || 
                       process.argv.includes('seed') || 
                       process.argv.includes('migrations'));

console.log('Starting Medusa server...');
const medusaProcess = spawn('node', ['.medusa/server/index.js'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    DISABLE_MEDUSA_ADMIN: 'true',
    // Set NODE_ENV to development if we're running admin commands
    ...(isAdminCommand && { NODE_ENV: 'development' })
  }
});

medusaProcess.on('close', (code) => {
  console.log(`Medusa process exited with code ${code}`);
  process.exit(code);
}); 