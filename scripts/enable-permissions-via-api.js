const axios = require('axios');

const STRAPI_URL = 'https://flomadlabsdotcom-strapi-production.up.railway.app';
const ADMIN_EMAIL = 'admin@flolabsrd.com';
const ADMIN_PASSWORD = 'FlomadLabsAdmin2024!';

async function enablePermissions() {
  try {
    // Login
    console.log('🔐 Logging in...');
    const loginResponse = await axios.post(`${STRAPI_URL}/admin/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const jwt = loginResponse.data.data.token;
    console.log('✅ Logged in\n');

    // Get public role
    console.log('📋 Fetching roles...');
    const rolesResponse = await axios.get(
      `${STRAPI_URL}/admin/users-permissions/roles`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    const publicRole = rolesResponse.data.roles.find(r => r.type === 'public');
    console.log(`✅ Found public role (ID: ${publicRole.id})\n`);

    // Build permissions object
    const permissions = {
      'api::focus-area': {
        controllers: {
          'focus-area': {
            find: { enabled: true },
            findOne: { enabled: true },
            create: { enabled: true },
            update: { enabled: true },
            delete: { enabled: true },
          },
        },
      },
      'api::technology': {
        controllers: {
          technology: {
            find: { enabled: true },
            findOne: { enabled: true },
            create: { enabled: true },
            update: { enabled: true },
            delete: { enabled: true },
          },
        },
      },
      'api::about-project': {
        controllers: {
          'about-project': {
            find: { enabled: true },
            findOne: { enabled: true },
            create: { enabled: true },
            update: { enabled: true },
            delete: { enabled: true },
          },
        },
      },
      'plugin::upload': {
        controllers: {
          'content-api': {
            upload: { enabled: true },
          },
        },
      },
    };

    // Update role with permissions
    console.log('�� Updating permissions...');
    await axios.put(
      `${STRAPI_URL}/admin/users-permissions/roles/${publicRole.id}`,
      {
        ...publicRole,
        permissions,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    console.log('✅ Permissions updated successfully!');
    console.log('\n🎉 You can now run the seed script');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error(JSON.stringify(error.response.data, null, 2));
    }
  }
}

enablePermissions();
