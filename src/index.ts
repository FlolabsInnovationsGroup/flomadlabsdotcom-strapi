export default {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    console.log('🔐 Configuring API permissions...');
    
    try {
      // Get authenticated role
      const authenticatedRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'authenticated' } });

      if (!authenticatedRole) {
        console.error('❌ Authenticated role not found');
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
            role: authenticatedRole.id,
            enabled: true,
          };

          // Try to find existing permission
          const existing = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action: permissionData.action,
                role: authenticatedRole.id,
              },
            });

          if (existing) {
            // Update if exists
            await strapi.db.query('plugin::users-permissions.permission').update({
              where: { id: existing.id },
              data: { enabled: true },
            });
          } else {
            // Create if doesn't exist
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: permissionData,
            });
          }
          enabledCount++;
        }
      }

      // Also enable upload permissions
      const uploadActions = ['upload'];
      for (const action of uploadActions) {
        const permissionData = {
          action: `plugin::upload.content-api.${action}`,
          role: authenticatedRole.id,
          enabled: true,
        };

        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action: permissionData.action,
              role: authenticatedRole.id,
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

      console.log(`✅ Enabled ${enabledCount} API permissions`);
    } catch (error) {
      console.error('❌ Error configuring permissions:', error.message);
      console.error(error.stack);
    }
  },
};
