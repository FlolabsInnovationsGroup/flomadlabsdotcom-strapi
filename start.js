const strapi = require('@strapi/strapi');

async function start() {
  try {
    console.log('=== Starting Strapi ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('DATABASE_CLIENT:', process.env.DATABASE_CLIENT);
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL value:', process.env.DATABASE_URL ? 'set' : 'NOT SET');
    
    // Strapi 5 with CommonJS - call the factory function directly
    const app = await strapi({ distDir: './dist' }).start();
    
    console.log('=== Strapi started successfully ===');
  } catch (error) {
    console.error('=== FULL ERROR DETAILS ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.errors && Array.isArray(error.errors)) {
      console.error('=== AGGREGATE ERRORS ===');
      error.errors.forEach((err, index) => {
        console.error(`Error ${index + 1}:`, err.message || err);
        if (err.stack) console.error(err.stack);
      });
    }
    
    process.exit(1);
  }
}

start();
