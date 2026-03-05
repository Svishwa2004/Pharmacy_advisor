import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, AlertCircle, Save, Loader2, Pill, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, writeBatch, doc } from 'firebase/firestore';
import { MEDICATIONS, LIFESTYLE_ADVICE, SYMPTOMS_LIST } from '../data/initialData';
import { cn } from '@/src/lib/utils';

interface Medication {
  id?: string;
  name: string;
  purpose: string;
  warnings: string[];
  contraindications: string[];
  symptomsTreated: string[];
  minAge?: number;
}

interface Advice {
  id?: string;
  symptom: string;
  advice: string;
}

export default function SymptomChecker() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    symptoms: [] as string[],
    conditions: [] as string[], // e.g., high_blood_pressure
    duration: '',
  });

  const [redFlagTriggered, setRedFlagTriggered] = useState(false);
  const [results, setResults] = useState<{
    medications: Medication[];
    advice: Advice[];
    doctorRecommendation: string | null;
  } | null>(null);

  // Load data from Firestore or fallback to initialData
  const [medications, setMedications] = useState<Medication[]>([]);
  const [lifestyleAdvice, setLifestyleAdvice] = useState<Advice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medsSnapshot = await getDocs(collection(db, 'medications'));
        if (!medsSnapshot.empty) {
          setMedications(medsSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Medication)));
        } else {
          setMedications(MEDICATIONS);
        }

        const adviceSnapshot = await getDocs(collection(db, 'lifestyleAdvice'));
        if (!adviceSnapshot.empty) {
          setLifestyleAdvice(adviceSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Advice)));
        } else {
          setLifestyleAdvice(LIFESTYLE_ADVICE);
        }
      } catch (error) {
        console.error("Error fetching data, using fallback:", error);
        setMedications(MEDICATIONS);
        setLifestyleAdvice(LIFESTYLE_ADVICE);
      }
    };
    fetchData();
  }, []);

  const handleSymptomToggle = (symptomId: string, isRedFlag: boolean) => {
    if (isRedFlag) {
      setRedFlagTriggered(true);
      return;
    }

    setFormData(prev => {
      const exists = prev.symptoms.includes(symptomId);
      if (exists) {
        return { ...prev, symptoms: prev.symptoms.filter(s => s !== symptomId) };
      } else {
        return { ...prev, symptoms: [...prev.symptoms, symptomId] };
      }
    });
  };

  const calculateResults = () => {
    setLoading(true);
    const age = parseInt(formData.age);
    
    // Filter Medications
    const recommendedMeds = medications.filter(med => {
      // 1. Must treat at least one selected symptom
      const treatsSymptom = med.symptomsTreated.some(s => formData.symptoms.includes(s));
      if (!treatsSymptom) return false;

      // 2. Age check
      if (med.minAge && age < med.minAge) return false;

      // 3. Contraindications check (simplified)
      // In a real app, we'd ask for specific conditions. 
      // For MVP, let's assume we ask about High Blood Pressure if 'stuffy_nose' is selected
      if (med.contraindications.includes('under_18') && age < 18) return false;
      if (med.contraindications.includes('high_blood_pressure') && formData.conditions.includes('high_blood_pressure')) return false;

      return true;
    });

    // Filter Advice
    const relevantAdvice = lifestyleAdvice.filter(advice => 
      formData.symptoms.includes(advice.symptom)
    );

    // Doctor Recommendation Logic
    let doctorRec = null;
    if (formData.symptoms.includes('fever') && formData.symptoms.includes('rash')) {
      doctorRec = "Schedule an appointment with a doctor. These symptoms together may require a professional diagnosis.";
    } else if (formData.duration === 'more_than_7_days') {
      doctorRec = "Consult a doctor since your symptoms have persisted for more than 7 days.";
    } else {
      doctorRec = "Consult a pharmacist or doctor if you have any doubts or if symptoms worsen.";
    }

    setResults({
      medications: recommendedMeds,
      advice: relevantAdvice,
      doctorRecommendation: doctorRec
    });
    setLoading(false);
    setStep(4);
  };

  const saveResults = async () => {
    if (!user || !results) return;
    try {
      await addDoc(collection(db, 'symptomChecks'), {
        userId: user.uid,
        age: parseInt(formData.age),
        sex: formData.sex,
        symptoms: formData.symptoms,
        timestamp: serverTimestamp(),
        recommendations: results.medications.map(m => m.name),
        advice: results.advice.map(a => a.advice)
      });
      alert('Results saved to your profile!');
    } catch (error) {
      console.error("Error saving results:", error);
      alert('Failed to save results.');
    }
  };

  const seedDatabase = async () => {
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      
      MEDICATIONS.forEach(med => {
        const docRef = doc(collection(db, 'medications'));
        batch.set(docRef, med);
      });

      LIFESTYLE_ADVICE.forEach(adv => {
        const docRef = doc(collection(db, 'lifestyleAdvice'));
        batch.set(docRef, adv);
      });

      await batch.commit();
      alert('Database seeded successfully!');
    } catch (error) {
      console.error("Error seeding database:", error);
      alert('Error seeding database. Check console.');
    }
    setSeeding(false);
  };

  if (redFlagTriggered) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden border-2 border-red-500">
          <div className="bg-red-600 px-6 py-4 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Emergency Warning</h1>
          </div>
          <div className="p-6">
            <p className="text-xl font-semibold text-slate-900 mb-4">
              Please seek emergency medical attention immediately.
            </p>
            <p className="text-slate-600 mb-6">
              The symptoms you selected can be signs of a serious medical condition. Do not wait.
            </p>
            <div className="space-y-3">
              <a href="tel:911" className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                Call Emergency Services (911)
              </a>
              <button 
                onClick={() => {
                  setRedFlagTriggered(false);
                  setStep(1);
                  setFormData({ age: '', sex: '', symptoms: [], conditions: [], duration: '' });
                }}
                className="block w-full bg-slate-100 text-slate-700 text-center py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Admin Seed Button (Hidden for normal users in prod, visible here for demo) */}
        {user && user.email === 'svishwa0800@gmail.com' && (
           <div className="mb-4 text-right">
             <button onClick={seedDatabase} disabled={seeding} className="text-xs text-slate-400 hover:text-blue-600">
               {seeding ? 'Seeding...' : 'Seed Database'}
             </button>
           </div>
        )}

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Symptom Checker</h1>
            <p className="text-blue-100 mt-1">Step {step} of {step === 4 ? 4 : 3}</p>
          </div>
          
          <div className="p-6 sm:p-8">
            {/* Step 1: Demographics */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">About You</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-slate-700">Age</label>
                    <input 
                      type="number" 
                      id="age" 
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      placeholder="e.g. 30"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-slate-700">Sex</label>
                    <select 
                      id="sex" 
                      className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      value={formData.sex}
                      onChange={(e) => setFormData({...formData, sex: e.target.value})}
                    >
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => {
                      if (formData.age && formData.sex) setStep(2);
                      else alert('Please fill in all fields');
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Symptoms */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">What are your symptoms?</h2>
                <p className="text-sm text-slate-500">Select all that apply.</p>
                
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search symptoms..."
                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border pl-10"
                    onChange={(e) => {
                      const term = e.target.value.toLowerCase();
                      const elements = document.querySelectorAll('.symptom-item');
                      elements.forEach((el) => {
                        const label = el.getAttribute('data-label')?.toLowerCase() || '';
                        if (label.includes(term)) {
                          (el as HTMLElement).style.display = 'flex';
                        } else {
                          (el as HTMLElement).style.display = 'none';
                        }
                      });
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {SYMPTOMS_LIST.map((symptom) => (
                    <button
                      key={symptom.id}
                      data-label={symptom.label}
                      onClick={() => handleSymptomToggle(symptom.id, !!symptom.isRedFlag)}
                      className={cn(
                        "symptom-item flex items-center p-4 rounded-lg border-2 text-left transition-all",
                        formData.symptoms.includes(symptom.id)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      )}
                    >
                      <div className={cn(
                        "h-5 w-5 rounded border flex items-center justify-center mr-3 flex-shrink-0",
                        formData.symptoms.includes(symptom.id)
                          ? "bg-blue-500 border-blue-500"
                          : "border-slate-300 bg-white"
                      )}>
                        {formData.symptoms.includes(symptom.id) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="font-medium">{symptom.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      if (formData.symptoms.length > 0) setStep(3);
                      else alert('Please select at least one symptom');
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Follow-up */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">A few more details...</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">How long have you had these symptoms?</label>
                    <select 
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    >
                      <option value="">Select...</option>
                      <option value="few_hours">A few hours</option>
                      <option value="one_two_days">1-2 days</option>
                      <option value="several_days">Several days</option>
                      <option value="more_than_7_days">More than 7 days</option>
                    </select>
                  </div>

                  {/* Conditional Questions based on symptoms */}
                  {formData.symptoms.includes('stuffy_nose') && (
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                          checked={formData.conditions.includes('high_blood_pressure')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({...prev, conditions: [...prev.conditions, 'high_blood_pressure']}));
                            } else {
                              setFormData(prev => ({...prev, conditions: prev.conditions.filter(c => c !== 'high_blood_pressure')}));
                            }
                          }}
                        />
                        <span className="ml-2 text-sm text-amber-900">
                          Do you have high blood pressure?
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button 
                    onClick={calculateResults}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    Get Results
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {step === 4 && results && (
              <div className="space-y-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-green-900 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Recommendation
                  </h3>
                  <p className="mt-2 text-green-800">{results.doctorRecommendation}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* OTC Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <Pill className="h-5 w-5 mr-2 text-blue-600" />
                      Suggested OTC Options
                    </h3>
                    {results.medications.length > 0 ? (
                      <div className="space-y-4">
                        {results.medications.map((med, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-900">{med.name}</h4>
                            <p className="text-sm text-slate-500 mb-2">{med.purpose}</p>
                            {med.warnings.length > 0 && (
                              <div className="mt-2 text-xs bg-amber-50 text-amber-800 p-2 rounded">
                                <strong>Warning:</strong> {med.warnings[0]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">No specific OTC medications found for your criteria.</p>
                    )}
                  </div>

                  {/* Lifestyle Advice */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-600" />
                      Lifestyle & Dietary Advice
                    </h3>
                    {results.advice.length > 0 ? (
                      <div className="space-y-4">
                        {results.advice.map((item, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <span className="inline-block px-2 py-1 text-xs font-semibold bg-slate-200 text-slate-700 rounded mb-2 uppercase">
                              {SYMPTOMS_LIST.find(s => s.id === item.symptom)?.label || item.symptom}
                            </span>
                            <p className="text-sm text-slate-700">{item.advice}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">No specific lifestyle advice found.</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      setStep(1);
                      setFormData({ age: '', sex: '', symptoms: [], conditions: [], duration: '' });
                      setResults(null);
                    }}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    Start Over
                  </button>
                  
                  {user ? (
                    <button 
                      onClick={saveResults}
                      className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save to Profile
                    </button>
                  ) : (
                    <div className="text-right">
                       <p className="text-sm text-slate-500 mb-2">Sign in to save these results</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
