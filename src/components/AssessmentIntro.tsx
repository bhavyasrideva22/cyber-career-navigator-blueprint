
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Briefcase, Brain, CheckCircle } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const careers = [
    "Cyber Security Analyst",
    "Penetration Tester", 
    "SOC Analyst",
    "Risk & Compliance Officer",
    "Threat Intelligence Analyst",
    "Security Engineer"
  ];

  const traits = [
    "Attention to detail",
    "Ethical integrity", 
    "Analytical mindset",
    "Persistence under ambiguity",
    "Curiosity about how systems work"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Shield className="h-16 w-16 text-blue-600 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900">Cyber Security Career Assessment</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover if you have what it takes for a successful career in cybersecurity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                🔍 Assessment Purpose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Evaluate your psychological, cognitive, and technical readiness for a cybersecurity career. 
                This comprehensive assessment will analyze your fit across multiple dimensions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                🧰 What is Cyber Security?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Cybersecurity involves protecting networks, systems, software, and data from digital attacks. 
                It includes ethical hacking, threat analysis, compliance, and incident response.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-purple-600" />
              💼 Careers Enabled by Cyber Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {careers.map((career, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">{career}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-orange-600" />
              🧠 Personality Traits for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
          >
            🚀 Start Assessment
          </Button>
          <p className="text-sm text-gray-500 mt-2">Takes approximately 20-30 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;
