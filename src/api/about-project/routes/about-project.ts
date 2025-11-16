export default {
  routes: [
    {
      method: 'GET',
      path: '/about-projects',
      handler: 'about-project.find',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'GET',
      path: '/about-projects/:id',
      handler: 'about-project.findOne',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'POST',
      path: '/about-projects',
      handler: 'about-project.create',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'PUT',
      path: '/about-projects/:id',
      handler: 'about-project.update',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'DELETE',
      path: '/about-projects/:id',
      handler: 'about-project.delete',
      config: { policies: [], middlewares: [] },
    },
  ],
};
