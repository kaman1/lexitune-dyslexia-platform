import { CosmosClient, Database, Container } from '@azure/cosmos';

// Cosmos DB configuration
const endpoint = process.env.COSMOS_DB_ENDPOINT!;
const key = process.env.COSMOS_DB_KEY!;
const databaseName = process.env.COSMOS_DB_DATABASE_NAME!;
const containerName = process.env.COSMOS_DB_CONTAINER_NAME!;

// Validate environment variables
if (!endpoint) {
  throw new Error('COSMOS_DB_ENDPOINT environment variable is not set');
}
if (!key) {
  throw new Error('COSMOS_DB_KEY environment variable is not set');
}
if (!databaseName) {
  throw new Error('COSMOS_DB_DATABASE_NAME environment variable is not set');
}
if (!containerName) {
  throw new Error('COSMOS_DB_CONTAINER_NAME environment variable is not set');
}

console.log('Cosmos: Initializing client with endpoint:', endpoint);

// Create Cosmos DB client
export const cosmosClient = new CosmosClient({
  endpoint,
  key,
});

// Get database and container references
export const database: Database = cosmosClient.database(databaseName);
export const container: Container = database.container(containerName);

// Form submission schema interface
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
  source: 'onboarding' | 'contact' | 'other';
  status: 'pending' | 'processed' | 'contacted';
}

// Create a new form submission
export async function createFormSubmission(data: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): Promise<FormSubmission> {
  console.log('Cosmos: Creating form submission with data:', data);
  
  const submission: FormSubmission = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  console.log('Cosmos: Prepared submission:', submission);

  try {
    console.log('Cosmos: Attempting to create item in container');
    const { resource } = await container.items.create(submission);
    console.log('Cosmos: Item created successfully:', resource?.id);
    return resource as FormSubmission;
  } catch (error) {
    console.error('Cosmos: Error creating form submission:', error);
    console.error('Cosmos: Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      statusCode: (error as any)?.statusCode,
      body: (error as any)?.body,
    });
    throw error; // Re-throw the original error for better debugging
  }
}

// Get all form submissions (admin function)
export async function getAllFormSubmissions(): Promise<FormSubmission[]> {
  try {
    const { resources } = await container.items
      .query('SELECT * FROM c ORDER BY c.submittedAt DESC')
      .fetchAll();
    return resources as FormSubmission[];
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    throw new Error('Failed to fetch form submissions');
  }
}

// Get form submissions by email
export async function getFormSubmissionsByEmail(email: string): Promise<FormSubmission[]> {
  try {
    const { resources } = await container.items
      .query({
        query: 'SELECT * FROM c WHERE c.email = @email ORDER BY c.submittedAt DESC',
        parameters: [{ name: '@email', value: email }]
      })
      .fetchAll();
    return resources as FormSubmission[];
  } catch (error) {
    console.error('Error fetching form submissions by email:', error);
    throw new Error('Failed to fetch form submissions');
  }
}

// Update form submission status
export async function updateFormSubmissionStatus(id: string, status: FormSubmission['status']): Promise<void> {
  try {
    const { resource } = await container.item(id, id).read();
    if (resource) {
      resource.status = status;
      await container.item(id, id).replace(resource);
    }
  } catch (error) {
    console.error('Error updating form submission status:', error);
    throw new Error('Failed to update form submission status');
  }
}

// Test connection
export async function testCosmosConnection(): Promise<boolean> {
  try {
    await database.read();
    await container.read();
    return true;
  } catch (error) {
    console.error('Cosmos DB connection test failed:', error);
    return false;
  }
}