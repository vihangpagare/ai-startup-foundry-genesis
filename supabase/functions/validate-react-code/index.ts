
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ValidationRequest {
  code: string;
  companyName?: string;
}

interface ValidationResponse {
  success: boolean;
  validatedCode?: string;
  issues?: string[];
  fixes?: string[];
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const request: ValidationRequest = await req.json();
    console.log('Code validation request received, code length:', request.code.length);

    const validationPrompt = `You are an expert React/TypeScript code validator. Your task is to analyze the provided React component code and ensure it's syntactically correct, follows best practices, and will compile without errors.

Please analyze this React component code and provide a corrected version:

\`\`\`tsx
${request.code}
\`\`\`

Requirements:
1. Ensure all JSX syntax is correct
2. Fix any TypeScript errors
3. Ensure all imports are valid
4. Fix any missing semicolons, brackets, or syntax issues
5. Ensure the component exports correctly
6. Make sure all props are properly typed
7. Fix any React-specific issues (keys, fragments, etc.)
8. Ensure the component is production-ready

Please respond with ONLY the corrected code wrapped in \`\`\`tsx code blocks. Do not include any explanations or additional text - just the clean, corrected React component code.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: validationPrompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const validatedContent = data.content[0].text;

    // Extract code from markdown code blocks
    const codeMatch = validatedContent.match(/```tsx\n([\s\S]*?)\n```/);
    const validatedCode = codeMatch ? codeMatch[1] : validatedContent;

    // Basic validation checks
    const issues: string[] = [];
    const fixes: string[] = [];

    // Check for common issues in original vs validated code
    if (!request.code.includes('export default')) {
      if (validatedCode.includes('export default')) {
        fixes.push('Added missing default export');
      } else {
        issues.push('Missing default export');
      }
    }

    if (request.code.split('import').length !== validatedCode.split('import').length) {
      fixes.push('Corrected import statements');
    }

    if (request.code.includes('${') && !request.code.includes('`')) {
      if (validatedCode.includes('`')) {
        fixes.push('Fixed template literal syntax');
      }
    }

    console.log('Code validation completed successfully');

    const result: ValidationResponse = {
      success: true,
      validatedCode: validatedCode.trim(),
      issues: issues.length > 0 ? issues : undefined,
      fixes: fixes.length > 0 ? fixes : undefined
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in validate-react-code function:', error);
    
    const errorResponse: ValidationResponse = {
      success: false,
      error: error.message
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
