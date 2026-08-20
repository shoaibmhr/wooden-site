export const sortOptions = [
  { value: "featured", label: "Featured Showcase" },
  { value: "rating", label: "Highest Rated Projects" },
  { value: "newest", label: "Latest Custom Designs" },
];

export const categoryMeta = {
  bed: {
    title: "Handcrafted Wooden Beds",
    categoryName: "Wooden Bed",
    heroImage:
      "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80",
    description:
      "Premium solid Sheesham and Teak wood beds designed for royalty, durability, and timeless comfort.",
  },
  "dining-set": {
    title: "Solid Wood Dining Sets",
    categoryName: "Dining Set",
    heroImage:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1600&q=80",
    description:
      "Hand-carved dining tables and ergonomic chairs crafted to bring warmth and elegance to your family feasts.",
  },
  swing: {
    title: "Traditional Wooden Jhula / Swings",
    categoryName: "Swing",
    heroImage:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
    description:
      "Authentic Indian heritage wooden swings with brass chains, perfect for living rooms, balconies, and patios.",
  },
  sofa: {
    title: "Handmade Wooden Sofas",
    categoryName: "Sofa",
    heroImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    description:
      "Solid wood frame sofas with plush premium upholstery, built to last generations without losing charm.",
  },
  stool: {
    title: "Carved Accent Wooden Stools",
    categoryName: "Stool",
    heroImage:
      "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=1600&q=80",
    description:
      "Versatile, handcrafted wooden stools and ottomans adding artisanal flair and seating to any corner.",
  },
  temple: {
    title: "Hand-Carved Wooden Temples (Pooja Mandir)",
    categoryName: "Temple",
    heroImage:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
    description:
      "Sacred handcrafted wooden home temples with intricate carving, brass bells, and storage drawers.",
  },
};

export const products = [
  // ==================== BEDS ====================
  {
    id: "wooden-bed",
    name: "Carved Four-Poster Sheesham Bed",
    category: "Wooden Bed",
    categorySlug: "bed",
    href: "/products/wooden-bed",
    image:
      "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 32999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 128,
    description:
      "A handcrafted four-poster bed made from solid Sheesham wood, featuring traditional carved detailing on the headboard and posts. Available in custom king/queen sizes.",
  },
  {
    id: "royal-teak-bed",
    name: "Royal Carved Teakwood King Bed",
    category: "Wooden Bed",
    categorySlug: "bed",
    href: "/products/royal-teak-bed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 41999,
    originalPrice: 49999,
    rating: 4.9,
    reviews: 84,
    description:
      "Regal design king-size bed carved with floral motifs in high-grade seasoned teakwood with hydraulic storage option.",
  },
  {
    id: "minimalist-wooden-platform-bed",
    name: "Minimalist Solid Wood Platform Bed",
    category: "Wooden Bed",
    categorySlug: "bed",
    href: "/products/minimalist-wooden-platform-bed",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 27499,
    originalPrice: 31999,
    rating: 4.7,
    reviews: 62,
    description:
      "Contemporary Japanese-inspired low platform bed crafted from solid natural grain wood with floating aesthetic.",
  },
  {
    id: "vintage-fluted-bed",
    name: "Vintage Fluted Headboard Bed",
    category: "Wooden Bed",
    categorySlug: "bed",
    href: "/products/vintage-fluted-bed",
    image:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 36999,
    originalPrice: 42999,
    rating: 4.6,
    reviews: 49,
    description:
      "Hand-fluted wooden panel headboard with subtle curved corners and durable solid wood slatted base.",
  },

  // ==================== DINING SETS ====================
  {
    id: "dining-set",
    name: "Solid Wood Dining Set (6-Seater)",
    category: "Dining Set",
    categorySlug: "dining-set",
    href: "/products/dining-set",
    image:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 45999,
    originalPrice: 54999,
    rating: 4.8,
    reviews: 96,
    description:
      "A warm, rustic 6-seater dining set carved from solid wood, built to comfortably seat your whole family with cushioned chairs.",
  },
  {
    id: "royal-8-seater-dining",
    name: "Imperial 8-Seater Carved Dining Suite",
    category: "Dining Set",
    categorySlug: "dining-set",
    href: "/products/royal-8-seater-dining",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 68999,
    originalPrice: 79999,
    rating: 4.9,
    reviews: 57,
    description:
      "Grand dining suite featuring an 8-foot thick solid wood tabletop with hand-carved cabriole legs and matching high-back chairs.",
  },
  {
    id: "round-compact-dining",
    name: "Round 4-Seater Wooden Dinette",
    category: "Dining Set",
    categorySlug: "dining-set",
    href: "/products/round-compact-dining",
    image:
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 29999,
    originalPrice: 34999,
    rating: 4.6,
    reviews: 43,
    description:
      "Space-saving circular dining table with 4 curved supportive wooden chairs for apartments and breakfast nooks.",
  },

  // ==================== SWINGS (JHULA) ====================
  {
    id: "swing",
    name: "Handcrafted Royal Wooden Jhula",
    category: "Swing",
    categorySlug: "swing",
    href: "/products/swing",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 38999,
    originalPrice: 44999,
    rating: 4.9,
    reviews: 64,
    description:
      "Traditional carved wooden jhula with pure brass link chains, peacock carved backrest, and comfortable base cushion.",
  },
  {
    id: "balcony-wooden-swing",
    name: "Compact Balcony Teak Swing",
    category: "Swing",
    categorySlug: "swing",
    href: "/products/balcony-wooden-swing",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 24999,
    originalPrice: 28999,
    rating: 4.7,
    reviews: 38,
    description:
      "Weather-treated solid teak swing designed specifically for covered balconies, porches, and cozy reading corners.",
  },
  {
    id: "floor-standing-jhula",
    name: "Heritage Floor-Standing Arch Jhula",
    category: "Swing",
    categorySlug: "swing",
    href: "/products/floor-standing-jhula",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 54999,
    originalPrice: 62999,
    rating: 4.8,
    reviews: 29,
    description:
      "Freestanding heavy carved arch pillars with suspended 3-seater swing bed — no ceiling drilling required!",
  },

  // ==================== SOFAS ====================
  {
    id: "sofa",
    name: "Handcrafted Wooden 3-Seater Sofa",
    category: "Sofa",
    categorySlug: "sofa",
    href: "/products/sofa",
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 52999,
    originalPrice: 59999,
    rating: 4.7,
    reviews: 74,
    description:
      "A timeless wooden-frame sofa set with high-density plush cushioning and carved armrests, built to last generations.",
  },
  {
    id: "l-shaped-wooden-sofa",
    name: "Solid Teak L-Shaped Sectional Sofa",
    category: "Sofa",
    categorySlug: "sofa",
    href: "/products/l-shaped-wooden-sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 64999,
    originalPrice: 74999,
    rating: 4.9,
    reviews: 51,
    description:
      "Spacious corner sectional with wooden side magazine racks, solid slat base, and stain-resistant fabric cushions.",
  },
  {
    id: "classic-wooden-couch",
    name: "Vintage Carved Diwan / Wooden Couch",
    category: "Sofa",
    categorySlug: "sofa",
    href: "/products/classic-wooden-couch",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 34999,
    originalPrice: 39999,
    rating: 4.5,
    reviews: 39,
    description:
      "Royal living room daybed / diwan with single curved armrest and handcrafted floral cresting.",
  },

  // ==================== STOOLS ====================
  {
    id: "stool",
    name: "Carved Round Wooden Stool",
    category: "Stool",
    categorySlug: "stool",
    href: "/products/stool",
    image:
      "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 4499,
    originalPrice: 5999,
    rating: 4.5,
    reviews: 52,
    description:
      "A compact, hand-carved wooden stool — perfect as extra seating, a plant stand, or a side coffee table.",
  },
  {
    id: "elephant-carved-stool",
    name: "Artisanal Elephant Carved Stool",
    category: "Stool",
    categorySlug: "stool",
    href: "/products/elephant-carved-stool",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 6999,
    originalPrice: 8499,
    rating: 4.8,
    reviews: 41,
    description:
      "Exquisitely hand-carved elephant base stool made from a single log of wood with antique brass-finish polish.",
  },
  {
    id: "rustic-bar-stool",
    name: "High Counter Solid Wood Bar Stool",
    category: "Stool",
    categorySlug: "stool",
    href: "/products/rustic-bar-stool",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 5499,
    originalPrice: 6799,
    rating: 4.6,
    reviews: 34,
    description:
      "Sleek wooden tall bar stool with ergonomic footrest ring and contoured saddle seat for kitchen islands.",
  },

  // ==================== TEMPLES (MANDIR) ====================
  {
    id: "temple",
    name: "Royal Teakwood Pooja Mandir",
    category: "Temple",
    categorySlug: "temple",
    href: "/products/temple",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 34999,
    originalPrice: 42999,
    rating: 4.9,
    reviews: 87,
    description:
      "Intricately carved home temple with dome (Shikhar), brass bells, pull-out bhog tray, and 2 spacious pooja samagri drawers.",
  },
  {
    id: "wall-hanging-mandir",
    name: "Compact Wall-Mounted Wooden Temple",
    category: "Temple",
    categorySlug: "temple",
    href: "/products/wall-hanging-mandir",
    image:
      "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 14999,
    originalPrice: 18999,
    rating: 4.7,
    reviews: 53,
    description:
      "Space-optimized wall-hanging temple with CNC jaali pattern doors, LED warm backlight slot, and brass hardware.",
  },
  {
    id: "grand-sheesham-mandir",
    name: "Grand Floor Sheesham Mandir with Pillars",
    category: "Temple",
    categorySlug: "temple",
    href: "/products/grand-sheesham-mandir",
    image:
      "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 49999,
    originalPrice: 58999,
    rating: 5.0,
    reviews: 46,
    description:
      "Large traditional home shrine with carved elephant pillars, ornate Kalash top, and bottom cabinet storage.",
  },

  // ==================== OTHER POPULAR ITEMS ====================
  {
    id: "study-table",
    name: "Solid Wood Study Table",
    category: "Study Table",
    categorySlug: "study-table",
    href: "/products/study-table",
    image:
      "https://images.unsplash.com/photo-1551909402-f3411b5c4248?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551909402-f3411b5c4248?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 18999,
    originalPrice: null,
    rating: 4.5,
    reviews: 61,
    description:
      "A sturdy, ergonomic study table built from solid wood, designed for long hours of comfortable work.",
  },
  {
    id: "tv-unit",
    name: "Wooden TV Console Unit",
    category: "TV Unit",
    categorySlug: "tv-unit",
    href: "/products/tv-unit",
    image:
      "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 22999,
    originalPrice: 27999,
    rating: 4.6,
    reviews: 43,
    description:
      "A sleek wooden TV console with ample storage for your media essentials.",
  },
  {
    id: "coffee-table",
    name: "Solid Wood Coffee Table",
    category: "Coffee Table",
    categorySlug: "coffee-table",
    href: "/products/coffee-table",
    image:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 12999,
    originalPrice: 15999,
    rating: 4.5,
    reviews: 38,
    description:
      "A solid wood coffee table with clean lines, built to anchor your living room.",
  },
];
