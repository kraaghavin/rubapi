import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // console.log(hash);
    return hash;
  } catch (error) {
      console.log(error);
    throw error;
  }
}

export async function verifyPassword(password, hash) {
  try {
////console.log("verify password");

    return await bcrypt.compare(password, hash);
  } catch (error) {
      console.log(error);
    throw error;
  }
}
