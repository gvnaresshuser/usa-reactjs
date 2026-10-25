/*
npm install argon2
npm install -D @types/node

FOR TYPESCRIPT INSTALL THESE
npm install -D typescript tsx

TO RUN
npx tsx argon2-demo.ts
*/

import argon2 from "argon2";

async function main(): Promise<void> {
  const password: string = "MyPassword123";

  // 1. Hash the password
  const hashedPassword: string = await argon2.hash(password);

  console.log("Original Password:", password);
  console.log("Hashed Password:", hashedPassword);

  // 2. Verify the correct password
  const isValid: boolean = await argon2.verify(
    hashedPassword,
    "MyPassword123"
  );

  console.log("Correct password:", isValid); // true

  // 3. Verify an incorrect password
  const isInvalid: boolean = await argon2.verify(
    hashedPassword,
    "WrongPassword"
  );

  console.log("Wrong password:", isInvalid); // false
}

main().catch((error: unknown) => {
  console.error("Error:", error);
});
/*

E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>npx tsx argon2-demo.ts
Original Password: MyPassword123
Hashed Password: $argon2id$v=19$m=65536,p=4,t=3$EiMv2cb76tBmcCON5SbEHw$C2W1ba6NAV13EoOq+Ab00gJWRFn6MSFpOHa+ZVBmUrs
Correct password: true
Wrong password: false

E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>
*/