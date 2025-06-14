
import { Card, CardContent } from '@/components/ui/card';

export const ProcessingTime = () => {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600 mb-2">~10-15 min</div>
          <p className="text-sm text-gray-600">Comprehensive analysis time</p>
        </div>
      </CardContent>
    </Card>
  );
};
