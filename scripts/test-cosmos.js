const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config({ path: '.env.local' });

async function testCosmosDB() {
  console.log('Testing Cosmos DB connection...');
  
  const endpoint = process.env.COSMOS_DB_ENDPOINT;
  const key = process.env.COSMOS_DB_KEY;
  const databaseName = process.env.COSMOS_DB_DATABASE_NAME;
  const containerName = process.env.COSMOS_DB_CONTAINER_NAME;

  console.log('Configuration:');
  console.log('- Endpoint:', endpoint);
  console.log('- Database:', databaseName);
  console.log('- Container:', containerName);
  console.log('- Key present:', !!key);

  try {
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseName);
    const container = database.container(containerName);

    // Test database connection
    console.log('\n1. Testing database connection...');
    const dbResponse = await database.read();
    console.log('✓ Database connection successful');

    // Test container connection
    console.log('\n2. Testing container connection...');
    const containerResponse = await container.read();
    console.log('✓ Container connection successful');

    // Test query
    console.log('\n3. Testing query...');
    const { resources } = await container.items
      .query('SELECT VALUE COUNT(1) FROM c')
      .fetchAll();
    console.log(`✓ Query successful. Current document count: ${resources[0] || 0}`);

    // Test document creation
    console.log('\n4. Testing document creation...');
    const testDoc = {
      id: `test-${Date.now()}`,
      name: 'Test User',
      email: 'test@example.com',
      role: 'test',
      interests: ['testing'],
      submittedAt: new Date().toISOString(),
      source: 'test',
      status: 'pending'
    };

    const { resource } = await container.items.create(testDoc);
    console.log('✓ Document creation successful:', resource.id);

    // Clean up test document
    await container.item(resource.id, resource.id).delete();
    console.log('✓ Test document cleaned up');

    console.log('\n🎉 All tests passed! Cosmos DB is ready to use.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    process.exit(1);
  }
}

testCosmosDB();