import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
	return await prisma.student.findMany();
};

export const findById = async (id) => {
	return await prisma.student.findUnique({
		where: {
			id,
		},
	});
};

export const insert = async (student) => {
	return await prisma.student.create({
		data: { ...student },
	});
};

export const save = async (student) => {
	return await prisma.student.update({
		where: { id: student.id },
		data: { ...student },
	});
};

export const deleteOne = async (id) => {
	await prisma.student.delete({ where: { id } });
};
