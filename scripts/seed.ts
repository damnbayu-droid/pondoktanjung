import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const menuItems = [
    // Paket
    {
        name: "Paket Hemat 1",
        description: "Lalapan ayam, nasi, dan es teh manis",
        price: 33000,
        category: "Paket",
        highlight: true,
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop"
    },
    {
        name: "Paket Hemat 2",
        description: "Lalapan mujair tepung, nasi, dan es jeruk",
        price: 40000,
        category: "Paket",
        highlight: true,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop"
    },
    {
        name: "Paket Keluarga",
        description: "2 Lalapan ayam, 2 Nasi goreng spesial, dan 4 Es teh manis",
        price: 110000,
        category: "Paket",
        highlight: true,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"
    },
    // Makanan
    {
        name: "Lalapan ayam + nasi",
        description: "Ayam goreng gurih disajikan dengan lalapan segar dan nasi hangat",
        price: 30000,
        category: "Makanan",
        highlight: false,
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop"
    },
    {
        name: "Lalapan mujair tepung + nasi",
        description: "Ikan mujair goreng tepung renyah dengan lalapan segar",
        price: 35000,
        category: "Makanan",
        highlight: false,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop"
    },
    {
        name: "Nasi goreng spesial",
        description: "Nasi goreng dengan telur, ayam, dan sayuran segar",
        price: 28000,
        category: "Makanan",
        highlight: true,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop"
    },
    {
        name: "Mie goreng",
        description: "Mie goreng dengan telur, sayuran, dan bumbu spesial",
        price: 25000,
        category: "Makanan",
        highlight: false,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop"
    },
    {
        name: "Ayam bakar madu",
        description: "Ayam bakar dengan saus madu manis gurih",
        price: 32000,
        category: "Makanan",
        highlight: false,
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop"
    },
    {
        name: "Ikan bakar",
        description: "Ikan segar dibakar dengan bumbu khas",
        price: 40000,
        category: "Makanan",
        highlight: false,
        image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop"
    },
    // Minuman
    {
        name: "Es teh manis",
        description: "Teh manis dingin yang menyegarkan",
        price: 5000,
        category: "Minuman",
        highlight: false,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop"
    },
    {
        name: "Es jeruk",
        description: "Jus jeruk segar dengan es batu",
        price: 8000,
        category: "Minuman",
        highlight: false,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop"
    },
    {
        name: "Kopi hitam",
        description: "Kopi hitam asli yang nikmat",
        price: 10000,
        category: "Minuman",
        highlight: false,
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop"
    },
    {
        name: "Kopi susu",
        description: "Kopi dengan susu creamy",
        price: 15000,
        category: "Minuman",
        highlight: false,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop"
    },
    {
        name: "Jus alpukat",
        description: "Jus alpukat segar dengan susu kental manis",
        price: 18000,
        category: "Minuman",
        highlight: false,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop"
    },
    {
        name: "Jus mangga",
        description: "Jus mangga manis dan segar",
        price: 15000,
        category: "Minuman",
        highlight: false,
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop"
    }
];

async function main() {
    console.log('🚀 Starting manual seed...');

    try {
        // Delete existing items to avoid duplicates
        await prisma.orderItem.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.product.deleteMany({});

        console.log('🗑️  Existing data cleared.');

        for (const item of menuItems) {
            await prisma.product.create({
                data: item,
            });
        }

        console.log(`✅ Seeded ${menuItems.length} items successfully.`);
    } catch (error) {
        console.error('❌ Seed failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
