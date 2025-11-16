const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'https://flomadlabsdotcom-strapi-production.up.railway.app';

async function createToken() {
  try {
    console.log('🔐 Logging in and creating API token...\n');
    
    // Step 1: Login to get JWT
    console.log('�� Logging in as admin...');
    const loginResponse = await axios.post(`${STRAPI_URL}/admin/login`, {
      email: 'admin@flolabsrd.com',
      password: 'FlomadLabsAdmin2024!',
    });

    console.log('✅ Logged in successfully');
    const jwt = loginResponse.data.data.token;

    // Step 2: Create API token
    console.log('🔑 Creating API token...');
    const tokenResponse = await axios.post(
      `${STRAPI_URL}/admin/api-tokens`,
      {
        name: 'Production API Token',
        description: 'Full access token for production seeding',
        type: 'full-access',
        lifespan: null,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log('\n✅ API Token created successfully!');
    console.log('\n📋 Save this token:');
    console.log(tokenResponse.data.data.accessKey);
    console.log('\n💡 Use it in the seed script like this:');
    console.log(`STRAPI_API_TOKEN='${tokenResponse.data.data.accessKey}' node scripts/seed-production.js`);
    
  } catch (error) {
    if (error.response?.data) {
      console.error('❌ Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('❌ Error:', error.message);
    }
    process.exit(1);
  }
}

createToken();
