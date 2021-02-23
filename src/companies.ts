import { readFileSync } from 'fs';
import { Reactions } from './reactions';
// TODO load in data from jobs.csv, creating a Map<String, Set<String>>

export class CompanyJobListings {
  jobIdsByCompanyId: Map<string, Set<string>> = new Map();

  static fromJobsFile(file: string) {
    const listings = new CompanyJobListings();

    const lines = readFileSync(file).toString().split('\n').splice(1);
    for (const line of lines) {
      const [jobId, companyId] = line.split(',');
      listings.addRecord(companyId, jobId);
    }
    return listings;
  }

  addRecord(companyId: string, jobId: string) {
    if (!companyId || !jobId) {
      return;
    }

    if (this.jobIdsByCompanyId.has(companyId)) {
      this.jobIdsByCompanyId.set(
        companyId,
        this.jobIdsByCompanyId.get(companyId)!.add(jobId)
      );
    } else {
      const jobIds = new Set<string>();
      jobIds.add(jobId);
      this.jobIdsByCompanyId.set(companyId, jobIds);
    }
  }

  getSimilarity(
    reactions: Reactions,
    company1Id: string,
    company2Id: string
  ): number {
    const company1Jobs = this.jobIdsByCompanyId.get(company1Id);
    const company2Jobs = this.jobIdsByCompanyId.get(company2Id);
    if (!company1Jobs || !company2Jobs) {
      return 0;
    }
    let positiveUsersCompany1 = this.getPositiveUsersForJobs(
      reactions,
      company1Jobs
    );
    let positiveUsersCompany2 = this.getPositiveUsersForJobs(
      reactions,
      company2Jobs
    );
    let intersection = [...positiveUsersCompany1].filter((i) =>
      positiveUsersCompany2.has(i)
    );
    return intersection.length;
  }

  getPositiveUsersForJobs(reactions: Reactions, jobIds: Set<string>) {
    const positiveUsers = new Set();
    for (const jobId of jobIds) {
      const users = reactions.getUsersWhoLikedJobId(jobId);
      users.forEach((userId) => positiveUsers.add(userId));
    }
    return positiveUsers;
  }

  getHighestSimilarityCompanies(reactions: Reactions) {
    let selectedCompanyId1, selectedCompanyId2;
    let highestSimilarity = 0;
    for (const company1Id of this.jobIdsByCompanyId.keys()) {
      for (const company2Id of this.jobIdsByCompanyId.keys()) {
        if (company1Id == company2Id) continue;
        const similarity = this.getSimilarity(
          reactions,
          company1Id,
          company2Id
        );
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          selectedCompanyId1 = company1Id;
          selectedCompanyId2 = company2Id;
        }
      }
    }
    return [highestSimilarity, selectedCompanyId1, selectedCompanyId2];
  }
}
