import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">About Pharmacy Advisor</h1>
        <div className="prose prose-blue text-slate-600">
          <p className="mb-4">
            Pharmacy Advisor was built to bridge the gap between feeling unwell and finding the right over-the-counter relief. 
            We understand that walking into a pharmacy can sometimes be overwhelming with hundreds of options on the shelves.
          </p>
          <p className="mb-4">
            Our tool acts as a digital triage assistant. By asking you structured questions about your symptoms, age, and medical context, 
            we can suggest appropriate OTC medications and lifestyle changes that might help you feel better.
          </p>
          <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">
            To provide accessible, reliable, and safe initial health guidance to everyone, helping you make informed decisions about self-care 
            and knowing when it's time to see a doctor.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> We are not a replacement for professional medical care. Our algorithms are based on standard guidelines, 
              but every individual is unique. Always read medication labels carefully and consult with a pharmacist or doctor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
