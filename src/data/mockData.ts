import { Product, Review, Coupon, Order, ShippingMethod, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'apex-machined-titanium-bolt-pen',
    name: 'Apex Ti Bolt-Action Pen',
    tagline: 'Machined from solid Grade 5 Titanium with ceramic ball mechanism.',
    description: 'The Apex Bolt-Action Pen represents the pinnacle of everyday carry writing instruments. CNC machined from aerospace-grade Ti-6Al-4V titanium billet, it features our proprietary fluid tactile bolt-action deploy with an internal titanium spring. Balanced perfectly at the grip point with deep knurling for effortless marathon writing sessions. Compatible with Schmidt EasyFlow 9000 and Parker-style refills.',
    price: 98,
    compareAtPrice: 125,
    category: 'Everyday Carry',
    tags: ['Titanium', 'CNC Machined', 'EDC', 'Lifetime Guarantee'],
    inStock: true,
    stockCount: 14,
    sku: 'VAL-TI-PEN-01',
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585336261026-7756f7db6f24?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: 'Aerospace Grade 5 Titanium (Ti-6Al-4V)',
      dimensions: '136mm length x 10.5mm diameter',
      weight: '41 grams (unloaded: 34g)',
      warranty: 'Unconditional Lifetime Guarantee',
      origin: 'Precision CNC Machined in Portland, OR'
    },
    features: [
      'Fluid tactile bolt-action slider with positive lock detent',
      'Solid titanium milled pocket clip with anti-snag radius',
      'Zero tip-wiggle tolerance collet system (<0.02mm)',
      'Pre-loaded with Schmidt EasyFlow 9000 Black (Medium)'
    ],
    badge: 'Bestseller',
    isFeatured: true,
    createdAt: '2026-08-10'
  },
  {
    id: 'prod-002',
    slug: 'chromexcel-minimalist-card-wallet',
    name: 'Heritage Horween Cardholder',
    tagline: 'Hand-stitched vegetable-tanned Chromexcel leather with RFID shielding.',
    description: 'Sculpted from legendary Horween Chromexcel pull-up leather, this minimalist card wallet is cut by hand and saddle-stitched with bonded Japanese thread. Over months of pocket carry, it patinas into a deep, personalized amber luster. Holds 6-8 cards comfortably plus folded banknotes in the rapid-access central cash sleeve.',
    price: 68,
    category: 'Leather & Travel',
    tags: ['Horween', 'Saddle-Stitched', 'Vegetable Tanned', 'RFID Safe'],
    inStock: true,
    stockCount: 22,
    sku: 'VAL-LEA-WLT-02',
    rating: 4.8,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: 'Horween Chromexcel Full-Grain Leather (Chicago, IL)',
      dimensions: '102mm x 72mm x 5mm',
      weight: '29 grams',
      warranty: '25-Year Stitch & Seam Warranty',
      origin: 'Handcrafted in Maine, USA'
    },
    features: [
      'Dual exterior quick-draw card thumb slots',
      'Ultra-thin flexible RFID signal dampening core',
      'Beveled and burnished edges sealed with natural beeswax',
      'Traditional hand saddle stitch that will never unravel'
    ],
    badge: 'Staff Pick',
    isFeatured: true,
    createdAt: '2026-08-12'
  },
  {
    id: 'prod-003',
    slug: 'valence-planar-audiophile-headphones',
    name: 'Valkyrie Planar Reference Monitors',
    tagline: 'Ultra-low distortion 80mm planar magnetic drivers with solid walnut chambers.',
    description: 'Engineered for audio purists and mixing engineers demanding holographic soundstage and lightning-fast transient response. The Valkyrie monitors utilize an ultra-thin 2-micron aerospace diaphragm suspended between high-flux push-pull neodymium magnets. Acoustically tuned CNC walnut earcups eliminate internal standing waves for neutral, articulate frequency reproduction.',
    price: 349,
    compareAtPrice: 399,
    category: 'Audio & Acoustics',
    tags: ['Audiophile', 'Planar Magnetic', 'Solid Walnut', 'Balanced Audio'],
    inStock: true,
    stockCount: 6,
    sku: 'VAL-AUD-PLN-03',
    rating: 4.95,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: 'American Walnut chambers, Spring Steel & Lambskin headband',
      dimensions: 'Drivers: 80mm planar magnetic / Impedance: 32 Ohms',
      weight: '385 grams',
      warranty: '5-Year Acoustic Transducer Warranty',
      origin: 'Precision Hand-Assembled in Munich, Germany'
    },
    features: [
      'Ultra-wide 8Hz - 48,000Hz frequency response with <0.08% THD',
      'Includes dual 3.5mm to 4.4mm balanced silver-plated OFC braided cable',
      'Contoured memory-foam ear cushions wrapped in perforated sheepskin',
      'Individually serialized and paired with calibrated frequency response chart'
    ],
    badge: 'Limited Edition',
    isFeatured: true,
    createdAt: '2026-08-15'
  },
  {
    id: 'prod-004',
    slug: 'waxed-canvas-bridle-weekender',
    name: 'Nomad 38L Waxed Weekender',
    tagline: 'Water-resistant 18oz Martexin sail canvas with English bridle leather trim.',
    description: 'Built to withstand torrential downpours and decades of overhead compartment abuse. The Nomad 38L marries weatherproof Scottish paraffin waxed cotton canvas with heavy English bridle leather carry handles and solid brass hardware. Thoughtfully organized with an exterior padded 16-inch laptop pocket, ventilated shoe garage, and luggage trolley strap pass-through.',
    price: 245,
    category: 'Leather & Travel',
    tags: ['Waxed Canvas', 'Weekender', 'TSA Carry-on', 'Brass Hardware'],
    inStock: true,
    stockCount: 9,
    sku: 'VAL-TRV-BAG-04',
    rating: 4.7,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: '18oz Heavy Martexin Original Wax Cotton & Wickett & Craig Bridle Leather',
      dimensions: '52cm x 30cm x 26cm (TSA carry-on compliant)',
      weight: '1,420 grams',
      warranty: 'Lifetime Craftsmanship Guarantee',
      origin: 'Hand-tailored in Spokane, WA'
    },
    features: [
      'Custom sand-cast solid brass #10 YKK Excella two-way main zippers',
      'Separate side-access compartment fits up to size 13 US footwear',
      'Fleece-lined suspended 16" laptop sleeve with storm flap',
      'Detachable padded ergonomic leather shoulder strap'
    ],
    badge: 'Bestseller',
    isFeatured: true,
    createdAt: '2026-08-18'
  },
  {
    id: 'prod-005',
    slug: 'magnetic-leather-desk-mat-dock',
    name: 'Artisan Desk Mat & MagSafe Hub',
    tagline: 'Full-grain Italian harness leather lined with Merino wool felt.',
    description: 'Transform your desktop into an inspiring command center. Handcrafted from vegetable-tanned top-layer leather bonded to high-density dense merino wool felt, this oversized desk mat provides the ideal tactile surface for optical mice, mechanical keyboards, and fountain pens. Includes a hidden embedded magnetic alignment rail for attaching modular cable guides and wireless charging pucks.',
    price: 110,
    compareAtPrice: 135,
    category: 'Desk & Workspace',
    tags: ['Workspace', 'Italian Leather', 'Merino Felt', 'Magnetic'],
    inStock: true,
    stockCount: 19,
    sku: 'VAL-DSK-MAT-05',
    rating: 4.85,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: 'Tuscan Vegetable-Tanned Leather & 100% German Merino Wool Felt',
      dimensions: '900mm x 400mm x 4.5mm',
      weight: '720 grams',
      warranty: '10-Year Warranty',
      origin: 'Florence, Italy'
    },
    features: [
      'Hidden magnetic toolbar keeps cables organized and stationery in place',
      'Natural water-resistant coating repels coffee and tea spills',
      'Non-slip natural rubber-infused backing prevents shifting',
      'Includes 2 matching leather magnetic cable catchers'
    ],
    badge: 'Sale',
    isFeatured: false,
    createdAt: '2026-08-20'
  },
  {
    id: 'prod-006',
    slug: 'titanium-unibody-pocket-multitool',
    name: 'Krypton Solid Ti Pry Multitool',
    tagline: 'Grade 5 billet EDC prybar with bottle opener, hex bits, and tritium slot.',
    description: 'Machined from a single block of 6mm solid titanium, the Krypton Prybar handles stubborn paint cans, heavy crate staples, and emergency prying tasks that would snap standard pocket knife tips. Features an ergonomic thumb jimped jimping ramp, integrated universal bottle opener, stepped box wrench (1/4", 5/16", 3/8", 7/16"), and a machined pocket clip.',
    price: 74,
    category: 'Everyday Carry',
    tags: ['Titanium', 'Multitool', 'Pocket Tool', 'EDC Gear'],
    inStock: true,
    stockCount: 8,
    sku: 'VAL-TI-PRY-06',
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1584679109597-c656b19974c9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: 'Heat Treated Ti-6Al-4V Grade 5 Titanium',
      dimensions: '118mm x 22mm x 6mm',
      weight: '48 grams',
      warranty: 'Unconditional Lifetime Guarantee',
      origin: 'USA'
    },
    features: [
      'Dual ground precision bevel chisel pry tip',
      'Built-in cap lifter designed for zero cap slippage',
      'Includes green self-luminous glow insert slot',
      'Deep-carry stonewashed titanium pocket clip'
    ],
    badge: 'New Arrival',
    isFeatured: false,
    createdAt: '2026-08-25'
  },
  {
    id: 'prod-007',
    slug: 'analog-tube-headphone-amplifier-dac',
    name: 'Elysium Vacuum Tube DAC & Amp',
    tagline: 'Pure Class-A triode vacuum tube warmth backed by 32-bit ESS Sabre architecture.',
    description: 'Bridging modern digital precision with classic vacuum tube harmonic richness. The Elysium pairs the ES9038PRO reference DAC chip with matched Soviet-era 6J1 dual vacuum tubes operating in pure Single-Ended Class-A configuration. Capable of driving high-impedance 600 Ohm studio monitors or ultra-sensitive IEMs with zero background noise floor.',
    price: 289,
    category: 'Audio & Acoustics',
    tags: ['Tube Amp', 'Audiophile', 'Hi-Res Audio', 'Desktop DAC'],
    inStock: true,
    stockCount: 4,
    sku: 'VAL-AUD-AMP-07',
    rating: 4.92,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: 'Extruded Aircraft Anodized Aluminum Chassis & Gold-Plated RCA ports',
      dimensions: '185mm x 140mm x 62mm',
      weight: '1,150 grams',
      warranty: '3-Year Circuit Warranty, 6 Months on Tubes',
      origin: 'Assembled in Tokyo, Japan'
    },
    features: [
      'Native DSD512 and PCM 32-bit/768kHz high-resolution decoding',
      'Gold-plated 6.35mm headphone output + 4.4mm balanced output',
      'Precision motorized Alps Japanese stepped volume potentiometer',
      'Tubes are socketed for easy rolling and sound signature customization'
    ],
    badge: 'Staff Pick',
    isFeatured: false,
    createdAt: '2026-08-28'
  },
  {
    id: 'prod-008',
    slug: 'solid-machined-brass-key-clip',
    name: 'Cipher Machined Brass Carabiner',
    tagline: 'C360 brass key clip with dual retention chambers and integrated bottle opener.',
    description: 'Cast and CNC finished from solid cartridge brass with an antiqued satin patina. The Cipher clip features a two-stage interlocking gate mechanism ensuring your keys can never inadvertently slide off your belt loop. Over time, the brass reacts with air and pocket wear to develop a rich, weathered golden patina unique to your daily journey.',
    price: 45,
    category: 'Everyday Carry',
    tags: ['Solid Brass', 'Carabiner', 'Key Organizer', 'EDC'],
    inStock: false,
    stockCount: 0,
    sku: 'VAL-BRS-KEY-08',
    rating: 4.6,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      material: 'Solid C360 Free-Machining Cartridge Brass',
      dimensions: '82mm x 34mm x 8mm',
      weight: '62 grams',
      warranty: 'Lifetime Guarantee',
      origin: 'USA'
    },
    features: [
      'Dual chamber design keeps primary keys isolated from car fob',
      'High-tensile phosphor bronze spring will never deform or fatigue',
      'Chamfered inner edges safeguard belt loops from fraying',
      'Includes two complimentary solid brass split rings'
    ],
    badge: undefined,
    isFeatured: false,
    createdAt: '2026-09-02'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-101',
    productId: 'prod-001',
    authorName: 'Marcus Vance',
    authorEmail: 'marcus.v@carryology.net',
    isVerifiedBuyer: true,
    rating: 5,
    title: 'Unrivaled precision machining and mechanical feel',
    comment: 'I own over 20 machined pens from Grimsmo to Tactile Turn. The Apex Bolt is in a class of its own. The internal tolerance on the bolt track is surgical — completely glassy action with zero grittiness right out of the box. The weight distribution sits exactly where thumb meets forefinger.',
    createdAt: '2026-09-14',
    helpfulCount: 34,
    status: 'approved',
    merchantReply: {
      text: 'Marcus, thank you so much for the deep feedback! The titanium internal spring and bolt geometry took our machine shop 6 iterations to dial in. Enjoy it for life!',
      date: '2026-09-15'
    }
  },
  {
    id: 'rev-102',
    productId: 'prod-001',
    authorName: 'Elena Rostova',
    authorEmail: 'elena.rostova@design.io',
    isVerifiedBuyer: true,
    rating: 5,
    title: 'The knurling is tactile perfection',
    comment: 'Using this daily in my architectural sketches. Ink flow with the EasyFlow 9000 is clean, and the matte titanium finish does not show fingerprint oils at all. Outstanding work.',
    createdAt: '2026-09-22',
    helpfulCount: 19,
    status: 'approved'
  },
  {
    id: 'rev-103',
    productId: 'prod-002',
    authorName: 'David Sterling',
    authorEmail: 'd.sterling@alumni.edu',
    isVerifiedBuyer: true,
    rating: 5,
    title: 'Horween Chromexcel smells and feels incredible',
    comment: 'After three weeks of front-pocket carry, the pull-up effect is already creating rich caramel highlights along the spine folds. Holds 6 cards and 4 folded bills without any noticeable pocket bulge.',
    createdAt: '2026-09-18',
    helpfulCount: 22,
    status: 'approved'
  },
  {
    id: 'rev-104',
    productId: 'prod-003',
    authorName: 'Julian Croft',
    authorEmail: 'julian@croftsounds.com',
    isVerifiedBuyer: true,
    rating: 5,
    title: 'Outperforms headphones costing twice as much',
    comment: 'Tested these against LCD-X and Sennheiser HD800S. The bass extension is subterranean and tight, with none of the muddy boominess found in cheaper dynamic cans. Vocals are intimate and lifelike. The walnut grain is gorgeous.',
    createdAt: '2026-09-26',
    helpfulCount: 41,
    status: 'approved',
    merchantReply: {
      text: 'Honored to hear this Julian. We tuned the 80mm planar drivers specifically to avoid the typical upper-mid peak while retaining micro-dynamics. Glad you are enjoying the soundstage!',
      date: '2026-09-27'
    }
  },
  {
    id: 'rev-105',
    productId: 'prod-004',
    authorName: 'Chloe Bennett',
    authorEmail: 'chloe.travels@globe.org',
    isVerifiedBuyer: true,
    rating: 4,
    title: 'Heavy-duty tank of a bag — stellar craftsmanship',
    comment: 'Survived 4 flights and a rainy train connection across the UK without a single drop penetrating the waxed canvas. My only minor note is that the canvas is stiff on day one, but it breaks in beautifully after a couple of trips.',
    createdAt: '2026-10-02',
    helpfulCount: 15,
    status: 'approved'
  },
  {
    id: 'rev-106',
    productId: 'prod-005',
    authorName: 'Kenji Takahashi',
    authorEmail: 'kenji.t@archstudio.jp',
    isVerifiedBuyer: true,
    rating: 5,
    title: 'Completely transformed my studio workstation',
    comment: 'The magnetic cable catchers are genius. No more tangled USB-C cables sliding off the back of the walnut desk. The leather feel is soft yet supportive under the wrist.',
    createdAt: '2026-10-06',
    helpfulCount: 28,
    status: 'approved'
  },
  {
    id: 'rev-107',
    productId: 'prod-006',
    authorName: 'Alex Mercer',
    authorEmail: 'alex.m@edcweekly.com',
    isVerifiedBuyer: true,
    rating: 5,
    title: 'Saves your knife blade daily',
    comment: 'The bevel pry tip popped open stubborn metal paint cans and tightened camera tripod plates without batting an eye. Titanium is indestructible.',
    createdAt: '2026-10-10',
    helpfulCount: 12,
    status: 'approved'
  },
  {
    id: 'rev-108',
    productId: 'prod-001',
    authorName: 'Anonymous Buyer',
    authorEmail: 'test.pending@example.com',
    isVerifiedBuyer: false,
    rating: 4,
    title: 'Good pen, takes standard refills',
    comment: 'Solid build quality. Took 4 days to arrive via standard shipping.',
    createdAt: '2026-10-15',
    helpfulCount: 1,
    status: 'pending' // For testing admin moderation tools!
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minSpend: 50,
    description: '10% off for first-time orders over $50',
    expiryDate: '2027-12-31',
    isActive: true,
    usageCount: 142,
    usageLimit: 1000
  },
  {
    id: 'coup-2',
    code: 'LAUNCH20',
    discountType: 'fixed',
    value: 20,
    minSpend: 150,
    description: '$20 off premium orders over $150',
    expiryDate: '2027-12-31',
    isActive: true,
    usageCount: 68,
    usageLimit: 500
  },
  {
    id: 'coup-3',
    code: 'VIPCLUB15',
    discountType: 'percentage',
    value: 15,
    minSpend: 200,
    description: '15% off orders exceeding $200 for collector members',
    expiryDate: '2027-06-30',
    isActive: true,
    usageCount: 29
  }
];

export const SHIPPING_OPTIONS: ShippingMethod[] = [
  {
    id: 'ship-standard',
    name: 'Standard Insured Carbon-Neutral Delivery',
    description: 'Eco-conscious packaging with tracked delivery via USPS/DHL Ground.',
    price: 6.99,
    estimatedDays: '3 - 5 business days',
    freeThreshold: 75
  },
  {
    id: 'ship-express',
    name: 'FedEx Priority Air Express',
    description: 'Guaranteed 2-day delivery with signature confirmation and real-time GPS tracking.',
    price: 14.99,
    estimatedDays: '1 - 2 business days'
  },
  {
    id: 'ship-overnight',
    name: 'White Glove Overnight Courier',
    description: 'Next business morning dispatch with tamper-proof security seals.',
    price: 29.99,
    estimatedDays: 'Next business day'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8831',
    orderNumber: 'VAL-8831',
    createdAt: '2026-10-16T14:22:10Z',
    customer: {
      fullName: 'Jonathan Meyer',
      email: 'jmeyer@craftdesign.com',
      phone: '+1 (555) 349-8812',
      addressLine1: '450 Mission Street, Suite 900',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States'
    },
    items: [
      {
        productId: 'prod-001',
        name: 'Apex Ti Bolt-Action Pen',
        price: 98,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=300&auto=format&fit=crop',
        sku: 'VAL-TI-PEN-01'
      },
      {
        productId: 'prod-002',
        name: 'Heritage Horween Cardholder',
        price: 68,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=300&auto=format&fit=crop',
        sku: 'VAL-LEA-WLT-02'
      }
    ],
    subtotal: 166,
    discountTotal: 16.60,
    couponCode: 'WELCOME10',
    shippingTotal: 0,
    shippingMethod: 'Standard Insured Delivery (Free over $75)',
    taxTotal: 11.95,
    total: 161.35,
    currency: 'USD',
    paymentMethod: 'stripe_card',
    paymentStatus: 'paid',
    fulfillmentStatus: 'shipped',
    trackingNumber: 'FDX-9942-8812-US',
    carrier: 'FedEx',
    isTestMode: true,
    notes: 'Please leave with front reception.'
  },
  {
    id: 'ord-8832',
    orderNumber: 'VAL-8832',
    createdAt: '2026-10-17T09:15:40Z',
    customer: {
      fullName: 'Sarah Lindqvist',
      email: 'sarah.lindqvist@nordicaudio.se',
      addressLine1: 'Storgatan 14, Apt 3B',
      city: 'Stockholm',
      state: 'Stockholm',
      postalCode: '11451',
      country: 'Sweden'
    },
    items: [
      {
        productId: 'prod-003',
        name: 'Valkyrie Planar Reference Monitors',
        price: 349,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop',
        sku: 'VAL-AUD-PLN-03'
      }
    ],
    subtotal: 349,
    discountTotal: 20,
    couponCode: 'LAUNCH20',
    shippingTotal: 14.99,
    shippingMethod: 'FedEx Priority Air Express',
    taxTotal: 26.24,
    total: 370.23,
    currency: 'USD',
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
    isTestMode: true
  },
  {
    id: 'ord-8833',
    orderNumber: 'VAL-8833',
    createdAt: '2026-10-17T18:40:00Z',
    customer: {
      fullName: 'Liam Hemsworth',
      email: 'liam.h@studioedc.co.uk',
      addressLine1: '28 Kensington High Street',
      city: 'London',
      state: 'Greater London',
      postalCode: 'W8 4PF',
      country: 'United Kingdom'
    },
    items: [
      {
        productId: 'prod-005',
        name: 'Artisan Desk Mat & MagSafe Hub',
        price: 110,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=300&auto=format&fit=crop',
        sku: 'VAL-DSK-MAT-05'
      }
    ],
    subtotal: 110,
    discountTotal: 0,
    shippingTotal: 0,
    shippingMethod: 'Standard Insured Delivery',
    taxTotal: 8.80,
    total: 118.80,
    currency: 'USD',
    paymentMethod: 'google_pay',
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    isTestMode: true
  }
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'VALENCE',
  tagline: 'Precision Goods & Everyday Carry',
  supportEmail: 'concierge@valence-store.com',
  supportPhone: '+1 (800) 582-9362',
  currency: 'USD',
  stripeTestMode: true,
  stripePublishableKey: 'pk_test_51MzVALENCEsimulatedKey009283748293041',
  gaMeasurementId: 'G-VALENCE9201',
  autoApproveReviews: false,
  freeShippingThreshold: 75,
  standardShippingFee: 6.99,
  taxRatePercent: 8.25
};
