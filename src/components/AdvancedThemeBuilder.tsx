import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Palette, Type, Layout, Settings } from 'lucide-react';
import { ColorScheme, TypographyConfig } from '@/types/template';

interface AdvancedThemeBuilderProps {
  colorScheme: ColorScheme;
  typography: TypographyConfig;
  onColorChange: (colorScheme: Partial<ColorScheme>) => void;
  onTypographyChange: (typography: Partial<TypographyConfig>) => void;
  onSpacingChange: (spacing: Record<string, number>) => void;
}

const AdvancedThemeBuilder = ({ 
  colorScheme, 
  typography, 
  onColorChange, 
  onTypographyChange,
  onSpacingChange 
}: AdvancedThemeBuilderProps) => {
  const [selectedColorPalette, setSelectedColorPalette] = useState<string>('custom');
  const [spacing, setSpacing] = useState({
    container: 16,
    section: 64,
    element: 24
  });

  const predefinedPalettes = {
    modern: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    warm: {
      primary: '#DC2626',
      secondary: '#EA580C',
      accent: '#D97706',
      background: '#FEF7F0',
      text: '#7C2D12'
    },
    cool: {
      primary: '#0891B2',
      secondary: '#0E7490',
      accent: '#059669',
      background: '#F0F9FF',
      text: '#164E63'
    },
    elegant: {
      primary: '#4C1D95',
      secondary: '#5B21B6',
      accent: '#7C3AED',
      background: '#FAFAFA',
      text: '#1F2937'
    }
  };

  const fontPairings = {
    modern: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    classic: {
      heading: 'Playfair Display, serif',
      body: 'Source Sans Pro, sans-serif'
    },
    tech: {
      heading: 'JetBrains Mono, monospace',
      body: 'Roboto, sans-serif'
    },
    creative: {
      heading: 'Montserrat, sans-serif',
      body: 'Open Sans, sans-serif'
    }
  };

  const handlePaletteSelect = (paletteKey: string) => {
    setSelectedColorPalette(paletteKey);
    if (paletteKey !== 'custom') {
      const palette = predefinedPalettes[paletteKey as keyof typeof predefinedPalettes];
      onColorChange(palette);
    }
  };

  const handleFontPairingSelect = (pairingKey: string) => {
    const pairing = fontPairings[pairingKey as keyof typeof fontPairings];
    onTypographyChange({
      fontFamily: {
        ...typography.fontFamily,
        ...pairing
      }
    });
  };

  const handleSpacingChange = (type: string, value: number[]) => {
    const newSpacing = { ...spacing, [type]: value[0] };
    setSpacing(newSpacing);
    onSpacingChange(newSpacing);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Advanced Theme Builder</span>
          </CardTitle>
          <CardDescription>
            Customize your design system with colors, typography, and spacing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="h-4 w-4 mr-2" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="h-4 w-4 mr-2" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="spacing">
                <Settings className="h-4 w-4 mr-2" />
                Spacing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              {/* Predefined Color Palettes */}
              <div>
                <Label className="text-base font-medium mb-3 block">Quick Color Palettes</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(predefinedPalettes).map(([key, palette]) => (
                    <Button
                      key={key}
                      variant={selectedColorPalette === key ? "default" : "outline"}
                      className="h-auto p-3 flex-col space-y-2"
                      onClick={() => handlePaletteSelect(key)}
                    >
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: palette.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: palette.accent }}
                        />
                      </div>
                      <span className="text-xs capitalize">{key}</span>
                    </Button>
                  ))}
                  <Button
                    variant={selectedColorPalette === 'custom' ? "default" : "outline"}
                    className="h-auto p-3 flex-col space-y-2"
                    onClick={() => setSelectedColorPalette('custom')}
                  >
                    <div className="text-lg">🎨</div>
                    <span className="text-xs">Custom</span>
                  </Button>
                </div>
              </div>

              {/* Individual Color Controls */}
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(colorScheme).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize">{key}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={value}
                        onChange={(e) => onColorChange({ [key]: e.target.value })}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => onColorChange({ [key]: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              {/* Font Pairings */}
              <div>
                <Label className="text-base font-medium mb-3 block">Font Pairings</Label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(fontPairings).map(([key, pairing]) => (
                    <Card 
                      key={key} 
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleFontPairingSelect(key)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div 
                            className="text-lg font-semibold"
                            style={{ fontFamily: pairing.heading }}
                          >
                            Heading Font
                          </div>
                          <div 
                            className="text-sm text-gray-600"
                            style={{ fontFamily: pairing.body }}
                          >
                            Body text example
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {key}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Font Size Controls */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Font Sizes</Label>
                {Object.entries(typography.fontSize).map(([size, value]) => (
                  <div key={size} className="flex items-center space-x-4">
                    <Label className="w-16 text-sm capitalize">{size}:</Label>
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) => onTypographyChange({
                        fontSize: {
                          ...typography.fontSize,
                          [size]: e.target.value
                        }
                      })}
                      className="w-24"
                    />
                    <div 
                      className="flex-1 text-gray-600"
                      style={{ fontSize: value }}
                    >
                      Sample text
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Layout Variants</Label>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:border-primary">
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-16 bg-gray-100 rounded mb-2 flex items-center justify-center">
                        <div className="w-12 h-8 bg-gray-300 rounded"></div>
                      </div>
                      <span className="text-sm">Centered Hero</span>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:border-primary">
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-16 bg-gray-100 rounded mb-2 flex">
                        <div className="w-1/2 bg-gray-300 rounded-l flex items-center justify-center">
                          <div className="w-8 h-4 bg-gray-400 rounded"></div>
                        </div>
                        <div className="w-1/2 bg-gray-200 rounded-r"></div>
                      </div>
                      <span className="text-sm">Split Layout</span>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:border-primary">
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 flex items-center justify-center">
                        <div className="w-12 h-8 bg-white/50 rounded"></div>
                      </div>
                      <span className="text-sm">Full Width</span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="spacing" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Spacing Scale</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Container Padding: {spacing.container}px</Label>
                      <Slider
                        value={[spacing.container]}
                        onValueChange={(value) => handleSpacingChange('container', value)}
                        max={64}
                        min={8}
                        step={4}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Section Spacing: {spacing.section}px</Label>
                      <Slider
                        value={[spacing.section]}
                        onValueChange={(value) => handleSpacingChange('section', value)}
                        max={128}
                        min={32}
                        step={8}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Element Spacing: {spacing.element}px</Label>
                      <Slider
                        value={[spacing.element]}
                        onValueChange={(value) => handleSpacingChange('element', value)}
                        max={64}
                        min={8}
                        step={4}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Spacing Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Spacing Preview</CardTitle>
                  </CardHeader>
                  <CardContent 
                    className="border rounded"
                    style={{ padding: `${spacing.container}px` }}
                  >
                    <div 
                      className="bg-gray-100 rounded p-4"
                      style={{ marginBottom: `${spacing.section}px` }}
                    >
                      <div className="bg-white rounded p-2 mb-4">Section 1</div>
                      <div 
                        className="bg-white rounded p-2"
                        style={{ marginBottom: `${spacing.element}px` }}
                      >
                        Element
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded p-4">
                      <div className="bg-white rounded p-2">Section 2</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedThemeBuilder;
