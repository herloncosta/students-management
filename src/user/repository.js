import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const findByEmail = async (email) => {
	return await prisma.user.findUnique({ where: { email } })
}

export const create = async (user) => {
	return await prisma.user.create({ data: { ...user } })
}

export const save = async (id, user) => {
	return await prisma.user.update({ where: { id }, data: { ...user } })
}

export const remove = async (id) => {
	return await prisma.user.delete({ where: { id } })
}
