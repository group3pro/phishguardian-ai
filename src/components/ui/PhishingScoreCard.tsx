
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhishingScoreCardProps {
  result: {
    score: number;
    threatLevel: "safe" | "suspicious" | "dangerous";
    indicators: string[];
    details: {
      senderAnalysis: string;
      contentAnalysis: string;
      linkAnalysis: string;
      urgencyLevel: string;
    };
  };
}

const PhishingScoreCard: React.FC<PhishingScoreCardProps> = ({ result }) => {
  const { score, threatLevel, indicators, details } = result;

  const getScoreColor = () => {
    if (threatLevel === "safe") return "bg-phish-safe";
    if (threatLevel === "suspicious") return "bg-phish-warning";
    return "bg-phish-danger";
  };

  const getScoreText = () => {
    if (threatLevel === "safe") return "text-phish-safe";
    if (threatLevel === "suspicious") return "text-phish-warning";
    return "text-phish-danger";
  };

  const getScoreIcon = () => {
    if (threatLevel === "safe") {
      return <CheckCircle className="h-6 w-6 text-phish-safe" />;
    }
    if (threatLevel === "suspicious") {
      return <AlertTriangle className="h-6 w-6 text-phish-warning" />;
    }
    return <Shield className="h-6 w-6 text-phish-danger" />;
  };

  const getScoreDescription = () => {
    if (threatLevel === "safe") {
      return "This email appears to be legitimate.";
    }
    if (threatLevel === "suspicious") {
      return "This email shows some suspicious characteristics.";
    }
    return "This email is highly likely to be a phishing attempt.";
  };

  return (
    <Card className="glassmorphism shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Analysis Results</CardTitle>
          <div className="flex items-center space-x-2">
            {getScoreIcon()}
            <span className={cn("font-medium", getScoreText())}>
              {threatLevel.charAt(0).toUpperCase() + threatLevel.slice(1)}
            </span>
          </div>
        </div>
        <CardDescription>
          {getScoreDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Phishing Score</span>
            <span className={getScoreText()}>
              {Math.round(score * 100)}%
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-500", getScoreColor())} 
              style={{ width: `${score * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Threat Indicators</h4>
            <ul className="space-y-1 text-sm">
              {indicators.map((indicator, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5",
                    threatLevel === "safe" ? "bg-phish-safe" : 
                    threatLevel === "suspicious" ? "bg-phish-warning" : "bg-phish-danger"
                  )} />
                  <span>{indicator}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Sender Analysis</h4>
              <p className="text-xs text-muted-foreground">{details.senderAnalysis}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Content Analysis</h4>
              <p className="text-xs text-muted-foreground">{details.contentAnalysis}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Link Analysis</h4>
              <p className="text-xs text-muted-foreground">{details.linkAnalysis}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Urgency Level</h4>
              <p className="text-xs text-muted-foreground">{details.urgencyLevel}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhishingScoreCard;
