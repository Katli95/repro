import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// POST /api/test
// Required fields in body: name, email
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const idOfCreatedToConnect = "the-thing-to-be-connected";
        const result = await prisma.thingA.create({
            data: {
                id: "xojzl4x26txb0tt1vztdakdd",
                parts: {
                    create: [
                        {
                            childUtility: {
                                create: {
                                    childA: {
                                        // Here the thing should be created
                                        // originally we used `create` but tried `connectOrCreate` as a fallback
                                        // it didn't work so maybe we'll go back to create here
                                        connectOrCreate: {
                                            where: { id: idOfCreatedToConnect },
                                            create: {
                                                id: idOfCreatedToConnect,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        {
                            childUtility: {
                                create: {
                                    childB: {
                                        connectOrCreate: {
                                            where: { id: "v3h22nh8cw46imjkspl2w2d0" },
                                            create: {
                                                id: "v3h22nh8cw46imjkspl2w2d0",
                                                childUtility: {
                                                    create: {
                                                        childA: {
                                                            connectOrCreate: {
                                                                where: { id: "wqm5z06cof3kbbf4lrzk3zo9" },
                                                                create: {
                                                                    id: "wqm5z06cof3kbbf4lrzk3zo9",
                                                                    parts: {
                                                                        create: [
                                                                            {
                                                                                childUtility: {
                                                                                    create: {
                                                                                        childB: {
                                                                                            connectOrCreate: {
                                                                                                where: {
                                                                                                    id: "eokkmtd95f2nq6dyzfyeplpg",
                                                                                                },
                                                                                                create: {
                                                                                                    id: "eokkmtd95f2nq6dyzfyeplpg",
                                                                                                    childUtility: {
                                                                                                        create: {
                                                                                                            // Here the thing should be connected
                                                                                                            // again originally we used `connect` but tried `connectOrCreate` as a fallback
                                                                                                            // it didn't work so maybe we'll go back to connect here
                                                                                                            childA: {
                                                                                                                connectOrCreate:
                                                                                                                    {
                                                                                                                        where: {
                                                                                                                            id: idOfCreatedToConnect,
                                                                                                                        },
                                                                                                                        create: {
                                                                                                                            id: idOfCreatedToConnect,
                                                                                                                        },
                                                                                                                    },
                                                                                                            },
                                                                                                        },
                                                                                                    },
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        ],
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        });

        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Noop");
    }
}
