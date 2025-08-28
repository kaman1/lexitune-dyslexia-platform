import { type NextRequest, NextResponse } from 'next/server';

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = {
  // Run middleware on all routes for anti-scraping, and specific routes for auth
  matcher: [
    '/((?!api|_next|_static|favicon.ico|sitemap.xml|robots.txt).*)',
    '/pitch/:path*', 
    '/portal/:path*'
  ],
};

// List of known scraping and AI crawling user agents
const blockedUserAgents = [
  'gptbot', 
  'chatgpt', 
  'anthropic', 
  'claude', 
  'bingbot/ai', 
  'google-extended', 
  'openai', 
  'scraper', 
  'scraping',
  'bytespider',
  'ccbot',
  'crawl',
  'spider',
  'semrush',
  'ahrefs',
  'mj12bot',
  'python-requests',
  'axios',
  'fetch',
  'scrapy',
  'wget',
  'curl',
  'cohere',
  'perplexity',
  'youbot',
  'diffbot',
  'algolia',
  'blackboard'
];

export default function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Anti-scraping and AI crawling protection
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // Check for known scraper/bot user agents
  const isBot = blockedUserAgents.some(botAgent => userAgent.includes(botAgent));

  // Check for headless browsers and automation tools
  const isHeadless = userAgent.includes('headless') || 
                    userAgent.includes('phantomjs') || 
                    userAgent.includes('selenium') || 
                    userAgent.includes('playwright') || 
                    userAgent.includes('puppeteer');

  // If it's a bot or headless browser we want to block
  if (isBot || isHeadless) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Access denied' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    );
  }
  
  // Authentication check for protected routes
  if (pathname.startsWith('/pitch') || pathname.startsWith('/portal')) {
    // Check if the user is authenticated by looking for a session cookie
    const sessionCookie = request.cookies.get('session');
    
    // If no session cookie exists, redirect to login
    if (!sessionCookie) {
      // Create the URL to redirect to
      const redirectUrl = new URL('/login', request.url);
      
      // Add the current path as a "from" parameter
      redirectUrl.searchParams.set('from', pathname);
      
      // Return redirect response
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  // User is authenticated or accessing a non-protected route
  const response = NextResponse.next();
  
  // Add anti-scraping and anti-AI training headers to all responses
  response.headers.set('X-Robots-Tag', 'noai, noimageai');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  response.headers.set('Permissions-Policy', 'browsing-topics=(), interest-cohort=(), attribution-reporting=()');
  
  // Additional security measures
  response.headers.set('Referrer-Policy', 'same-origin');
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  
  return response;
}
