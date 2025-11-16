export default {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    console.log('🔐 Configuring API permissions...');
    
    try {
      // Get the public role (API tokens use public permissions in Strapi 5)
      const publicRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) {
        console.error('❌ Public role not found');
        return;
      }

      // Content types to enable
      const contentTypes = ['focus-area', 'technology', 'about-project'];
      const actions = ['find', 'findOne', 'create', 'update', 'delete'];

      let enabledCount = 0;

      // Enable permissions for each content type
      for (const contentType of contentTypes) {
        for (const action of actions) {
          const permissionData = {
            action: `api::${contentType}.${contentType}.${action}`,
            role: publicRole.id,
            enabled: true,
          };

          // Try to find existing permission
          const existing = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action: permissionData.action,
                role: publicRole.id,
              },
            });

          if (existing) {
            await strapi.db.query('plugin::users-permissions.permission').update({
              where: { id: existing.id },
              data: { enabled: true },
            });
          } else {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: permissionData,
            });
          }
          enabledCount++;
        }
      }

      // Enable upload permissions
      const uploadPermission = {
        action: 'plugin::upload.content-api.upload',
        role: publicRole.id,
        enabled: true,
      };

      const existingUpload = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({
          where: {
            action: uploadPermission.action,
            role: publicRole.id,
          },
        });

      if (existingUpload) {
        await strapi.db.query('plugin::users-permissions.permission').update({
          where: { id: existingUpload.id },
          data: { enabled: true },
        });
      } else {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: uploadPermission,
        });
      }
      enabledCount++;

      console.log(`✅ Enabled ${enabledCount} public API permissions`);
    } catch (error) {
      console.error('❌ Error configuring permissions:', error.message);
      console.error(error.stack);
    }
  },
};
