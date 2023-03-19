const { deterministicPartitionKey, hashData } = require('./dpk');

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it('Returns partition key when given partition key in input', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 'Test key' });
    expect(trivialKey).toBe('Test key');
  });

  it('Returns hashed event when no partition key is provided in input', () => {
    const trivialKey = deterministicPartitionKey({ isTestEvent: true });
    expect(trivialKey).toBe(hashData(JSON.stringify({ isTestEvent: true })));
  });

  it('Stringifies partition key if partition key is not a string in input', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 12345 });
    expect(trivialKey).toBe('12345');
  });

  it('Hashes partition key if partition key length is greater than 256', () => {
    const key =
      'Test partition key where length is greater than 256. Test partition key where length is greater than 256. Test partition key where length is greater than 256. Test partition key where length is greater than 256. Test partition key where length is greater than 256.';
    const trivialKey = deterministicPartitionKey({
      partitionKey: key,
    });
    expect(trivialKey).toBe(hashData(key));
  });
});
