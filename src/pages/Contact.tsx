import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-600 mb-6">
              Have questions about the tool or need technical support? We're here to help. 
              Please note that we cannot provide medical advice via email or phone.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-slate-900">Email</h3>
                  <p className="text-slate-500">support@pharmacyadvisor.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-slate-900">Phone</h3>
                  <p className="text-slate-500">+1 (555) 123-4567</p>
                  <p className="text-xs text-slate-400 mt-1">Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-slate-900">Office</h3>
                  <p className="text-slate-500">
                    123 Health Way<br />
                    Wellness City, ST 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                <input type="text" id="name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                <input type="email" id="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"></textarea>
              </div>
              <button type="button" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
