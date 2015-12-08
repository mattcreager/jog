import url from 'url';

function optional(name) {
  return process.env[name];
}

function required(name) {
  const value = process.env[name];
  if (typeof(value) === 'undefined')
    throw new Error(`${name} is required!`);
  return value;
}

function optionalNum(name) {
  const str = optional(name);
  if (!str) return null;
  return Number(str);
}

function parseKafkaUrl(urlString) {
  const parsed = url.parse(urlString);
  if (parsed.protocol !== 'kafka:')
    throw new Error('expected Kafka url to have scheme kafka:');
  return parsed;
}

export default {
  isProduction: optional('NODE_ENV') === 'production',
  httpPort: optional('PORT') || 3012
};
