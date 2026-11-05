import { MenuCategory, StatItem, BrandValue, WomenEmpowermentStory } from '../types';

export const BRAND_INFO = {
  name: "Mom's Cloud Kitchen",
  tagline: "Made By Mom Loved By All",
  kicker: "MORE THAN FOOD. IT'S A FEELING.",
  founder: "Aditya Kuttan",
  founderRole: "Founder | Mom's Cloud Kitchen",
  foundedDate: "February 2024",
  foundedLocation: "Vasai & Virar",
  phone: "8484030988",
  phoneDisplay: "+91 84840 30988",
  phoneClean: "+918484030988",
  whatsappUrl: "https://wa.me/918484030988?text=Hi%20Aditya!%20I%20am%20interested%20in%20the%20Mom's%20Cloud%20Kitchen%20Franchise%20Opportunity.",
  email: "aditya@momscloudkitchen.com",
  formEndpoint: "https://formsubmit.co/ajax/aditya@momscloudkitchen.com",
  domain: "www.momscloudkitchen.com",
  websiteUrl: "https://www.momscloudkitchen.com",
  instagram: "https://www.instagram.com/moms.cloud.kitchen.mumbai",
  instagramHandle: "@moms.cloud.kitchen.mumbai",
  orderCount: "4,000+",
  platforms: ["Swiggy", "Zomato", "Magicpin"],
  founderQuote: "I started my career cleaning floors in a coffee shop. Today, I dream of building a food brand that reaches thousands of homes. The journey is proof that your background doesn't decide your future — your determination does.",
  images: {
    hero: "/images/hero_banner_custom.jpg",
    founder: "/images/founder_aditya_kuttan_hd.jpg",
    founderBackup: "/images/founder_aditya_pushpa_kuttan_2.webp",
    momCooking: "/images/kitchen_mom_cooking_1793814074228.jpg",
    southIndian: "/images/food_south_indian_thali_1793814074632.jpg",
    breakfast: "/images/dish_masala_dosa.jpeg",
    shravan: "/images/dish_sabudana_khichdi.jpeg",
    protein: "/images/dish_ragi_masala_dosa.jpeg",
    sweet: "/images/dish_chocolate_dosa.jpeg",
    facility: "/images/franchise_cloud_kitchen_1793814093845.jpg",
  }
};

export const STATS_DATA: StatItem[] = [
  {
    value: "4,000+",
    label: "Orders Served",
    detail: "Satisfied customers across Vasai and Virar"
  },
  {
    value: "Feb 2024",
    label: "Founded",
    detail: "From Mom's home kitchen to a trusted mom's cloud kitchen brand"
  },
  {
    value: "28–35%",
    label: "Net Profit Margin",
    detail: "Robust delivery & dine-in unit economics with flat 5% royalty"
  },
  {
    value: "6–8 Mos",
    label: "ROI Timeline",
    detail: "Rapid ROI in 6 to 8 months driven by lean capex and high repeat orders"
  }
];

export const BRAND_VALUES: BrandValue[] = [
  {
    title: "Mom's Love",
    description: "Every recipe is guided by motherly warmth, genuine care, and home-style affection.",
    iconName: "Heart"
  },
  {
    title: "Fresh Ingredients",
    description: "Wholesome, unadulterated spices and farm-fresh produce sourced daily for pure flavours.",
    iconName: "Sparkles"
  },
  {
    title: "Home-Style Preparation",
    description: "Cooked just like at home — zero heavy preservatives, balanced oils, and authentic tempering.",
    iconName: "ChefHat"
  },
  {
    title: "Hot & Fresh Food",
    description: "Prepared fresh upon each order and dispatched immediately in hygienic, sealed packaging.",
    iconName: "Flame"
  }
];

export const WOMEN_EMPOWERMENT_DATA: WomenEmpowermentStory = {
  title: "EMPOWERING WOMEN, TRANSFORMING LIVES",
  quote: "Some people cook to earn a living. We want to give them a platform where cooking becomes their strength, their identity and their path to independence.",
  vision: "Our vision is not just to build a successful food brand, but to build a community where women get the opportunity to transform their lives through employment, skills and financial independence.",
  mission: "We cook with love, we grow together — empowering women, one opportunity at a time.",
  images: [
    {
      src: "/images/women_empowerment_cooking_1.jpg",
      caption: "Culinary Mastery with Maternal Care",
      alt: "Indian woman chef cooking authentic dosas with motherly affection"
    },
    {
      src: "/images/kitchen_mom_cooking_1793814074228.jpg",
      caption: "Home-Style Recipes & Authentic Tempering",
      alt: "Mother cooking fresh vegetarian dishes with traditional recipes"
    },
    {
      src: "/images/women_empowerment_packaging_2.jpg",
      caption: "Hygienic Cloud Kitchen Operations",
      alt: "Women team packaging clean sealed meal boxes in cloud kitchen"
    },
    {
      src: "/images/women_empowerment_pride_3.jpg",
      caption: "Dignity, Independence & Pride",
      alt: "Proud woman food entrepreneur holding fresh traditional meal"
    }
  ],
  pillars: [
    {
      title: "Financial Independence",
      description: "Providing sustainable, dignified livelihoods and equal earning opportunities so women can support their families with pride."
    },
    {
      title: "Skill Development & Training",
      description: "Structured commercial kitchen training, food safety SOPs, cloud POS mastery, and leadership coaching for culinary staff."
    },
    {
      title: "Motherly Love in Every Meal",
      description: "Infusing every dish with the authentic affection, care, and cleanliness only a mother's touch can deliver."
    },
    {
      title: "Supportive & Safe Workspaces",
      description: "Creating a positive, hygienic, and respectful kitchen culture where every woman is valued, heard, and empowered."
    }
  ]
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "breakfast",
    title: "All Day Breakfast",
    subtitle: "Piping hot South Indian classics, prepared fresh with wholesome coconut chutneys & aromatic sambar.",
    items: [
      {
        id: "b1",
        name: "Plain Dosa",
        category: "All Day Breakfast",
        description: "Golden crisp fermented crepe served with fresh grated coconut chutney, tangy tomato chutney and hot sambar.",
        price: "₹99",
        image: "/images/dish_plain_dosa.jpeg",
        tag: "Classic"
      },
      {
        id: "b2",
        name: "Masala Dosa",
        category: "All Day Breakfast",
        description: "Signature crisp dosa filled with savory tempered spiced potato bhaji, paired with fresh coconut and tomato dips.",
        price: "₹149",
        image: "/images/dish_masala_dosa.jpeg",
        tag: "Bestseller"
      },
      {
        id: "b3",
        name: "Uttappam",
        category: "All Day Breakfast",
        description: "Thick spongy pancake topped with caramelized country onions, ripe tomatoes and aromatic curry leaves.",
        price: "₹189",
        image: "/images/dish_uttappam.jpeg",
        tag: "Comfort"
      },
      {
        id: "b4",
        name: "Idli (4 pcs)",
        category: "All Day Breakfast",
        description: "Melt-in-mouth ultra-soft steamed rice and urad lentil cakes accompanied by aromatic homestyle drumstick sambar.",
        price: "₹129",
        image: "/images/dish_idli_4_pcs.jpeg",
        tag: "Healthy"
      },
      {
        id: "b5",
        name: "Medu Vada (4 pcs)",
        category: "All Day Breakfast",
        description: "Golden crisp on the outside, fluffy cloud-soft inside. Spiced with crushed peppercorns and whole cumin.",
        price: "₹149",
        image: "/images/dish_medu_vada_4_pcs.jpeg",
        tag: "Crispy"
      },
      {
        id: "b6",
        name: "Stuffed Idli (4 pcs)",
        category: "All Day Breakfast",
        description: "Fluffy steamed idlis stuffed with a flavorful spiced vegetable medley, served with chutney trio.",
        price: "₹149",
        image: "/images/dish_stuffed_idli_4_pcs.jpeg",
        tag: "Chef Special"
      },
      {
        id: "b7",
        name: "Poha",
        category: "All Day Breakfast",
        description: "Flattened rice tossed with roasted peanuts, mustard seeds, turmeric, green chillies, and freshly squeezed lemon.",
        price: "₹149",
        image: "/images/dish_poha.jpeg",
        tag: "Light"
      },
      {
        id: "b8",
        name: "Upma",
        category: "All Day Breakfast",
        description: "Slow-roasted semolina tempered with mustard seeds, crunchy urad dal, ginger, and curry leaves in pure desi ghee.",
        price: "₹149",
        image: "/images/dish_upma.jpeg",
        tag: "Homestyle"
      },
      {
        id: "b9",
        name: "Masala Appe",
        category: "All Day Breakfast",
        description: "Crispy-shelled steamed dumplings made from fermented batter, tempered with onions, mustard, and green chillies.",
        price: "₹189",
        image: "/images/dish_masala_appe.jpeg",
        tag: "Popular"
      }
    ]
  },
  {
    id: "protein-ragi",
    title: "High Protein & Ragi Healthy Delights",
    subtitle: "Nutrient-packed finger-millet (ragi) dishes rich in calcium, natural fiber and plant protein.",
    items: [
      {
        id: "p1",
        name: "Ragi Plain Dosa",
        category: "High Protein Ragi",
        description: "Nutritious stone-ground finger millet crepe cooked crisp on cast iron, paired with homemade low-oil coconut chutney.",
        price: "₹149",
        image: "/images/dish_ragi_plain_dosa.jpeg",
        tag: "Millet Power"
      },
      {
        id: "p2",
        name: "Ragi Masala Dosa",
        category: "High Protein Ragi",
        description: "Fiber-rich crispy ragi crepe folded over delicate homestyle potato stuffing seasoned with turmeric and mustard.",
        price: "₹189",
        image: "/images/dish_ragi_masala_dosa.jpeg",
        tag: "Top Seller"
      },
      {
        id: "p3",
        name: "Ragi Uttappam",
        category: "High Protein Ragi",
        description: "Wholesome gluten-conscious ragi pancake garnished generously with chopped onions, sweet carrots and coriander.",
        price: "₹189",
        image: "/images/dish_ragi_uttappam.jpeg",
        tag: "Slow Carb"
      },
      {
        id: "p4",
        name: "Ragi Idli (4 pcs)",
        category: "High Protein Ragi",
        description: "Mineral-rich steamed ragi cakes providing long-lasting energy, served with traditional drumstick sambar.",
        price: "₹119",
        image: "/images/dish_ragi_idli_4_pcs.jpeg",
        tag: "Superfood"
      },
      {
        id: "p5",
        name: "Ragi Stuffed Idli (4 pcs)",
        category: "High Protein Ragi",
        description: "Hearty ragi cakes filled with a lightly spiced vegetable core, served with antioxidant-rich tomato and coconut chutneys.",
        price: "₹189",
        image: "/images/dish_ragi_stuffed_idli_4_pcs.jpeg",
        tag: "Wholesome"
      },
      {
        id: "p6",
        name: "Ragi Masala Appa (12 pcs)",
        category: "High Protein Ragi",
        description: "Twelve golden-brown bite-sized ragi dumplings, crunchy outside and tender within, tossed in delicate Indian spices.",
        price: "₹179",
        image: "/images/dish_ragi_masala_appa_12_pcs.jpeg",
        tag: "Snack Favorite"
      }
    ]
  },
  {
    id: "shravan-specials",
    title: "Shravan, Upvas & Fasting Delicacies",
    subtitle: "Prepared in designated satvik vessels with sendha namak (rock salt) for pious fasting days.",
    items: [
      {
        id: "s1",
        name: "Sabudana Khichdi",
        category: "Shravan & Upvas",
        description: "Non-sticky translucent tapioca pearls tossed with coarse roasted crushed peanuts, cumin, green chillies and rock salt.",
        price: "₹189",
        image: "/images/dish_sabudana_khichdi.jpeg",
        tag: "100% Satvik"
      },
      {
        id: "s2",
        name: "French Fries",
        category: "Shravan & Upvas",
        description: "Crisp hand-cut potato batons fried in clean vegetable oil and tossed in sendha rock salt.",
        price: "₹149",
        image: "/images/dish_french_fries.jpeg",
        tag: "Kid's Pick"
      }
    ]
  },
  {
    id: "korean-ramen",
    title: "Korean Ramen Special (100% Pure Veg)",
    subtitle: "Piping hot fusion noodles in spicy aromatic broths with fresh herbs, tofu, and Asian greens. Zero egg, zero non-veg.",
    items: [
      {
        id: "k1",
        name: "Korean Kimchi Ramen (Pure Veg)",
        category: "Korean Ramen",
        description: "100% Pure Vegetarian broth with tangy fermented kimchi, tender tofu cubes, scallions, bok choy, and chewy ramen noodles. Pure Veg.",
        price: "₹299",
        image: "/images/dish_korean_kimchi_ramen_pureveg.jpg",
        tag: "100% Pure Veg"
      },
      {
        id: "k2",
        name: "Korean Hot & Spicy Ramen",
        category: "Korean Ramen",
        description: "Fiery Korean chili paste broth loaded with sweet corn, spring onions, mushrooms, and springy ramen noodles.",
        price: "₹299",
        image: "/images/dish_korean_hot___spicy_ramen.jpeg",
        tag: "Spicy"
      },
      {
        id: "k3",
        name: "Korean Curry Ramen",
        category: "Korean Ramen",
        description: "Rich, mildly spiced velvety curry noodle soup topped with fresh garden greens and sesame seeds.",
        price: "₹299",
        image: "/images/dish_korean_curry_ramen.jpeg",
        tag: "Fusion"
      }
    ]
  },
  {
    id: "sweet-tooth",
    title: "Sweet Tooth & Dessert Treats",
    subtitle: "Handcrafted sweet indulgences crafted with rich cocoa, creamy spreads, and warm maternal affection.",
    items: [
      {
        id: "d1",
        name: "Chocolate Dosa",
        category: "Sweet Tooth",
        description: "Paper-thin hot crisp crepe generously slathered with molten hazelnut chocolate ganache and chocolate sprinkles.",
        price: "₹199",
        image: "/images/dish_chocolate_dosa.jpeg",
        tag: "Sweet Delight"
      },
      {
        id: "d2",
        name: "Chocolate Idli (4 pcs)",
        category: "Sweet Tooth",
        description: "Warm, fluffy cocoa-infused steamed idli pillows drizzled with decadent dark chocolate syrup.",
        price: "₹199",
        image: "/images/dish_chocolate_idli_4_pcs.jpeg",
        tag: "Unique"
      },
      {
        id: "d3",
        name: "Mini Chocolate Pancakes (12 pcs)",
        category: "Sweet Tooth",
        description: "Twelve bite-sized fluffy buttermilk pancakes crowned with warm chocolate sauce and powdered sugar.",
        price: "₹229",
        image: "/images/dish_mini_chocolate_pancakes_12_pcs.jpeg",
        tag: "Bestseller Dessert"
      }
    ]
  },
  {
    id: "rice-meals",
    title: "The South Indian Lunch & Comfort Rice Meals",
    subtitle: "Complete comforting homestyle rice meals prepared slow and served piping hot.",
    items: [
      {
        id: "m1",
        name: "Authentic Rasam Rice",
        category: "The South Indian Lunch",
        description: "Aromatic black-pepper and tamarind slow-simmered rasam mixed with fragrant steamed rice. Pure healing comfort.",
        price: "₹249",
        image: "/images/food_south_indian_thali_1793814074632.jpg",
        tag: "Soul Food"
      },
      {
        id: "m2",
        name: "Classic Sambar Rice",
        category: "The South Indian Lunch",
        description: "Country vegetables, yellow lentils and short-grain rice cooked to perfection with freshly ground spices and desi ghee.",
        price: "₹299",
        image: "/images/hero_south_indian_dosa_idli_1793815300389.jpg",
        tag: "Bestseller Lunch"
      },
      {
        id: "m3",
        name: "Spiced Tomato Rice",
        category: "The South Indian Lunch",
        description: "Tangy slow-roasted ripe tomato reduction tossed with fluffy rice, mustard seeds, roasted cashews, and fresh cilantro.",
        price: "₹249",
        image: "/images/dish_spiced_tomato_rice.jpg",
        tag: "Chef Special"
      },
      {
        id: "m4",
        name: "Coconut Chutney Rice",
        category: "The South Indian Lunch",
        description: "Fresh grated coconut ground with green chilies and ginger, delicately tossed with warm basmati rice and urad dal tadka.",
        price: "₹249",
        image: "/images/kitchen_mom_cooking_1793814074228.jpg",
        tag: "Traditional"
      }
    ]
  }
];

export const FRANCHISE_MODELS = [
  {
    id: "Cloud Kitchen",
    title: "Cloud Kitchen (Delivery Only)",
    track: "Cloud Kitchen Pro",
    badge: "Most Popular · High Margin",
    tagline: "For delivery-first cloud kitchen operators & entrepreneurs",
    description: "100% delivery kitchen fulfilling orders across Swiggy, Zomato, Magicpin, and direct automated WhatsApp ordering covering a 7km delivery radius.",
    franchiseFee: "₹4,00,000",
    setupCost: "₹5,00,000 – ₹6,00,000",
    totalInvestment: "₹9 Lakhs – ₹10 Lakhs",
    areaRequired: "200 – 250 Sq. Ft.",
    tenure: "5 Years",
    royalty: "Flat 5% on Net Sales",
    paybackPeriod: "ROI in 6 to 8 Months",
    features: [
      "Franchise Fee: ₹4,00,000 (5 Years Tenure)",
      "Kitchen Setup Cost: ₹5,00,000 to ₹6,00,000",
      "Area Required: 200 – 250 Sq. Ft. (Low-rent back alley / upper floor)",
      "Flat 5% Monthly Royalty on Net Sales (Zero renewal surprises)",
      "ROI in 6 to 8 Months with 28% to 35% net profit margins",
      "Standardised Premixes & SOPs (Zero Master Chef dependency)",
      "Swiggy, Zomato & Magicpin Merchant Onboarding & Menu Curation",
      "Direct 0% Commission WhatsApp Automated Ordering Setup",
      "Complete Kitchen Staff Training & Drills in 21 Days"
    ],
    highlight: "Lean capex, minimal staff (2–3 members), and rapid capital payback."
  },
  {
    id: "Cloud Kitchen + Dine-In",
    title: "Cloud Kitchen + Dine-In Restaurant",
    track: "Cloud Kitchen Pro",
    badge: "Dual Revenue Streams",
    tagline: "Hybrid delivery hub plus vibrant quick-service restaurant",
    description: "Combines high-volume delivery kitchen with a warm, welcoming quick-service dine-in restaurant for maximum local footfall and neighborhood customer loyalty.",
    franchiseFee: "₹6,00,000",
    setupCost: "₹7,00,000 – ₹8,00,000",
    totalInvestment: "₹13 Lakhs – ₹14 Lakhs",
    areaRequired: "300 – 350 Sq. Ft.",
    tenure: "5 Years",
    royalty: "Flat 5% on Net Sales",
    paybackPeriod: "ROI in 6 to 8 Months",
    features: [
      "Franchise Fee: ₹6,00,000 (5 Years Tenure)",
      "Kitchen & Dine-In Setup Cost: ₹7,00,000 to ₹8,00,000",
      "Area Required: 300 – 350 Sq. Ft. (High-footfall ground floor)",
      "Flat 5% Monthly Royalty on Net Sales (5 Years Agreement)",
      "ROI in 6 to 8 Months with dual in-store + online cash flow",
      "Complete Interior Aesthetics, Seating & Signage Blueprint",
      "Full Commercial Kitchen + Front-of-House Dining Setup",
      "Swiggy, Zomato, Magicpin + Walk-in Table Ordering Integration",
      "Comprehensive Managerial & Customer Service Staff Training"
    ],
    highlight: "Dual revenue streams: walk-in dine-in guests plus high-volume aggregator deliveries."
  },
  {
    id: "Master Franchise (Cloud Kitchen)",
    title: "Master Franchise (Cloud Kitchen)",
    track: "City Master Franchise",
    badge: "Territory Exclusivity",
    tagline: "For investors seeking city-wide dark kitchen network rights",
    description: "Exclusive territorial development rights to establish and sub-franchise delivery-only cloud kitchens across an entire city or district.",
    franchiseFee: "₹20,00,000",
    setupCost: "Per Unit Basis",
    totalInvestment: "Custom Regional Deployment",
    areaRequired: "200 – 250 Sq. Ft. per unit",
    tenure: "5 Years",
    royalty: "Flat 5% on Net Sales",
    paybackPeriod: "Strategic Territorial Scaling",
    features: [
      "Master Franchise Fee: ₹20,00,000 (5 Years Tenure)",
      "Exclusive brand rights for your chosen city / district",
      "Sub-franchise development rights with fee & royalty sharing",
      "Centralised dry spice premixes & supply chain synergy",
      "Priority digital marketing & regional campaign management",
      "Direct guidance from Founder Aditya Kuttan for territorial rollout"
    ],
    highlight: "High equity value with multi-unit sub-franchising revenue streams."
  },
  {
    id: "Master Franchise (Cloud + Dine-In)",
    title: "Master Franchise (Cloud + Dine-In)",
    track: "City Master Franchise",
    badge: "Flagship Regional Rights",
    tagline: "For F&B groups building hybrid restaurant networks",
    description: "Comprehensive city development rights covering both delivery hubs and flagship dine-in restaurants across the designated metropolitan territory.",
    franchiseFee: "₹25,00,000",
    setupCost: "Per Unit Basis",
    totalInvestment: "Flagship Regional Deployment",
    areaRequired: "300 – 350 Sq. Ft. per unit",
    tenure: "5 Years",
    royalty: "Flat 5% on Net Sales",
    paybackPeriod: "Strategic Territorial Scaling",
    features: [
      "Master Franchise Fee: ₹25,00,000 (5 Years Tenure)",
      "Exclusive city rights for both cloud kitchens and dine-in restaurants",
      "Sub-franchising rights across both formats with revenue sharing",
      "Centralised supply chain and regional warehouse support",
      "Full turnkey store setup templates and architectural guidance",
      "Highest priority operational, recruitment, and marketing support"
    ],
    highlight: "The ultimate regional F&B asset combining dark kitchen scalability with restaurant visibility."
  }
];

export const SETUP_COST_BREAKDOWN = [
  {
    category: "Commercial Kitchen Equipment",
    cloudKitchen: "₹1,80,000 – ₹2,20,000",
    cloudPlusDineIn: "₹2,50,000 – ₹3,00,000",
    details: "Induction hot plates, dosa tawas, heavy-duty mixers, stainless steel worktables, deep freezers & refrigeration."
  },
  {
    category: "Exhaust & Ventilation Setup",
    cloudKitchen: "₹70,000 – ₹90,000",
    cloudPlusDineIn: "₹1,00,000 – ₹1,30,000",
    details: "Commercial centrifugal exhaust hoods, ducting, fresh air intake, and fire safety compliance."
  },
  {
    category: "Cloud POS, Tech & Printers",
    cloudKitchen: "₹45,000 – ₹55,000",
    cloudPlusDineIn: "₹60,000 – ₹75,000",
    details: "Touchscreen POS terminal, thermal KOT printers, barcode scanners, and direct WhatsApp auto-dispatch gateway."
  },
  {
    category: "Store Interiors & Branding",
    cloudKitchen: "₹65,000 – ₹85,000",
    cloudPlusDineIn: "₹1,80,000 – ₹2,20,000",
    details: "Hygienic epoxy flooring, washable walls, ACP exterior signage (plus furniture, ambient lighting & seating for dine-in)."
  },
  {
    category: "Initial Inventory & Packaging",
    cloudKitchen: "₹80,000 – ₹95,000",
    cloudPlusDineIn: "₹95,000 – ₹1,15,000",
    details: "First month supply of secret dry spice premixes, branded heat-sealed containers, delivery carry bags, and dry pantry items."
  },
  {
    category: "Staff Onboarding & Drills",
    cloudKitchen: "₹40,000 – ₹55,000",
    cloudPlusDineIn: "₹55,000 – ₹60,000",
    details: "Staff uniforms, hairnets, food safety certifications, 7-day on-site operational drills, and aggregator launch marketing."
  }
];

export const WHY_PARTNER_PILLARS = [
  {
    number: "01",
    title: "Authentic Home-Style Food",
    subtitle: "Made By Mom Loved By All",
    description: "In a market dominated by commercial fast food, Mom's Cloud Kitchen serves simple, pure, and wholesome comfort food that families and working professionals enjoy every day."
  },
  {
    number: "02",
    title: "Fresh Daily Preparation",
    subtitle: "Zero compromise on hygiene and ingredients",
    description: "We prepare food fresh directly from the kitchen with honest ingredients, unadulterated spices, and meticulous home-style care that builds genuine customer loyalty."
  },
  {
    number: "03",
    title: "The Power of a Personal Touch",
    subtitle: "A brand that resonates on an emotional level",
    description: "More than food, it's a feeling. Customers don't just order lunch or dinner; they experience the nostalgic warmth, care, and familiarity of home wherever they are."
  },
  {
    number: "04",
    title: "Proven 4,000+ Order Track Record",
    subtitle: "Battle-tested kitchen operations in Vasai–Virar",
    description: "Founded in February 2024, our model has fulfilled over 4,000+ orders across top delivery aggregators (Swiggy, Zomato, Magicpin) with high repeat customer affinity."
  },
  {
    number: "05",
    title: "Women Empowerment Initiative",
    subtitle: "We Cook With Love, We Grow Together",
    description: "We provide women a dignified platform where cooking becomes their strength, their identity, and their path to financial independence."
  }
];
