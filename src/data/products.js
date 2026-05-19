export const products = [
    {
        id: "classic-bread",
        category: "wildLoaves",
        name: "Classic",
        size: "1kg",
        priceUSD: 8,
        description:
            "The one that started it all. Naturally leavened and long-fermented for a crackly crust, an airy crumb, and that gentle tang only real sourdough has.",
        ingredients:
            "Wheat flour, water, sourdough starter, salt. No commercial yeast. No sugar added. 100% sourdough.",
        catalogImage: require("../assets/prices/classic.webp"),
        priceImage: require("../assets/prices/classic.webp"),
        featured: true,
        available: true,
    },
    {
        id: "whole-wheat-bread",
        category: "wildLoaves",
        name: "Whole Wheat",
        size: "1.2kg",
        priceUSD: 9,
        description:
            "A 24-hour fermentation with whole grain flours for deeper flavor, a hearty bite, and a more nourishing loaf.",
        ingredients:
            "Wheat flour, whole wheat flour, water, sourdough starter, salt. No commercial yeast. No sugar added. 100% sourdough.",
        catalogImage: require("../assets/prices/whole-wheat.webp"),
        priceImage: require("../assets/prices/whole-wheat.webp"),
        featured: true,
        available: true,
    },
    {
        id: "laminated-bread",
        category: "wildLoaves",
        name: "Butter Laminated",
        size: "1.2kg",
        priceUSD: 10,
        description:
            "Golden layers. A soft center. Big character. Crispy, buttery, and effortlessly elegant.",
        ingredients:
            "Wheat flour, water, sourdough starter, butter, salt. No commercial yeast. No sugar added. 100% sourdough.",
        catalogImage: require("../assets/prices/laminated.webp"),
        priceImage: require("../assets/prices/laminated.webp"),
        featured: true,
        available: true,
    },
    {
        id: "5-roots-bread",
        category: "wildLoaves",
        name: "5 Roots",
        size: "1.1kg",
        priceUSD: 16,
        description:
            "A naturally leavened white and whole wheat sourdough layered with sesame, sunflower, pumpkin, poppy seeds, and oats throughout the crumb and over the crust.",
        ingredients:
            "Wheat flour, whole wheat flour, sourdough starter, water, sesame seeds, sunflower seeds, pumpkin seeds, poppy seeds, oats, salt.",
        catalogImage: require("../assets/prices/4-roots.webp"),
        priceImage: require("../assets/prices/4-roots.webp"),
        featured: true,
        available: true,
    },
    {
        id: "focaccia-1kg",
        category: "slowCravings",
        name: "Focaccia",
        size: "1kg",
        priceUSD: 14,
        description:
            "Rustic, golden, and deeply satisfying. A moist crumb with a crisp exterior, finished with extra virgin olive oil.",
        ingredients:
            "Wheat flour, water, sourdough starter, rosemary, extra virgin olive oil, salt.",
        catalogImage: require("../assets/prices/focaccia.webp"),
        priceImage: require("../assets/prices/focaccia.webp"),
        featured: true,
        available: true,
    },
    // {
    //     id: "hoagies-bread",
    //     category: "slowCravings",
    //     name: "Hoagie Rolls",
    //     size: "4 pcs",
    //     priceUSD: 9,
    //     description:
    //         "Long, naturally leavened rolls with a light, airy crumb and a tender crust. Perfect for sandwiches or toasting.",
    //     ingredients:
    //         "Wheat flour, sourdough starter, water, whole wheat flour, butter, sugar, salt. No commercial yeast.",
    //     catalogImage: require("../assets/prices/hoagies.webp"),
    //     priceImage: require("../assets/prices/hoagies.webp"),
    //     featured: false,
    //     available: false,
    // },
    {
        id: "cachitos-bread",
        category: "slowCravings",
        name: "CACHITOS",
        size: "8 pcs",
        description:
            "Soft, golden sourdough cachitos with a delicate sweetness and a savory ham and bacon filling. Comforting, nostalgic, and baked fresh for slow mornings.",
        ingredients:
            "Wheat flour, milk, ham, bacon, butter, sugar, egg yolks, sourdough starter, salt.",
        priceUSD: 40,
        catalogImage: require("../assets/prices/cachito.webp"),
        priceImage: require("../assets/prices/cachito.webp"),
        featured: true,
        badge: "New",
    },
    {
        id: "mini-croissants",
        category: "slowCravings",
        name: "Mini Croissants",
        size: "16 pcs",
        priceUSD: 12,
        description:
            "Small, buttery bites with a tender crumb and a golden finish. Made slowly, made to share.",
        ingredients:
            "Wheat flour, sourdough starter, butter, milk, sugar, salt.",
        catalogImage: require("../assets/prices/mini-croissants.webp"),
        priceImage: require("../assets/prices/mini-croissants.webp"),
        featured: true,
        available: true,
    },
    {
        id: "tequenos-10pieces",
        category: "slowCravings",
        name: "Tequeños",
        size: "10 pcs",
        priceUSD: 11,
        description:
            "Crispy outside, creamy fresh cheese inside. Delivered par-baked so you can finish them golden in your air fryer.",
        ingredients:
            "Wheat flour, sourdough starter, water, butter, egg, sugar, salt, buffalo cheese.",
        catalogImage: require("../assets/prices/tequenos.webp"),
        priceImage: require("../assets/prices/tequenos.webp"),
        featured: false,
        available: false,
    },
    {
        id: "sandwich-loaf",
        category: "slowCravings",
        name: "Sandwich Loaf",
        size: "1kg",
        priceUSD: 8,
        description:
            "Soft, slightly sweet, and perfect for toast or sandwiches. Comfort bread, made slowly.",
        ingredients:
            "Wheat flour, milk, sourdough starter, butter, sugar, salt.",
        catalogImage: require("../assets/prices/sandwich-loaf.webp"),
        priceImage: require("../assets/prices/sandwich-loaf.webp"),
        featured: true,
        available: true,
    },
    {
        id: "sweet-milk-rolls",
        category: "slowCravings",
        name: "Sweet Milk Buns",
        size: "6 pcs",
        priceUSD: 10,
        description:
            "Soft, fluffy, and gently sweet. Perfect with coffee, breakfast, or an afternoon pause.",
        ingredients:
            "Wheat flour, milk, sourdough starter, sugar, butter, egg, salt.",
        catalogImage: require("../assets/prices/sweet-buns.webp"),
        priceImage: require("../assets/prices/sweet-buns.webp"),
        featured: true,
        available: true,
    },
    {
        id: "pizza-medium",
        category: "hearthPizzas",
        name: "Margherita",
        size: "Medium / 0.5kg",
        priceUSD: 22,
        description:
            "Naturally leavened crust, house tomato sauce, and fresh mozzarella. Simple ingredients, bold flavor.",
        ingredients:
            "Dough: wheat flour, water, sourdough starter, extra virgin olive oil, salt. Toppings: tomato sauce, mozzarella.",
        catalogImage: require("../assets/prices/pizza.webp"),
        priceImage: require("../assets/prices/pizza.webp"),
        featured: false,
        available: false,
    },

    {
        id: "chocolate-babka",
        category: "tenderSweets",
        name: "Chocolate Babka",
        size: "",
        priceUSD: 26,
        description:
            "Soft, naturally leavened dough, braided with melted dark chocolate and baked until rich, tender, and slightly caramelized on the edges.",
        ingredients:
            "Wheat flour, sourdough starter, butter, milk, dark chocolate, cocoa, egg, salt. No commercial yeast.",
        catalogImage: require("../assets/prices/chocolate-babka.webp"),
        priceImage: require("../assets/prices/chocolate-babka.webp"),
        featured: false,
        available: false,
    },

    {
        id: "tiramisu-sweet",
        category: "tenderSweets",
        name: "Tiramisu",
        size: "individual",
        priceUSD: 0,
        featured: true,
        available: true,
        badge: "Coming Soon",
        description: "Crafted with espresso-soaked savoiardi infused with a subtle touch of liqueur, velvety mascarpone cream, and finished with an exceptional gourmet cocoa. Rich, delicate, and deeply nostalgic — a dessert inspired by my Italian roots and made slowly, the SOURAW way.",
        ingredients: "Mascarpone, coffee, egg yolks, sugar, savoiardi biscuits, liqueur, gourmet cocoa powder.",
        catalogImage: require("../assets/prices/tiramisu.webp"),
        priceImage: require("../assets/prices/tiramisu.webp"),
    }, 

    {
        id: "cookies-sweet",
        category: "tenderSweets",
        name: "Chocolate Chip Cookies",
        prices: [
            {
                label: "Box of 12",
                priceUSD: 20,
            },
            {
                label: "Box of 24",
                priceUSD: 36,
            },
        ],
        featured: true,
        available: true,
        badge: "New",
        description: "Crispy edges, soft centers, and pools of melted dark chocolate. Slow-made, generously filled, and finished with flaky sea salt for the perfect sweet-salty bite.",
        ingredients: "Wheat flour, dark chocolate chips, butter, brown sugar, sugar, vanilla, baking soda, salt, eggs.",
        catalogImage: require("../assets/prices/cookies.webp"),
        priceImage: require("../assets/prices/cookies.webp"),
    }
];

export const categories = [
    { id: "wildLoaves", title: "Wild Loaves" },
    { id: "slowCravings", title: "Slow Cravings" },
    { id: "hearthPizzas", title: "Hearth Pizzas" },
    { id: "tenderSweets", title: "Tender Sweets" },
];

export const getProductsByCategory = (categoryId) =>
    products.filter((product) => product.category === categoryId);