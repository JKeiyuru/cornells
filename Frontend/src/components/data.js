// products-data.js - EASY TEMPLATE FOR ADDING PRODUCTS
// Just copy-paste product objects and fill in the details!

// ============================================================================
// INSTRUCTIONS:
// 1. For images: Upload to Cloudinary/ImgBB/Imgur and paste the URL
// 2. Keep the same structure for each product
// 3. Copy a sample product, paste it, and modify the values
// 4. MOQ = Minimum Order Quantity for wholesale
// ============================================================================

export const PRODUCTS_DATABASE = {
  
  // ========================================
  // REKKER PRODUCTS
  // ========================================
  rekker: {
    stationery: [
      {
        _id: "REK-STAT-001",
        title: "Transparent Adhesive Tape (48 x 50)",
        brand: "Rekker",
        category: "Stationery",
        subcategory: "Math Tools",
        originalPrice: 350,
        discountedPrice: 280,
        wholesalePrice: 220,
        wholesaleMinimumQuantity: 100,
        unit: "pieces",
        img: "https://res.cloudinary.com/du9fhp5iq/image/upload/v1759910345/WhatsApp_Image_2025-10-08_at_10.38.06_3_ezrfm0.jpg", // Upload image and paste URL
        desc: "This Clear Packaging Tape is an essential tool for all your packing, sealing, and shipping needs. Made from high-quality, durable BOPP material, this transparent adhesive tape provides a strong and reliable seal for cartons, boxes, and packages. With a generous size of 48mm wide and 50m long, it offers excellent coverage and value for both home and office use. The tape unwinds smoothly and adheres quickly to a variety of surfaces, ensuring your items remain secure during transit.",
        inStock: true,
        featured: true,
        tags: ["math", "student", "school", "geometry"],
        ratings: []
      },
      {
        _id: "REK-STAT-002",
        title: "A4 Photocopy Paper - 500 Sheets",
        brand: "Rekker",
        category: "Stationery",
        subcategory: "Paper Products",
        originalPrice: 650,
        discountedPrice: 580,
        wholesalePrice: 520,
        wholesaleMinimumQuantity: 50,
        unit: "reams",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "High-quality 80gsm A4 photocopy paper. Bright white, smooth finish. 500 sheets per ream. Ideal for printing and photocopying.",
        inStock: true,
        featured: true,
        tags: ["paper", "office", "printing"],
        ratings: []
      },
      {
        _id: "REK-STAT-003",
        title: "Ballpoint Pens - Blue (Box of 50)",
        brand: "Rekker",
        category: "Stationery",
        subcategory: "Writing Instruments",
        originalPrice: 200,
        discountedPrice: 180,
        wholesalePrice: 150,
        wholesaleMinimumQuantity: 200,
        unit: "boxes",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Smooth-writing ballpoint pens with comfortable grip. Blue ink, 50 pens per box. Perfect for schools and offices.",
        inStock: true,
        featured: false,
        tags: ["pens", "writing", "office", "school"],
        ratings: []
      },
      // ADD MORE STATIONERY PRODUCTS HERE - JUST COPY THE STRUCTURE ABOVE
    ],

    bags: [
      {
        _id: "REK-BAG-001",
        title: "Premium School Backpack - Adventure Series",
        brand: "Rekker",
        category: "Bags & Suitcases",
        subcategory: "School Bags",
        originalPrice: 2500,
        discountedPrice: 2200,
        wholesalePrice: 1800,
        wholesaleMinimumQuantity: 50,
        unit: "pieces",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Durable, water-resistant school backpack with padded shoulder straps, multiple compartments, and reinforced bottom. Available in multiple colors.",
        inStock: true,
        featured: true,
        tags: ["backpack", "school", "student", "durable"],
        ratings: []
      },
      {
        _id: "REK-BAG-002",
        title: "Rolling Suitcase - 24 Inch",
        brand: "Rekker",
        category: "Bags & Suitcases",
        subcategory: "Travel Luggage",
        originalPrice: 6500,
        discountedPrice: 5800,
        wholesalePrice: 5200,
        wholesaleMinimumQuantity: 30,
        unit: "pieces",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Hard-shell rolling suitcase with 4-wheel spinner system. TSA-approved lock, expandable design, and telescopic handle. 24-inch size.",
        inStock: true,
        featured: true,
        tags: ["suitcase", "travel", "luggage", "rolling"],
        ratings: []
      },
      // ADD MORE BAG PRODUCTS HERE
    ],

    toys: [
      {
        _id: "REK-TOY-001",
        title: "Educational Building Blocks Set - 100 Pieces",
        brand: "Rekker",
        category: "Toys",
        subcategory: "Educational Toys",
        originalPrice: 1200,
        discountedPrice: 980,
        wholesalePrice: 800,
        wholesaleMinimumQuantity: 60,
        unit: "sets",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Colorful building blocks set with 100 pieces. Non-toxic plastic, compatible with major brands. Enhances creativity and motor skills.",
        inStock: true,
        featured: true,
        tags: ["educational", "blocks", "kids", "building"],
        ratings: []
      },
      // ADD MORE TOY PRODUCTS HERE
    ],

    kitchenware: [
      {
        _id: "REK-KITCH-001",
        title: "Stainless Steel Cooking Pot Set - 3 Pieces",
        brand: "Rekker",
        category: "Kitchenware",
        subcategory: "Cookware",
        originalPrice: 3500,
        discountedPrice: 3000,
        wholesalePrice: 2600,
        wholesaleMinimumQuantity: 40,
        unit: "sets",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Premium stainless steel cooking pot set. Includes 1L, 2L, and 3L pots with lids. Heat-resistant handles, dishwasher safe.",
        inStock: true,
        featured: true,
        tags: ["cookware", "stainless", "pots", "kitchen"],
        ratings: []
      },
      // ADD MORE KITCHENWARE PRODUCTS HERE
    ],

    padlocks: [
      {
        _id: "REK-LOCK-001",
        title: "Heavy Duty Combination Padlock - 40mm",
        brand: "Rekker",
        category: "Padlocks",
        subcategory: "Security Locks",
        originalPrice: 450,
        discountedPrice: 380,
        wholesalePrice: 320,
        wholesaleMinimumQuantity: 100,
        unit: "pieces",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Weather-resistant combination padlock with 4-digit code. Hardened steel shackle, 40mm body. Ideal for lockers, gates, and storage.",
        inStock: true,
        featured: false,
        tags: ["security", "padlock", "combination", "lock"],
        ratings: []
      },
      // ADD MORE PADLOCK PRODUCTS HERE
    ],

    stuffedToys: [
      {
        _id: "REK-STUFF-001",
        title: "Jumbo Teddy Bear - 60cm",
        brand: "Rekker",
        category: "Stuffed Toys",
        subcategory: "Teddy Bears",
        originalPrice: 1800,
        discountedPrice: 1500,
        wholesalePrice: 1200,
        wholesaleMinimumQuantity: 40,
        unit: "pieces",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Super soft jumbo teddy bear, 60cm tall. Hypoallergenic filling, machine washable. Perfect gift for all ages. Available in brown and white.",
        inStock: true,
        featured: true,
        tags: ["teddy", "stuffed", "gift", "soft"],
        ratings: []
      },
      // ADD MORE STUFFED TOY PRODUCTS HERE
    ],

    partyItems: [
      {
        _id: "REK-PARTY-001",
        title: "Disposable Paper Plates - 50 Pack (9 inch)",
        brand: "Rekker",
        category: "Party Items",
        subcategory: "Disposable Tableware",
        originalPrice: 280,
        discountedPrice: 250,
        wholesalePrice: 200,
        wholesaleMinimumQuantity: 150,
        unit: "packs",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Heavy-duty disposable paper plates, 9-inch diameter. Microwave safe, grease-resistant coating. 50 plates per pack. Perfect for parties and events.",
        inStock: true,
        featured: false,
        tags: ["party", "disposable", "plates", "events"],
        ratings: []
      },
      {
        _id: "REK-PARTY-002",
        title: "Birthday Balloon Pack - Mixed Colors (30 pieces)",
        brand: "Rekker",
        category: "Party Items",
        subcategory: "Balloons",
        originalPrice: 350,
        discountedPrice: 300,
        wholesalePrice: 250,
        wholesaleMinimumQuantity: 100,
        unit: "packs",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Assorted color latex balloons for birthdays. 30 balloons per pack with ribbon. Non-toxic, biodegradable material.",
        inStock: true,
        featured: true,
        tags: ["balloons", "birthday", "party", "decorations"],
        ratings: []
      },
      // ADD MORE PARTY ITEM PRODUCTS HERE
    ],

    educational: [
      {
        _id: "REK-EDU-001",
        title: "Artist Paintbrush Set - 12 Pieces",
        brand: "Rekker",
        category: "Educational Items",
        subcategory: "Art Supplies",
        originalPrice: 650,
        discountedPrice: 550,
        wholesalePrice: 450,
        wholesaleMinimumQuantity: 80,
        unit: "sets",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Professional quality paintbrush set with 12 different sizes. Synthetic bristles, wooden handles. Suitable for watercolor, acrylic, and oil painting.",
        inStock: true,
        featured: false,
        tags: ["art", "painting", "brushes", "education"],
        ratings: []
      },
      // ADD MORE EDUCATIONAL PRODUCT HERE
    ]
  },

  // ========================================
  // SAFFRON PRODUCTS (Manufactured by Rekker)
  // ========================================
  saffron: {
    handCare: [
      {
        _id: "SAF-HAND-001",
        title: "Saffron Premium Hand Wash - Lavender (500ml)",
        brand: "Saffron",
        category: "Personal Care",
        subcategory: "Hand Care",
        originalPrice: 350,
        discountedPrice: 280,
        wholesalePrice: 220,
        wholesaleMinimumQuantity: 100,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Antibacterial hand wash with natural lavender extract. 99.9% germ protection. Gentle on skin with moisturizing formula. 500ml pump bottle.",
        inStock: true,
        featured: true,
        tags: ["handwash", "antibacterial", "lavender", "saffron"],
        ratings: []
      },
      {
        _id: "SAF-HAND-002",
        title: "Saffron Premium Hand Wash - Lemon Fresh (500ml)",
        brand: "Saffron",
        category: "Personal Care",
        subcategory: "Hand Care",
        originalPrice: 350,
        discountedPrice: 280,
        wholesalePrice: 220,
        wholesaleMinimumQuantity: 100,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Refreshing lemon-scented antibacterial hand wash. 99.9% germ protection with natural lemon extracts. pH balanced formula. 500ml pump bottle.",
        inStock: true,
        featured: true,
        tags: ["handwash", "lemon", "antibacterial", "saffron"],
        ratings: []
      },
      // ADD MORE HAND CARE PRODUCTS HERE
    ],

    dishCare: [
      {
        _id: "SAF-DISH-001",
        title: "Saffron Dishwashing Liquid - Lemon (1L)",
        brand: "Saffron",
        category: "Kitchen Care",
        subcategory: "Dish Care",
        originalPrice: 280,
        discountedPrice: 250,
        wholesalePrice: 200,
        wholesaleMinimumQuantity: 120,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Concentrated dishwashing liquid with superior grease-cutting power. Fresh lemon scent, gentle on hands. 1-liter bottle with easy-pour cap.",
        inStock: true,
        featured: true,
        tags: ["dishwashing", "lemon", "kitchen", "saffron"],
        ratings: []
      },
      {
        _id: "SAF-DISH-002",
        title: "Saffron Dishwashing Liquid - Green Apple (1L)",
        brand: "Saffron",
        category: "Kitchen Care",
        subcategory: "Dish Care",
        originalPrice: 280,
        discountedPrice: 250,
        wholesalePrice: 200,
        wholesaleMinimumQuantity: 120,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Powerful dishwashing liquid with refreshing green apple fragrance. Cuts through tough grease while being gentle on hands. 1L bottle.",
        inStock: true,
        featured: false,
        tags: ["dishwashing", "apple", "kitchen", "saffron"],
        ratings: []
      },
      // ADD MORE DISH CARE PRODUCTS HERE
    ],

    laundryCare: [
      {
        _id: "SAF-LAUN-001",
        title: "Saffron Liquid Detergent - Fresh Breeze (2L)",
        brand: "Saffron",
        category: "Laundry Care",
        subcategory: "Detergents",
        originalPrice: 650,
        discountedPrice: 580,
        wholesalePrice: 500,
        wholesaleMinimumQuantity: 80,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "High-performance liquid detergent for all fabric types. Deep stain removal with color protection. Fresh breeze fragrance. 2-liter bottle.",
        inStock: true,
        featured: true,
        tags: ["detergent", "laundry", "liquid", "saffron"],
        ratings: []
      },
      // ADD MORE LAUNDRY CARE PRODUCTS HERE
    ],

    bodyCare: [
      {
        _id: "SAF-BODY-001",
        title: "Saffron Shower Gel - Coconut Dream (500ml)",
        brand: "Saffron",
        category: "Personal Care",
        subcategory: "Body Care",
        originalPrice: 450,
        discountedPrice: 380,
        wholesalePrice: 320,
        wholesaleMinimumQuantity: 90,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Moisturizing shower gel with natural coconut extract. Rich lather, gentle formula. Leaves skin soft and refreshed. 500ml pump bottle.",
        inStock: true,
        featured: true,
        tags: ["shower", "coconut", "body", "saffron"],
        ratings: []
      },
      // ADD MORE BODY CARE PRODUCTS HERE
    ],

    grooming: [
      {
        _id: "SAF-GROOM-001",
        title: "Saffron Anti-Bump After Shave (100ml)",
        brand: "Saffron",
        category: "Men's Care",
        subcategory: "Grooming",
        originalPrice: 550,
        discountedPrice: 480,
        wholesalePrice: 400,
        wholesaleMinimumQuantity: 70,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Specially formulated after-shave for men. Prevents razor bumps, soothes irritation. Quick absorption with long-lasting freshness. 100ml bottle.",
        inStock: true,
        featured: true,
        tags: ["aftershave", "men", "grooming", "saffron"],
        ratings: []
      },
      // ADD MORE GROOMING PRODUCTS HERE
    ]
  },

  // ========================================
  // CORNELLS PRODUCTS (Distributed by Rekker)
  // Based on cornellswellness.com
  // ========================================
  cornells: {
    boldBeautiful: [
      {
        _id: "COR-BB-001",
        title: "Cornells Bold & Beautiful Body Lotion - Vanilla (400ml)",
        brand: "Cornells",
        category: "Body Care",
        subcategory: "Bold & Beautiful",
        originalPrice: 450,
        discountedPrice: 380,
        wholesalePrice: 320,
        wholesaleMinimumQuantity: 72,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Ultra-rich body lotion with Shea Butter and vanilla fragrance. 24-hour deep hydration. Non-greasy formula. Globally trusted beauty product.",
        inStock: true,
        featured: true,
        tags: ["lotion", "body", "vanilla", "cornells", "shea butter"],
        ratings: []
      },
      {
        _id: "COR-BB-002",
        title: "Cornells Bold & Beautiful Body Lotion - Cocoa Butter (400ml)",
        brand: "Cornells",
        category: "Body Care",
        subcategory: "Bold & Beautiful",
        originalPrice: 450,
        discountedPrice: 380,
        wholesalePrice: 320,
        wholesaleMinimumQuantity: 72,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Intensive moisture with natural cocoa butter for silky smooth skin. Deep moisturizing formula with natural fragrance. 400ml bottle.",
        inStock: true,
        featured: true,
        tags: ["lotion", "cocoa butter", "body", "cornells"],
        ratings: []
      },
      // ADD MORE BOLD & BEAUTIFUL PRODUCTS HERE
    ],

    cutePretty: [
      {
        _id: "COR-CP-001",
        title: "Cornells Cute & Pretty Baby Lotion (200ml)",
        brand: "Cornells",
        category: "Kids & Family Care",
        subcategory: "Cute & Pretty",
        originalPrice: 350,
        discountedPrice: 280,
        wholesalePrice: 220,
        wholesaleMinimumQuantity: 96,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Gentle moisturizing lotion for baby's delicate skin. Pediatrician tested, hypoallergenic, tear-free formula. 24-hour protection. 200ml.",
        inStock: true,
        featured: true,
        tags: ["baby", "kids", "lotion", "cornells", "gentle"],
        ratings: []
      },
      {
        _id: "COR-CP-002",
        title: "Cornells Cute & Pretty Kids Sunscreen SPF 50+ (100ml)",
        brand: "Cornells",
        category: "Kids & Family Care",
        subcategory: "Cute & Pretty",
        originalPrice: 550,
        discountedPrice: 480,
        wholesalePrice: 400,
        wholesaleMinimumQuantity: 60,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "SPF 50+ broad-spectrum sunscreen specially formulated for children. Water-resistant, kid-safe formula. No white residue. 100ml bottle.",
        inStock: true,
        featured: true,
        tags: ["sunscreen", "kids", "spf50", "cornells", "protection"],
        ratings: []
      },
      // ADD MORE CUTE & PRETTY PRODUCTS HERE
    ],

    darkBeautiful: [
      {
        _id: "COR-DB-001",
        title: "Cornells Dark & Beautiful Hair Oil (250ml)",
        brand: "Cornells",
        category: "Hair Care",
        subcategory: "Dark & Beautiful",
        originalPrice: 480,
        discountedPrice: 400,
        wholesalePrice: 340,
        wholesaleMinimumQuantity: 80,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Nourishing hair oil blend for strength and shine. Natural oils for hair strengthening and scalp nourishment. Suitable for all hair types. 250ml.",
        inStock: true,
        featured: true,
        tags: ["hair oil", "hair care", "cornells", "natural"],
        ratings: []
      },
      {
        _id: "COR-DB-002",
        title: "Cornells Dark & Beautiful Shampoo (400ml)",
        brand: "Cornells",
        category: "Hair Care",
        subcategory: "Dark & Beautiful",
        originalPrice: 520,
        discountedPrice: 450,
        wholesalePrice: 380,
        wholesaleMinimumQuantity: 72,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Gentle cleansing shampoo for healthy, beautiful hair. Sulfate-free, color-safe formula with natural extracts. pH balanced. 400ml bottle.",
        inStock: true,
        featured: true,
        tags: ["shampoo", "hair care", "sulfate free", "cornells"],
        ratings: []
      },
      // ADD MORE DARK & BEAUTIFUL PRODUCTS HERE
    ],

    superFood: [
      {
        _id: "COR-SF-001",
        title: "Cornells Super Food Vitamin C Serum (30ml)",
        brand: "Cornells",
        category: "Skincare",
        subcategory: "Super Food",
        originalPrice: 750,
        discountedPrice: 650,
        wholesalePrice: 550,
        wholesaleMinimumQuantity: 48,
        unit: "bottles",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Antioxidant-rich facial serum with natural vitamin C. Anti-aging and brightening effect. Dermatologist tested. 30ml dropper bottle.",
        inStock: true,
        featured: true,
        tags: ["serum", "vitamin c", "skincare", "cornells", "anti-aging"],
        ratings: []
      },
      {
        _id: "COR-SF-002",
        title: "Cornells Super Food Body Scrub (200ml)",
        brand: "Cornells",
        category: "Body Care",
        subcategory: "Super Food",
        originalPrice: 620,
        discountedPrice: 550,
        wholesalePrice: 470,
        wholesaleMinimumQuantity: 60,
        unit: "jars",
        img: "YOUR_IMAGE_URL_HERE",
        desc: "Exfoliating body scrub with superfood extracts and natural oils. Natural exfoliation for skin renewal and moisturizing. 200ml jar.",
        inStock: true,
        featured: true,
        tags: ["scrub", "exfoliation", "body care", "cornells", "superfood"],
        ratings: []
      },
      // ADD MORE SUPER FOOD PRODUCTS HERE
    ]
  }
};

// ============================================================================
// HELPER FUNCTION: Get all products as a flat array
// ============================================================================
export const getAllProducts = () => {
  const allProducts = [];
  
  Object.keys(PRODUCTS_DATABASE).forEach(brand => {
    Object.keys(PRODUCTS_DATABASE[brand]).forEach(category => {
      allProducts.push(...PRODUCTS_DATABASE[brand][category]);
    });
  });
  
  return allProducts;
};

// ============================================================================
// HELPER FUNCTION: Get products by brand
// ============================================================================
export const getProductsByBrand = (brandName) => {
  const products = [];
  const brand = PRODUCTS_DATABASE[brandName.toLowerCase()];
  
  if (brand) {
    Object.keys(brand).forEach(category => {
      products.push(...brand[category]);
    });
  }
  
  return products;
};

// ============================================================================
// HELPER FUNCTION: Get products by category
// ============================================================================
export const getProductsByCategory = (categoryName) => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );
};

// ============================================================================
// HELPER FUNCTION: Search products
// ============================================================================
export const searchProducts = (searchTerm) => {
  const allProducts = getAllProducts();
  const term = searchTerm.toLowerCase();
  
  return allProducts.filter(product =>
    product.title.toLowerCase().includes(term) ||
    product.desc.toLowerCase().includes(term) ||
    product.brand.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    product.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================
export default PRODUCTS_DATABASE;