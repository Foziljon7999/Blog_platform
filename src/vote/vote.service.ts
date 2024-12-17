import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { retry } from 'rxjs';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  async vote(postId: number, userId: number, value: number): Promise<string> {
    const post = await this.postRepository.findOne({ where: { id: postId }})
    if(!post) {
      throw new NotFoundException('Post not found')
    }

    let vote = await this.voteRepository.findOne({
      where: { post: { id: postId }, user: { id: userId }}
    })

    if(vote) {
      if(vote.value === value) {
        throw new NotFoundException('You have already voted this way')
      }
      vote.value = value
    } else {
      vote = this.voteRepository.create({
        post,
        user: { id: userId },
        value
      })
    }
    await this.voteRepository.save(vote)

    const votes = await this.voteRepository.find({ where: { post: {id: postId}}})
    post.popularity = votes.reduce((sum, v) => sum + v.value, 0)

    return 'Vote succesfully recorded'
  }

async getTrandingPosts(): Promise<Post[]> {
  return this.postRepository.find({
    order: { popularity: 'DESC'},
    take: 10
  })
}
}
