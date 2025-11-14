// Demo codes for Romanian cities (for testing purposes)
// In production, these would be generated dynamically

export const demoCodes: Record<string, string> = {
  // București
  BUC01: "BUC001",
  
  // Cluj-Napoca
  CLJ01: "CLJ001",
  
  // Timișoara
  TIM01: "TIM001",
  
  // Iași
  IAS01: "IAS001",
  
  // Constanța
  CTA01: "CTA001",
  
  // Craiova
  CRV01: "CRV001",
  
  // Brașov
  BRS01: "BRS001",
  
  // Galați
  GLT01: "GLT001",
  
  // Ploiești
  PLO01: "PLO001",
  
  // Oradea
  ORD01: "ORD001",
  
  // Bacău
  BCU01: "BCU001",
  
  // Pitești
  PTI01: "PTI001",
  
  // Sibiu
  SBU01: "SBU001",
  
  // Târgu Mureș
  TGM01: "TGM001",
  
  // Baia Mare
  BAI01: "BAI001",
  
  // Buzău
  BZU01: "BZU001",
  
  // Botoșani
  BTU01: "BTU001",
  
  // Satu Mare
  STU01: "STU001",
  
  // Râmnicu Vâlcea
  RMV01: "RMV001",
  
  // Suceava
  SUC01: "SUC001",
};

export const getDemoCodeForCity = (cityCode: string): string => {
  return demoCodes[cityCode] || "DEMO000";
};

export const getAllDemoCodes = (): { city: string; code: string }[] => {
  return Object.entries(demoCodes).map(([city, code]) => ({
    city,
    code,
  }));
};
