import assert from 'assert';
import { CompanyJobListings } from './companies';
import { Reactions } from './reactions';

const main = () => {
  printTaskOneAndTwo();
  reactionsTest1();
  jobsTest1();
  jobsTest2();
  jobsTest3();
};

const printTaskOneAndTwo = () => {
  let reactions = Reactions.fromReactionsFile('./data/reactions.csv');
  let companies = CompanyJobListings.fromJobsFile('./data/jobs.csv');

  console.log(
    'Highest similarity users: ',
    reactions.getHighestSimilarityUsers()
  );

  console.log(
    'Highest similarity companies: ',
    companies.getHighestSimilarityCompanies(reactions)
  );
};

const jobsTest1 = () => {
  console.log('Running jobs tests');
  let reactions = Reactions.fromReactionsFile('./data/reactionsTest.csv');
  let companies = CompanyJobListings.fromJobsFile('./data/jobsTest.csv');

  let actual = companies.getSimilarity(reactions, '23', '168');
  assert(1 == actual);

  console.log('Finished jobs tests');
};

const jobsTest2 = () => {
  let reactions = Reactions.fromReactionsFile('./data/reactions.csv');
  let companies = CompanyJobListings.fromJobsFile('./data/jobs.csv');

  // A few more tests
  let actualSimilarity = companies.getSimilarity(reactions, '92', '46');
  console.log({
    actualSimilarity,
    again: companies.getSimilarity(reactions, '46', '92'),
  });
  assert(actualSimilarity == 104);
};

const jobsTest3 = () => {
  let reactions = new Reactions();
  reactions.addRecord('ben', 'job1', true);
  reactions.addRecord('ben', 'job2', true);
  reactions.addRecord('amy', 'job2', true);
  reactions.addRecord('Cressida', 'job1', true);
  reactions.addRecord('Cressida', 'job3', false);
  reactions.addRecord('ben', 'job3', true);

  let companies = new CompanyJobListings();
  companies.addRecord('Otta', 'job1');
  companies.addRecord('Otta', 'job2');
  companies.addRecord('Ocado', 'job3');
  companies.addRecord('McDonalds', 'job4');

  assert(companies.getSimilarity(reactions, 'Otta', 'Ocado') == 1);
  assert(companies.getSimilarity(reactions, 'Otta', 'McDonalds') == 0);
  assert(companies.getSimilarity(reactions, 'Otta', 'NON EXISTENT') == 0);

  reactions.addRecord('Cressida', 'job2', true);
  reactions.addRecord('Cressida', 'job3', false);
  assert(companies.getSimilarity(reactions, 'Otta', 'Ocado') == 1);
  reactions.addRecord('Cressida', 'job3', true);
  assert(companies.getSimilarity(reactions, 'Otta', 'Ocado') == 2);

  assert(
    JSON.stringify(companies.getHighestSimilarityCompanies(reactions)) ==
      JSON.stringify([2, 'Otta', 'Ocado'])
  );
};

const reactionsTest1 = () => {
  console.log('Running reactions tests');
  let reactions = Reactions.fromReactionsFile('./data/reactionsTest.csv');

  assert(
    0 == reactions.getSimilarityScoreBetween('0000', '2439'),
    'Missing userId should not overlap with anything'
  );
  assert(
    1 == reactions.getSimilarityScoreBetween('5193', '2439'),
    "UserId's overlap with one job like"
  );
  assert(
    0 == reactions.getSimilarityScoreBetween('7038', '2439'),
    '2 users without overlap should have 0 similarity score'
  );
  assert(
    0 == reactions.getSimilarityScoreBetween('2439', '1111'),
    '2 users with overlap should have 0 similarity score when one did not like it'
  );
  console.log('Finished reactions tests');
};

main();
