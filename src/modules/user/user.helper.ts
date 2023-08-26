import bcrypt from 'bcryptjs';

export interface UserHelperService {
  hashPassword(password: string): Promise<string>;
  decryptPassword(password: string, hash: string): Promise<boolean>;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = process.env.SALT_ROUNDS || 10;
  return bcrypt.hash(password, salt);
};

export const decryptPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
