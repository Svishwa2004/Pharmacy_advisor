import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SymptomCheck {
  id: string;
  timestamp: any;
  symptoms: string[];
  recommendations: string[];
  age: number;
}

export default function History() {
  const { user } = useAuth();
  const [checks, setChecks] = useState<SymptomCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'symptomChecks'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        
        const snapshot = await getDocs(q);
        setChecks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SymptomCheck)));
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">Please sign in to view your history</h2>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Health History</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Loading history...</p>
          </div>
        ) : checks.length > 0 ? (
          <div className="space-y-4">
            {checks.map((check) => (
              <div key={check.id} className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {check.timestamp?.toDate().toLocaleDateString()} at {check.timestamp?.toDate().toLocaleTimeString()}
                  </div>
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Age: {check.age}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide mb-2">Symptoms</h3>
                  <div className="flex flex-wrap gap-2">
                    {check.symptoms.map((s, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {s.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide mb-2">Recommended</h3>
                  <p className="text-sm text-slate-600">
                    {check.recommendations.length > 0 
                      ? check.recommendations.join(', ') 
                      : 'No specific medications recommended'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-slate-500 mb-4">You haven't saved any symptom checks yet.</p>
            <Link 
              to="/symptom-checker"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Check Symptoms Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
