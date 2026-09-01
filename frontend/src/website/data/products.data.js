export const sortOptions = [
  { value: "featured", label: "Featured Showcase" },
  { value: "rating", label: "Highest Rated Projects" },
  { value: "newest", label: "Latest Custom Designs" },
];

// Keyed by the current 10 main categories (same taxonomy used in
// CategoryShowcase / TrendingCategories). categorySlug on each product
// below points into this object.
export const categoryMeta = {
  kitchen: {
    title: "Solid Wood Kitchen Furniture",
    categoryName: "Kitchen",
    heroImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
    description:
      "Custom cupboards, dining sets, kitchen islands, and cabinetry crafted from solid wood for a warm, functional kitchen.",
  },
  "living-dining": {
    title: "Living & Dining Room Furniture",
    categoryName: "Living & Dining",
    heroImage:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80",
    description:
      "Sofas, TV consoles, coffee & side tables, and display units built to anchor your living and dining spaces.",
  },
  bedroom: {
    title: "Bedroom Furniture",
    categoryName: "Bedroom",
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    description:
      "Beds, wardrobes, nightstands, and dressing tables handcrafted in solid wood for a restful bedroom.",
  },
  "study-room": {
    title: "Study Room Furniture",
    categoryName: "Study Room",
    heroImage:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80",
    description:
      "Study tables and bookshelves designed for long, comfortable hours of focus.",
  },
  "storage-decor": {
    title: "Storage & Decor",
    categoryName: "Storage & Decor",
    heroImage:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1600&q=80",
    description:
      "Shelves, consoles, shoe racks, and sideboards that keep your home organized without compromising on style.",
  },
  "office-interiors": {
    title: "Office Interiors",
    categoryName: "Office Interiors",
    heroImage:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1600&q=80",
    description:
      "Executive desks, office chairs, cabin panelling, and reception furniture for modern workspaces.",
  },
  "restaurant-cafe": {
    title: "Restaurant & Cafe Furniture",
    categoryName: "Restaurant & Cafe",
    heroImage:
      "https://images.unsplash.com/photo-1690221123138-8d891be52401?auto=format&fit=crop&w=1600&q=80",
    description:
      "Dining furniture, bar counters, and booth seating built for the pace of hospitality.",
  },
  "retail-showroom": {
    title: "Retail & Showroom Fit-outs",
    categoryName: "Retail & Showroom",
    heroImage:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1600&q=80",
    description:
      "Display units, counters, and shelving designed to showcase products and draw customers in.",
  },
  "wall-ceiling-solutions": {
    title: "Wall & Ceiling Solutions",
    categoryName: "Wall & Ceiling Solutions",
    heroImage:
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1600&q=80",
    description:
      "Wood panelling, false ceilings, partitions, and room dividers that add texture and architectural character.",
  },
  "doors-windows": {
    title: "Doors & Windows",
    categoryName: "Doors & Windows",
    heroImage:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80",
    description:
      "Wooden doors, window frames, and mouldings crafted for a lasting, polished finish.",
  },
};

// Note: Swing/Jhula, Temple/Mandir, Garden Furniture, and Pergola products
// from the previous catalog were dropped — they didn't map cleanly onto any
// of the 10 current main categories.
export const products = [
  {
    id: "wooden-bed",
    name: "Carved Four-Poster Sheesham Bed",
    category: "Bedroom",
    categorySlug: "bedroom",
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
    category: "Bedroom",
    categorySlug: "bedroom",
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
    category: "Bedroom",
    categorySlug: "bedroom",
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
    category: "Bedroom",
    categorySlug: "bedroom",
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

  // ==================== KITCHEN — DINING SETS ====================
  {
    id: "dining-set",
    name: "Solid Wood Dining Set (6-Seater)",
    category: "Kitchen",
    categorySlug: "kitchen",
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
    category: "Kitchen",
    categorySlug: "kitchen",
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
    category: "Kitchen",
    categorySlug: "kitchen",
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

  // ==================== LIVING & DINING — SOFAS ====================
  {
    id: "sofa",
    name: "Handcrafted Wooden 3-Seater Sofa",
    category: "Living & Dining",
    categorySlug: "living-dining",
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
    category: "Living & Dining",
    categorySlug: "living-dining",
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
    category: "Living & Dining",
    categorySlug: "living-dining",
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

  // ==================== KITCHEN — STOOLS ====================
  {
    id: "stool",
    name: "Carved Round Wooden Stool",
    category: "Kitchen",
    categorySlug: "kitchen",
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
    category: "Kitchen",
    categorySlug: "kitchen",
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
    category: "Kitchen",
    categorySlug: "kitchen",
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

  // ==================== OTHER POPULAR ITEMS ====================
  {
    id: "study-table",
    name: "Solid Wood Study Table",
    category: "Study Room",
    categorySlug: "study-room",
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
    category: "Living & Dining",
    categorySlug: "living-dining",
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
    category: "Living & Dining",
    categorySlug: "living-dining",
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

  // ==================== WARDROBE ====================
  {
    id: "wardrobe",
    name: "Solid Wood 3-Door Wardrobe",
    category: "Bedroom",
    categorySlug: "bedroom",
    href: "/products/wardrobe",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 47999,
    originalPrice: 54999,
    rating: 4.7,
    reviews: 44,
    description:
      "A spacious hand-built wardrobe with carved panel doors, dedicated hanging space, and lockable drawers.",
  },

  // ==================== BOOKSHELF ====================
  {
    id: "bookshelf",
    name: "Solid Wood Ladder Bookshelf",
    category: "Study Room",
    categorySlug: "study-room",
    href: "/products/bookshelf",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 16999,
    originalPrice: 19999,
    rating: 4.6,
    reviews: 33,
    description:
      "A tall, open-back solid wood bookshelf with adjustable shelving for books, décor, and display pieces.",
  },

  // ==================== ROCKING CHAIR ====================
  {
    id: "rocking-chair",
    name: "Classic Solid Wood Rocking Chair",
    category: "Living & Dining",
    categorySlug: "living-dining",
    href: "/products/rocking-chair",
    image:
      "https://images.unsplash.com/photo-1591880908180-ad33791457e8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591880908180-ad33791457e8?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 13999,
    originalPrice: 16999,
    rating: 4.8,
    reviews: 47,
    description:
      "A gently curved wooden rocking chair with a smooth hand-rubbed finish, perfect for a reading nook or porch.",
  },

  // ==================== CONSOLE TABLE ====================
  {
    id: "console-table",
    name: "Slim Wooden Console Table",
    category: "Storage & Decor",
    categorySlug: "storage-decor",
    href: "/products/console-table",
    image:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 15999,
    originalPrice: 18999,
    rating: 4.5,
    reviews: 26,
    description:
      "An elegant solid wood console table, carved to fit hallways, entryways, and accent walls with ease.",
  },

  // ==================== BENCH ====================
  {
    id: "bench",
    name: "Solid Wood Entryway Bench",
    category: "Living & Dining",
    categorySlug: "living-dining",
    href: "/products/bench",
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 10999,
    originalPrice: 12999,
    rating: 4.5,
    reviews: 29,
    description:
      "A handcrafted wooden bench, sturdy enough for daily use in entryways, dining rooms, or gardens.",
  },

  // ==================== CHEST OF DRAWERS ====================
  {
    id: "chest-of-drawers",
    name: "Solid Wood 5-Drawer Chest",
    category: "Bedroom",
    categorySlug: "bedroom",
    href: "/products/chest-of-drawers",
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 24999,
    originalPrice: 28999,
    rating: 4.6,
    reviews: 31,
    description:
      "A smooth-gliding, hand-joined chest of drawers offering generous storage with a timeless carved finish.",
  },

  // ==================== DRESSING TABLE ====================
  {
    id: "dressing-table",
    name: "Wooden Dressing Table with Mirror",
    category: "Bedroom",
    categorySlug: "bedroom",
    href: "/products/dressing-table",
    image:
      "https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 21999,
    originalPrice: 25999,
    rating: 4.7,
    reviews: 36,
    description:
      "An elegant solid wood dressing table with an attached mirror and multiple drawers for everyday essentials.",
  },

  // ==================== SHOE RACK ====================
  {
    id: "shoe-rack",
    name: "Solid Wood Shoe Cabinet",
    category: "Storage & Decor",
    categorySlug: "storage-decor",
    href: "/products/shoe-rack",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 8999,
    originalPrice: 10999,
    rating: 4.4,
    reviews: 22,
    description:
      "A compact wooden shoe cabinet with multiple tiers, keeping your entryway tidy without compromising on style.",
  },

  // ==================== SIDE TABLE ====================
  {
    id: "side-table",
    name: "Solid Wood Accent Side Table",
    category: "Living & Dining",
    categorySlug: "living-dining",
    href: "/products/side-table",
    image:
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 6499,
    originalPrice: 7999,
    rating: 4.5,
    reviews: 24,
    description:
      "A compact solid wood side table, the perfect companion piece for sofas, beds, and reading corners.",
  },

  // ==================== ROOM DIVIDER ====================
  {
    id: "room-divider",
    name: "Carved Wooden Screen Divider",
    category: "Wall & Ceiling Solutions",
    categorySlug: "wall-ceiling-solutions",
    href: "/products/room-divider",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 19999,
    originalPrice: 23999,
    rating: 4.6,
    reviews: 19,
    description:
      "An intricately carved wooden partition screen that adds privacy and old-world charm to any living space.",
  },

  // ==================== WALL SHELF ====================
  {
    id: "wall-shelf",
    name: "Floating Solid Wood Wall Shelf",
    category: "Storage & Decor",
    categorySlug: "storage-decor",
    href: "/products/wall-shelf",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 3999,
    originalPrice: 4999,
    rating: 4.4,
    reviews: 18,
    description:
      "A set of floating solid wood wall shelves, ideal for displaying décor, books, and plants.",
  },

  // ==================== BAR STOOL ====================
  {
    id: "bar-stool",
    name: "Tall Solid Wood Bar Stool",
    category: "Kitchen",
    categorySlug: "kitchen",
    href: "/products/bar-stool",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 5999,
    originalPrice: 7499,
    rating: 4.5,
    reviews: 27,
    description:
      "A sturdy wooden bar stool with an ergonomic footrest, built for kitchen islands and home bars.",
  },

  // ==================== BUNK BED ====================
  {
    id: "bunk-bed",
    name: "Solid Wood Kids' Bunk Bed",
    category: "Bedroom",
    categorySlug: "bedroom",
    href: "/products/bunk-bed",
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 33999,
    originalPrice: 38999,
    rating: 4.7,
    reviews: 31,
    description:
      "A space-saving, sturdy wooden bunk bed with rounded edges and safety rails, built for kids' rooms.",
  },

  // ==================== OTTOMAN ====================
  {
    id: "ottoman",
    name: "Cushioned Wooden-Frame Ottoman",
    category: "Living & Dining",
    categorySlug: "living-dining",
    href: "/products/ottoman",
    image:
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 7999,
    originalPrice: 9499,
    rating: 4.5,
    reviews: 21,
    description:
      "A cushioned ottoman built on a solid wood frame, doubling as extra seating, a footrest, or storage.",
  },

  // ==================== KITCHEN CABINET ====================
  {
    id: "kitchen-cabinet",
    name: "Custom Solid Wood Kitchen Cabinet",
    category: "Kitchen",
    categorySlug: "kitchen",
    href: "/products/kitchen-cabinet",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 58999,
    originalPrice: 67999,
    rating: 4.7,
    reviews: 25,
    description:
      "Custom-built solid wood kitchen cabinetry combining durable craftsmanship with organized storage.",
  },

  // ==================== WINE RACK ====================
  {
    id: "wine-rack",
    name: "Handcrafted Wooden Wine Rack",
    category: "Kitchen",
    categorySlug: "kitchen",
    href: "/products/wine-rack",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 8499,
    originalPrice: 9999,
    rating: 4.6,
    reviews: 17,
    description:
      "A handcrafted wooden wine storage rack that blends function with a refined, rustic display.",
  },

  // ==================== WALL PANELING ====================
  {
    id: "wall-paneling",
    name: "Decorative Solid Wood Wall Panels",
    category: "Wall & Ceiling Solutions",
    categorySlug: "wall-ceiling-solutions",
    href: "/products/wall-paneling",
    image:
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 17999,
    originalPrice: 20999,
    rating: 4.5,
    reviews: 16,
    description:
      "Custom wooden wall paneling that adds texture, warmth, and architectural character to any room.",
  },

  // ==================== NIGHTSTAND ====================
  {
    id: "nightstand",
    name: "Solid Wood Bedside Nightstand",
    category: "Bedroom",
    categorySlug: "bedroom",
    href: "/products/nightstand",
    image:
      "https://images.unsplash.com/photo-1593194632872-3d19dab6e278?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593194632872-3d19dab6e278?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 6999,
    originalPrice: 8499,
    rating: 4.5,
    reviews: 28,
    description:
      "A compact bedside nightstand in solid wood, offering handy drawer storage within easy reach of your bed.",
  },

  // ==================== SIDEBOARD ====================
  {
    id: "sideboard",
    name: "Handcrafted Wooden Sideboard",
    category: "Storage & Decor",
    categorySlug: "storage-decor",
    href: "/products/sideboard",
    image:
      "https://images.unsplash.com/photo-1767963758785-b9def36c13e3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1767963758785-b9def36c13e3?auto=format&fit=crop&w=1200&q=80",
    ],
    price: 26999,
    originalPrice: 31999,
    rating: 4.7,
    reviews: 20,
    description:
      "A handcrafted wooden sideboard offering generous storage and a polished display surface for the living or dining room.",
  },
];