import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	// Hash passwords
	const password1 = await bcrypt.hash("password123", 10);
	const password2 = await bcrypt.hash("password456", 10);
	const password3 = await bcrypt.hash("password789", 10);

	const users = [
		{
			name: "Alice",
			email: "alice@example.com",
			password: password1,
			role: "user",
			phoneNumber: "78901567",
		},
		{
			name: "Bob",
			email: "bob@example.com",
			password: password2,
			role: "admin",
			phoneNumber: "88015676",
		},
		{
			name: "Charlie",
			email: "charlie@example.com",
			password: password3,
			role: "user",
			phoneNumber: "85417865",
		},
	];

	// Loop through the users and create each one
	for (const user of users) {
		await prisma.user.create({
			data: user,
		});
	}

	console.log("Sample users created!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
