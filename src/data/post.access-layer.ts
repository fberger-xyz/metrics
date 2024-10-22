'use server'

import { PrismaClient } from '@prisma/client'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const prisma = new PrismaClient()

export async function getPosts() {
    const { isAuthenticated } = getKindeServerSession()
    const isUserAuthenticated = await isAuthenticated()
    if (!isUserAuthenticated) return null

    // https://www.youtube.com/watch?v=DG_WT8Gwzho
    return await prisma.posts.findMany()
}
