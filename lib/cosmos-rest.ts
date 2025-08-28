// Cosmos DB REST API implementation for Cloudflare Workers
// This replaces the @azure/cosmos SDK which doesn't work in Workers

interface CosmosConfig {
  endpoint: string;
  key: string;
  databaseName: string;
  containerName: string;
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  role: string;
  organization?: string;
  neurodivergentType?: string;
  interests: string[];
  goals?: string;
  experience?: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  source: 'onboarding' | 'contact' | 'progress_updates' | 'collaboration' | 'other';
  status: 'pending' | 'processed' | 'contacted';
}

export interface ProgressUpdatesSubmission {
  id: string;
  name: string;
  email: string;
  organization?: string;
  role: string;
  interests: string[];
  message?: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'pending' | 'processed' | 'contacted';
}

export interface CollaborationSubmission {
  id: string;
  name: string;
  email: string;
  organization?: string;
  collaborationType: string;
  details: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'pending' | 'processed' | 'contacted';
}

// Generate authorization header for Cosmos DB REST API
async function generateAuthHeader(verb: string, resourceType: string, resourceLink: string, date: string, masterkey: string): Promise<string> {
  try {
    // Create the string to sign according to Cosmos DB REST API documentation
    const stringToSign = `${verb.toLowerCase()}\n${resourceType.toLowerCase()}\n${resourceLink}\n${date.toLowerCase()}\n\n`;
    
    console.log('Cosmos REST: String to sign:', JSON.stringify(stringToSign));
    console.log('Cosmos REST: Master key length:', masterkey.length);
    
    // Decode the master key from base64 to binary
    const binaryString = atob(masterkey);
    const keyBytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      keyBytes[i] = binaryString.charCodeAt(i);
    }
    
    // Convert string to sign to bytes
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(stringToSign);
    
    // Import the key for HMAC-SHA256
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    // Generate HMAC signature
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageBytes);
    
    // Convert signature to base64
    const signatureBytes = new Uint8Array(signature);
    let binarySignature = '';
    for (let i = 0; i < signatureBytes.length; i++) {
      binarySignature += String.fromCharCode(signatureBytes[i]);
    }
    const signatureBase64 = btoa(binarySignature);
    
    // Format the authorization header
    const authHeader = `type=master&ver=1.0&sig=${signatureBase64}`;
    
    console.log('Cosmos REST: Generated signature base64 length:', signatureBase64.length);
    
    return authHeader;
  } catch (error) {
    console.error('Cosmos REST: Error generating auth header:', error);
    throw new Error(`Failed to generate authorization header: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create a document in Cosmos DB with dynamic container support
export async function createDocument(config: CosmosConfig, document: any): Promise<any> {
  const { endpoint, key, databaseName, containerName } = config;
  
  console.log('Cosmos REST: Creating document with config:', {
    endpoint,
    databaseName,
    containerName,
    hasKey: !!key
  });

  const resourceLink = `dbs/${databaseName}/colls/${containerName}`;
  const resourceType = 'docs';
  const verb = 'POST';
  const date = new Date().toUTCString();

  try {
    const authHeader = await generateAuthHeader(verb, resourceType, resourceLink, date, key);
    
    const url = `${endpoint}dbs/${databaseName}/colls/${containerName}/docs`;
    
    console.log('Cosmos REST: Making request to:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'x-ms-date': date,
        'x-ms-version': '2018-12-31',
        'x-ms-documentdb-partitionkey': `["${document.id}"]`
      },
      body: JSON.stringify(document)
    });

    console.log('Cosmos REST: Response status:', response.status);
    console.log('Cosmos REST: Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cosmos REST: Error response:', errorText);
      throw new Error(`Cosmos DB request failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Cosmos REST: Document created successfully:', result.id);
    return result;

  } catch (error) {
    console.error('Cosmos REST: Error creating document:', error);
    throw error;
  }
}

// Create a form submission using REST API
export async function createFormSubmission(data: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): Promise<FormSubmission> {
  console.log('Cosmos REST: Creating form submission');
  
  const config: CosmosConfig = {
    endpoint: process.env.COSMOS_DB_ENDPOINT!,
    key: process.env.COSMOS_DB_KEY!,
    databaseName: process.env.COSMOS_DB_DATABASE_NAME!,
    containerName: process.env.COSMOS_DB_CONTAINER_NAME!,
  };

  // Validate environment variables
  if (!config.endpoint || !config.key || !config.databaseName || !config.containerName) {
    throw new Error('Missing Cosmos DB configuration');
  }

  const submission: FormSubmission = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  console.log('Cosmos REST: Prepared submission:', submission);

  try {
    const result = await createDocument(config, submission);
    return result as FormSubmission;
  } catch (error) {
    console.error('Cosmos REST: Failed to create form submission:', error);
    throw new Error(`Failed to save form submission: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create a progress updates submission using REST API
export async function createProgressUpdatesSubmission(data: Omit<ProgressUpdatesSubmission, 'id' | 'submittedAt' | 'status'>): Promise<ProgressUpdatesSubmission> {
  console.log('Cosmos REST: Creating progress updates submission');
  
  const config: CosmosConfig = {
    endpoint: process.env.COSMOS_DB_ENDPOINT!,
    key: process.env.COSMOS_DB_KEY!,
    databaseName: process.env.COSMOS_DB_DATABASE_NAME!,
    containerName: 'progress-updates',
  };

  // Validate environment variables
  if (!config.endpoint || !config.key || !config.databaseName) {
    throw new Error('Missing Cosmos DB configuration');
  }

  const submission: ProgressUpdatesSubmission = {
    ...data,
    id: `pu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  console.log('Cosmos REST: Prepared progress updates submission:', submission);

  try {
    const result = await createDocument(config, submission);
    return result as ProgressUpdatesSubmission;
  } catch (error) {
    console.error('Cosmos REST: Failed to create progress updates submission:', error);
    throw new Error(`Failed to save progress updates submission: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create a collaboration submission using REST API
export async function createCollaborationSubmission(data: Omit<CollaborationSubmission, 'id' | 'submittedAt' | 'status'>): Promise<CollaborationSubmission> {
  console.log('Cosmos REST: Creating collaboration submission');
  
  const config: CosmosConfig = {
    endpoint: process.env.COSMOS_DB_ENDPOINT!,
    key: process.env.COSMOS_DB_KEY!,
    databaseName: process.env.COSMOS_DB_DATABASE_NAME!,
    containerName: 'collaboration',
  };

  // Validate environment variables
  if (!config.endpoint || !config.key || !config.databaseName) {
    throw new Error('Missing Cosmos DB configuration');
  }

  const submission: CollaborationSubmission = {
    ...data,
    id: `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  console.log('Cosmos REST: Prepared collaboration submission:', submission);

  try {
    const result = await createDocument(config, submission);
    return result as CollaborationSubmission;
  } catch (error) {
    console.error('Cosmos REST: Failed to create collaboration submission:', error);
    throw new Error(`Failed to save collaboration submission: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Test connection to Cosmos DB
export async function testCosmosConnection(): Promise<boolean> {
  console.log('Cosmos REST: Testing connection');
  
  try {
    const config: CosmosConfig = {
      endpoint: process.env.COSMOS_DB_ENDPOINT!,
      key: process.env.COSMOS_DB_KEY!,
      databaseName: process.env.COSMOS_DB_DATABASE_NAME!,
      containerName: process.env.COSMOS_DB_CONTAINER_NAME!,
    };

    // Validate environment variables
    if (!config.endpoint || !config.key || !config.databaseName || !config.containerName) {
      console.error('Cosmos REST: Missing configuration');
      return false;
    }

    // Try to get database info
    const resourceLink = `dbs/${config.databaseName}`;
    const resourceType = 'dbs';
    const verb = 'GET';
    const date = new Date().toUTCString();

    const authHeader = await generateAuthHeader(verb, resourceType, resourceLink, date, config.key);
    
    const url = `${config.endpoint}dbs/${config.databaseName}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'x-ms-date': date,
        'x-ms-version': '2018-12-31'
      }
    });

    console.log('Cosmos REST: Test response status:', response.status);
    return response.ok;

  } catch (error) {
    console.error('Cosmos REST: Connection test failed:', error);
    return false;
  }
}