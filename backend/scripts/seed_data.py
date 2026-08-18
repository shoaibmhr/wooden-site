import sys
from decimal import Decimal
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.category import Category
from app.models.product import Product, ProductImage

CATEGORIES_DATA = [
    {
        "name": "Wooden Bed",
        "slug": "bed",
        "description": "Premium solid Sheesham and Teak wood beds designed for royalty, durability, and timeless comfort.",
        "image_url": "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80",
    },
    {
        "name": "Dining Set",
        "slug": "dining-set",
        "description": "Hand-carved dining tables and ergonomic chairs crafted to bring warmth and elegance to your family feasts.",
        "image_url": "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1600&q=80",
    },
    {
        "name": "Swing",
        "slug": "swing",
        "description": "Authentic Indian heritage wooden swings with brass chains, perfect for living rooms, balconies, and patios.",
        "image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
    },
    {
        "name": "Sofa",
        "slug": "sofa",
        "description": "Solid wood frame sofas with plush premium upholstery, built to last generations without losing charm.",
        "image_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "name": "Stool",
        "slug": "stool",
        "description": "Versatile, handcrafted wooden stools and ottomans adding artisanal flair and seating to any corner.",
        "image_url": "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=1600&q=80",
    },
    {
        "name": "Temple",
        "slug": "temple",
        "description": "Sacred handcrafted wooden home temples with intricate carving, brass bells, and storage drawers.",
        "image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
    },
    {
        "name": "Study Table",
        "slug": "study-table",
        "description": "Sturdy, ergonomic solid wood study tables for comfortable work.",
        "image_url": "https://images.unsplash.com/photo-1551909402-f3411b5c4248?auto=format&fit=crop&w=800&q=80",
    },
    {
        "name": "TV Unit",
        "slug": "tv-unit",
        "description": "Sleek wooden TV entertainment consoles with ample media storage.",
        "image_url": "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=800&q=80",
    },
    {
        "name": "Coffee Table",
        "slug": "coffee-table",
        "description": "Solid wood coffee and center tables with rich finishes.",
        "image_url": "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=800&q=80",
    },
]

PRODUCTS_DATA = [
    # BEDS
    {
        "slug": "wooden-bed",
        "name": "Carved Four-Poster Sheesham Bed",
        "category_slug": "bed",
        "primary_image_url": "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("32999.00"),
        "original_price": Decimal("39999.00"),
        "rating": Decimal("4.80"),
        "review_count": 128,
        "description": "A handcrafted four-poster bed made from solid Sheesham wood, featuring traditional carved detailing on the headboard and posts. Available in custom king/queen sizes.",
    },
    {
        "slug": "royal-teak-bed",
        "name": "Royal Carved Teakwood King Bed",
        "category_slug": "bed",
        "primary_image_url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("41999.00"),
        "original_price": Decimal("49999.00"),
        "rating": Decimal("4.90"),
        "review_count": 84,
        "description": "Regal design king-size bed carved with floral motifs in high-grade seasoned teakwood with hydraulic storage option.",
    },
    {
        "slug": "minimalist-wooden-platform-bed",
        "name": "Minimalist Solid Wood Platform Bed",
        "category_slug": "bed",
        "primary_image_url": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("27499.00"),
        "original_price": Decimal("31999.00"),
        "rating": Decimal("4.70"),
        "review_count": 62,
        "description": "Contemporary Japanese-inspired low platform bed crafted from solid natural grain wood with floating aesthetic.",
    },
    {
        "slug": "vintage-fluted-bed",
        "name": "Vintage Fluted Headboard Bed",
        "category_slug": "bed",
        "primary_image_url": "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("36999.00"),
        "original_price": Decimal("42999.00"),
        "rating": Decimal("4.60"),
        "review_count": 49,
        "description": "Hand-fluted wooden panel headboard with subtle curved corners and durable solid wood slatted base.",
    },
    # DINING SETS
    {
        "slug": "dining-set",
        "name": "Solid Wood Dining Set (6-Seater)",
        "category_slug": "dining-set",
        "primary_image_url": "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("45999.00"),
        "original_price": Decimal("54999.00"),
        "rating": Decimal("4.80"),
        "review_count": 96,
        "description": "A warm, rustic 6-seater dining set carved from solid wood, built to comfortably seat your whole family with cushioned chairs.",
    },
    {
        "slug": "royal-8-seater-dining",
        "name": "Imperial 8-Seater Carved Dining Suite",
        "category_slug": "dining-set",
        "primary_image_url": "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("68999.00"),
        "original_price": Decimal("79999.00"),
        "rating": Decimal("4.90"),
        "review_count": 57,
        "description": "Grand dining suite featuring an 8-foot thick solid wood tabletop with hand-carved cabriole legs and matching high-back chairs.",
    },
    {
        "slug": "round-compact-dining",
        "name": "Round 4-Seater Wooden Dinette",
        "category_slug": "dining-set",
        "primary_image_url": "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("29999.00"),
        "original_price": Decimal("34999.00"),
        "rating": Decimal("4.60"),
        "review_count": 43,
        "description": "Space-saving circular dining table with 4 curved supportive wooden chairs for apartments and breakfast nooks.",
    },
    # SWINGS
    {
        "slug": "swing",
        "name": "Handcrafted Royal Wooden Jhula",
        "category_slug": "swing",
        "primary_image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("38999.00"),
        "original_price": Decimal("44999.00"),
        "rating": Decimal("4.90"),
        "review_count": 64,
        "description": "Traditional carved wooden jhula with pure brass link chains, peacock carved backrest, and comfortable base cushion.",
    },
    {
        "slug": "balcony-wooden-swing",
        "name": "Compact Balcony Teak Swing",
        "category_slug": "swing",
        "primary_image_url": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("24999.00"),
        "original_price": Decimal("28999.00"),
        "rating": Decimal("4.70"),
        "review_count": 38,
        "description": "Weather-treated solid teak swing designed specifically for covered balconies, porches, and cozy reading corners.",
    },
    {
        "slug": "floor-standing-jhula",
        "name": "Heritage Floor-Standing Arch Jhula",
        "category_slug": "swing",
        "primary_image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("54999.00"),
        "original_price": Decimal("62999.00"),
        "rating": Decimal("4.80"),
        "review_count": 29,
        "description": "Freestanding heavy carved arch pillars with suspended 3-seater swing bed — no ceiling drilling required!",
    },
    # SOFAS
    {
        "slug": "sofa",
        "name": "Handcrafted Wooden 3-Seater Sofa",
        "category_slug": "sofa",
        "primary_image_url": "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("52999.00"),
        "original_price": Decimal("59999.00"),
        "rating": Decimal("4.70"),
        "review_count": 74,
        "description": "A timeless wooden-frame sofa set with high-density plush cushioning and carved armrests, built to last generations.",
    },
    {
        "slug": "l-shaped-wooden-sofa",
        "name": "Solid Teak L-Shaped Sectional Sofa",
        "category_slug": "sofa",
        "primary_image_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("64999.00"),
        "original_price": Decimal("74999.00"),
        "rating": Decimal("4.90"),
        "review_count": 51,
        "description": "Spacious corner sectional with wooden side magazine racks, solid slat base, and stain-resistant fabric cushions.",
    },
    {
        "slug": "classic-wooden-couch",
        "name": "Vintage Carved Diwan / Wooden Couch",
        "category_slug": "sofa",
        "primary_image_url": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("34999.00"),
        "original_price": Decimal("39999.00"),
        "rating": Decimal("4.50"),
        "review_count": 39,
        "description": "Royal living room daybed / diwan with single curved armrest and handcrafted floral cresting.",
    },
    # STOOLS
    {
        "slug": "stool",
        "name": "Carved Round Wooden Stool",
        "category_slug": "stool",
        "primary_image_url": "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("4499.00"),
        "original_price": Decimal("5999.00"),
        "rating": Decimal("4.50"),
        "review_count": 52,
        "description": "A compact, hand-carved wooden stool — perfect as extra seating, a plant stand, or a side coffee table.",
    },
    {
        "slug": "elephant-carved-stool",
        "name": "Artisanal Elephant Carved Stool",
        "category_slug": "stool",
        "primary_image_url": "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("6999.00"),
        "original_price": Decimal("8499.00"),
        "rating": Decimal("4.80"),
        "review_count": 41,
        "description": "Exquisitely hand-carved elephant base stool made from a single log of wood with antique brass-finish polish.",
    },
    {
        "slug": "rustic-bar-stool",
        "name": "High Counter Solid Wood Bar Stool",
        "category_slug": "stool",
        "primary_image_url": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("5499.00"),
        "original_price": Decimal("6799.00"),
        "rating": Decimal("4.60"),
        "review_count": 34,
        "description": "Sleek wooden tall bar stool with ergonomic footrest ring and contoured saddle seat for kitchen islands.",
    },
    # TEMPLES
    {
        "slug": "temple",
        "name": "Royal Teakwood Pooja Mandir",
        "category_slug": "temple",
        "primary_image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("34999.00"),
        "original_price": Decimal("42999.00"),
        "rating": Decimal("4.90"),
        "review_count": 87,
        "description": "Intricately carved home temple with dome (Shikhar), brass bells, pull-out bhog tray, and 2 spacious pooja samagri drawers.",
    },
    {
        "slug": "wall-hanging-mandir",
        "name": "Compact Wall-Mounted Wooden Temple",
        "category_slug": "temple",
        "primary_image_url": "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("14999.00"),
        "original_price": Decimal("18999.00"),
        "rating": Decimal("4.70"),
        "review_count": 53,
        "description": "Space-optimized wall-hanging temple with CNC jaali pattern doors, LED warm backlight slot, and brass hardware.",
    },
    {
        "slug": "grand-sheesham-mandir",
        "name": "Grand Floor Sheesham Mandir with Pillars",
        "category_slug": "temple",
        "primary_image_url": "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("49999.00"),
        "original_price": Decimal("58999.00"),
        "rating": Decimal("5.00"),
        "review_count": 46,
        "description": "Large traditional home shrine with carved elephant pillars, ornate Kalash top, and bottom cabinet storage.",
    },
    # OTHERS
    {
        "slug": "study-table",
        "name": "Solid Wood Study Table",
        "category_slug": "study-table",
        "primary_image_url": "https://images.unsplash.com/photo-1551909402-f3411b5c4248?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1551909402-f3411b5c4248?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("18999.00"),
        "original_price": None,
        "rating": Decimal("4.50"),
        "review_count": 61,
        "description": "A sturdy, ergonomic study table built from solid wood, designed for long hours of comfortable work.",
    },
    {
        "slug": "tv-unit",
        "name": "Wooden TV Console Unit",
        "category_slug": "tv-unit",
        "primary_image_url": "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1700221505678-6787ba6dd996?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("22999.00"),
        "original_price": Decimal("27999.00"),
        "rating": Decimal("4.60"),
        "review_count": 43,
        "description": "A sleek wooden TV console with ample storage for your media essentials.",
    },
    {
        "slug": "coffee-table",
        "name": "Solid Wood Coffee Table",
        "category_slug": "coffee-table",
        "primary_image_url": "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1200&q=80",
        ],
        "price": Decimal("12999.00"),
        "original_price": Decimal("15999.00"),
        "rating": Decimal("4.50"),
        "review_count": 38,
        "description": "A solid wood coffee table with clean lines, built to anchor your living room.",
    },
]


def seed():
    db = SessionLocal()
    try:
        print("🌱 Starting database seeding...")

        # 1. Insert Categories
        category_map = {}
        for cat_data in CATEGORIES_DATA:
            existing = db.scalar(
                select(Category).where(Category.slug == cat_data["slug"])
            )
            if not existing:
                category = Category(**cat_data)
                db.add(category)
                db.flush()
                category_map[cat_data["slug"]] = category.id
                print(f"  [+] Category created: {cat_data['name']}")
            else:
                category_map[cat_data["slug"]] = existing.id
                print(f"  [.] Category already exists: {cat_data['name']}")

        db.commit()

        # 2. Insert Products
        for prod_data in PRODUCTS_DATA:
            existing = db.scalar(
                select(Product).where(Product.slug == prod_data["slug"])
            )
            cat_slug = prod_data["category_slug"]
            cat_id = category_map.get(cat_slug)

            if not cat_id:
                print(f"  [!] Skipping {prod_data['name']} (Category {cat_slug} not found)")
                continue

            if not existing:
                product = Product(
                    name=prod_data["name"],
                    slug=prod_data["slug"],
                    category_id=cat_id,
                    primary_image_url=prod_data["primary_image_url"],
                    price=prod_data["price"],
                    original_price=prod_data["original_price"],
                    rating=prod_data["rating"],
                    review_count=prod_data["review_count"],
                    description=prod_data["description"],
                    is_active=True,
                )
                db.add(product)
                db.flush()

                # Add extra images
                for pos, img_url in enumerate(prod_data.get("images", [])):
                    prod_img = ProductImage(
                        product_id=product.id,
                        image_url=img_url,
                        position=pos,
                    )
                    db.add(prod_img)

                print(f"  [+] Product added: {prod_data['name']}")
            else:
                print(f"  [.] Product already exists: {prod_data['name']}")

        db.commit()
        print("\n✅ Seeding completed successfully!")

    except Exception as e:
        db.rollback()
        print(f"\n❌ Error during seeding: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    seed()
