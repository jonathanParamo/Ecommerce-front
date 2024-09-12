export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/exa', label: 'Example' },
  {
    label: 'Products',  // Categoría principal
    subcategories: [
      { path: '/create-product', label: 'Create Product' },
      { path: '/low-stock-products', label: 'Low Stock Products' }
    ]
  },
  { path: '/category-manager', label: 'Category Manager' },
];
