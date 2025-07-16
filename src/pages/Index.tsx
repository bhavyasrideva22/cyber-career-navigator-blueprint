
import { useState } from "react";
import Header from "@/components/Header";
import AssessmentIntro from "@/components/AssessmentIntro";
import PsychometricSection, { PsychometricScores } from "@/components/PsychometricSection";
import TechnicalSection, { TechnicalScores } from "@/components/TechnicalSection";
import ResultsSection from "@/components/ResultsSection";

type AssessmentStep = 'intro' | 'psychometric' | 'technical' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [psychometricScores, setPsychometricScores] = useState<PsychometricScores | null>(null);
  const [technicalScores, setTechnicalScores] = useState<TechnicalScores | null>(null);

  const handleStartAssessment = () => {
    setCurrentStep('psychometric');
  };

  const handlePsychometricComplete = (scores: PsychometricScores) => {
    setPsychometricScores(scores);
    setCurrentStep('technical');
  };

  const handleTechnicalComplete = (scores: TechnicalScores) => {
    setTechnicalScores(scores);
    setCurrentStep('results');
  };

  const handleBackToPsychometric = () => {
    setCurrentStep('psychometric');
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setPsychometricScores(null);
    setTechnicalScores(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {currentStep === 'intro' && (
        <AssessmentIntro onStartAssessment={handleStartAssessment} />
      )}
      
      {currentStep === 'psychometric' && (
        <PsychometricSection 
          onComplete={handlePsychometricComplete}
          onBack={handleBackToIntro}
        />
      )}
      
      {currentStep === 'technical' && (
        <TechnicalSection 
          onComplete={handleTechnicalComplete}
          onBack={handleBackToPsychometric}
        />
      )}
      
      {currentStep === 'results' && psychometricScores && technicalScores && (
        <ResultsSection 
          psychometricScores={psychometricScores}
          technicalScores={technicalScores}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
