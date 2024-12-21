import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Calculator,
  Upload,
  FileText,
  Loader2
} from 'lucide-react';

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

    setLoading(true);
    setError('');

    // Simulate file processing since we don't have a backend
    setTimeout(() => {
      setOcrResult('Document processed successfully');
      setUploadedFile(file.name);
      setLoading(false);
      toast({
        title: "Document Processed",
        description: "Your tax document has been successfully processed.",
      });
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
          "Track your charitable donations more carefully"
        ],
        ai_insights: "Based on your income and deductions, you might qualify for additional tax credits. Consider speaking with a tax professional about education credits and retirement account contributions."
      });
      setLoading(false);
      setStep(questions.length);
      toast({
        title: "Calculation Complete",
        description: "Your tax optimization results are ready.",
      });
    }, 2000);
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Tax Summary</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-lg font-semibold text-gray-600">Estimated Tax</p>
              <p className="text-3xl font-bold text-blue-600">
                ${result.estimated_tax.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-lg font-semibold text-gray-600">Potential Savings</p>
              <p className="text-3xl font-bold text-green-600">
                ${result.potential_savings.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm md:col-span-2">
              <p className="text-lg font-semibold text-gray-600">Local Tax Rate</p>
              <p className="text-3xl font-bold text-purple-600">
                {(result.local_tax_rate * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        
        {result.ai_insights && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-900">AI Tax Insights</h3>
            <p className="text-gray-700 whitespace-pre-line">{result.ai_insights}</p>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Recommendations</h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="mt-1 text-green-500">
                  <ChevronRight size={16} />
                </div>
                <p className="text-gray-700">{rec}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const uploadComponent = (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
          accept="image/*,.pdf"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="h-12 w-12 text-gray-400" />
          <span className="text-sm text-gray-600">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-gray-500">
            Supports PDF, JPG, PNG
          </span>
        </label>
      </div>
      {uploadedFile && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{uploadedFile}</span>
        </div>
      )}
      {ocrResult && (
        <Alert>
          <AlertDescription>
            Document processed successfully! Continue to enter additional details.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const questions = [
    {
      title: "Document Upload",
      description: "Upload your tax documents for automatic processing (optional)",
      fields: [],
      component: uploadComponent
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
      return renderResult();
    }

    const currentQuestion = questions[step];
    return (
      <div className="space-y-6">
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
                  className="flex items-center gap-2"
                  disabled={loading}
                >
                  <ChevronLeft size={16} /> Previous
                </Button>
              )}
              {step < questions.length && (
                <Button 
                  onClick={step === questions.length - 1 ? handleSubmit : () => validateStep() && setStep(s => s + 1)}
                  className="ml-auto flex items-center gap-2"
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
                  className="ml-auto"
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
