
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

    console.log('Original code length:', rawCode.length);
    console.log('Processing React code...');

    try {
      // Remove markdown code blocks
      processedCode = this.removeMarkdownBlocks(processedCode);
      console.log('After removing markdown blocks:', processedCode.length);
      
      // Fix common import issues
      processedCode = this.fixImportStatements(processedCode);
      console.log('After fixing imports:', processedCode.length);
      
      // Ensure proper component structure
      processedCode = this.ensureProperComponentStructure(processedCode);
      console.log('After ensuring component structure:', processedCode.length);
      
      // Validate React component structure
      const validationResult = this.validateReactComponent(processedCode);
      errors.push(...validationResult.errors);
      warnings.push(...validationResult.warnings);
      
      // Add necessary imports if missing
      processedCode = this.addMissingImports(processedCode);
      
      // Fix common syntax issues
      processedCode = this.fixCommonSyntaxIssues(processedCode);
      
      console.log('Final processed code preview:', processedCode.substring(0, 200) + '...');
      
    } catch (error) {
      console.error('Code processing error:', error);
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
    let cleaned = code
      .replace(/```(?:tsx|typescript|javascript|jsx|js|ts)?\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    // Remove any remaining markdown formatting
    cleaned = cleaned.replace(/^\s*#.*$/gm, ''); // Remove markdown headers
    cleaned = cleaned.replace(/^\s*\*.*$/gm, ''); // Remove markdown bullet points
    
    return cleaned;
  }

  private static ensureProperComponentStructure(code: string): string {
    // If code doesn't start with import statements, add basic React import
    if (!code.trim().startsWith('import')) {
      code = "import React from 'react';\n\n" + code;
    }

    // Ensure there's a default export
    if (!code.includes('export default')) {
      // Try to find a component function and make it default export
      const componentMatch = code.match(/(?:const|function)\s+(\w+)\s*[=\(]/);
      if (componentMatch) {
        const componentName = componentMatch[1];
        if (!code.includes(`export default ${componentName}`)) {
          code += `\n\nexport default ${componentName};`;
        }
      } else {
        // If no component found, wrap the entire code in a default component
        code = `import React from 'react';\n\nconst App = () => {\n  return (\n    <div>\n${code}\n    </div>\n  );\n};\n\nexport default App;`;
      }
    }

    return code;
  }

  private static fixImportStatements(code: string): string {
    // Replace react-icons with lucide-react
    code = code.replace(/from ['"]react-icons\/\w+['"]/g, "from 'lucide-react'");
    
    // Fix common import path issues
    code = code.replace(/from ['"]@\/components\/ui\//g, "from './components/ui/");
    
    // Fix lucide-react imports to use specific icon names
    code = code.replace(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/g, (match, imports) => {
      // Clean up the imports and make sure they're valid
      const cleanImports = imports.split(',').map((imp: string) => imp.trim()).filter((imp: string) => imp.length > 0);
      return `import { ${cleanImports.join(', ')} } from 'lucide-react'`;
    });

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

    // Check for React import
    if (!code.includes("import React") && (code.includes("<") || code.includes("JSX"))) {
      warnings.push("React import may be missing for JSX");
    }

    // Check for unclosed JSX tags (basic check)
    const openTags = (code.match(/<[a-zA-Z][^>\/]*[^\/]>/g) || []).length;
    const closeTags = (code.match(/<\/[a-zA-Z][^>]*>/g) || []).length;
    const selfClosingTags = (code.match(/<[a-zA-Z][^>]*\/>/g) || []).length;
    
    if (openTags !== closeTags + selfClosingTags) {
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
      const existingReactImport = code.match(/import React(?:\s*,\s*{\s*([^}]*)\s*})?\s*from\s*['"]react['"]/);
      
      if (existingReactImport) {
        // Update existing React import
        const existingImports = existingReactImport[1] ? existingReactImport[1].split(',').map(s => s.trim()) : [];
        const allImports = [...new Set([...existingImports, ...imports])];
        const newImportStatement = `import React, { ${allImports.join(", ")} } from 'react'`;
        code = code.replace(existingReactImport[0], newImportStatement);
      } else {
        // Add new React import
        const importStatement = `import React, { ${imports.join(", ")} } from 'react';\n`;
        // Remove any existing basic React import
        code = code.replace(/import React\s*from\s*['"]react['"];\n?/g, "");
        code = importStatement + code;
      }
    }

    return code;
  }

  private static fixCommonSyntaxIssues(code: string): string {
    // Fix className issues
    code = code.replace(/class=/g, "className=");
    
    // Fix style object syntax
    code = code.replace(/style="([^"]+)"/g, (match, styles) => {
      const styleObj = styles.split(';')
        .filter((s: string) => s.trim())
        .map((s: string) => {
          const [prop, value] = s.split(':').map((p: string) => p.trim());
          if (!prop || !value) return '';
          const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          return `${camelProp}: '${value}'`;
        })
        .filter((s: string) => s.length > 0)
        .join(', ');
      return styleObj ? `style={{${styleObj}}}` : '';
    });

    // Fix common JSX issues
    code = code.replace(/&nbsp;/g, '\u00A0'); // Replace HTML entities
    code = code.replace(/&amp;/g, '&');
    
    // Ensure proper JSX fragment syntax
    code = code.replace(/<React\.Fragment>/g, '<>');
    code = code.replace(/<\/React\.Fragment>/g, '</>');

    return code;
  }
}
