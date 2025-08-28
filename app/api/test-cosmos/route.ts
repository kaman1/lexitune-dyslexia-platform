import { NextResponse } from 'next/server';
import { testCosmosConnection } from '@/lib/cosmos-rest';

export const runtime = 'edge';

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      hasEndpoint: !!process.env.COSMOS_DB_ENDPOINT,
      hasKey: !!process.env.COSMOS_DB_KEY,
      hasDatabase: !!process.env.COSMOS_DB_DATABASE_NAME,
      hasContainer: !!process.env.COSMOS_DB_CONTAINER_NAME,
      endpoint: process.env.COSMOS_DB_ENDPOINT ? 'SET' : 'NOT SET',
      database: process.env.COSMOS_DB_DATABASE_NAME || 'NOT SET',
      container: process.env.COSMOS_DB_CONTAINER_NAME || 'NOT SET',
    };

    // Test the actual connection
    const connectionTest = await testCosmosConnection();

    return NextResponse.json({
      status: 'Environment and connection check',
      environment: envCheck,
      connectionTest: connectionTest ? 'SUCCESS' : 'FAILED',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'Error', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}