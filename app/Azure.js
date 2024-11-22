import { CosmosClient } from '@azure/cosmos';

const client = new CosmosClient({
  endpoint: "<your-endpoint>",
  key: "<your-primary-key>",
});

const database = client.database('your-database-name');
const container = database.container('your-container-name');

export { container as db };
