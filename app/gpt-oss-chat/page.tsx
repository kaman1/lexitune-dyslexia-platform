import { Metadata } from 'next'
import GPTOSSChat from '@/components/gpt-oss-chat'
import { LayoutWrapper } from '@/components/layout-wrapper'

export const metadata: Metadata = {
  title: 'GPT-OSS Chat Interface - TEKIMAX',
  description: 'Test and interact with the TEKIMAX GPT-OSS AI deployment through a ChatGPT-like interface with markdown support and code highlighting.',
  keywords: ['GPT-OSS', 'AI Chat', 'TEKIMAX', 'Code Generation', 'Markdown', 'Testing']
}

export default function GPTOSSChatPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">GPT-OSS Chat Interface</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test and interact with the TEKIMAX GPT-OSS deployment. Generate code, ask questions, 
            and explore AI capabilities with markdown rendering and syntax highlighting.
          </p>
        </div>
        
        <GPTOSSChat />
        
        <div className="mt-12 text-center">
          <div className="max-w-4xl mx-auto bg-muted/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">About This Interface</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-medium">🚀 Features</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• OpenAI-compatible API</li>
                  <li>• Markdown rendering</li>
                  <li>• Syntax highlighting</li>
                  <li>• Code copying</li>
                  <li>• Connection testing</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">🔧 Configuration</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Adjustable temperature</li>
                  <li>• Custom max tokens</li>
                  <li>• Endpoint configuration</li>
                  <li>• Model selection</li>
                  <li>• Real-time testing</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">💡 Use Cases</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Code generation</li>
                  <li>• API testing</li>
                  <li>• Learning assistance</li>
                  <li>• Content adaptation</li>
                  <li>• Development support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}