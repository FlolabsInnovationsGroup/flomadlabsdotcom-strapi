export default {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    console.log('🔐 Configuring API permissions...');
    
    try {
      // Get all permissions for the authenticated role
      const permissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
        where: {
          role: {
            type: 'authenticated',
          },
        },
      });

      // Enable all permissions
      for (const permission of permissions) {
        await strapi.db.query('plugin::users-permissions.permission').update({
          where: { id: permission.id },
          data: { enabled: true },
        });
      }
      
      console.log(`✅ Enabled ${permissions.length} API permissions`);
    } catch (error) {
      console.error('❌ Error configuring permissions:', error.message);
    }
  },
};
