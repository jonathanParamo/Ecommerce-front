export const navLinks = [
  { path: '/app/orders', label: 'Pedidos' },
  {
    label: 'Productos',
    subcategories: [
      { path: '/app/product-list', label: 'Todos' },
      { path: '/app/create-product', label: 'Crear' },
      { path: '/app/low-stock-products', label: 'por agotarse' }
    ]
  },
  { path: '/app/category-manager', label: 'Category Manager' },
  { path: '/app/sales', label: 'Info de ventas' },
];
