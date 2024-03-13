"use server";
import prisma from "@/lib/db-tools";
import { cache } from "react";

/**
 *
 * @returns List of conditions with id, name, and descriptions
 */
export const getAllConditions = cache(async () => {
    const conditions = await prisma.condition.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return conditions;
});

/**
 *
 * @param id
 * @returns an specific condition with id, name, and doctors connected
 */
export const getConditionById = cache(async (id: string) => {
    const data = await prisma.condition.findUnique({
        where: {
            id,
        },
        include: {
            doctors: true,
        },
    });

    return data;
});
