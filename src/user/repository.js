import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
	return await prisma.user.findMany();
};

export const findById = async (id) => {
	return await prisma.user.findUnique({ where: { id } });
};

export const findByEmail = async (email) => {
	return await prisma.user.findUnique({ where: { email } });
};

export const create = async (user) => {
	return await prisma.user.create({
		data: { ...user },
	});
};

export const save = async (id, user) => {
	return await prisma.user.update({
		where: { id },
		data: { ...user },
	});
};

export const remove = async (id) => {
	return await prisma.user.delete({ where: { id } });
};
