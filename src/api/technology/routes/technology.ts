export default {
  routes: [
    {
      method: 'GET',
      path: '/technologies',
      handler: 'technology.find',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'GET',
      path: '/technologies/:id',
      handler: 'technology.findOne',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'POST',
      path: '/technologies',
      handler: 'technology.create',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'PUT',
      path: '/technologies/:id',
      handler: 'technology.update',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'DELETE',
      path: '/technologies/:id',
      handler: 'technology.delete',
      config: { policies: [], middlewares: [] },
    },
  ],
};
