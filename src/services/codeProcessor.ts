
interface CodeProcessingResult {
  processedCode: string;
  errors: string[];
  warnings: string[];
}

export class CodeProcessor {
  static processReactCode(rawCode: string): CodeProcessingResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let processedCode = rawCode;

    try {
      // Remove markdown code blocks
      processedCode = this.removeMarkdownBlocks(processedCode);
      
      // Fix common import issues
      processedCode = this.fixImportStatements(processedCode);
      
      // Validate React component structure
      const validationResult = this.validateReactComponent(processedCode);
      errors.push(...validationResult.errors);
      warnings.push(...validationResult.warnings);
      
      // Add necessary imports if missing
      processedCode = this.addMissingImports(processedCode);
      
      // Fix common syntax issues
      processedCode = this.fixCommonSyntaxIssues(processedCode);
      
    } catch (error) {
      errors.push(`Code processing failed: ${error}`);
    }

    return {
      processedCode,
      errors,
      warnings
    };
  }

  private static removeMarkdownBlocks(code: string): string {
    // Remove ```tsx, ```javascript, ```jsx blocks
    return code
      .replace(/```(?:tsx|typescript|javascript|jsx|js|ts)?\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
  }

  private static fixImportStatements(code: string): string {
    // Replace react-icons with lucide-react
    code = code.replace(/from ['"]react-icons\/\w+['"]/g, "from 'lucide-react'");
    
    // Fix common import path issues
    code = code.replace(/from ['"]@\/components\/ui\//g, "from './components/ui/");
    
    // Ensure React import exists
    if (!code.includes("import React") && code.includes("JSX")) {
      code = "import React from 'react';\n" + code;
    }

    return code;
  }

  private static validateReactComponent(code: string): { errors: string[], warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for component export
    if (!code.includes("export default") && !code.includes("export const")) {
      errors.push("No component export found");
    }

    // Check for JSX return
    if (!code.includes("return (") && !code.includes("return <")) {
      warnings.push("No JSX return statement found");
    }

    // Check for unclosed JSX tags
    const openTags = code.match(/<[a-zA-Z][^>]*[^\/]>/g) || [];
    const closeTags = code.match(/<\/[a-zA-Z][^>]*>/g) || [];
    
    if (openTags.length !== closeTags.length) {
      warnings.push("Potential unclosed JSX tags detected");
    }

    return { errors, warnings };
  }

  private static addMissingImports(code: string): string {
    const imports = [];

    // Check for common hooks usage
    if (code.includes("useState") && !code.includes("import { useState")) {
      imports.push("useState");
    }
    if (code.includes("useEffect") && !code.includes("import { useEffect")) {
      imports.push("useEffect");
    }

    if (imports.length > 0) {
      const importStatement = `import React, { ${imports.join(", ")} } from 'react';\n`;
      // Remove existing React import if present
      code = code.replace(/import React.*from ['"]react['"];\n?/g, "");
      code = importStatement + code;
    }

    return code;
  }

  private static fixCommonSyntaxIssues(code: string): string {
    // Fix quote issues in JSX
    code = code.replace(/=\{?'([^']*(?:\\'[^']*)*)'\}?/g, '="$1"');
    
    // Fix className issues
    code = code.replace(/class=/g, "className=");
    
    // Fix style object syntax
    code = code.replace(/style="([^"]+)"/g, (match, styles) => {
      const styleObj = styles.split(';')
        .filter(s => s.trim())
        .map(s => {
          const [prop, value] = s.split(':').map(p => p.trim());
          const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          return `${camelProp}: '${value}'`;
        })
        .join(', ');
      return `style={{${styleObj}}}`;
    });

    return code;
  }
}
