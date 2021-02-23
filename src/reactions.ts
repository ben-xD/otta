import { readFileSync } from 'fs';

export class Reactions {
  private likedJobsByUserId: Map<string, Set<string>> = new Map();
  private userIdsByJobId: Map<string, Set<string>> = new Map();

  static fromReactionsFile(file: string): Reactions {
    const reactions = new Reactions();

    const lines = readFileSync(file).toString().split('\n').splice(1);
    for (const line of lines) {
      const [userId, jobId, isLikedString, _] = line.split(',');
      reactions.addRecord(userId, jobId, isLikedString === 'true');
    }

    return reactions;
  }

  addRecord(userId: string, jobId: string, isLiked: boolean) {
    if (!isLiked || !userId || !jobId) {
      return;
    }

    if (this.likedJobsByUserId.has(userId)) {
      this.likedJobsByUserId.set(
        userId,
        this.likedJobsByUserId.get(userId)!.add(jobId)
      );
    } else {
      const jobIds = new Set<string>();
      jobIds.add(jobId);
      this.likedJobsByUserId.set(userId, jobIds);
    }

    // Add to alternative data structuure
    if (this.userIdsByJobId.has(jobId)) {
      this.userIdsByJobId.set(
        jobId,
        this.userIdsByJobId.get(jobId)!.add(userId)
      );
    } else {
      const userIds = new Set<string>();
      userIds.add(userId);
      this.userIdsByJobId.set(jobId, userIds);
    }
  }

  getSimilarityScoreBetween(user1Id: string, user2Id: string): number {
    const jobLikesByUser1 = this.likedJobsByUserId.get(user1Id);
    const jobLikesByUser2 = this.likedJobsByUserId.get(user2Id);

    if (!jobLikesByUser1 || !jobLikesByUser2) {
      return 0;
    }

    let intersection = [...jobLikesByUser1].filter((i) =>
      jobLikesByUser2.has(i)
    );
    return intersection.length;
  }

  getHighestSimilarityUsers(): [number, string?, string?] {
    let selectedUserId1, selectedUserId2;
    let highestSimilarity = 0;
    for (const userId1 of this.likedJobsByUserId.keys()) {
      for (const userId2 of this.likedJobsByUserId.keys()) {
        if (userId1 == userId2) continue;
        const similarity = this.getSimilarityScoreBetween(userId1, userId2);
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          selectedUserId1 = userId1;
          selectedUserId2 = userId2;
        }
      }
    }
    return [highestSimilarity, selectedUserId1, selectedUserId2];
  }

  getUsersWhoLikedJobId(jobId: string): Set<string> {
    return this.userIdsByJobId.get(jobId) ?? new Set();
  }
}
