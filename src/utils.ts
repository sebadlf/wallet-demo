type RiskLevel = 'conservador' | 'moderado' | 'agresivo';

interface PerformanceData {
  period: string;
  percentage: string;
  isNegative?: boolean;
}

interface StockHolding {
  symbol: string;
  name: string;
  percentage: number;
}

interface EvolutionData {
  date: string;
  percentage: number;
}

export interface InvestmentData {
  title: string;
  riskLevel: RiskLevel;
  description: string;
  performance: PerformanceData[];
  holdings: StockHolding[];
  evolution: EvolutionData[];
}

const generateEvolutionData = (year: number = 2024): EvolutionData[] => {
  const data: EvolutionData[] = [];
  const startDate = new Date(year, 0, 2); // January 2nd
  let currentPercentage = 0;

  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Skip weekends for business days only
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      continue;
    }

    // Add random change between -2 and 3
    const change = Math.random() * 4 - 2; // Range: -2 to 3
    currentPercentage += change;

    data.push({
      date: currentDate.toISOString().split('T')[0],
      percentage: parseFloat(currentPercentage.toFixed(2))
    });
  }

  return data;
};

export const INVESTMENT_DATA: Record<string, InvestmentData> = {
    'ahorro': {
      title: "Ahorro $",
      riskLevel: "conservador",
      description: "Movilizá tu dinero hasta que lo necesites.",
      performance: [
        { period: "Semana", percentage: "-1,67%", isNegative: true },
        { period: "Mes", percentage: "-2,45%", isNegative: true },
        { period: "Trimestre", percentage: "-0,82%", isNegative: true }
      ],
      holdings: [
        { symbol: "YPFD", name: "YPF S.A.", percentage: 25.5 },
        { symbol: "GGAL", name: "Grupo Galicia", percentage: 18.2 },
        { symbol: "PAMP", name: "Pampa Energía", percentage: 15.8 },
        { symbol: "TGS", name: "Transportadora de Gas del Sur", percentage: 12.4 },
        { symbol: "ALUA", name: "Aluar Aluminio", percentage: 10.1 },
        { symbol: "MIRG", name: "Mirgor S.A.", percentage: 8.6 },
        { symbol: "BMA", name: "Banco Macro", percentage: 9.4 }
      ],
      evolution: generateEvolutionData()
    },
    'ahorro-plus': {
      title: "Ahorro Plus",
      riskLevel: "conservador",
      description: "Animate a más.",
      performance: [
        { period: "Semana", percentage: "0,10%" },
        { period: "Mes", percentage: "3,46%" },
        { period: "Trimestre", percentage: "8,19%" }
      ],
      holdings: [
        { symbol: "GGAL", name: "Grupo Galicia", percentage: 22.1 },
        { symbol: "YPFD", name: "YPF S.A.", percentage: 19.3 },
        { symbol: "PAMP", name: "Pampa Energía", percentage: 16.7 },
        { symbol: "TGS", name: "Transportadora de Gas del Sur", percentage: 14.2 },
        { symbol: "ALUA", name: "Aluar Aluminio", percentage: 12.8 },
        { symbol: "MIRG", name: "Mirgor S.A.", percentage: 9.5 },
        { symbol: "BMA", name: "Banco Macro", percentage: 5.4 }
      ],
      evolution: generateEvolutionData()
    },
    'gestion-mix': {
      title: "Gestión MIX VI",
      riskLevel: "moderado",
      description: "Equilibrio perfecto entre renta fija y variable.",
      performance: [
        { period: "Semana", percentage: "1,75%" },
        { period: "Mes", percentage: "4,82%" },
        { period: "Trimestre", percentage: "12,34%" }
      ],
      holdings: [
        { symbol: "GGAL", name: "Grupo Galicia", percentage: 18.5 },
        { symbol: "PAMP", name: "Pampa Energía", percentage: 16.2 },
        { symbol: "YPFD", name: "YPF S.A.", percentage: 15.8 },
        { symbol: "TGS", name: "Transportadora de Gas del Sur", percentage: 13.1 },
        { symbol: "ALUA", name: "Aluar Aluminio", percentage: 11.7 },
        { symbol: "MIRG", name: "Mirgor S.A.", percentage: 10.4 },
        { symbol: "BMA", name: "Banco Macro", percentage: 8.9 },
        { symbol: "TRAN", name: "Transener", percentage: 5.4 }
      ],
      evolution: generateEvolutionData()
    },
    'cartera-renta': {
      title: "Cartera Renta $",
      riskLevel: "moderado",
      description: "Inversión en pesos con foco en generación de rentas.",
      performance: [
        { period: "Semana", percentage: "2,15%" },
        { period: "Mes", percentage: "6,28%" },
        { period: "Trimestre", percentage: "15,67%" }
      ],
      holdings: [
        { symbol: "GGAL", name: "Grupo Galicia", percentage: 20.3 },
        { symbol: "PAMP", name: "Pampa Energía", percentage: 17.8 },
        { symbol: "YPFD", name: "YPF S.A.", percentage: 16.4 },
        { symbol: "TGS", name: "Transportadora de Gas del Sur", percentage: 14.2 },
        { symbol: "ALUA", name: "Aluar Aluminio", percentage: 12.1 },
        { symbol: "BMA", name: "Banco Macro", percentage: 10.7 },
        { symbol: "MIRG", name: "Mirgor S.A.", percentage: 8.5 }
      ],
      evolution: generateEvolutionData()
    },
    'bonos': {
      title: "Bonos",
      riskLevel: "agresivo",
      description: "Inversión en bonos con alto potencial de crecimiento.",
      performance: [
        { period: "Semana", percentage: "3,42%" },
        { period: "Mes", percentage: "8,95%" },
        { period: "Trimestre", percentage: "22,18%" }
      ],
      holdings: [
        { symbol: "AL30", name: "Bonos Argentina USD", percentage: 28.4 },
        { symbol: "GD30", name: "Bonos Globales", percentage: 24.7 },
        { symbol: "AE38", name: "Bonos Argentina EUR", percentage: 19.3 },
        { symbol: "AL35", name: "Bonos Ley Argentina", percentage: 15.2 },
        { symbol: "GD35", name: "Bonos Discount", percentage: 12.4 }
      ],
      evolution: generateEvolutionData()
    },
    'cartera-renta-fija': {
      title: "Cartera Renta Fija",
      riskLevel: "conservador",
      description: "Cartera orientada a renta fija con bajo riesgo.",
      performance: [
        { period: "Semana", percentage: "0,85%" },
        { period: "Mes", percentage: "2,94%" },
        { period: "Trimestre", percentage: "7,32%" }
      ],
      holdings: [
        { symbol: "LECAP", name: "Letras Capitalización", percentage: 35.6 },
        { symbol: "BONOS", name: "Bonos del Tesoro", percentage: 28.3 },
        { symbol: "CEDEAR", name: "Certificados ADR", percentage: 18.7 },
        { symbol: "FCI", name: "Fondos Comunes", percentage: 17.4 }
      ],
      evolution: generateEvolutionData()
    }
};

export const getInvestmentData = (id: string): InvestmentData | null => {
  return INVESTMENT_DATA[id] || null;
};

export const getAllInvestments = (): Array<InvestmentData & { id: string }> => {
  return Object.entries(INVESTMENT_DATA).map(([id, data]) => ({
    ...data,
    id
  }));
};