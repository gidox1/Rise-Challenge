import { User } from '../../entity/user/user.entity';
import { UserDomain, MappedUserData, CreateUser, MappedLoginResponse } from '../../types/user';

export const mapUserCreatedData = (user: User): MappedUserData => {
  // Build response data based on what we absolutely need to return to the user
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const mapUserAuthenticatedResponse = ({ user, token }: { user: User; token: string }): MappedLoginResponse => {
  return {
    user: mapUserCreatedData(user),
    token,
  };
};
