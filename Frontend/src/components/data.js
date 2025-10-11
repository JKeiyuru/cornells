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
  // ========================================
// CORNELLS PRODUCTS (Distributed by Rekker)
// Based on cornellswellness.com
// ========================================
cornells: {
  hairCare: [
    {
      _id: "COR-HAIR-001",
      title: "Brazilian Keratin Shampoo Super Foods - 1000ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Shampoo",
      originalPrice: 1183,
      discountedPrice: 986,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "https://res.cloudinary.com/du9fhp5iq/image/upload/v1760086051/Super_Foods_Brazilan_Keratin_Shampoo_l9kcov.jpg",
      desc: "Professional Brazilian Keratin Shampoo with Super Foods formula. Deeply cleanses while infusing keratin proteins for stronger, smoother hair. Reduces frizz and adds brilliant shine. 1000ml bottle for long-lasting use.",
      inStock: true,
      featured: true,
      tags: ["keratin", "shampoo", "smooth", "frizz control", "professional"],
      ratings: []
    },
    {
      _id: "COR-HAIR-002",
      title: "Avocado Manuka Honey Shampoo Super Foods - 1000ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Shampoo",
      originalPrice: 1183,
      discountedPrice: 986,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "https://res.cloudinary.com/du9fhp5iq/image/upload/v1760086960/Avocado_Manuka_Honey_Shampoo_Super_Foods_-_1000ml_gr1kxz.jpg",
      desc: "Nourishing Avocado and Manuka Honey Shampoo with Super Foods blend. Gently cleanses while providing intense moisture and nutrients. Perfect for dry, damaged hair needing extra care and hydration.",
      inStock: true,
      featured: true,
      tags: ["avocado", "manuka honey", "moisturizing", "dry hair", "nourishing"],
      ratings: []
    },
    {
      _id: "COR-HAIR-003",
      title: "Antidandruff Tea Tree Shampoo Super Foods - 1000ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Shampoo",
      originalPrice: 1183,
      discountedPrice: 986,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Therapeutic Tea Tree Antidandruff Shampoo with Super Foods formula. Effectively treats dandruff and scalp irritation while promoting healthy hair growth. Refreshing and invigorating scalp treatment.",
      inStock: true,
      featured: false,
      tags: ["tea tree", "antidandruff", "scalp care", "medicated", "refresh"],
      ratings: []
    },
    {
      _id: "COR-HAIR-004",
      title: "Moroccan Argan Shea Butter Shampoo Super Foods - 1000ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Shampoo",
      originalPrice: 1183,
      discountedPrice: 986,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "https://res.cloudinary.com/du9fhp5iq/image/upload/v1760086962/Moroccan_Argan_Shea_Butter_Shampoo_Super_Foods_-_1000ml_gn2ttz.jpg",
      desc: "Luxurious Moroccan Argan Oil and Shea Butter Shampoo with Super Foods. Rich lather that moisturizes, repairs, and adds incredible shine to dull, damaged hair. Premium hair care experience.",
      inStock: true,
      featured: true,
      tags: ["argan oil", "shea butter", "repair", "shine", "luxury"],
      ratings: []
    },
    {
      _id: "COR-HAIR-005",
      title: "Brazilian Keratin Conditioner Super Foods - 1000ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Conditioner",
      originalPrice: 1252,
      discountedPrice: 1044,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "https://res.cloudinary.com/du9fhp5iq/image/upload/v1760086960/Brazilian_Keratin_Conditioner_Super_Foods_-_1000ml_y8ilda.jpg",
      desc: "Advanced Brazilian Keratin Conditioner with Super Foods technology. Seals keratin proteins into hair shaft for ultimate smoothness and frizz control. Leaves hair manageable and radiant.",
      inStock: true,
      featured: true,
      tags: ["keratin", "conditioner", "smooth", "detangle", "professional"],
      ratings: []
    },
    {
      _id: "COR-HAIR-006",
      title: "Moroccan Argan Shea Butter Conditioner Super Foods - 1000ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Conditioner",
      originalPrice: 1252,
      discountedPrice: 1044,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "https://res.cloudinary.com/du9fhp5iq/image/upload/v1760086960/Moroccan_Argan_Shea_Butter_Conditioner_Super_Foods_-_1000ml_sqrq4n.jpg",
      desc: "Rich Moroccan Argan and Shea Butter Conditioner with Super Foods blend. Deeply conditions and restores moisture to dry, brittle hair. Provides intense nourishment and brilliant shine.",
      inStock: true,
      featured: false,
      tags: ["argan oil", "shea butter", "moisture", "repair", "nourish"],
      ratings: []
    },
    {
      _id: "COR-HAIR-007",
      title: "Caffeine Coconut Conditioner Super Foods - 500ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Conditioner",
      originalPrice: 904,
      discountedPrice: 754,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Revitalizing Caffeine and Coconut Conditioner with Super Foods formula. Stimulates hair follicles while providing deep coconut moisture. Promotes thicker, fuller-looking hair with natural bounce.",
      inStock: true,
      featured: true,
      tags: ["caffeine", "coconut", "volume", "thickening", "revitalize"],
      ratings: []
    },
    {
      _id: "COR-HAIR-008",
      title: "Chia Seeds Almond Conditioner Super Foods - 500ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Conditioner",
      originalPrice: 904,
      discountedPrice: 754,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Nutrient-rich Chia Seeds and Almond Conditioner with Super Foods. Packed with omega-3 and proteins to strengthen hair from root to tip. Reduces breakage and improves elasticity.",
      inStock: true,
      featured: false,
      tags: ["chia seeds", "almond", "strength", "protein", "repair"],
      ratings: []
    },
    {
      _id: "COR-HAIR-009",
      title: "Lavender Oil Biotin Conditioner Super Foods - 500ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Conditioner",
      originalPrice: 904,
      discountedPrice: 754,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Soothing Lavender Oil and Biotin Conditioner with Super Foods. Calms scalp while biotin promotes hair growth and thickness. Aromatic experience with visible results.",
      inStock: true,
      featured: false,
      tags: ["lavender", "biotin", "growth", "calming", "aromatic"],
      ratings: []
    },
    {
      _id: "COR-HAIR-010",
      title: "Avocado Manuka Honey Conditioner Super Foods - 500ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Super Foods Conditioner",
      originalPrice: 904,
      discountedPrice: 754,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Ultra-moisturizing Avocado and Manuka Honey Conditioner with Super Foods. Deeply hydrates and repairs damaged hair strands. Leaves hair soft, silky, and manageable.",
      inStock: true,
      featured: true,
      tags: ["avocado", "manuka honey", "hydration", "repair", "silky"],
      ratings: []
    }
  ],

  bodyCare: [
    {
      _id: "COR-BODY-001",
      title: "Acai Blueberry Shower Gel Super Foods - 1000ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Shower Gel",
      originalPrice: 853,
      discountedPrice: 711,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Antioxidant-rich Acai and Blueberry Shower Gel with Super Foods formula. Gently cleanses while protecting skin from environmental damage. Invigorating berry fragrance for all-day freshness.",
      inStock: true,
      featured: true,
      tags: ["acai", "blueberry", "antioxidant", "shower gel", "fresh"],
      ratings: []
    },
    {
      _id: "COR-BODY-002",
      title: "Avocado Honey Shower Gel Super Foods - 1000ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Shower Gel",
      originalPrice: 711,
      discountedPrice: 711,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Nourishing Avocado and Honey Shower Gel with Super Foods blend. Creamy lather that moisturizes skin while cleansing. Leaves skin feeling soft, smooth, and rejuvenated.",
      inStock: true,
      featured: false,
      tags: ["avocado", "honey", "moisturizing", "shower gel", "soft"],
      ratings: []
    },
    {
      _id: "COR-BODY-003",
      title: "Olive Shower Gel Super Foods - 1000ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Shower Gel",
      originalPrice: 711,
      discountedPrice: 711,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Mediterranean Olive Shower Gel with Super Foods nutrients. Rich in antioxidants and vitamins to protect and nourish skin. Classic, clean fragrance for daily use.",
      inStock: true,
      featured: false,
      tags: ["olive", "mediterranean", "antioxidant", "cleansing", "classic"],
      ratings: []
    },
    {
      _id: "COR-BODY-004",
      title: "Sweet Citrus Shower Gel Super Foods - 1000ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Shower Gel",
      originalPrice: 711,
      discountedPrice: 711,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Zesty Sweet Citrus Shower Gel with Super Foods extract. Uplifting citrus fragrance energizes senses while vitamin C brightens skin. Perfect morning shower experience.",
      inStock: true,
      featured: true,
      tags: ["citrus", "energizing", "vitamin c", "fresh", "morning"],
      ratings: []
    },
    {
      _id: "COR-BODY-005",
      title: "Acai Blueberry Body Lotion Super Foods - 500ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Body Lotion",
      originalPrice: 712,
      discountedPrice: 712,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Antioxidant-rich Acai and Blueberry Body Lotion with Super Foods. Deeply moisturizes while protecting skin from free radicals. Light, non-greasy formula absorbs quickly.",
      inStock: true,
      featured: true,
      tags: ["acai", "blueberry", "lotion", "moisturize", "antioxidant"],
      ratings: []
    },
    {
      _id: "COR-BODY-006",
      title: "Avocado Manuka Honey Body Lotion Super Foods - 500ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Body Lotion",
      originalPrice: 712,
      discountedPrice: 712,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Intensive Moisture Avocado and Manuka Honey Body Lotion with Super Foods. Provides 24-hour hydration with natural ingredients. Perfect for very dry skin needing extra care.",
      inStock: true,
      featured: false,
      tags: ["avocado", "honey", "hydration", "dry skin", "nourish"],
      ratings: []
    },
    {
      _id: "COR-BODY-007",
      title: "Mediterranean Olive Body Lotion Super Foods - 500ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Body Lotion",
      originalPrice: 712,
      discountedPrice: 712,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Nourishing Mediterranean Olive Body Lotion with Super Foods. Rich in antioxidants and fatty acids to restore skin's natural barrier. Light, soothing texture.",
      inStock: true,
      featured: false,
      tags: ["olive", "mediterranean", "restore", "smooth", "protective"],
      ratings: []
    },
    {
      _id: "COR-BODY-008",
      title: "Sweet Citrus Body Lotion Super Foods - 500ml",
      brand: "Cornells",
      category: "Body Care",
      subcategory: "Super Foods Body Lotion",
      originalPrice: 712,
      discountedPrice: 712,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Brightening Sweet Citrus Body Lotion with Super Foods vitamin C. Lightweight formula that moisturizes while providing antioxidant protection. Uplifting citrus scent.",
      inStock: true,
      featured: true,
      tags: ["citrus", "vitamin c", "brightening", "lightweight", "fresh"],
      ratings: []
    }
  ],

  skinCare: [
    {
      _id: "COR-SKIN-001",
      title: "Acai Blueberry Facial Scrub Super Foods - 330ml",
      brand: "Cornells",
      category: "Skin Care",
      subcategory: "Super Foods Face Scrub",
      originalPrice: 675,
      discountedPrice: 675,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "tube",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Gentle Exfoliating Acai and Blueberry Facial Scrub with Super Foods. Removes dead skin cells while antioxidant-rich formula protects against environmental damage. Reveals brighter, smoother skin.",
      inStock: true,
      featured: true,
      tags: ["acai", "blueberry", "exfoliate", "facial scrub", "brighten"],
      ratings: []
    },
    {
      _id: "COR-SKIN-002",
      title: "Tropical Papaya Facial Scrub Super Foods - 330ml",
      brand: "Cornells",
      category: "Skin Care",
      subcategory: "Super Foods Face Scrub",
      originalPrice: 675,
      discountedPrice: 675,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "tube",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Enzyme-rich Tropical Papaya Facial Scrub with Super Foods. Natural papain enzymes gently exfoliate while vitamins nourish skin. Perfect for sensitive skin types.",
      inStock: true,
      featured: false,
      tags: ["papaya", "enzymes", "gentle", "sensitive skin", "exfoliate"],
      ratings: []
    },
    {
      _id: "COR-SKIN-003",
      title: "Acai Blueberry Facial Mask Super Foods - 400g",
      brand: "Cornells",
      category: "Skin Care",
      subcategory: "Super Foods Face Mask",
      originalPrice: 788,
      discountedPrice: 788,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "jar",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Purifying Acai and Blueberry Facial Mask with Super Foods antioxidants. Deep cleanses pores while fighting free radicals. Leaves skin refreshed, clarified, and radiant.",
      inStock: true,
      featured: true,
      tags: ["acai", "blueberry", "face mask", "purify", "radiant"],
      ratings: []
    },
    {
      _id: "COR-SKIN-004",
      title: "Avocado Manuka Honey Facial Mask Super Foods - 400g",
      brand: "Cornells",
      category: "Skin Care",
      subcategory: "Super Foods Face Mask",
      originalPrice: 788,
      discountedPrice: 788,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "jar",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Hydrating Avocado and Manuka Honey Facial Mask with Super Foods. Intensely moisturizes and soothes dry, tired skin. Restores skin's natural glow and suppleness.",
      inStock: true,
      featured: false,
      tags: ["avocado", "honey", "hydrating", "moisturize", "glow"],
      ratings: []
    },
    {
      _id: "COR-SKIN-005",
      title: "Sweet Citrus Face Wash Super Foods - 150ml",
      brand: "Cornells",
      category: "Skin Care",
      subcategory: "Super Foods Face Wash",
      originalPrice: 579,
      discountedPrice: 579,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "tube",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Refreshing Sweet Citrus Face Wash with Super Foods vitamin C. Gently cleanses while brightening skin tone. Removes impurities without stripping natural oils.",
      inStock: true,
      featured: true,
      tags: ["citrus", "face wash", "vitamin c", "brighten", "cleanse"],
      ratings: []
    },
    {
      _id: "COR-SKIN-006",
      title: "Acai Blueberry Face Wash Super Foods - 150ml",
      brand: "Cornells",
      category: "Skin Care",
      subcategory: "Super Foods Face Wash",
      originalPrice: 579,
      discountedPrice: 579,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "tube",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Antioxidant-rich Acai and Blueberry Face Wash with Super Foods. Fights environmental stressors while thoroughly cleansing skin. Maintains skin's natural moisture balance.",
      inStock: true,
      featured: false,
      tags: ["acai", "blueberry", "antioxidant", "cleanse", "protect"],
      ratings: []
    }
  ],

  darkBeautiful: [
    {
      _id: "COR-DB-001",
      title: "Avocado Shea Butter Shampoo Dark & Beautiful - 480ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Dark & Beautiful",
      originalPrice: 855,
      discountedPrice: 855,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Specialized Avocado and Shea Butter Shampoo for textured hair. Gently cleanses while providing intense moisture and nourishment. Part of the Dark & Beautiful professional range.",
      inStock: true,
      featured: true,
      tags: ["avocado", "shea butter", "textured hair", "moisture", "professional"],
      ratings: []
    },
    {
      _id: "COR-DB-002",
      title: "Avocado Shea Butter Conditioner Dark & Beautiful - 480ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Dark & Beautiful",
      originalPrice: 915,
      discountedPrice: 915,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Deep Conditioning Treatment with Avocado and Shea Butter for textured hair. Detangles, softens, and adds manageability to coarse, curly hair types.",
      inStock: true,
      featured: true,
      tags: ["conditioner", "detangle", "textured hair", "soften", "manageable"],
      ratings: []
    },
    {
      _id: "COR-DB-003",
      title: "Coconut Nourishing Shampoo Dark & Beautiful - 500ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Dark & Beautiful",
      originalPrice: 769,
      discountedPrice: 769,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Nourishing Coconut Shampoo specifically formulated for natural hair. Provides essential moisture and nutrients to maintain healthy, vibrant curls and coils.",
      inStock: true,
      featured: false,
      tags: ["coconut", "nourishing", "natural hair", "curls", "moisture"],
      ratings: []
    },
    {
      _id: "COR-DB-004",
      title: "Argan Sleek Smooth Shampoo Dark & Beautiful - 500ml",
      brand: "Cornells",
      category: "Hair Care",
      subcategory: "Dark & Beautiful",
      originalPrice: 769,
      discountedPrice: 769,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Sleek and Smooth Argan Oil Shampoo for frizz control and shine. Tames unruly hair while adding brilliant luminosity. Perfect for relaxed or straightened styles.",
      inStock: true,
      featured: true,
      tags: ["argan oil", "sleek", "smooth", "frizz control", "shine"],
      ratings: []
    }
  ],

  babyCare: [
    {
      _id: "COR-BABY-001",
      title: "Baby Shampoo Super Foods - 500ml",
      brand: "Cornells",
      category: "Baby Care",
      subcategory: "Super Foods Baby",
      originalPrice: 983,
      discountedPrice: 983,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Gentle Baby Shampoo with Super Foods formula. Tear-free, hypoallergenic, and pediatrician tested. Gently cleanses baby's delicate hair and scalp without irritation.",
      inStock: true,
      featured: true,
      tags: ["baby", "shampoo", "tear-free", "gentle", "hypoallergenic"],
      ratings: []
    },
    {
      _id: "COR-BABY-002",
      title: "Baby Bubble Bath & Wash Super Foods - 500ml",
      brand: "Cornells",
      category: "Baby Care",
      subcategory: "Super Foods Baby",
      originalPrice: 983,
      discountedPrice: 983,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "2-in-1 Baby Bubble Bath and Body Wash with Super Foods. Creates rich, gentle bubbles while cleansing baby's sensitive skin. Moisturizing and soothing formula.",
      inStock: true,
      featured: true,
      tags: ["baby", "bubble bath", "body wash", "sensitive skin", "moisturizing"],
      ratings: []
    },
    {
      _id: "COR-BABY-003",
      title: "Baby Lotion Super Foods - 500ml",
      brand: "Cornells",
      category: "Baby Care",
      subcategory: "Super Foods Baby",
      originalPrice: 983,
      discountedPrice: 983,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "Ultra-gentle Baby Lotion with Super Foods nutrients. Provides 24-hour moisture protection for baby's delicate skin. Non-greasy, fast-absorbing formula.",
      inStock: true,
      featured: false,
      tags: ["baby", "lotion", "moisturize", "delicate skin", "protection"],
      ratings: []
    },
    {
      _id: "COR-BABY-004",
      title: "Baby Wash & Shampoo Cute & Pretty - 500ml",
      brand: "Cornells",
      category: "Baby Care",
      subcategory: "Cute & Pretty",
      originalPrice: 746,
      discountedPrice: 746,
      wholesalePrice: 0,
      wholesaleMinimumQuantity: 0,
      unit: "bottle",
      img: "YOUR_IMAGE_URL_HERE",
      desc: "2-in-1 Baby Wash and Shampoo from Cute & Pretty range. Gentle enough for newborn skin and hair. Dermatologist tested and pH balanced.",
      inStock: true,
      featured: true,
      tags: ["baby", "wash", "shampoo", "newborn", "gentle"],
      ratings: []
    },
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