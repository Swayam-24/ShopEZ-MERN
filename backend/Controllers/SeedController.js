const Product = require('../Models/Product');
const Address = require('../Models/Address');
const mongoose = require('mongoose');

const seedProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        const products = [
            {
                id: 1, title: 'Premium Luxury Watch', brand: 'TopBrand', category: 'Popular', gender: 'Unisex',
                image: '/images/product_watch_rosegold.png', price: 2500, rating: '4.5', ratingCount: '100', originalPrice: '₹3000',
                description: 'Experience refined elegance with the Premium Luxury Watch. This stunning masterpiece features a rosegold link bracelet, precision analog movement, and a sophisticated white dial. Housed in a premium presentation box, it is the ultimate accessory for the modern professional.',
                images: [
                    '/images/product_watch_rosegold.png',
                    '/images/product_watch_strap.png'
                ]
            },
            {
                id: 2, title: 'Classic Black Watch', brand: 'TopBrand', category: 'Popular', gender: 'Unisex',
                image: '/images/product_watch_black.png', price: 1800, rating: '4.6', ratingCount: '200', originalPrice: '₹2200',
                description: 'The Classic Black Watch is a timeless piece for any wardrobe. Its sleek, minimalist design is paired with a durable leather-feel strap and precision quartz movement, making it as reliable as it is stylish.',
                images: [
                    '/images/product_watch_black.png',
                    '/images/product_watch_black_side.png'
                ]
            },
            {
                id: 3, title: 'Nokia 105 Essential', brand: 'Nokia', category: 'Mobiles', gender: 'Unisex',
                image: '/images/product_nokia_105.png', price: 1042, rating: '4.2', ratingCount: '500', originalPrice: '₹1349',
                description: 'The Nokia 105 Essential is a modern classic, designed for those who value reliability and simplicity. With its ergonomic contoured design and long-lasting battery life, it is the perfect companion for daily communication.',
                images: [
                    '/images/product_nokia_105.png',
                    '/images/product_nokia_105_back.png',
                    '/images/product_nokia_105_side.png'
                ]
            },
            {
                id: 4, title: 'NextGen Smartphone Black', brand: 'MobileTech', category: 'Mobiles', gender: 'Unisex',
                image: '/images/smartphone_modern.png', price: 25000, rating: '4.4', ratingCount: '1000', originalPrice: '₹28000',
                description: 'Experience the future with the NextGen Smartphone. Featuring a stunning AMOLED display, a triple-lens camera system for professional-grade photography, and a powerful processor for seamless multitasking.',
                images: [
                    '/images/smartphone_modern.png',
                    '/images/product_smartphone_back.png'
                ]
            },
            {
                id: 5, title: 'Pro Audio Headphones', brand: 'SoundPro', category: 'Electronics', gender: 'Unisex',
                image: '/images/product_headphones_black.png', price: 5000, rating: '4.8', ratingCount: '1200', originalPrice: '₹7000',
                description: 'Immerse yourself in pure sound with Pro Audio Headphones. Designed for studio-level quality, these headphones offer noise isolation, protein leather ear pads, and a foldable design for portability.',
                images: [
                    '/images/product_headphones_black.png',
                    '/images/product_headphones_folded.png'
                ]
            },
            {
                id: 6, title: 'Neon RGB Gaming Mouse', brand: 'GameLogic', category: 'Electronics', gender: 'Unisex',
                image: '/images/gaming_mouse.png', price: 1500, rating: '4.5', ratingCount: '300', originalPrice: '₹2000',
                description: 'Dominate the game with the Neon RGB Gaming Mouse. Featuring customizable DPI settings, ergonomic side grips, and vibrant RGB lighting to match your gaming setup.',
                images: [
                    '/images/gaming_mouse.png',
                    '/images/product_mouse_side.png'
                ]
            },
            {
                id: 7, title: 'Silk Saree Elegance', brand: 'Vogue', category: 'Fashion', gender: 'Women',
                image: '/images/product_saree_full.png', price: 3500, rating: '4.7', ratingCount: '80', originalPrice: '₹5000',
                description: 'Celebrate tradition with the Silk Saree Elegance. This luxurious light blue saree features intricate gold zari thread work and a rich pallu, perfect for weddings and festive occasions.',
                images: [
                    '/images/product_saree_full.png',
                    '/images/product_saree_pallu_new.png'
                ]
            },
            {
                id: 8, title: 'Purple Rayon Kurta', brand: 'StyleCo', category: 'Fashion', gender: 'Women',
                image: '/images/product_kurta_purple.png', price: 519, rating: '4.2', ratingCount: '1238', originalPrice: '₹2499',
                description: 'Stay comfortable and stylish with the Purple Rayon Kurta. Crafted from soft, breathable rayon fabric, this kurta features elegant embroidery and a modern silhouette.',
                images: [
                    '/images/product_kurta_purple.png',
                    '/images/product_kurta_purple_back.png'
                ]
            },
            {
                id: 9, title: 'Quick Foam Shoe Cleaner', brand: 'HomeGlow', category: 'Home', gender: 'Unisex',
                image: '/images/product_shoe_cleaner.png', price: 167, rating: '4.3', ratingCount: '150', originalPrice: '₹599',
                description: 'Keep your footwear looking brand new with Quick Foam Shoe Cleaner. Its powerful yet gentle formula removes dirt and stains instantly from leather, suede, and canvas.',
                images: ['/images/product_shoe_cleaner.png']
            },
            {
                id: 10, title: 'Premium Cotton Nighty', brand: 'ComfortPlus', category: 'Home', gender: 'Women',
                image: '/images/product_nighty_full.png', price: 799, rating: '4.5', ratingCount: '220', originalPrice: '₹1299',
                description: 'Enjoy a restful night with the Premium Cotton Nighty. Made from soft, 100% breathable cotton fabric with a gentle floral print, it offers a relaxed fit for maximum overnight comfort.',
                images: [
                    '/images/product_nighty_full.png',
                    '/images/product_nighty_fabric.png'
                ]
            },
            {
                id: 11, title: 'Handcrafted Coffee Mug', brand: 'KitchenPro', category: 'Home', gender: 'Unisex',
                image: '/images/coffee_mug.png', price: 350, rating: '4.7', ratingCount: '150', originalPrice: '₹500',
                description: 'Start your morning with a touch of elegance. This Handcrafted Coffee Mug is made from premium ceramic with a polished finish and an ergonomic handle.',
                images: ['/images/coffee_mug.png']
            },
            {
                id: 12, title: 'Premium Leather Belt', brand: 'LuxeAccessories', category: 'Fashion', gender: 'Men',
                image: '/images/leather_belt.png', price: 850, rating: '4.5', ratingCount: '230', originalPrice: '₹1200',
                description: 'Add the perfect finishing touch to your outfit with the Premium Leather Belt. Featuring a brushed silver buckle and top-grain leather for durability and style.',
                images: [
                    '/images/leather_belt.png',
                    '/images/product_belt_buckle.png'
                ]
            },
            {
                id: 13, title: 'Under ₹499', brand: 'Trackpant combo', category: 'Offers', gender: 'Men',
                image: '/images/offers-trackpant.png', price: 499, rating: '4.3', ratingCount: '500', originalPrice: '₹999',
                description: 'Upgrade your training gear with this exclusive Trackpant combo. Made from breathable, sweat-wicking fabric for maximum performance.',
                images: ['/images/offers-trackpant.png']
            },
            {
                id: 19, title: 'Grey Sport Joggers', brand: 'SportFit', category: 'Trackpants', gender: 'Men',
                image: '/images/more_trackpants_1.png', price: 799, rating: '4.5', ratingCount: '200', originalPrice: '₹1299',
                description: 'Premium grey athletic trackpants for men. Lightweight and perfect for training.',
                images: ['/images/more_trackpants_1.png']
            },
            {
                id: 20, title: 'Black Slim Joggers', brand: 'SportFit', category: 'Trackpants', gender: 'Men',
                image: '/images/more_trackpants_2.png', price: 899, rating: '4.6', ratingCount: '150', originalPrice: '₹1499',
                description: 'Black slim-fit joggers for active wear and casual weekends.',
                images: ['/images/more_trackpants_2.png']
            },
            {
                id: 14, title: 'Min. 70% Off', brand: 'Trendy t-shirts', category: 'Offers', gender: 'Unisex',
                image: '/images/offers-tshirts.png', price: 299, rating: '4.4', ratingCount: '1200', originalPrice: '₹999',
                description: 'Express your style with Trendy t-shirts. Featuring unique prints and soft cotton fabric.',
                images: ['/images/offers-tshirts.png']
            },
            {
                id: 21, title: 'Classic White Tee', brand: 'CasualVibe', category: 'T-Shirts', gender: 'Unisex',
                image: '/images/more_tshirts_1.png', price: 499, rating: '4.7', ratingCount: '300', originalPrice: '₹799',
                description: 'A white minimalist crew neck t-shirt for men, clean design and soft cotton.',
                images: ['/images/more_tshirts_1.png']
            },
            {
                id: 22, title: 'Navy Graphic Tee', brand: 'CasualVibe', category: 'T-Shirts', gender: 'Unisex',
                image: '/images/more_tshirts_2.png', price: 599, rating: '4.5', ratingCount: '450', originalPrice: '₹999',
                description: 'A dark navy blue graphic t-shirt for men, minimalist logo and high quality cotton.',
                images: ['/images/more_tshirts_2.png']
            },
            {
                id: 15, title: 'Min. 80% Off', brand: 'Style your way', category: 'Offers', gender: 'Women',
                image: '/images/offers-style.png', price: 899, rating: '4.6', ratingCount: '800', originalPrice: '₹4499',
                description: 'Redefine elegance with our "Style your way" collection. Premium fabrics and timeless designs.',
                images: ['/images/offers-style.png']
            },
            {
                id: 23, title: 'Purple Rayon Kurta XL', brand: 'StyleCo', category: 'Style', gender: 'Women',
                image: '/images/product_kurta_purple.png', price: 1299, rating: '4.8', ratingCount: '120', originalPrice: '₹2499',
                description: 'Elegant purple rayon kurta with intricate embroidery.',
                images: [
                    '/images/product_kurta_purple.png',
                    '/images/product_kurta_purple_back.png'
                ]
            },
            {
                id: 24, title: 'Yellow Festive Kurta', brand: 'StyleCo', category: 'Style', gender: 'Women',
                image: '/images/product_kurta_yellow.png', price: 1099, rating: '4.6', ratingCount: '90', originalPrice: '₹1999',
                description: 'Vibrant yellow kurta for festive occasions, comfortable and stylish.',
                images: ['/images/product_kurta_yellow.png']
            },
            {
                id: 16, title: 'Under ₹999', brand: 'Casual shoes', category: 'Offers', gender: 'Unisex',
                image: '/images/offers-shoes.png', price: 999, rating: '4.5', ratingCount: '1500', originalPrice: '₹1999',
                description: 'Comfort meets style with our Casual shoes. Lightweight and durable.',
                images: ['/images/offers-shoes.png']
            },
            {
                id: 25, title: 'B&W Leather Sneakers', brand: 'StepUp', category: 'Shoes', gender: 'Unisex',
                image: '/images/more_shoes_1.png', price: 1499, rating: '4.7', ratingCount: '400', originalPrice: '₹2499',
                description: 'Modern black and white leather sneakers, sleek minimalist design.',
                images: ['/images/more_shoes_1.png']
            },
            {
                id: 26, title: 'Tan Brown Casuals', brand: 'StepUp', category: 'Shoes', gender: 'Men',
                image: '/images/more_shoes_2.png', price: 1899, rating: '4.6', ratingCount: '350', originalPrice: '₹2999',
                description: 'High-end leather casual shoes for men, tan brown color and premium texture.',
                images: ['/images/more_shoes_2.png']
            },
            {
                id: 17, title: 'Min. 50% Off', brand: 'Smartwatches', category: 'Offers', gender: 'Unisex',
                image: '/images/offers-watch.png', price: 1999, rating: '4.7', ratingCount: '2000', originalPrice: '₹3999',
                description: 'Stay connected and track your fitness with our advanced Smartwatches.',
                images: ['/images/offers-watch.png']
            },
            {
                id: 27, title: 'Classic Black Watch Pro', brand: 'TopBrand', category: 'Watches', gender: 'Unisex',
                image: '/images/product_watch_black.png', price: 2999, rating: '4.8', ratingCount: '500', originalPrice: '₹4999',
                description: 'Professional grade classic black watch, rugged and reliable.',
                images: [
                    '/images/product_watch_black.png',
                    '/images/product_watch_black_side.png'
                ]
            },
            {
                id: 28, title: 'Luxury RoseGold Watch', brand: 'TopBrand', category: 'Watches', gender: 'Unisex',
                image: '/images/product_watch_rosegold.png', price: 3499, rating: '4.9', ratingCount: '150', originalPrice: '₹5999',
                description: 'Stunning luxury rosegold watch, the perfect accessory for professionals.',
                images: [
                    '/images/product_watch_rosegold.png',
                    '/images/product_watch_strap.png'
                ]
            },
            {
                id: 18, title: 'Extra 20% Off', brand: 'Wireless Headphones', category: 'Offers', gender: 'Unisex',
                image: '/images/offers-headphones.png', price: 1500, rating: '4.8', ratingCount: '3000', originalPrice: '₹2499',
                description: 'Experience pure audio freedom with Wireless Headphones.',
                images: ['/images/offers-headphones.png']
            },
            {
                id: 29, title: 'Pro Audio OverEar Black', brand: 'SoundPro', category: 'Audio', gender: 'Unisex',
                image: '/images/product_headphones_black.png', price: 5499, rating: '4.9', ratingCount: '600', originalPrice: '₹7999',
                description: 'High-end black over-ear headphones, minimalist design and crisp sound.',
                images: ['/images/product_headphones_black.png']
            },
            {
                id: 30, title: 'Studio Foldable Headphones', brand: 'SoundPro', category: 'Audio', gender: 'Unisex',
                image: '/images/product_headphones_folded.png', price: 4299, rating: '4.8', ratingCount: '450', originalPrice: '₹5999',
                description: 'Professional studio foldable headphones, designed for portability and quality.',
                images: ['/images/product_headphones_folded.png']
            },
            {
                id: 31, title: 'Luxury Face Cream', brand: 'BeautyPro', category: 'Beauty', gender: 'Women',
                image: '/images/beauty_cream.png', price: 1299, rating: '4.8', ratingCount: '150', originalPrice: '₹1999',
                description: 'Premium hydrating face cream for a radiant glow.',
                images: ['/images/beauty_cream.png']
            },
            {
                id: 32, title: 'Classic Red Lipstick', brand: 'BeautyPro', category: 'Beauty', gender: 'Women',
                image: '/images/beauty_lipstick.png', price: 899, rating: '4.7', ratingCount: '200', originalPrice: '₹1200',
                description: 'Long-lasting matte red lipstick for a bold look.',
                images: ['/images/beauty_lipstick.png']
            },
            {
                id: 33, title: 'Stainless Steel Microwave', brand: 'KitchenTech', category: 'Appliances', gender: 'Unisex',
                image: '/images/appliance_microwave.png', price: 8500, rating: '4.6', ratingCount: '300', originalPrice: '₹12000',
                description: 'Modern 20L microwave oven with digital controls.',
                images: ['/images/appliance_microwave.png']
            },
            {
                id: 34, title: 'Digital Air Fryer', brand: 'KitchenTech', category: 'Appliances', gender: 'Unisex',
                image: '/images/appliance_airfryer.png', price: 5999, rating: '4.8', ratingCount: '450', originalPrice: '₹8999',
                description: 'Healthy cooking with little to no oil.',
                images: ['/images/appliance_airfryer.png']
            },
            {
                id: 35, title: 'Soft Teddy Bear', brand: 'KidsJoy', category: 'Toys & Baby', gender: 'Unisex',
                image: '/images/toy_teddy.png', price: 699, rating: '4.9', ratingCount: '500', originalPrice: '₹999',
                description: 'Perfect companion for children, made from soft plush.',
                images: ['/images/toy_teddy.png']
            },
            {
                id: 36, title: 'Modern Baby Stroller', brand: 'KidsJoy', category: 'Toys & Baby', gender: 'Unisex',
                image: '/images/toy_stroller.png', price: 4500, rating: '4.7', ratingCount: '120', originalPrice: '₹6500',
                description: 'Lightweight and foldable stroller for easy travel.',
                images: ['/images/toy_stroller.png']
            },
            {
                id: 37, title: 'Whey Protein Isolate', brand: 'NutriFit', category: 'Food & Health', gender: 'Unisex',
                image: '/images/food_protein.png', price: 2999, rating: '4.8', ratingCount: '800', originalPrice: '₹3999',
                description: 'High-quality protein to support muscle growth and recovery.',
                images: ['/images/food_protein.png']
            },
            {
                id: 38, title: 'Granola Energy Bar', brand: 'NutriFit', category: 'Food & Health', gender: 'Unisex',
                image: '/images/food_granola.png', price: 499, rating: '4.6', ratingCount: '1000', originalPrice: '₹799',
                description: 'Healthy snack for on-the-go energy.',
                images: ['/images/food_granola.png']
            },
            {
                id: 39, title: 'Portable Tire Inflator', brand: 'AutoCare', category: 'Auto Gear', gender: 'Unisex',
                image: '/images/auto_pump.png', price: 2499, rating: '4.7', ratingCount: '250', originalPrice: '₹3499',
                description: 'Compact and powerful car pump with digital display.',
                images: ['/images/auto_pump.png']
            },
            {
                id: 40, title: 'Luxury Car Perfume', brand: 'AutoCare', category: 'Auto Gear', gender: 'Unisex',
                image: '/images/auto_perfume.png', price: 399, rating: '4.5', ratingCount: '600', originalPrice: '₹599',
                description: 'Long-lasting premium fragrance for your car.',
                images: ['/images/auto_perfume.png']
            },
            {
                id: 41, title: 'Electric Smart Scooter', brand: 'EcoDrive', category: 'Two Wheelers', gender: 'Unisex',
                image: '/images/two_scooter.png', price: 15000, rating: '4.8', ratingCount: '100', originalPrice: '₹20000',
                description: 'Modern electric scooter with smart connectivity.',
                images: ['/images/two_scooter.png']
            },
            {
                id: 42, title: 'Matte Black Helmet', brand: 'EcoDrive', category: 'Two Wheelers', gender: 'Unisex',
                image: '/images/two_helmet.png', price: 1999, rating: '4.7', ratingCount: '350', originalPrice: '₹2999',
                description: 'Safety first with this stylish matte black helmet.',
                images: ['/images/two_helmet.png']
            },
            {
                id: 43, title: 'Professional Football', brand: 'SportOne', category: 'Sports', gender: 'Unisex',
                image: '/images/sports_football.png', price: 1200, rating: '4.9', ratingCount: '400', originalPrice: '₹1800',
                description: 'FIFA standard football for professional matches.',
                images: ['/images/sports_football.png']
            },
            {
                id: 44, title: 'English Willow Bat', brand: 'SportOne', category: 'Sports', gender: 'Men',
                image: '/images/sports_bat.png', price: 5000, rating: '4.8', ratingCount: '150', originalPrice: '₹7500',
                description: 'Premium cricket bat for serious players.',
                images: ['/images/sports_bat.png']
            },
            {
                id: 45, title: 'Bestselling Novel', brand: 'BookWorld', category: 'Books', gender: 'Unisex',
                image: '/images/book_novel.png', price: 499, rating: '4.7', ratingCount: '500', originalPrice: '₹799',
                description: 'A gripping tale of adventure and mystery.',
                images: ['/images/book_novel.png']
            },
            {
                id: 46, title: 'Minimalist Journal', brand: 'BookWorld', category: 'Books', gender: 'Unisex',
                image: '/images/book_journal.png', price: 350, rating: '4.8', ratingCount: '300', originalPrice: '₹550',
                description: 'High-quality paper for your thoughts and ideas.',
                images: ['/images/book_journal.png']
            },
            {
                id: 47, title: 'Ergonomic Office Chair', brand: 'HomeStyle', category: 'Furniture', gender: 'Unisex',
                image: '/images/furniture_chair.png', price: 7500, rating: '4.7', ratingCount: '200', originalPrice: '₹10000',
                description: 'Comfortable seating for long work hours.',
                images: ['/images/furniture_chair.png']
            },
            {
                id: 48, title: 'Minimalist Table Lamp', brand: 'HomeStyle', category: 'Furniture', gender: 'Unisex',
                image: '/images/furniture_lamp.png', price: 1200, rating: '4.6', ratingCount: '150', originalPrice: '₹1800',
                description: 'Elegant lamp to brighten up your workspace.',
                images: ['/images/furniture_lamp.png']
            },
            {
                id: 49, title: 'Solar Efficiency Panel Kit', brand: 'EcoPower', category: 'Solar', gender: 'Unisex',
                image: '/images/solar_panel.png', price: 15000, rating: '4.9', ratingCount: '100', originalPrice: '₹20000',
                description: 'High-efficiency monocrystalline solar panels for professional home energy setups. Optimized for maximum power generation in all conditions.',
                images: ['/images/solar_panel.png']
            },
            {
                id: 50, title: 'Portable Solar Generator Pro', brand: 'EcoPower', category: 'Solar', gender: 'Unisex',
                image: '/images/solar_generator.png', price: 25000, rating: '4.7', ratingCount: '80', originalPrice: '₹35000',
                description: 'Rugged portable solar power station with a built-in handle and digital display. Perfect for outdoor use and emergency backup.',
                images: ['/images/solar_generator.png']
            },
            {
                id: 51, title: 'Voltas 1.5 Ton Inverter AC', brand: 'Voltas', category: 'Voltas', gender: 'Unisex',
                image: '/images/voltas_split_ac.png', price: 38000, rating: '4.8', ratingCount: '400', originalPrice: '₹48000',
                description: 'Premium Voltas Inverter Split AC with sleek design, high cooling capacity, and energy-saving technology for ultimate comfort.',
                images: ['/images/voltas_split_ac.png']
            },
            {
                id: 52, title: 'Voltas 1.5 Ton Window AC', brand: 'Voltas', category: 'Voltas', gender: 'Unisex',
                image: '/images/voltas_window_ac.png', price: 28000, rating: '4.7', ratingCount: '250', originalPrice: '₹35000',
                description: 'Modern Voltas Window Air Conditioner with energy-efficient digital controls, powerful cooling, and a durable build.',
                images: ['/images/voltas_window_ac.png']
            },
            {
                id: 53, title: 'ASUS ROG Strix Gaming Laptop', brand: 'Gaming Laptop', category: 'Gaming Laptop', gender: 'Unisex',
                image: '/images/gaming_laptop_1.png', price: 95000, rating: '4.9', ratingCount: '600', originalPrice: '₹120000',
                description: 'High-performance ASUS ROG Strix gaming laptop featuring per-key RGB keyboard, powerful GPU, and high-refresh-rate display.',
                images: ['/images/gaming_laptop_1.png']
            },
            {
                id: 54, title: 'MSI Stealth 16 Gaming Laptop', brand: 'Gaming Laptop', category: 'Gaming Laptop', gender: 'Unisex',
                image: '/images/gaming_laptop_2.png', price: 110000, rating: '4.8', ratingCount: '300', originalPrice: '₹140000',
                description: 'Ultra-slim and powerful MSI Stealth Studio gaming laptop. Professional look with top-tier performance for gaming and creation.',
                images: ['/images/gaming_laptop_2.png']
            },
            {
                id: 55, title: 'Handcrafted Blue Silk Saree', brand: 'ElegantStyle', category: 'Latest', gender: 'Women',
                image: '/images/product_saree_full.png', price: 4200, rating: '4.9', ratingCount: '150', originalPrice: '₹5500',
                description: 'A masterpiece of traditional craftsmanship, this handcrafted silk saree in deep blue features exquisite gold zari borders and a shimmering pallu. Ideal for weddings and premium events.',
                images: ['/images/product_saree_full.png', '/images/product_saree_pallu_new.png']
            },
            {
                id: 56, title: 'Premium Embroidered Kurta', brand: 'StyleCo', category: 'Latest', gender: 'Women',
                image: '/images/product_kurta_purple.png', price: 1599, rating: '4.8', ratingCount: '210', originalPrice: '₹2999',
                description: 'This premium purple kurta is made from breathable rayon-silk blend, featuring delicate hand-embroidery and a modern straight-cut silhouette for a sophisticated look.',
                images: ['/images/product_kurta_purple.png', '/images/product_kurta_purple_back.png']
            }
        ];
        await Product.insertMany(products);
        res.status(200).json({ success: true, message: 'Database successfully seeded from cloud!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const autoSeedAddress = async (req, res) => {
    try {
        // Find all users from the users collection
        const users = await mongoose.connection.db.collection('users').find({}).toArray();
        
        let count = 0;
        for (const user of users) {
            // Check if user already has an address
            const existingAddress = await Address.findOne({ userId: user._id });
            if (!existingAddress) {
                const newAddress = new Address({
                    userId: user._id,
                    name: user.name || "Swayam Satapathy",
                    mobile: "9692058359",
                    pincode: "751006",
                    locality: "Laxmisagar",
                    addressLine: "Plot No-264, Lane-C, Santoshi Vihar, Santoshi Vihar Park",
                    city: "Bhubaneswar",
                    state: "Odisha",
                    addressType: "Home"
                });
                await newAddress.save();
                count++;
            }
        }
        res.status(200).json({ success: true, message: `Successfully seeded addresses for ${count} users!` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { seedProducts, autoSeedAddress };
