export default {
  routes: [
    {
      method: 'GET',
      path: '/focus-areas',
      handler: 'focus-area.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/focus-areas/:id',
      handler: 'focus-area.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/focus-areas',
      handler: 'focus-area.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/focus-areas/:id',
      handler: 'focus-area.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/focus-areas/:id',
      handler: 'focus-area.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
