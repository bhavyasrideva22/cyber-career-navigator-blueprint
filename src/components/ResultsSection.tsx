
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Target, 
  BookOpen,
  Users,
  Shield,
  Award,
  ArrowRight
} from "lucide-react";
import { PsychometricScores } from "./PsychometricSection";
import { TechnicalScores } from "./TechnicalSection";

interface ResultsSectionProps {
  psychometricScores: PsychometricScores;
  technicalScores: TechnicalScores;
  onRestart: () => void;
}

const ResultsSection = ({ psychometricScores, technicalScores, onRestart }: ResultsSectionProps) => {
  // Calculate overall recommendation
  const overallScore = Math.round((psychometricScores.overallScore + technicalScores.overallScore) / 2);
  
  const getRecommendation = () => {
    if (overallScore >= 80) {
      return {
        status: "YES",
        icon: <CheckCircle className="h-6 w-6 text-green-500" />,
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
        message: "Highly recommended for cybersecurity career"
      };
    } else if (overallScore >= 60) {
      return {
        status: "MAYBE",
        icon: <AlertCircle className="h-6 w-6 text-yellow-500" />,
        color: "text-yellow-600", 
        bgColor: "bg-yellow-50 border-yellow-200",
        message: "Good potential with additional preparation"
      };
    } else {
      return {
        status: "NOT YET",
        icon: <XCircle className="h-6 w-6 text-red-500" />,
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        message: "Consider building foundational skills first"
      };
    }
  };

  const recommendation = getRecommendation();

  const careers = [
    { title: "Cyber Security Analyst", match: overallScore >= 70 ? "High" : overallScore >= 50 ? "Medium" : "Low" },
    { title: "Penetration Tester", match: overallScore >= 80 ? "High" : overallScore >= 60 ? "Medium" : "Low" },
    { title: "SOC Analyst", match: overallScore >= 65 ? "High" : overallScore >= 45 ? "Medium" : "Low" },
    { title: "Security Consultant", match: overallScore >= 75 ? "High" : overallScore >= 55 ? "Medium" : "Low" },
    { title: "Risk & Compliance Officer", match: overallScore >= 60 ? "High" : overallScore >= 40 ? "Medium" : "Low" }
  ];

  const getMatchColor = (match: string) => {
    switch (match) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getNextSteps = () => {
    if (overallScore >= 80) {
      return [
        "Start with CompTIA Security+ certification",
        "Practice on platforms like TryHackMe or HackTheBox",
        "Build a home lab for hands-on experience",
        "Join cybersecurity communities and forums",
        "Consider internships or entry-level positions"
      ];
    } else if (overallScore >= 60) {
      return [
        "Strengthen foundational networking knowledge",
        "Learn basic scripting (Python or Bash)",
        "Complete online cybersecurity courses",
        "Practice with free security tools",
        "Build technical skills through projects"
      ];
    } else {
      return [
        "Start with basic IT fundamentals",
        "Learn operating systems (Windows/Linux)",
        "Understand networking basics",
        "Develop problem-solving skills",
        "Consider IT support roles as stepping stones"
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Shield className="h-16 w-16 text-blue-600 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900">Assessment Results</h1>
          <p className="text-xl text-gray-600">Your Cybersecurity Career Readiness Report</p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`${recommendation.bgColor} border-2`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              {recommendation.icon}
              <span className={recommendation.color}>
                Recommendation: {recommendation.status}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">Overall Score</span>
              <span className="text-2xl font-bold">{overallScore}%</span>
            </div>
            <Progress value={overallScore} className="mb-4" />
            <p className="text-lg">{recommendation.message}</p>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Psychological Fit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Overall Score</span>
                <span className="font-bold">{psychometricScores.overallScore}%</span>
              </div>
              <Progress value={psychometricScores.overallScore} />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Interest & Motivation</span>
                  <span>{psychometricScores.interest}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ethical Orientation</span>
                  <span>{psychometricScores.ethics}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Curiosity & Learning</span>
                  <span>{psychometricScores.curiosity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Stress Tolerance</span>
                  <span>{psychometricScores.stressTolerance}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Overall Score</span>
                <span className="font-bold">{technicalScores.overallScore}%</span>
              </div>
              <Progress value={technicalScores.overallScore} />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Logical Aptitude</span>
                  <span>{technicalScores.aptitude}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Prerequisites</span>
                  <span>{technicalScores.prerequisites}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Knowledge</span>
                  <span>{technicalScores.cybersecurity}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Matches */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Career Match Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {careers.map((career, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="font-medium">{career.title}</span>
                  <Badge className={getMatchColor(career.match)}>
                    {career.match} Match
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-600" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getNextSteps().map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={onRestart}
            variant="outline" 
            size="lg"
            className="px-8"
          >
            Retake Assessment
          </Button>
          <Button 
            size="lg"
            className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            View Learning Path
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
