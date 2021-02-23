# Otta - Engineering Interview Task

This is the take-home interview task for engineering job applications at Otta.

The goal is to both give you a flavour of the kind of work we do, and give us an idea of your technical (and non-technical) skills.

We expect the task to take one hour. If you require clarification on anything, please don't hesitate to contact us.

## If I had more time, I would
- Use a testing library instead of using normal functions in `main.ts`
- Simplify the classes/ merge them together if it makes sense
## Instructions

Start by cloning this repository using your personal GitHub account. Create a new private repository and push your clone to this new repo (you will need to remove the original remote with `git remote remove origin`). Please ensure all of your work is committed to this - we'll only consider the `master` branch.

The following details the individual tasks. Please complete **all** of the them. You may use any programming language, provided all of the code used can be committed to this repo.

### Task 1

In the `data` folder of this repo there is a CSV file called `reactions.csv`. It contains real data corresponding to how users on Otta have reacted to (saved or discarded) jobs on the platform.

The reaction data consists of four columns:

- `user_id` - the integer ID of the user who liked or disliked the job
- `job_id` - the integer ID of the job the user interacted with
- `direction` - whether the user liked (`true`) or disliked (`false`) the job
- `time` - the timestamp corresponding to when they reacted to the job

**Task**: The similarity score between two users is the number of jobs which they both like. Find the two users with the highest similarity.

**Answer**: Users 5193, 1791 with similarity of 181


### Task 2

In the `data` folder there is an additional CSV file called `jobs.csv`. It contains unique integer IDs for over 12,000 jobs, along with integer IDs for the job's associated company.

**Task**: The similarity score between two companies is the number of users who like at least one job at both companies. Using both the `reactions.csv` and `jobs.csv` data, find the two companies with the highest similarity score.

**Answer**: Companies 46, 92 with similarity of 104

### Task 3

Engineering at Otta is truly full-stack. Features are owned end-to-end, from backend and database-level work to front-end finishes.

We don't think it's fair to ask you to build something with a UI, as we know this can take a while and time is precious. Instead, we'd love to see an example of something you've already built and hear about what you learned building it.

**Task**: Share an example of something you've built using front-end web technologies.

- A link to a GitHub repo is ideal
- If the best example of your work is something you've done at a company, it's okay to link to a live deployed version
- If you can't link to anything, a screenshot is also fine

**Answer**: As part of the software engineering group project:
- [Github link](https://github.com/ben-xD/foodprint/)
- I built the Foodprint [landing page](https://foodprint.orth.uk) using GatsbyJS/ React in 4 hours
- The React Native app and NodeJS backend was done as a group project with 6 other people. Though I did not design or draw the UI, I was responsible for state management, authentication, navigation, etc. I orchestrated the deployment to [iOS](https://apps.apple.com/us/app/foodprint/id1510153419?ls=1) and [Android](https://play.google.com/store/apps/details?id=uk.orth.foodprint) stores. I helped another developer with their UI design/ goals (I was aware not to micromanage her designs though, to allow her to develop her skills as well.) I have designed things in the past, some are shown [here](https://orth.uk/projects). I also took responsibility for understanding different backend architectures, selecting the optimal one: NodeJS serverless functions for ease of deployment/ hosting.
- I also wrote documentation and automated deployment (to reduce complexity challenges with less experienced team mates).

**Task**: Tell us about the biggest challenge you faced in building the above.

**Answer**: It was difficult to get other students to do challenging things that don't seem worth it initially. The tradeoffs are not always clear. Often times, it may seem obvious to do something which incurs a high cost initially to me, but this may not be clear to others who haven't done it before. Therefore, sometimes I suffer the consequences of other people's decisions, but eventually they see the issues more clearly. 2 examples:
- E.g. Using typescript instead of javascript. Though I wrote a prototype of the Foodprint app in a few days using Typescript, another student decided to quietly spend the next 1.5 weeks rebuilding it in javascript because he thought Typescript was too difficult for beginners. After talking it through, I decided to convert my existing app to Javascript to save him the effort of rewriting it. I compromised there. A few weeks later, I was helping the same student with a bug he introduced which would have been detected by typescript.
- Switching from self-hosted Gitlab to Github because of the downtime/ availability: I wanted to make the move immediately after the first 1-day downtime occured, to avoid any future issues with productivity. Other students were not willing to do it, as it meant learning how to use Github. I compromised and stayed with Gitlab, but at the time, was dissapointed by the lack of effort to learn Github, but in this case, other students favoured staying with Gitlab. There was another period of downtime (albeit shorter), which meant we simply couldn't share code, but only for a few hours. At the end of the project, I put it on Github to make the project more accessible and other students were very happy with that, as they can share their contributions/ code more easily.

## Submission

Once you've completed all of the above tasks, make sure:

- [x] You've committed all of the code used, and your edited answers, to the `master` branch
- [x] You've pushed the changes to your repo
- [x] You add `XavKearney` and `shfranklin` as contributors for your personal repo, and send a link to the repo in an email to us

Good luck!
