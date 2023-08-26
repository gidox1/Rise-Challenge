import { Repository } from "typeorm"
import { User } from "../../entity/user/user.entity"

interface TopPosts {
  user_id: string;
  user_name: string;
  post_count: string;
  post_id: string;
  title: string;
}

export const topUsersWithHighestPosts = async(repository: Repository<User>): Promise<TopPosts[]> => {
  return await repository
    .createQueryBuilder('user')
    .select([
      'user.id AS user_id',
      'user.name AS user_name',
      'COUNT(post.id) AS post_count',
      'MAX(post.id) AS post_id',
    ])
    .leftJoin('user.posts', 'post')
    .groupBy('user.id, user.name')
    .orderBy('post_count', 'DESC')
    .limit(3)
    .getRawMany();
}
