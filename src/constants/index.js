export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/orders', label: 'Pedidos' },
  {
    label: 'Productos',
    subcategories: [
      { path: '/product-list', label: 'Todos' },
      { path: '/create-product', label: 'Crear' },
      { path: '/low-stock-products', label: 'por agotarse' }
    ]
  },
  { path: '/category-manager', label: 'Category Manager' },
  { path: '/sales', label: 'Info de ventas' },
];
