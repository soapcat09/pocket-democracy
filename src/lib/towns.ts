export interface Town {
  code: string;
  name: string;
  county: string;
}

export const romanianTowns: Town[] = [
  { code: "BUC01", name: "București", county: "București" },
  { code: "CLJ01", name: "Cluj-Napoca", county: "Cluj" },
  { code: "TIM01", name: "Timișoara", county: "Timiș" },
  { code: "IAS01", name: "Iași", county: "Iași" },
  { code: "CTA01", name: "Constanța", county: "Constanța" },
  { code: "CRV01", name: "Craiova", county: "Dolj" },
  { code: "BRS01", name: "Brașov", county: "Brașov" },
  { code: "GLT01", name: "Galați", county: "Galați" },
  { code: "PLO01", name: "Ploiești", county: "Prahova" },
  { code: "ORD01", name: "Oradea", county: "Bihor" },
  { code: "BCU01", name: "Bacău", county: "Bacău" },
  { code: "PTI01", name: "Pitești", county: "Argeș" },
  { code: "SBU01", name: "Sibiu", county: "Sibiu" },
  { code: "TGM01", name: "Târgu Mureș", county: "Mureș" },
  { code: "BAI01", name: "Baia Mare", county: "Maramureș" },
  { code: "BZU01", name: "Buzău", county: "Buzău" },
  { code: "BTU01", name: "Botoșani", county: "Botoșani" },
  { code: "STU01", name: "Satu Mare", county: "Satu Mare" },
  { code: "RMV01", name: "Râmnicu Vâlcea", county: "Vâlcea" },
  { code: "SUC01", name: "Suceava", county: "Suceava" },
];

export const findTownByCode = (code: string): Town | undefined => {
  return romanianTowns.find(town => town.code.toLowerCase() === code.toLowerCase());
};
