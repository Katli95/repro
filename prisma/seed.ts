import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Alice",
        email: "alice@prisma.io",
        posts: {
            create: [
                {
                    id: 1,
                    title: "Join the Prisma Discord",
                    content: "https://pris.ly/discord",
                    published: true,
                },
            ],
        },
    },
    {
        name: "Nilu",
        email: "nilu@prisma.io",
        posts: {
            create: [
                {
                    id: 2,
                    title: "Follow Prisma on Twitter",
                    content: "https://www.twitter.com/prisma",
                    published: true,
                },
            ],
        },
    },
    {
        name: "Mahmoud",
        email: "mahmoud@prisma.io",
        posts: {
            create: [
                {
                    id: 3,
                    title: "Ask a question about Prisma on GitHub",
                    content: "https://www.github.com/prisma/prisma/discussions",
                    published: true,
                },
                {
                    id: 4,
                    title: "Prisma on YouTube",
                    content: "https://pris.ly/youtube",
                },
            ],
        },
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
