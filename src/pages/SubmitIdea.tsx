
import { useState } from 'react';
import { SubmitIdeaHeader } from '@/components/SubmitIdeaHeader';
import { IdeaForm } from '@/components/IdeaForm';
import { AnalysisFeatures } from '@/components/AnalysisFeatures';
import { ProcessingTime } from '@/components/ProcessingTime';
import { ExampleIdeas } from '@/components/ExampleIdeas';

const SubmitIdea = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExampleClick = (description: string) => {
    // Use the global function set by IdeaForm
    if ((window as any).__setIdea) {
      (window as any).__setIdea(description);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SubmitIdeaHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Describe Your SaaS Startup Idea
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Provide detailed information about your SaaS concept. The more specific you are, 
            the more comprehensive and tailored your business package will be.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <IdeaForm onExampleClick={handleExampleClick} />
          </div>

          <div className="space-y-6">
            <AnalysisFeatures />
            <ProcessingTime />
          </div>
        </div>

        <ExampleIdeas onExampleClick={handleExampleClick} isProcessing={isProcessing} />
      </main>
    </div>
  );
};

export default SubmitIdea;
