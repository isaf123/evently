import prisma from "@/prisma"
import { Response } from "express"

export const getEvents = async (q: string) => {
    try {
        const events = await prisma.masterEvent.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: q,
                        }
                    },
                    {
                        user_id: {
                            name: {
                                contains: q
                            }
                        }
                    }
                ]
            },
            include: {
                user_id: {
                    select: {
                        name: true
                    }
                }

            }
        })
        console.log('data events', events);
        return events
    } catch (error) {
        throw error
    }
}