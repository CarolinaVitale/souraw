const panes = [
    {
        id: 1,
        name: "Classic",
        description:
            "The one that started it all. Naturally leavened and long-fermented for 24 hours for a crackly crust, an airy crumb, and that gentle tang only real sourdough has. Simple. Honest. Alive.",
        ingredients:
            "Wheat flour, water, sourdough starter, bran, salt. No commercial yeast. No sugar added. 100% sourdough.",
        price: "$6.5 (1kg) BCV rate",
        image: require("../assets/clasico.webp"),
    },
    {
        id: 2,
        name: "Whole Wheat",
        description:
            "Slow food, daily bread. A 24-hour fermentation with whole grain flours for a deeper flavor, a hearty bite, and a more nourishing loaf. Comfort that feels good.",
        ingredients:
            "Wheat flour, whole wheat flour, water, sourdough starter, bran, salt. No commercial yeast. No sugar added. 100% sourdough.",
        price: "$10 (1.200kg) BCV rate",
        image: require("../assets/integral.webp"),
    },
    {
        id: 6,
        name: "Laminated",
        description:
            "Golden layers. A soft center. Big character. This is sourdough with a little extra drama—in the best way. Crispy, buttery, and effortlessly elegant.",
        ingredients:
            "Wheat flour, water, sourdough starter, butter, salt. No commercial yeast. No sugar added. 100% sourdough.",
        price: "$14 (1.200kg) BCV rate",
        image: require("../assets/hojaldre.webp"),
    },
    {
        id: 7,
        name: "4 Roots",
        description:
            "Seeds, balance, depth. White + whole wheat flour, naturally leavened, and finished with sesame, sunflower, pumpkin, and oats. Nutritious, tender-crumbed, and full of that slow-fermented flavor.",
        ingredients:
            "Wheat flour, whole wheat flour, sourdough starter, water, sesame seeds, sunflower seeds, pumpkin seeds, oats, salt. No commercial yeast. No sugar added. 100% sourdough.",
        price: "$15 (1.100kg) BCV rate",
        image: require("../assets/4-raices.webp"),
    },
];

export default panes;