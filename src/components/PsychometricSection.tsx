
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";

interface PsychometricSectionProps {
  onComplete: (scores: PsychometricScores) => void;
  onBack: () => void;
}

export interface PsychometricScores {
  interest: number;
  ethics: number;
  curiosity: number;
  stressTolerance: number;
  selfEfficacy: number;
  overallScore: number;
}

const PsychometricSection = ({ onComplete, onBack }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      category: "Interest",
      question: "Do you enjoy solving logic puzzles and complex problems?",
      options: [
        "Strongly Disagree",
        "Disagree", 
        "Neutral",
        "Agree",
        "Strongly Agree"
      ]
    },
    {
      category: "Ethics",
      question: "I prefer to report security flaws rather than exploit them for personal gain.",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral", 
        "Agree",
        "Strongly Agree"
      ]
    },
    {
      category: "Curiosity",
      question: "I often wonder how software and systems work internally.",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree", 
        "Strongly Agree"
      ]
    },
    {
      category: "Stress Tolerance",
      question: "I can handle high-pressure situations and work calmly under stress.",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
      ]
    },
    {
      category: "Self-Efficacy",
      question: "I believe I can learn cybersecurity skills even if they seem challenging at first.",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
      ]
    },
    {
      category: "Persistence",
      question: "When faced with a difficult technical problem, I prefer to work through it systematically rather than give up.",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
      ]
    },
    {
      category: "Attention to Detail",
      question: "I naturally notice small inconsistencies or anomalies that others might miss.",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
      ]
    },
    {
      category: "Learning Motivation",
      question: "I actively seek out new information about technology and security trends.",
      options: [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
      ]
    }
  ];

  const handleAnswerSelect = (value: string) => {
    const numValue = parseInt(value) + 1; // Convert 0-4 to 1-5 scale
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = numValue;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate scores
      const totalScore = answers.reduce((sum, score) => sum + score, 0);
      const maxScore = questions.length * 5;
      const overallScore = Math.round((totalScore / maxScore) * 100);
      
      const scores: PsychometricScores = {
        interest: Math.round(((answers[0] || 0) / 5) * 100),
        ethics: Math.round(((answers[1] || 0) / 5) * 100),
        curiosity: Math.round(((answers[2] || 0) / 5) * 100),
        stressTolerance: Math.round(((answers[3] || 0) / 5) * 100),
        selfEfficacy: Math.round(((answers[4] || 0) / 5) * 100),
        overallScore
      };
      
      onComplete(scores);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              Psychometric Assessment
            </h2>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-lg">
              {questions[currentQuestion].category}
            </CardTitle>
            <CardDescription className="text-base">
              {questions[currentQuestion].question}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={currentAnswer ? (currentAnswer - 1).toString() : undefined}
              onValueChange={handleAnswerSelect}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PsychometricSection;
