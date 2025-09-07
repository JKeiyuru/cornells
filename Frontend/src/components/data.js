// components/data.js
export const mockData = {
  brands: [
    {
      id: 'rekker',
      name: 'REKKER',
      tagline: 'Quality for Every Need',
      description: 'From travel essentials to home solutions, Rekker delivers quality products for every aspect of your life. Discover our extensive collection of bags, kitchenware, toys, and everyday essentials.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
      color: 'from-blue-900/80 to-slate-900/80',
      categories: ['Travel & Bags', 'Kitchenware', 'Home & Living', 'Kids & Toys', 'Office & School'],
      heroImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200',
      theme: {
        primary: 'blue-600',
        secondary: 'slate-700',
        accent: 'blue-400'
      }
    },
    {
      id: 'saffron',
      name: 'SAFFRON',
      tagline: 'Pure Care, Pure Clean',
      description: 'Premium cleaning solutions and personal care products. Experience the perfect blend of effectiveness and gentleness with our specially formulated hand washes, dish soaps, and grooming essentials.',
      image: 'https://images.unsplash.com/photo-1585681442066-7b524503fb3c?w=800&h=1000&fit=crop',
      color: 'from-emerald-900/80 to-teal-900/80',
      categories: ['Hand Care', 'Dish Care', 'Body Care', 'Grooming'],
      heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      theme: {
        primary: 'emerald-600',
        secondary: 'teal-700',
        accent: 'emerald-400'
      }
    },
    {
      id: 'cornells',
      name: 'CORNELLS',
      tagline: 'Signature Scents, Timeless Elegance',
      description: 'Luxury fragrances crafted for the discerning individual. Each Cornells fragrance tells a unique story of sophistication, elegance, and timeless beauty.',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba04662?w=800&h=1000&fit=crop',
      color: 'from-amber-900/80 to-orange-900/80',
      categories: ['Men\'s Fragrances', 'Women\'s Fragrances', 'Unisex Collections', 'Gift Sets'],
      heroImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=1200',
      theme: {
        primary: 'amber-600',
        secondary: 'orange-700',
        accent: 'amber-400'
      }
    }
  ],
  
  products: {
    rekker: [
      {
        _id: 'rek001',
        title: 'Premium Business Laptop Bag',
        brand: 'REKKER',
        category: 'Travel & Bags',
        price: 45.99,
        img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        featured: true
      },
      {
        _id: 'rek002',
        title: 'Kids School Backpack - Adventure Series',
        brand: 'REKKER',
        category: 'Kids & Toys',
        price: 24.99,
        img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
        featured: true
      },
      {
        _id: 'rek003',
        title: 'Stainless Steel Kitchen Set',
        brand: 'REKKER',
        category: 'Kitchenware',
        price: 89.99,
        img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
        featured: false
      },
      {
        _id: 'rek004',
        title: 'Anti-Slip Kitchen Mat Set',
        brand: 'REKKER',
        category: 'Home & Living',
        price: 19.99,
        img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
        featured: false
      },
      {
        _id: 'rek005',
        title: 'Heavy Duty Trolley Bag',
        brand: 'REKKER',
        category: 'Travel & Bags',
        price: 67.99,
        img: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500',
        featured: true
      },
      {
        _id: 'rek006',
        title: 'Premium Padlock Set',
        brand: 'REKKER',
        category: 'Security',
        price: 15.99,
        img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500',
        featured: false
      }
    ],
    
    saffron: [
      {
        _id: 'saf001',
        title: 'Antibacterial Hand Wash - Lavender',
        brand: 'SAFFRON',
        category: 'Hand Care',
        price: 8.99,
        img: 'https://images.unsplash.com/photo-1585681442066-7b524503fb3c?w=500',
        featured: true
      },
      {
        _id: 'saf002',
        title: 'Ultra Dish Soap - Lemon Fresh',
        brand: 'SAFFRON',
        category: 'Dish Care',
        price: 6.99,
        img: 'https://images.unsplash.com/photo-1563113254-7075ad5ad968?w=500',
        featured: true
      },
      {
        _id: 'saf003',
        title: 'Moisturizing Shower Gel - Coconut',
        brand: 'SAFFRON',
        category: 'Body Care',
        price: 12.99,
        img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500',
        featured: true
      },
      {
        _id: 'saf004',
        title: 'Premium After Shave Balm',
        brand: 'SAFFRON',
        category: 'Grooming',
        price: 18.99,
        img: 'https://images.unsplash.com/photo-1506629905147-b5d4bd0ce5e3?w=500',
        featured: true
      },
      {
        _id: 'saf005',
        title: 'Kitchen Degreaser Spray',
        brand: 'SAFFRON',
        category: 'Dish Care',
        price: 9.99,
        img: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500',
        featured: false
      }
    ],
    
    cornells: [
      {
        _id: 'cor001',
        title: 'Midnight Oud - Men\'s Signature',
        brand: 'CORNELLS',
        category: 'Men\'s Fragrances',
        price: 89.99,
        img: 'https://images.unsplash.com/photo-1594736797933-d0401ba04662?w=500',
        featured: true
      },
      {
        _id: 'cor002',
        title: 'Rose Elegance - Women\'s Collection',
        brand: 'CORNELLS',
        category: 'Women\'s Fragrances',
        price: 94.99,
        img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=500',
        featured: true
      },
      {
        _id: 'cor003',
        title: 'Citrus Breeze - Unisex',
        brand: 'CORNELLS',
        category: 'Unisex Collections',
        price: 79.99,
        img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
        featured: true
      },
      {
        _id: 'cor004',
        title: 'Luxury Gift Set - His & Hers',
        brand: 'CORNELLS',
        category: 'Gift Sets',
        price: 149.99,
        img: 'https://images.unsplash.com/photo-1549558549-415fe4c37b60?w=500',
        featured: true
      },
      {
        _id: 'cor005',
        title: 'Amber Dreams - Evening Collection',
        brand: 'CORNELLS',
        category: 'Women\'s Fragrances',
        price: 104.99,
        img: 'https://images.unsplash.com/photo-1588671064208-8d5b426f4ac6?w=500',
        featured: false
      }
    ]
  },

  featuredProducts: function() {
    return Object.values(this.products).flat().filter(product => product.featured);
  },

  getProductsByCategory: function(brandId, category) {
    if (!brandId) return [];
    return this.products[brandId]?.filter(product => product.category === category) || [];
  }
};