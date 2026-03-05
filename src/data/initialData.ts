export const MEDICATIONS = [
  {
    name: "Acetaminophen (Tylenol)",
    purpose: "Pain reliever and fever reducer",
    warnings: ["Liver damage if taken in excess", "Do not take with other products containing acetaminophen"],
    contraindications: ["liver_disease"],
    symptomsTreated: ["headache", "fever", "muscle_ache", "sore_throat"],
    minAge: 0
  },
  {
    name: "Ibuprofen (Advil, Motrin)",
    purpose: "Nonsteroidal anti-inflammatory drug (NSAID)",
    warnings: ["Stomach bleeding risk", "Kidney damage risk"],
    contraindications: ["stomach_ulcer", "kidney_disease", "pregnancy_third_trimester", "aspirin_allergy"],
    symptomsTreated: ["headache", "fever", "muscle_ache", "inflammation"],
    minAge: 0.5 // 6 months
  },
  {
    name: "Aspirin",
    purpose: "Pain reliever, fever reducer, anti-inflammatory",
    warnings: ["Reye's syndrome risk in children/teens", "Stomach bleeding risk"],
    contraindications: ["under_18", "bleeding_disorder", "stomach_ulcer"],
    symptomsTreated: ["headache", "muscle_ache"],
    minAge: 18
  },
  {
    name: "Diphenhydramine (Benadryl)",
    purpose: "Antihistamine",
    warnings: ["Drowsiness", "Do not drive or operate machinery"],
    contraindications: ["glaucoma", "enlarged_prostate"],
    symptomsTreated: ["runny_nose", "sneezing", "itchy_eyes", "allergic_reaction"],
    minAge: 6
  },
  {
    name: "Pseudoephedrine (Sudafed)",
    purpose: "Decongestant",
    warnings: ["Nervousness", "Dizziness", "Sleeplessness"],
    contraindications: ["high_blood_pressure", "heart_disease", "thyroid_disease", "diabetes"],
    symptomsTreated: ["stuffy_nose", "sinus_pressure"],
    minAge: 4
  },
  {
    name: "Dextromethorphan (Robitussin)",
    purpose: "Cough suppressant",
    warnings: ["Drowsiness", "Dizziness"],
    contraindications: ["taking_maoi"],
    symptomsTreated: ["dry_cough"],
    minAge: 4
  },
  {
    name: "Guaifenesin (Mucinex)",
    purpose: "Expectorant",
    warnings: ["Drink plenty of water"],
    contraindications: [],
    symptomsTreated: ["chest_congestion", "wet_cough"],
    minAge: 4
  },
  {
    name: "Loperamide (Imodium)",
    purpose: "Anti-diarrheal",
    warnings: ["Drink clear fluids to prevent dehydration"],
    contraindications: ["bloody_stool", "high_fever"],
    symptomsTreated: ["diarrhea"],
    minAge: 6
  },
  {
    name: "Calcium Carbonate (Tums)",
    purpose: "Antacid",
    warnings: ["Do not take for more than 2 weeks"],
    contraindications: ["kidney_disease"],
    symptomsTreated: ["heartburn", "indigestion", "upset_stomach"],
    minAge: 2
  }
];

export const LIFESTYLE_ADVICE = [
  {
    symptom: "headache",
    advice: "Rest in a quiet, dark room. Drink plenty of water. Apply a cold or warm compress to your head or neck."
  },
  {
    symptom: "fever",
    advice: "Drink plenty of fluids. Dress in light clothing. Keep the room temperature comfortable. Rest."
  },
  {
    symptom: "cough",
    advice: "Stay hydrated. Use a humidifier. sucking on hard candy or cough drops (if over age 4). Honey can help soothe a sore throat."
  },
  {
    symptom: "sore_throat",
    advice: "Gargle with warm salt water. Drink warm liquids like tea with honey. Use a humidifier."
  },
  {
    symptom: "stuffy_nose",
    advice: "Use a humidifier. Take a hot shower. Use a saline nasal spray. Prop your head up when sleeping."
  },
  {
    symptom: "nausea",
    advice: "Eat small, bland meals (BRAT diet: Bananas, Rice, Applesauce, Toast). Drink clear fluids slowly. Avoid spicy or greasy foods."
  },
  {
    symptom: "diarrhea",
    advice: "Drink plenty of fluids (water, broth, electrolyte drinks) to prevent dehydration. Avoid dairy, caffeine, and spicy foods."
  },
  {
    symptom: "muscle_ache",
    advice: "Rest the affected area. Apply ice for the first 48 hours, then heat. Gentle stretching may help."
  },
  {
    symptom: "fatigue",
    advice: "Prioritize sleep. Eat a balanced diet. Stay hydrated. Engage in light physical activity if possible."
  }
];

export const SYMPTOMS_LIST = [
  { id: 'headache', label: 'Headache' },
  { id: 'fever', label: 'Fever' },
  { id: 'cough', label: 'Cough' },
  { id: 'sore_throat', label: 'Sore Throat' },
  { id: 'runny_nose', label: 'Runny Nose' },
  { id: 'stuffy_nose', label: 'Stuffy Nose/Congestion' },
  { id: 'sneezing', label: 'Sneezing' },
  { id: 'muscle_ache', label: 'Muscle Aches' },
  { id: 'nausea', label: 'Nausea/Vomiting' },
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'chest_pain', label: 'Chest Pain', isRedFlag: true },
  { id: 'difficulty_breathing', label: 'Difficulty Breathing', isRedFlag: true },
  { id: 'severe_abdominal_pain', label: 'Severe Abdominal Pain', isRedFlag: true },
  { id: 'confusion', label: 'Sudden Confusion', isRedFlag: true },
  { id: 'slurred_speech', label: 'Slurred Speech', isRedFlag: true },
];
