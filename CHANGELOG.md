# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

### 🚀 Features

- Add configuration file, schemas, and initial implementations for user, product, and quotation management ([a6e2506](https://github.com/dtinocounmsm/backend/commit/a6e25068b44ed7ae97d09091b27ca3cd20d46878))
- Add husky hooks for linting and testing and enhance customer and quotation management features ([cc0f90a](https://github.com/dtinocounmsm/backend/commit/cc0f90a9cb433288f92bec6ef2ab2ec34e66a4f9))
- Enhance user query handling and add documentation decorators for user endpoints ([642f481](https://github.com/dtinocounmsm/backend/commit/642f48108f8ce6db10e2785283278146cc1a0b76))
- Implement user login functionality and enhance user-related DTOs and decorators ([976bb76](https://github.com/dtinocounmsm/backend/commit/976bb76805ea076357a821f26a6234843f2a2239))
- Add GitHub Actions workflow for deploying to AWS Fargate ([976a647](https://github.com/dtinocounmsm/backend/commit/976a64741b7845eb78be1eb82c20039a9407725c))
- Update GitHub Actions workflow to set up Nodejs and install dependencies before deploy to AWS ([879aa32](https://github.com/dtinocounmsm/backend/commit/879aa326d9f31ca257f432b5c7234af4da35a1d2))
- Configure AWS region as an environment variable in GitHub Actions workflow ([ef4e991](https://github.com/dtinocounmsm/backend/commit/ef4e9911a064a4b13e4d27fdd7431e2ca8d51d7a))
- Add HTTP endpoints for managing products and users, include toggle status and delete feat ([6961445](https://github.com/dtinocounmsm/backend/commit/6961445beb0534a7c39605843207394158551f83))
- Initialize CDK project with TypeScript, Docker setup, and AWS infrastructure configuration ([d938afa](https://github.com/dtinocounmsm/backend/commit/d938afae416572757ef51b3f5984680ef27bf08d))
- Update GitHub Actions workflow to include permissions for id-token, contents, and pr ([b15d4a8](https://github.com/dtinocounmsm/backend/commit/b15d4a8c22840c284f31b22500ddfde5f11e64fc))
- Update deploy workflow to assign environment based on branch ([bd3721a](https://github.com/dtinocounmsm/backend/commit/bd3721a7e52650a830478e8b56c8ef7d90c6f921))
- Add .dockerignore, update deploy workflow comments, and enhance Dockerfile structure ([3cb7787](https://github.com/dtinocounmsm/backend/commit/3cb77871253c991a5a0ed63eab2779ae21c4ccc1))
- Update Dockerfile to use pnpm, build application, and exclude infra from build ([9c3dec5](https://github.com/dtinocounmsm/backend/commit/9c3dec518a04ac2eb61f604343b0141364949499))
- Add echo command to display ECR image URI in deploy workflow ([8b9c4d7](https://github.com/dtinocounmsm/backend/commit/8b9c4d745d26bdb85a301dbcfbd69d9751c0e75d))
- Remove echo command from deploy workflow and update README with redeploy note ([0f58953](https://github.com/dtinocounmsm/backend/commit/0f589533353ce90c5bb2064cffc2b42cfb0d0493))
- Improve Dockerfile by clarifying dependency installation and cleanup process ([a62edc8](https://github.com/dtinocounmsm/backend/commit/a62edc8dc73a69466122ccb472291eba9b39a3ef))
- Update Dockerfile to switch from pnpm to npm for dependency installation and build process ([b23aa26](https://github.com/dtinocounmsm/backend/commit/b23aa262b98f71c2984fb865545e00ad20d73e5d))
- Enhance deploy workflow by clarifying comments and adding build echo ([871b9f1](https://github.com/dtinocounmsm/backend/commit/871b9f1510da9aedce80380500a982c28ed0231e))
- Update deploy workflow and infra stack to remove build echo and use ECR image ([8b60167](https://github.com/dtinocounmsm/backend/commit/8b60167c7270878702e9402d1fc54cb89e9fb7eb))
- Update deploy workflow to disable approval prompts during CDK deployment ([6705500](https://github.com/dtinocounmsm/backend/commit/670550009d85dae58bfa9409cd2d1c83fb10316d))
- Add Application Load Balancer and integrate with API Gateway for ECS service ([550f5ac](https://github.com/dtinocounmsm/backend/commit/550f5accdc1d92ccba14ec65c87e46096eb7a671))
- Configure ALB listener with health check and open access for ECS service ([502b8b6](https://github.com/dtinocounmsm/backend/commit/502b8b648265327fd1609ea0e95fbde2d88e7b40))
- Update InfraStack to use existing ECR repository for container image ([c287577](https://github.com/dtinocounmsm/backend/commit/c2875774ffee0b1ee2f67de4c5909d3e8c787e91))
- Rename InfraStack to MedicTecStack and update ECR repository name ([73a072d](https://github.com/dtinocounmsm/backend/commit/73a072d4a0bddbbad649efd4391f9fa5e5a2255f))
- Update GitHub Actions workflow to bootstrap CDK environment and adjust step numbering ([3004856](https://github.com/dtinocounmsm/backend/commit/30048569393ddf86e5ee63408a2e550eb535fc34))
- Update GitHub Actions workflow to install AWS CDK and adjust step numbering ([66973d4](https://github.com/dtinocounmsm/backend/commit/66973d4e047639a7f6e9f4e48ffe7df476d56f75))
- Update MedicTecStack name to MedicTecStack01 for environment differentiation ([53b9f3a](https://github.com/dtinocounmsm/backend/commit/53b9f3a520eeb332fe47ed799ef495d4983bcac8))
- Update redeploy instruction in README and add CDK context for availability zones ([df68f6b](https://github.com/dtinocounmsm/backend/commit/df68f6b984e352635b71a88f6ccc0cf1075705ce))
- Update iac and docs setup ([5b87ede](https://github.com/dtinocounmsm/backend/commit/5b87ede4e25b732482c960449144618d95607537))

### 🐛 Bug Fixes

- Clean up formatting and update AWS CLI credentials step in GitHub Actions workflow ([e04f8f7](https://github.com/dtinocounmsm/backend/commit/e04f8f757da3f1c870428c6def7d7b36e882bcec))
- Improve formatting and reorganize AWS CLI credentials step in GitHub Actions workflow ([048fb0a](https://github.com/dtinocounmsm/backend/commit/048fb0ab8165563cf9a9c8b55f403cc8d93cf5d4))
- Update AWS CLI credentials action to v3 and clean up formatting in deploy workflow ([09ba75b](https://github.com/dtinocounmsm/backend/commit/09ba75bb8927af18458ed6420d1338c2abdffdca))
- Update Dockerfile command to point to the correct main file location ([d321e61](https://github.com/dtinocounmsm/backend/commit/d321e61632719ed1b951e0b59fbf72b5df8d10ae))
- Update git cliff setup ([a456c16](https://github.com/dtinocounmsm/backend/commit/a456c16d7e46dc4159389f3452a1119b210279a5))

### 📚 Documentation

- Update README to clarify redeploy instructions ([2460929](https://github.com/dtinocounmsm/backend/commit/2460929aec1672725b7298b0231715e1ce8afaff))

<!-- generated by git-cliff -->
