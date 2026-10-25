/*
npm install argon2
npm install -D @types/node

TO RUN
node argon2-demo.js
*/
import argon2 from "argon2";

async function main() {
  const password = "MyPassword123";

  // 1. Hash the password
  const hashedPassword = await argon2.hash(password);

  console.log("Original Password:", password);
  console.log("Hashed Password:", hashedPassword);

  // 2. Verify the correct password
  const isValid = await argon2.verify(hashedPassword, "MyPassword123");

  console.log("Correct password:", isValid); // true

  // 3. Verify an incorrect password
  const isInvalid = await argon2.verify(hashedPassword, "WrongPassword");

  console.log("Wrong password:", isInvalid); // false
}

main().catch(console.error);
/*
E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>node argon2-demo.js
Original Password: MyPassword123
Hashed Password: $argon2id$v=19$m=65536,p=4,t=3$c8GgEYBYz+aENQ5FVTk/hA$sOVQ/K2PVcrgnQ/5NxmdiHykX//NAqZKH8GDaEAx88Y
Correct password: true
Wrong password: false

E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>
*/
