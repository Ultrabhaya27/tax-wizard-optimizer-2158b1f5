import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ChevronRight, ChevronLeft, Calculator, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import FileUploadSection from './tax/FileUploadSection';
import TaxSummary from './tax/TaxSummary';

interface FormData {
  zip_code: string;
  annual_income: string;
  filing_status: string;
  dependents: number;
  mortgage_interest: string;
  property_tax: string;
  charitable_donations: string;
  medical_expenses: string;
  retirement_contributions: string;
  student_loan_interest: string;
  self_employed_expenses: string;
  investment_income: string;
  other_income: string;
}

const TaxOptimizer = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState('');
  const [formData, setFormData] = useState<FormData>({
    zip_code: '',
    annual_income: '',
    filing_status: 'single',
    dependents: 0,
    mortgage_interest: '',
    property_tax: '',
    charitable_donations: '',
    medical_expenses: '',
    retirement_contributions: '',
    student_loan_interest: '',
    self_employed_expenses: '',
    investment_income: '',
    other_income: ''
  });
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate file processing since we don't have a backend
    setTimeout(() => {
      setOcrResult('Document processed successfully');
      setUploadedFile(file.name);
      setLoading(false);
      toast.success('Document processed successfully');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = () => {
    const currentFields = questions[step].fields;
    for (const field of currentFields) {
      if (field.required && !formData[field.name as keyof FormData]) {
        setError(`Please fill in ${field.label}`);
        toast.error(`Please fill in ${field.label}`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    setError('');
    
    // Simulate API call since we don't have a backend
    setTimeout(() => {
      setResult({
        estimated_tax: 25000,
        potential_savings: 5000,
        local_tax_rate: 0.25,
        recommendations: [
          "Consider maximizing your 401(k) contributions",
          "Look into tax-advantaged investment options",
          "Track your charitable donations more carefully",
          "Consider bunching itemized deductions",
          "Explore health savings account (HSA) options"
        ],
        ai_insights: "Based on your income and deductions, you might qualify for additional tax credits. Consider speaking with a tax professional about education credits and retirement account contributions. Your current tax efficiency score is 75%, which suggests room for optimization."
      });
      setLoading(false);
      setStep(questions.length);
      toast.success('Tax calculation complete');
    }, 2000);
  };

  const questions = [
    {
      title: "Document Upload",
      description: "Upload your tax documents for automatic processing (optional)",
      fields: [],
      component: <FileUploadSection 
        uploadedFile={uploadedFile}
        ocrResult={ocrResult}
        onFileUpload={handleFileUpload}
      />
    },
    {
      title: "Basic Information",
      description: "Let's start with your basic tax information",
      fields: [
        { name: "zip_code", label: "ZIP Code", type: "text", required: true },
        { name: "annual_income", label: "Annual Income ($)", type: "number", required: true },
        { name: "filing_status", label: "Filing Status", type: "select", required: true,
          options: [
            { value: "single", label: "Single" },
            { value: "married_joint", label: "Married Filing Jointly" },
            { value: "married_separate", label: "Married Filing Separately" },
            { value: "head_household", label: "Head of Household" }
          ]
        },
        { name: "dependents", label: "Number of Dependents", type: "number", required: true }
      ]
    },
    {
      title: "Deductions & Expenses",
      description: "Tell us about your deductible expenses",
      fields: [
        { name: "mortgage_interest", label: "Mortgage Interest ($)", type: "number" },
        { name: "property_tax", label: "Property Tax ($)", type: "number" },
        { name: "charitable_donations", label: "Charitable Donations ($)", type: "number" },
        { name: "medical_expenses", label: "Medical Expenses ($)", type: "number" }
      ]
    },
    {
      title: "Additional Income & Contributions",
      description: "Let's review your other income sources and contributions",
      fields: [
        { name: "retirement_contributions", label: "Retirement Contributions ($)", type: "number" },
        { name: "student_loan_interest", label: "Student Loan Interest ($)", type: "number" },
        { name: "self_employed_expenses", label: "Self-employed Expenses ($)", type: "number" },
        { name: "investment_income", label: "Investment Income ($)", type: "number" },
        { name: "other_income", label: "Other Income ($)", type: "number" }
      ]
    }
  ];

  const renderForm = () => {
    if (step >= questions.length) {
      return <TaxSummary result={result} />;
    }

    const currentQuestion = questions[step];
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{currentQuestion.title}</h2>
          <p className="text-gray-500 mt-1">{currentQuestion.description}</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentQuestion.component ? (
          currentQuestion.component
        ) : (
          <div className="grid gap-6">
            {currentQuestion.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
        <CardTitle className="text-2xl">Tax Return Optimizer</CardTitle>
        <CardDescription>
          Step {step + 1} of {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            {renderForm()}
            <div className="mt-8 flex justify-between">
              {step > 0 && (
                <Button 
                  onClick={() => setStep(s => s - 1)}
                  variant="outline"
                  className="flex items-center gap-2 hover:translate-x-[-2px] transition-transform"
                  disabled={loading}
                >
                  <ChevronLeft size={16} /> Previous
                </Button>
              )}
              {step < questions.length && (
                <Button 
                  onClick={step === questions.length - 1 ? handleSubmit : () => validateStep() && setStep(s => s + 1)}
                  className="ml-auto flex items-center gap-2 hover:translate-x-[2px] transition-transform"
                  disabled={loading}
                >
                  {step === questions.length - 1 ? (
                    <>
                      Calculate <Calculator size={16} />
                    </>
                  ) : (
                    <>
                      Next <ChevronRight size={16} />
                    </>
                  )}
                </Button>
              )}
              {step >= questions.length && (
                <Button 
                  onClick={() => setStep(0)}
                  variant="outline"
                  className="ml-auto hover:scale-105 transition-transform"
                >
                  Start New Calculation
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxOptimizer;
