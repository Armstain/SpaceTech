const { execSync } = require('child_process');

console.log('Running database migrations...');

try {
  // Run migrations using Medusa CLI
  execSync('npx medusa migrations run', { stdio: 'inherit' });
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
} 