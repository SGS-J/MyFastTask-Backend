import bcrypt, { genSalt, hash, compare } from "bcrypt";

export async function encryptPassword(password) {
   try {
      const salt = await genSalt(10);
      return await hash(password, salt);
   } catch (error) {
      return false;   
   }
}

export async function matchPassword(password, encrypt) {
   try {
      return await compare(password, encrypt);
   } catch (error) {
      return false;   
   }
}