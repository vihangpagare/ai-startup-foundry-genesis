
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
      // Step 1: Remove markdown code blocks
      processedCode = this.removeMarkdownBlocks(processedCode);
      console.log('After removing markdown blocks:', processedCode.length);
      
      // Step 2: Fix import statements early
      processedCode = this.fixImportStatements(processedCode);
      console.log('After fixing imports:', processedCode.length);
      
      // Step 3: Fix JSX syntax issues
      processedCode = this.fixJSXSyntax(processedCode);
      console.log('After fixing JSX syntax:', processedCode.length);
      
      // Step 4: Ensure proper component structure
      processedCode = this.ensureProperComponentStructure(processedCode);
      console.log('After ensuring component structure:', processedCode.length);
      
      // Step 5: Add missing imports if needed
      processedCode = this.addMissingImports(processedCode);
      
      // Step 6: Fix common syntax issues
      processedCode = this.fixCommonSyntaxIssues(processedCode);
      
      // Step 7: Final validation
      const validationResult = this.validateReactComponent(processedCode);
      errors.push(...validationResult.errors);
      warnings.push(...validationResult.warnings);
      
      console.log('Final processed code preview:', processedCode.substring(0, 300) + '...');
      
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

  private static fixJSXSyntax(code: string): string {
    // Fix unclosed JSX tags - basic fixes
    let fixed = code;
    
    // Fix self-closing tags that should be self-closed
    fixed = fixed.replace(/<(img|input|br|hr|meta|link|area|base|col|embed|source|track|wbr)([^>]*?)(?<!\/)\s*>/g, '<$1$2 />');
    
    // Fix common JSX attribute issues
    fixed = fixed.replace(/class=/g, 'className=');
    fixed = fixed.replace(/for=/g, 'htmlFor=');
    
    // Fix style attribute
    fixed = fixed.replace(/style="([^"]+)"/g, (match, styles) => {
      const styleObj = styles.split(';')
        .filter((s: string) => s.trim())
        .map((s: string) => {
          const [prop, value] = s.split(':').map((p: string) => p.trim());
          if (!prop || !value) return '';
          const camelProp = prop.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
          return `${camelProp}: '${value}'`;
        })
        .filter((s: string) => s.length > 0)
        .join(', ');
      return styleObj ? `style={{${styleObj}}}` : '';
    });
    
    // Fix HTML entities
    fixed = fixed.replace(/&nbsp;/g, '\u00A0');
    fixed = fixed.replace(/&amp;/g, '&');
    fixed = fixed.replace(/&lt;/g, '<');
    fixed = fixed.replace(/&gt;/g, '>');
    
    return fixed;
  }

  private static fixImportStatements(code: string): string {
    let fixed = code;
    
    // Replace problematic imports
    fixed = fixed.replace(/from ['"]react-icons\/fi['"]/g, "from 'lucide-react'");
    fixed = fixed.replace(/from ['"]react-icons\/\w+['"]/g, "from 'lucide-react'");
    
    // Fix framer-motion imports - remove if not available
    if (fixed.includes("from 'framer-motion'")) {
      // Remove framer-motion import and usage
      fixed = fixed.replace(/import.*from ['"]framer-motion['"];?\n?/g, '');
      fixed = fixed.replace(/import\s*{\s*[^}]*motion[^}]*\s*}\s*from\s*['"]framer-motion['"];?\n?/g, '');
      
      // Replace motion components with regular divs
      fixed = fixed.replace(/motion\./g, '');
      fixed = fixed.replace(/<motion\.(\w+)/g, '<$1');
      fixed = fixed.replace(/initial=\{[^}]+\}/g, '');
      fixed = fixed.replace(/animate=\{[^}]+\}/g, '');
      fixed = fixed.replace(/transition=\{[^}]+\}/g, '');
      fixed = fixed.replace(/whileHover=\{[^}]+\}/g, '');
      fixed = fixed.replace(/whileTap=\{[^}]+\}/g, '');
      fixed = fixed.replace(/variants=\{[^}]+\}/g, '');
    }
    
    // Fix icon imports - map common react-icons to lucide-react
    const iconMappings: Record<string, string> = {
      'FiCamera': 'Camera',
      'FiInstagram': 'Instagram',
      'FiCalendar': 'Calendar',
      'FiBarChart': 'BarChart3',
      'FiCheck': 'Check',
      'FiStar': 'Star',
      'FiArrowRight': 'ArrowRight',
      'FiMenu': 'Menu',
      'FiX': 'X'
    };
    
    Object.entries(iconMappings).forEach(([oldIcon, newIcon]) => {
      const regex = new RegExp(`\\b${oldIcon}\\b`, 'g');
      fixed = fixed.replace(regex, newIcon);
    });
    
    return fixed;
  }

  private static ensureProperComponentStructure(code: string): string {
    // If code doesn't start with import statements, add React import
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
        const wrappedCode = `import React from 'react';\n\nconst App = () => {\n  return (\n    <div className="min-h-screen">\n${code}\n    </div>\n  );\n};\n\nexport default App;`;
        code = wrappedCode;
      }
    }

    return code;
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
    if (code.includes("useCallback") && !code.includes("import { useCallback")) {
      imports.push("useCallback");
    }
    if (code.includes("useMemo") && !code.includes("import { useMemo")) {
      imports.push("useMemo");
    }

    if (imports.length > 0) {
      const existingReactImport = code.match(/import React(?:\s*,\s*{\s*([^}]*)\s*})?\s*from\s*['"]react['"]/);
      
      if (existingReactImport) {
        // Update existing React import
        const existingImports = existingReactImport[1] ? existingReactImport[1].split(',').map((s: string) => s.trim()) : [];
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
    // Ensure proper JSX fragment syntax
    code = code.replace(/<React\.Fragment>/g, '<>');
    code = code.replace(/<\/React\.Fragment>/g, '</>');

    // Fix arrow function syntax in JSX
    code = code.replace(/onClick=\{([^}]+)\}/g, (match, handler) => {
      if (!handler.includes('=>') && !handler.includes('(')) {
        return `onClick={() => ${handler}}`;
      }
      return match;
    });

    // Ensure proper boolean attributes
    code = code.replace(/(\w+)=\{true\}/g, '$1');
    code = code.replace(/(\w+)=\{false\}/g, '');

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
    if (!code.includes("return (") && !code.includes("return <") && !code.includes("return\n")) {
      warnings.push("No JSX return statement found");
    }

    // Check for React import when JSX is present
    if (!code.includes("import React") && (code.includes("<") || code.includes("JSX"))) {
      warnings.push("React import may be missing for JSX");
    }

    // Basic JSX tag validation - more sophisticated approach
    const jsxContent = this.extractJSXContent(code);
    if (jsxContent) {
      const tagBalance = this.validateJSXTagBalance(jsxContent);
      if (!tagBalance.isBalanced) {
        warnings.push(`Potential JSX structure issues: ${tagBalance.issues.join(', ')}`);
      }
    }

    return { errors, warnings };
  }

  private static extractJSXContent(code: string): string | null {
    // Extract JSX content from return statements
    const returnMatches = code.match(/return\s*\(([\s\S]*?)\);?/g);
    if (returnMatches) {
      return returnMatches.join('\n');
    }
    
    const singleLineReturn = code.match(/return\s+<[\s\S]*?>;?/g);
    if (singleLineReturn) {
      return singleLineReturn.join('\n');
    }
    
    return null;
  }

  private static validateJSXTagBalance(jsxContent: string): { isBalanced: boolean, issues: string[] } {
    const issues: string[] = [];
    const stack: string[] = [];
    
    // Remove JSX expressions and strings to avoid false positives
    const cleanContent = jsxContent
      .replace(/\{[^}]*\}/g, '{...}')
      .replace(/"[^"]*"/g, '""')
      .replace(/'[^']*'/g, "''");
    
    // Find all tags
    const tagPattern = /<\/?[\w.-]+[^>]*>/g;
    const tags = cleanContent.match(tagPattern) || [];
    
    for (const tag of tags) {
      if (tag.includes('</')) {
        // Closing tag
        const tagName = tag.match(/<\/(\w+)/)?.[1];
        if (tagName) {
          const lastOpened = stack.pop();
          if (lastOpened !== tagName) {
            issues.push(`Mismatched tag: expected </${lastOpened}>, found </${tagName}>`);
          }
        }
      } else if (!tag.endsWith('/>')) {
        // Opening tag (not self-closing)
        const tagName = tag.match(/<(\w+)/)?.[1];
        if (tagName && !['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName)) {
          stack.push(tagName);
        }
      }
    }
    
    if (stack.length > 0) {
      issues.push(`Unclosed tags: ${stack.join(', ')}`);
    }
    
    return {
      isBalanced: issues.length === 0,
      issues
    };
  }
}
