const crypto = require('crypto');

const TRIVIAL_PARTITION_KEY = '0';
const MAX_PARTITION_KEY_LENGTH = 256;

const hashData = (data) =>
  crypto.createHash('sha3-512').update(data).digest('hex');

const getPartitionKeyFromEvent = (event) => {
  if (event) {
    if (event.partitionKey) {
      return event.partitionKey;
    } else {
      return hashData(JSON.stringify(event));
    }
  }
};

const validatePartitionKey = (candidate) => {
  if (candidate) {
    if (typeof candidate !== 'string') {
      return JSON.stringify(candidate);
    }
    return candidate;
  } else {
    return TRIVIAL_PARTITION_KEY;
  }
};

exports.deterministicPartitionKey = (event) => {
  let candidate = getPartitionKeyFromEvent(event);
  candidate = validatePartitionKey(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return hashData(candidate);
  }
  return candidate;
};

exports.hashData = hashData;
