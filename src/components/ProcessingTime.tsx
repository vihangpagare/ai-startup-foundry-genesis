
import { Card, CardContent } from '@/components/ui/card';

export const ProcessingTime = () => {
  return (
    <Card className="border shadow-lg bg-gradient-to-r from-muted/50 to-muted/70">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-2">~10-15 min</div>
          <p className="text-sm text-muted-foreground">Comprehensive analysis time</p>
        </div>
      </CardContent>
    </Card>
  );
};
