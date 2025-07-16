
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Code, ArrowRight, ArrowLeft, Shield } from "lucide-react";

interface TechnicalSectionProps {
  onComplete: (scores: TechnicalScores) => void;
  onBack: () => void;
}

export interface TechnicalScores {
  aptitude: number;
  prerequisites: number;
  cybersecurity: number;
  overallScore: number;
}

const TechnicalSection = ({ onComplete, onBack }: TechnicalSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    // Aptitude Questions
    {
      category: "Logical Reasoning",
      section: "aptitude",
      question: "What comes next in this sequence: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: 1
    },
    {
      category: "Pattern Recognition",
      section: "aptitude", 
      question: "If CYBER is coded as 3-25-2-5-18, what is the code for HACK?",
      options: ["8-1-3-11", "8-1-4-11", "7-1-3-11", "8-2-3-11"],
      correct: 0
    },
    // Prerequisites Questions
    {
      category: "Binary & Hex",
      section: "prerequisites",
      question: "What is the decimal value of binary 1010?",
      options: ["8", "10", "12", "16"],
      correct: 1
    },
    {
      category: "Networking",
      section: "prerequisites",
      question: "What does DNS stand for?",
      options: ["Data Network System", "Domain Name System", "Digital Network Security", "Dynamic Name Server"],
      correct: 1
    },
    {
      category: "Operating Systems",
      section: "prerequisites",
      question: "Which command is used to list files in a Linux terminal?",
      options: ["dir", "show", "ls", "list"],
      correct: 2
    },
    {
      category: "Networking Fundamentals",
      section: "prerequisites",
      question: "What is the default port for HTTPS?",
      options: ["80", "443", "8080", "22"],
      correct: 1
    },
    // Cybersecurity Questions
    {
      category: "Phishing Identification",
      section: "cybersecurity",
      question: "Which of these is most likely a phishing attempt?",
      options: [
        "Email from your bank asking to verify account via phone",
        "Email from 'your bank' with spelling errors asking for login credentials",
        "Email from bank's official domain with no links",
        "Email from bank with your full account number visible"
      ],
      correct: 1
    },
    {
      category: "Security Concepts",
      section: "cybersecurity",
      question: "What is the primary purpose of a firewall?",
      options: [
        "Speed up internet connection",
        "Store passwords securely", 
        "Filter network traffic based on rules",
        "Encrypt data transmission"
      ],
      correct: 2
    },
    {
      category: "Malware Types",
      section: "cybersecurity",
      question: "What type of malware spreads without user intervention?",
      options: ["Virus", "Trojan", "Worm", "Spyware"],
      correct: 2
    },
    {
      category: "Incident Response",
      section: "cybersecurity",
      question: "What should be the first step when a security breach is discovered?",
      options: [
        "Fix the vulnerability immediately",
        "Contain the breach to prevent spread",
        "Notify all users about the breach", 
        "Start investigating the cause"
      ],
      correct: 1
    }
  ];

  const handleAnswerSelect = (value: string) => {
    const selectedIndex = parseInt(value);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate scores
      const aptitudeQuestions = questions.filter(q => q.section === "aptitude");
      const prerequisiteQuestions = questions.filter(q => q.section === "prerequisites");
      const cybersecurityQuestions = questions.filter(q => q.section === "cybersecurity");
      
      let aptitudeScore = 0;
      let prerequisiteScore = 0;
      let cybersecurityScore = 0;
      
      questions.forEach((question, index) => {
        const isCorrect = answers[index] === question.correct ? 1 : 0;
        if (question.section === "aptitude") {
          aptitudeScore += isCorrect;
        } else if (question.section === "prerequisites") {
          prerequisiteScore += isCorrect;
        } else if (question.section === "cybersecurity") {
          cybersecurityScore += isCorrect;
        }
      });
      
      const scores: TechnicalScores = {
        aptitude: Math.round((aptitudeScore / aptitudeQuestions.length) * 100),
        prerequisites: Math.round((prerequisiteScore / prerequisiteQuestions.length) * 100),
        cybersecurity: Math.round((cybersecurityScore / cybersecurityQuestions.length) * 100),
        overallScore: Math.round(((aptitudeScore + prerequisiteScore + cybersecurityScore) / questions.length) * 100)
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

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "aptitude": return <Code className="h-5 w-5 text-blue-600" />;
      case "prerequisites": return <Code className="h-5 w-5 text-green-600" />;
      case "cybersecurity": return <Shield className="h-5 w-5 text-red-600" />;
      default: return <Code className="h-5 w-5" />;
    }
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case "aptitude": return "border-l-blue-500";
      case "prerequisites": return "border-l-green-500";
      case "cybersecurity": return "border-l-red-500";
      default: return "border-l-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Code className="h-6 w-6 text-blue-600" />
              Technical & Aptitude Assessment
            </h2>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card className={`border-l-4 ${getSectionColor(questions[currentQuestion].section)}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {getSectionIcon(questions[currentQuestion].section)}
              {questions[currentQuestion].category}
            </CardTitle>
            <CardDescription className="text-base">
              {questions[currentQuestion].question}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={currentAnswer?.toString()}
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
            disabled={currentAnswer === undefined}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSection;
