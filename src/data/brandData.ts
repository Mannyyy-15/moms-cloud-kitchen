import { MenuCategory, StatItem, BrandValue } from '../types';

export const BRAND_INFO = {
  name: "Mom's Cloud Kitchen",
  tagline: "The Taste of Mom's Love",
  kicker: "MORE THAN FOOD. IT'S A FEELING.",
  founder: "Aditya Pushpa Kuttan",
  founderRole: "Founder | Mom's Cloud Kitchen",
  foundedDate: "February 2024",
  foundedLocation: "Vasai & Virar",
  phone: "+91 98924 47728",
  phoneClean: "+919892447728",
  whatsappUrl: "https://wa.me/919892447728",
  email: "adityakuttan@gmail.com",
  formEndpoint: "https://formsubmit.co/ajax/adityakuttan@gmail.com",
  domain: "www.momscloudkitchen.com",
  websiteUrl: "https://www.momscloudkitchen.com",
  orderCount: "4,000+",
  platforms: ["Swiggy", "Zomato", "Magicpin"],
  images: {
    hero: "/images/hero_banner_custom.jpg",
    founder: "/images/founder_aditya_pushpa_kuttan_2.webp",
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
    detail: "From Mom's home kitchen to a trusted dark kitchen brand"
  },
  {
    value: "28–35%",
    label: "Net Profit Margin",
    detail: "Robust delivery-first unit economics with low 5% royalty"
  },
  {
    value: "4–6 Mos",
    label: "Payback Period",
    detail: "Rapid capital recovery driven by lean 150–250 sq.ft footprint"
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
        tag: "Wholesome"
      },
      {
        id: "b4",
        name: "Idli (4 Pcs)",
        category: "All Day Breakfast",
        description: "Melt-in-mouth ultra-soft steamed rice and urad lentil cakes accompanied by aromatic homestyle drumstick sambar.",
        price: "₹129",
        image: "/images/dish_idli_4_pcs.jpeg",
        tag: "Mom's Special"
      },
      {
        id: "b5",
        name: "Stuffed Idli (4 Pcs)",
        category: "All Day Breakfast",
        description: "Puffy steamed idlis stuffed with seasoned potato and spiced lentil fillings, served with signature chutneys.",
        price: "₹149",
        image: "/images/dish_stuffed_idli_4_pcs.jpeg",
        tag: "Special"
      },
      {
        id: "b6",
        name: "Medu Vada (4 Pcs)",
        category: "All Day Breakfast",
        description: "Crunchy golden crust on the exterior, tender and fluffy inside, tempered with black pepper and fresh curry leaves.",
        price: "₹149",
        image: "/images/dish_medu_vada_4_pcs.jpeg",
        tag: "Popular"
      },
      {
        id: "b7",
        name: "Poha",
        category: "All Day Breakfast",
        description: "Flattened rice tossed with roasted peanuts, mustard seeds, turmeric, green chillies, and freshly squeezed lemon.",
        price: "₹149",
        image: "/images/dish_poha.jpeg",
        tag: "Comfort Food"
      },
      {
        id: "b8",
        name: "Upma",
        category: "All Day Breakfast",
        description: "Traditional roasted semolina cooked gently with ginger, mustard seeds, curry leaves, and a touch of pure ghee.",
        price: "₹149",
        image: "/images/dish_upma.jpeg",
        tag: "Homestyle"
      },
      {
        id: "b9",
        name: "Masala Appe",
        category: "All Day Breakfast",
        description: "Crispy golden bite-sized dumplings made from tempered batter, soft within and packed with mild spices.",
        price: "₹189",
        image: "/images/dish_masala_appe.jpeg",
        tag: "Must Try"
      }
    ]
  },
  {
    id: "healthy-protein",
    title: "Healthy Bites (Full of Protein)",
    subtitle: "Nutrient-dense finger millet (Ragi) preparations rich in calcium, iron, and dietary fibre.",
    items: [
      {
        id: "h1",
        name: "Ragi Idli (4 Pcs)",
        category: "Healthy Bites",
        description: "Steamed fluffy finger millet idlis offering high protein and sustained energy without compromising softness.",
        price: "₹149",
        image: "/images/dish_ragi_idli_4_pcs.jpeg",
        tag: "High Protein"
      },
      {
        id: "h2",
        name: "Ragi Stuffed Idli (4 Pcs)",
        category: "Healthy Bites",
        description: "Hearty ragi cakes filled with a lightly spiced vegetable core, served with antioxidant-rich tomato and coconut chutneys.",
        price: "₹189",
        image: "/images/dish_ragi_stuffed_idli_4_pcs.jpeg",
        tag: "Superfood"
      },
      {
        id: "h3",
        name: "Ragi Plain Dosa",
        category: "Healthy Bites",
        description: "Wholesome gluten-conscious thin crepe crafted from whole ragi grain and lentils, roasted to delicate crispness.",
        price: "₹119",
        image: "/images/dish_ragi_plain_dosa.jpeg",
        tag: "Fitness Favorite"
      },
      {
        id: "h4",
        name: "Ragi Masala Dosa",
        category: "Healthy Bites",
        description: "Crisp ragi crepe filled with nutrient-balanced spiced potato and herb filling. High nutrition, authentic taste.",
        price: "₹179",
        image: "/images/dish_ragi_masala_dosa.jpeg",
        tag: "Top Rated"
      },
      {
        id: "h5",
        name: "Ragi Uttappam",
        category: "Healthy Bites",
        description: "Thick savory ragi pancake enriched with farm vegetables, ginger, and curry leaves for a wholesome meal.",
        price: "₹189",
        image: "/images/dish_ragi_uttappam.jpeg",
        tag: "Nutrient Rich"
      },
      {
        id: "h6",
        name: "Ragi Masala Appa (12 Pcs)",
        category: "Healthy Bites",
        description: "Dozen golden-crusted ragi appe balls tossed with mustard, curry leaves, and green chillies. Ideal guilt-free snacking.",
        price: "₹229",
        image: "/images/dish_ragi_masala_appa_12_pcs.jpeg",
        tag: "Family Pack"
      }
    ]
  },
  {
    id: "shravan-special",
    title: "Shravan & Snacks Special",
    subtitle: "Fast-friendly Vrat / Upwas delicacies and crispy tea-time favorites.",
    items: [
      {
        id: "s1",
        name: "Sabudana Khichdi",
        category: "Shravan Special",
        description: "Non-sticky, soft sago pearls tossed with crushed roasted peanuts, cumin, green chillies, and sendha namak.",
        price: "₹199",
        image: "/images/dish_sabudana_khichdi.jpeg",
        tag: "Upwas Special"
      },
      {
        id: "s2",
        name: "Crispy Golden French Fries",
        category: "Snacks",
        description: "Crisp straight-cut potato fries lightly salted, fried in clean groundnut oil to a golden crunch.",
        price: "₹199",
        image: "/images/dish_french_fries.jpeg",
        tag: "Kids Favorite"
      }
    ]
  },
  {
    id: "korean-ramen",
    title: "Korean Ramen Special",
    subtitle: "Slurpy comforting hot broth bowls infused with rich aromatics and fresh noodles.",
    items: [
      {
        id: "k1",
        name: "Korean Kimchi Ramen",
        category: "Korean Ramen",
        description: "Tangy and savory broth with fermented kimchi punch, scallions, spring onions, and chewy ramen noodles.",
        price: "₹299",
        image: "/images/dish_korean_kimchi_ramen.jpeg",
        tag: "Chef Special"
      },
      {
        id: "k2",
        name: "Korean Hot & Spicy Ramen",
        category: "Korean Ramen",
        description: "Fiery aromatic chili broth loaded with vegetables, garlic chili oil, and satisfying noodles for spice lovers.",
        price: "₹299",
        image: "/images/dish_korean_hot___spicy_ramen.jpeg",
        tag: "Extra Spicy"
      },
      {
        id: "k3",
        name: "Korean Curry Ramen",
        category: "Korean Ramen",
        description: "Warm mildly spiced creamy golden curry broth enveloping tender noodles and freshly diced vegetables.",
        price: "₹299",
        image: "/images/dish_korean_curry_ramen.jpeg",
        tag: "Comforting"
      }
    ]
  },
  {
    id: "sweet-desserts",
    title: "Sweet Dish & Desserts",
    subtitle: "Unique dessert innovations loved by kids and adults alike.",
    items: [
      {
        id: "sw1",
        name: "Chocolate Dosa",
        category: "Sweet Dish",
        description: "Crispy thin dosa drizzled generously with premium melted chocolate sauce and cocoa sprinkles.",
        price: "₹199",
        image: "/images/dish_chocolate_dosa.jpeg",
        tag: "Unique"
      },
      {
        id: "sw2",
        name: "Chocolate Idli (4 Pcs)",
        category: "Sweet Dish",
        description: "Warm soft steamed chocolate-infused idlis bathed in warm chocolate ganache. A delightful dessert twist.",
        price: "₹179",
        image: "/images/dish_chocolate_idli_4_pcs.jpeg",
        tag: "Kids Love It"
      },
      {
        id: "sw3",
        name: "Mini Chocolate Pancakes (12 Pcs)",
        category: "Sweet Dish",
        description: "Bite-sized fluffy golden pancakes topped with decadent melted chocolate and chocolate chips.",
        price: "₹249",
        image: "/images/dish_mini_chocolate_pancakes_12_pcs.jpeg",
        tag: "Dessert Platter"
      }
    ]
  },
  {
    id: "south-indian-lunch",
    title: "The South Indian Lunch",
    subtitle: "Complete comforting homestyle rice meals prepared slow and served piping hot.",
    items: [
      {
        id: "m1",
        name: "Authentic Rasam Rice",
        category: "The South Indian Lunch",
        description: "Aromatic black-pepper and tamarind slow-simmered rasam mixed with fragrant steamed rice. Pure healing comfort.",
        price: "₹249",
        image: "/images/food_south_indian_thali_1793814074632.jpg",
        tag: "Healing Comfort"
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
        image: "/images/hero_indian_feast_1793814073236.jpg",
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
    id: "Single Franchisee",
    title: "Cloud Kitchen Pro (Dark Kitchen)",
    badge: "Most Popular · High ROI",
    tagline: "For ambitious entrepreneurs & dark kitchen operators",
    description: "Full delivery hub operating on Swiggy, Zomato and direct WhatsApp orders covering a 7km radius. Low Capex with zero expensive dining hall rent.",
    features: [
      "Footprint: 150 – 250 Sq. Ft. (Low-rent back alley / upper floor)",
      "One-time Franchise Fee: ₹3,99,000 (Non-Refundable)",
      "Low 5% Monthly Royalty on Net Sales (No yearly renewal fee)",
      "Standardised Premixes & SOPs (No Master Chef dependency)",
      "Turnkey Setup & Staff Kitchen Drills in 21 Days",
      "Direct WhatsApp Automated Ordering Integration"
    ],
    highlight: "Payback in 4 to 6 months with 28% to 35% estimated net operating margins."
  },
  {
    id: "Master Franchise",
    title: "City Master Franchise",
    badge: "Territory Exclusivity",
    tagline: "For seasoned investors seeking multi-unit regional expansion",
    description: "Exclusive master franchise rights for an entire city or district with cluster dark kitchen development and sub-franchise royalty sharing.",
    features: [
      "Exclusive territorial brand exclusivity for your entire city",
      "One-time Master Franchise Fee: ₹12,50,000",
      "Sub-franchising rights with 50% fee & royalty sharing",
      "Centralised premix distribution & logistics synergy",
      "Priority launch marketing & dedicated regional support",
      "Lifetime agreement validity with 5% monthly royalty"
    ],
    highlight: "Designed for high-net-worth investors and F&B business groups."
  }
];


export const WHY_PARTNER_PILLARS = [
  {
    number: "01",
    title: "Authentic Home-Style Food",
    subtitle: "A differentiated menu rooted in maternal affection",
    description: "In a market dominated by commercial fast food, Mom's Cloud Kitchen serves simple, pure, and wholesome comfort food that families and working professionals can enjoy every single day."
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
    subtitle: "Battle-tested cloud kitchen operations",
    description: "Founded in February 2024, our model has fulfilled over 4,000+ orders across top delivery aggregators (Swiggy, Zomato, Magicpin) with high repeat customer affinity."
  },
  {
    number: "05",
    title: "Rooted in Real Community Trust",
    subtitle: "Built from local authenticity in Vasai–Virar",
    description: "Our strong foundation in the Vasai-Virar region proves that authentic home-style food commands organic word-of-mouth trust and sustainable demand."
  }
];
