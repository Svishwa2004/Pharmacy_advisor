import React from 'react';
import { AlertTriangle, ArrowRight, ShieldCheck, Clock, Stethoscope, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 p-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">
            <strong>Important:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice. 
            Always consult a qualified health provider with any questions you have regarding a medical condition. 
            In case of an emergency, call emergency services immediately.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Your trusted digital</span>{' '}
                  <span className="block text-blue-600 xl:inline">pharmacy advisor</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get instant, reliable guidance on over-the-counter medications and lifestyle advice for common symptoms. 
                  Fast, private, and easy to use.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/symptom-checker"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all"
                    >
                      Check Your Symptoms
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-blue-50 flex items-center justify-center">
            {/* Abstract medical/calm imagery representation */}
            <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-full flex items-center justify-center">
               <div className="grid grid-cols-2 gap-4 p-8 opacity-20">
                  <div className="w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
                  <div className="w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
                  <div className="w-36 h-36 bg-sky-300 rounded-full blur-3xl"></div>
               </div>
               <Stethoscope className="absolute w-64 h-64 text-blue-200 opacity-50" />
            </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Pharmacy Advisor?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Professional guidance, anytime.
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
              We combine medical guidelines with smart technology to help you make informed decisions about your health.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Trusted Information</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-slate-500">
                  Our recommendations are based on standard medical protocols and OTC medication guidelines.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Available 24/7</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-slate-500">
                  Health questions don't always happen during business hours. Get guidance whenever you need it.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Activity className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Symptom Analysis</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-slate-500">
                  Our smart checker analyzes your specific symptoms to suggest the most relevant care options.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
