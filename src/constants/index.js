export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/exa', label: 'Example' },
  {
    label: 'Products',  // Categoría principal
    subcategories: [
      { path: '/product-list', label: 'Todos' },
      { path: '/create-product', label: 'Crear' },
      { path: '/low-stock-products', label: 'por agotarse' }
    ]
  },
  { path: '/category-manager', label: 'Category Manager' },
];
