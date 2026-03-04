import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create categories
  const categories = [
    { name: 'DeFi', slug: 'defi' },
    { name: 'NFT', slug: 'nft' },
    { name: 'Gaming', slug: 'gaming' },
    { name: 'Infrastructure', slug: 'infrastructure' },
    { name: 'DAO', slug: 'dao' },
    { name: 'Social', slug: 'social' },
    { name: 'Tools', slug: 'tools' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('Categories created');

  // Create a demo admin user (replace with your wallet address)
  const adminWallet = process.env.ADMIN_WALLETS?.split(',')[0];
  if (adminWallet) {
    await prisma.user.upsert({
      where: { walletAddress: adminWallet },
      update: { isAdmin: true },
      create: {
        walletAddress: adminWallet,
        isAdmin: true,
      },
    });
    console.log(`Admin user created: ${adminWallet}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
