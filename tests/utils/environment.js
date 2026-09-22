const dotenv = require('dotenv');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(projectRoot, '.env') });

const testEnvironment = process.env.TEST_ENV ?? 'qa';

dotenv.config({
  path: path.join(projectRoot, `.env.${testEnvironment}`),
  override: true,
});

function getOptionalEnvironmentVariable(name, defaultValue) {
  const value = process.env[name];
  return value ?? defaultValue;
}

function getRequiredEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Configure it in .env.${testEnvironment} or the process environment.`,
    );
  }

  return value;
}

module.exports = {
  testEnvironment,
  getOptionalEnvironmentVariable,
  getRequiredEnvironmentVariable,
};
