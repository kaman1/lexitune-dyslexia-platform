const { testCosmosConnection, createFormSubmission } = require('../lib/cosmos-rest.ts');
require('dotenv').config({ path: '.env.local' });

async function testCosmosREST() {
  console.log('Testing Cosmos DB REST API...');
  
  try {
    // Test connection
    console.log('\n1. Testing connection...');
    const isConnected = await testCosmosConnection();
    console.log('Connection test result:', isConnected);

    if (isConnected) {
      // Test document creation
      console.log('\n2. Testing document creation...');
      const testSubmission = {
        name: 'Test User REST',
        email: 'test-rest@example.com',
        role: 'student',
        interests: ['testing', 'rest-api'],
        source: 'onboarding'
      };

      const result = await createFormSubmission(testSubmission);
      console.log('✅ Document created successfully:', result.id);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testCosmosREST();