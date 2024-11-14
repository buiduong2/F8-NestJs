import { Injectable } from '@nestjs/common';
import { PriorityQueue, ICompare } from '@datastructures-js/priority-queue';
type Token = {
  exp: number;
  token: string;
};
const compareToken: ICompare<Token> = (a, b) => {
  return b.exp - a.exp;
};
@Injectable()
export class BlackListTokenStore {
  private queue = new PriorityQueue<Token>(compareToken);

  private set = new Set<string>();

  add(token: Token) {
    this.set.add(token.token);
    this.queue.enqueue(token);
    this.removeExpiredToken();
  }

  isExists(token: string) {
    return this.set.has(token);
  }

  private removeExpiredToken(): void {
    const now = Date.now();
    while (!this.queue.isEmpty()) {
      if (this.queue.front().exp >= now) {
        const token = this.queue.dequeue();
        this.set.delete(token.token);
      } else {
        break;
      }
    }
  }
}
