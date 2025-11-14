export interface Town {
  code: string;
  name: string;
  county: string;
}

export const romanianTowns: Town[] = [
  { code: "BUC01", name: "București", county: "București" },
  { code: "AB01", name: "Alba Iulia", county: "Alba" },
  { code: "AR01", name: "Arad", county: "Arad" },
  { code: "PTI01", name: "Pitești", county: "Argeș" },
  { code: "BCU01", name: "Bacău", county: "Bacău" },
  { code: "ORD01", name: "Oradea", county: "Bihor" },
  { code: "BN01", name: "Bistrița", county: "Bistrița-Năsăud" },
  { code: "BTU01", name: "Botoșani", county: "Botoșani" },
  { code: "BRS01", name: "Brașov", county: "Brașov" },
  { code: "BR01", name: "Brăila", county: "Brăila" },
  { code: "BZU01", name: "Buzău", county: "Buzău" },
  { code: "CS01", name: "Reșița", county: "Caraș-Severin" },
  { code: "CL01", name: "Călărași", county: "Călărași" },
  { code: "CLJ01", name: "Cluj-Napoca", county: "Cluj" },
  { code: "CTA01", name: "Constanța", county: "Constanța" },
  { code: "CV01", name: "Sfântu Gheorghe", county: "Covasna" },
  { code: "DB01", name: "Târgoviște", county: "Dâmbovița" },
  { code: "CRV01", name: "Craiova", county: "Dolj" },
  { code: "GLT01", name: "Galați", county: "Galați" },
  { code: "GR01", name: "Giurgiu", county: "Giurgiu" },
  { code: "GJ01", name: "Târgu Jiu", county: "Gorj" },
  { code: "HR01", name: "Miercurea Ciuc", county: "Harghita" },
  { code: "HD01", name: "Deva", county: "Hunedoara" },
  { code: "IL01", name: "Slobozia", county: "Ialomița" },
  { code: "IAS01", name: "Iași", county: "Iași" },
  { code: "IF01", name: "Buftea", county: "Ilfov" },
  { code: "BAI01", name: "Baia Mare", county: "Maramureș" },
  { code: "MH01", name: "Drobeta-Turnu Severin", county: "Mehedinți" },
  { code: "TGM01", name: "Târgu Mureș", county: "Mureș" },
  { code: "NT01", name: "Piatra Neamț", county: "Neamț" },
  { code: "OT01", name: "Slatina", county: "Olt" },
  { code: "PLO01", name: "Ploiești", county: "Prahova" },
  { code: "STU01", name: "Satu Mare", county: "Satu Mare" },
  { code: "SJ01", name: "Zalău", county: "Sălaj" },
  { code: "SBU01", name: "Sibiu", county: "Sibiu" },
  { code: "SUC01", name: "Suceava", county: "Suceava" },
  { code: "TR01", name: "Alexandria", county: "Teleorman" },
  { code: "TIM01", name: "Timișoara", county: "Timiș" },
  { code: "TL01", name: "Tulcea", county: "Tulcea" },
  { code: "VS01", name: "Vaslui", county: "Vaslui" },
  { code: "RMV01", name: "Râmnicu Vâlcea", county: "Vâlcea" },
  { code: "VN01", name: "Focșani", county: "Vrancea" },
];

export const findTownByCode = (code: string): Town | undefined => {
  return romanianTowns.find(town => town.code.toLowerCase() === code.toLowerCase());
};
