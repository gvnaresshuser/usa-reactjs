/*
npm install bcrypt
npm install -D @types/bcrypt

TO RUN
node bcrypt-demo.js
*/

import bcrypt from "bcrypt";

async function main() {
  const password = "MyPassword123";

  // 1. Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  console.log("Original Password:", password);
  console.log("Hashed Password:", hashedPassword);

  // 2. Verify the correct password
  const isValid = await bcrypt.compare("MyPassword123", hashedPassword);

  console.log("Correct password:", isValid); // true

  // 3. Verify an incorrect password
  const isInvalid = await bcrypt.compare("WrongPassword", hashedPassword);

  console.log("Wrong password:", isInvalid); // false
}

main().catch(console.error);
/*

E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>node bcrypt-demo.js
Original Password: MyPassword123
Hashed Password: $2b$12$UGUkaZ76r5gsQ0Uq3aCHFu5yloJlWGLof75PtyG3WaLyUcRAIOUkm
Correct password: true
Wrong password: false

E:\Advaitecs\jwt-cookie-teaching-demo\bcrypt-argon2>
*/
