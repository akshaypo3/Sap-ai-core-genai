import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { performAIAssessment } from '@/lib/ai/anthropic';

const AIAssessmentButton = ({ assessmentId }: { assessmentId: string }) => {
  const router = useRouter();

  

  const handleAIAssessment = async () => {
    console.log("Clicked AI Button");
    try {
      const result = await performAIAssessment(assessmentId);
      if (result.success) {
        // Refresh the page to show updated data
        router.refresh();
      } else {
        // Handle error (e.g., show an error message to the user)
        console.error('AI assessment failed:', result.message);
      }
    } catch (error) {
      console.error('Error during AI assessment:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <Button onClick={handleAIAssessment}>
      Start AI-Assisted Assessment
    </Button>
  );
};

export default AIAssessmentButton;