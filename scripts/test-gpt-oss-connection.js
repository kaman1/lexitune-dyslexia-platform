#!/usr/bin/env node

// Simple test script to verify GPT-OSS API connection
const API_ENDPOINT = 'http://57.151.9.6';

async function testConnection() {
  console.log('🧪 Testing GPT-OSS API Connection');
  console.log('================================');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await fetch(`${API_ENDPOINT}/health`);
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok && healthData.status === 'healthy') {
      console.log('✅ Health check passed');
      console.log(`   Model: ${healthData.model}`);
      console.log(`   Status: ${healthData.status}`);
    } else {
      console.log('❌ Health check failed');
      return false;
    }
    
    // Test 2: Models Endpoint
    console.log('\n2️⃣ Testing models endpoint...');
    const modelsResponse = await fetch(`${API_ENDPOINT}/api/models`);
    const modelsData = await modelsResponse.json();
    
    if (modelsResponse.ok && modelsData.data) {
      console.log('✅ Models endpoint working');
      console.log(`   Available models: ${modelsData.data.length}`);
      modelsData.data.forEach(model => {
        console.log(`   - ${model.id}`);
      });
    } else {
      console.log('❌ Models endpoint failed');
      return false;
    }
    
    // Test 3: Simple Generation
    console.log('\n3️⃣ Testing text generation...');
    const generateResponse = await fetch(`${API_ENDPOINT}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Hello! Can you help me write a simple JavaScript function?',
        max_tokens: 100,
        temperature: 0.7
      })
    });
    
    const generateData = await generateResponse.json();
    
    if (generateResponse.ok && generateData.response) {
      console.log('✅ Text generation working');
      console.log(`   Response: ${generateData.response.substring(0, 100)}${generateData.response.length > 100 ? '...' : ''}`);
      console.log(`   Tokens used: ${generateData.usage?.total_tokens || 'N/A'}`);
    } else {
      console.log('❌ Text generation failed');
      console.log(`   Error: ${JSON.stringify(generateData)}`);
      return false;
    }
    
    // Test 4: Chat Completion (OpenAI-compatible)
    console.log('\n4️⃣ Testing chat completions...');
    const chatResponse = await fetch(`${API_ENDPOINT}/api/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-oss-lite',
        messages: [
          {
            role: 'user',
            content: 'Write a simple Python function to add two numbers'
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });
    
    const chatData = await chatResponse.json();
    
    if (chatResponse.ok && chatData.choices && chatData.choices[0]) {
      console.log('✅ Chat completions working');
      const content = chatData.choices[0].message.content;
      console.log(`   Response: ${content.substring(0, 100)}${content.length > 100 ? '...' : ''}`);
      console.log(`   Tokens used: ${chatData.usage?.total_tokens || 'N/A'}`);
    } else {
      console.log('❌ Chat completions failed');
      console.log(`   Error: ${JSON.stringify(chatData)}`);
      return false;
    }
    
    console.log('\n🎉 All tests passed! GPT-OSS API is working correctly.');
    console.log(`\n🔗 You can now use the chat interface at: http://localhost:3000/gpt-oss-chat`);
    
    return true;
    
  } catch (error) {
    console.log(`\n❌ Connection failed: ${error.message}`);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   - Make sure GPT-OSS is running on Azure');
    console.log('   - Check if the external IP is accessible');
    console.log('   - Verify network connectivity');
    console.log('   - Run: kubectl get services -n gpt-oss');
    
    return false;
  }
}

// Run the test
testConnection().then(success => {
  process.exit(success ? 0 : 1);
});