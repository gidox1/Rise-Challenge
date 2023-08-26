import { Repository } from "typeorm"
import { Comment } from "../../entity/comment/comment.entity"
import { Config } from "../../app/config";

export const latestCommentsForPosts = async(repository: Repository<Comment>, postIds: string[], config: Config): Promise<any[]> => {
  return await repository
    .createQueryBuilder('comment')
    .select(['comment.postId', 'comment.content'])
    .addSelect('MAX(comment.createdAt)', 'createdAt')
    .where('comment.postId IN (:...postIds)', { postIds })
    .groupBy('comment.postId')
    .addGroupBy('comment.content')
    .limit(config.pagination.pageSize)
    .getRawMany();
}
