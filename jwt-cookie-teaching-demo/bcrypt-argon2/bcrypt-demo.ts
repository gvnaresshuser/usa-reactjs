/*
npm install bcrypt
npm install -D typescript tsx @types/bcrypt

FOR TYPESCRIPT INSTALL THESE
npm install -D typescript tsx

TO RUN
npx tsx bcrypt-demo.ts
*/

import bcrypt from "bcrypt";

async function main(): Promise<void> {
  const password: string = "MyPassword123";

  // 1. Hash the password
  const hashedPassword: string = await bcrypt.hash(password, 12);

  console.log("Original Password:", password);
  console.log("Hashed Password:", hashedPassword);

  // 2. Verify the correct password
  const isValid: boolean = await bcrypt.compare(
    "MyPassword123",
    hashedPassword
  );

  console.log("Correct password:", isValid); // true

  // 3. Verify an incorrect password
  const isInvalid: boolean = await bcrypt.compare(
    "WrongPassword",
    hashedPassword
  );

  console.log("Wrong password:", isInvalid); // false
}

main().catch((error: unknown) => {
  console.error("Error:", error);
});
/*

E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>npx tsx bcrypt-demo.ts
Original Password: MyPassword123
Hashed Password: $2b$12$.MiE4PaQdn7OkU7t31MSKuMq7r/SyYEoz9bCZFi9O.zxFNrpCNKXi
Correct password: true
Wrong password: false

E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>
*/