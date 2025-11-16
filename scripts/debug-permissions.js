const axios = require('axios');

const STRAPI_URL = 'https://flomadlabsdotcom-strapi-production.up.railway.app';
const ADMIN_EMAIL = 'admin@flolabsrd.com';
const ADMIN_PASSWORD = 'FlomadLabsAdmin2024!';

async function debugPermissions() {
  try {
    // Login
    const loginResponse = await axios.post(`${STRAPI_URL}/admin/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const jwt = loginResponse.data.data.token;
    console.log('✅ Logged in\n');

    // Get all permissions
    const permsResponse = await axios.get(
      `${STRAPI_URL}/admin/users-permissions/permissions`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    console.log('📋 Permissions structure:');
    console.log(JSON.stringify(permsResponse.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

debugPermissions();
