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
  descriptionExtended: string;
  performance: PerformanceData[];
  holdings: StockHolding[];
  evolution: EvolutionData[];
  horizonteInversion: string;
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
      descriptionExtended: "Ahorro $ es una solución de inversión conservadora diseñada específicamente para aquellos inversores que priorizan la liquidez inmediata y la preservación del capital. Esta cartera está estructurada para ofrecer flexibilidad total, permitiendo el acceso a los fondos en cualquier momento sin penalidades ni restricciones temporales.\n\nLa estrategia de inversión se enfoca en instrumentos de bajo riesgo y alta liquidez, incluyendo fondos de dinero, letras del tesoro a corto plazo y depósitos a plazo fijo de alta calidad crediticia. Esta composición garantiza que los fondos mantengan su valor mientras generan rendimientos conservadores pero consistentes.\n\nEl perfil conservador de esta cartera la convierte en la opción ideal para construir un fondo de emergencia, mantener capital de trabajo o como refugio temporal durante períodos de alta volatilidad en los mercados. Es especialmente recomendada para inversores que recién inician su camino en el mundo de las inversiones.\n\nSi bien los retornos pueden ser modestos comparados con alternativas más agresivas, la tranquilidad de tener acceso inmediato a los fondos y la protección del capital principal representan sus principales ventajas competitivas.",
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
      evolution: generateEvolutionData(),
      horizonteInversion: "Corto plazo"
    },
    'ahorro-plus': {
      title: "Ahorro Plus",
      riskLevel: "conservador",
      description: "Animate a más.",
      descriptionExtended: "Ahorro Plus representa la evolución natural del producto Ahorro $, diseñado para inversores que buscan un equilibrio entre seguridad y rentabilidad mejorada. Esta cartera conservadora plus incorpora una mayor diversificación de instrumentos financieros, manteniendo los principios de seguridad pero con mayor potencial de crecimiento.\n\nLa estrategia incluye bonos corporativos de primera línea, certificados de depósito de bancos líderes y una pequeña exposición a fondos de renta fija de corto plazo. Esta composición busca capturar oportunidades de rendimiento adicional manteniendo un perfil de riesgo controlado y preservando la característica fundamental de alta liquidez.\n\nLos inversores pueden acceder a sus fondos con mínimas restricciones, aunque se recomienda un horizonte de inversión ligeramente superior para optimizar los resultados. Esta cartera es ideal para aquellos que han superado la etapa inicial de acumulación de capital y buscan hacer trabajar su dinero de manera más efectiva.\n\nLa gestión profesional y el monitoreo constante de las condiciones de mercado permiten ajustes tácticos que buscan maximizar el rendimiento ajustado por riesgo, sin comprometer significativamente la seguridad del capital invertido.",
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
      evolution: generateEvolutionData(),
      horizonteInversion: "Corto plazo"
    },
    'gestion-mix': {
      title: "Gestión MIX VI",
      riskLevel: "moderado",
      description: "Equilibrio perfecto entre renta fija y variable.",
      descriptionExtended: "Gestión MIX VI representa una estrategia de inversión equilibrada que combina expertamente instrumentos de renta fija y renta variable para crear un portafolio diversificado de riesgo moderado. Esta cartera está diseñada para inversores que buscan participar del crecimiento potencial de los mercados de capitales mientras mantienen un colchón de estabilidad.\n\nLa asignación estratégica típicamente incluye entre 40-60% en renta variable (acciones locales y CEDEARs) y 40-60% en renta fija (bonos gubernamentales y corporativos), con ajustes tácticos basados en las condiciones de mercado prevalecientes. El enfoque de gestión activa permite capitalizar oportunidades de corto plazo mientras se mantiene la disciplina de largo plazo.\n\nEsta cartera es ideal para inversores con un horizonte temporal de mediano plazo (2-5 años) que pueden tolerar cierta volatilidad a cambio de un potencial de retorno superior. La diversificación entre clases de activos y sectores económicos busca reducir el riesgo específico mientras se captura el rendimiento de múltiples fuentes.\n\nLa gestión profesional incluye rebalanceo periódico para mantener las asignaciones objetivo y aprovechamiento de oportunidades de arbitraje entre diferentes segmentos del mercado, optimizando el perfil riesgo-retorno del portafolio.",
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
      evolution: generateEvolutionData(),
      horizonteInversion: "Mediano plazo"
    },
    'cartera-renta': {
      title: "Cartera Renta $",
      riskLevel: "moderado",
      description: "Inversión en pesos con foco en generación de rentas.",
      descriptionExtended: "Cartera Renta $ está especialmente diseñada para inversores que priorizan la generación de ingresos regulares en pesos argentinos, combinando instrumentos que distribuyen dividendos y cupones de forma periódica. Esta estrategia se enfoca en empresas argentinas con historial consistente de pago de dividendos y bonos que ofrecen cupones atractivos.\n\nLa cartera incluye empresas argentinas con historial consistente de pago de dividendos, bonos corporativos y gubernamentales que ofrecen cupones atractivos, y fondos de inversión especializados en generación de renta. La selección de activos busca proporcionar un flujo de ingresos predecible mientras mantiene potencial de apreciación del capital.\n\nEsta opción es ideal para inversores que buscan complementar sus ingresos regulares, como jubilados o personas que requieren flujos de caja periódicos, sin sacrificar completamente las oportunidades de crecimiento de capital. La gestión activa incluye el reinvertimiento estratégico de los ingresos generados.\n\nLa estrategia también considera aspectos fiscales para optimizar la eficiencia impositiva de los ingresos generados, y la optimización de la estructura temporal de los vencimientos para mantener un flujo constante de liquidez a lo largo del tiempo.",
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
      evolution: generateEvolutionData(),
      horizonteInversion: "Mediano plazo"
    },
    'bonos': {
      title: "Bonos",
      riskLevel: "agresivo",
      description: "Inversión en bonos con alto potencial de crecimiento.",
      descriptionExtended: "La cartera Bonos está estratégicamente posicionada para capturar las oportunidades de alto rendimiento en el mercado de bonos soberanos y corporativos argentinos, aprovechando los spreads atractivos y el potencial de convergencia hacia fundamentales económicos mejorados. Esta estrategia agresiva se enfoca en bonos que ofrecen yields elevados debido a las primas de riesgo país.\n\nLa cartera incluye una combinación de bonos argentinos denominados en dólares y pesos, tanto ley local como ley extranjera, con diferentes vencimientos para optimizar el perfil riesgo-retorno. Los bonos presentan potencial significativo de apreciación ante escenarios de normalización económica y mejora de la percepción de riesgo.\n\nLa gestión activa implica timing de mercado, trading de curva de rendimientos y análisis crediticio profundo para identificar oportunidades de valor relativo. Este enfoque requiere una alta tolerancia al riesgo y comprensión de los factores macroeconómicos que afectan los precios de los bonos.\n\nEs ideal para inversores sofisticados que buscan rendimientos superiores y pueden soportar alta volatilidad, especialmente en contextos de incertidumbre política y económica que caracterizan a los mercados emergentes. La diversificación temporal y de monedas ayuda a mitigar algunos riesgos específicos.",
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
      evolution: generateEvolutionData(),
      horizonteInversion: "Largo plazo"
    },
    'cartera-renta-fija': {
      title: "Cartera Renta Fija",
      riskLevel: "conservador",
      description: "Cartera orientada a renta fija con bajo riesgo.",
      descriptionExtended: "Cartera Renta Fija constituye una solución de inversión conservadora y predecible, específicamente diseñada para inversores que priorizan la estabilidad de capital y la generación de ingresos consistentes a través de instrumentos de renta fija de alta calidad crediticia. Esta cartera se compone principalmente de instrumentos gubernamentales y corporativos de bajo riesgo.\n\nLa estrategia incluye letras del tesoro, bonos gubernamentales de corto y mediano plazo, certificados de depósito bancarios, y una selección cuidadosa de bonos corporativos de empresas con ratings crediticios sólidos. La gestión se enfoca en la optimización de la duración del portafolio para minimizar el riesgo de tasa de interés.\n\nLa diversificación temporal de vencimientos permite mantener liquidez periódica y reinversión oportuna según las condiciones de mercado. Esta cartera es especialmente adecuada para inversores conservadores, fondos de pensión, o como componente estabilizador dentro de una asignación de activos más amplia.\n\nEl enfoque de gestión pasiva y la selección rigurosa de emisores buscan preservar el capital mientras genera retornos reales positivos por encima de la inflación en el largo plazo, maximizando el ingreso por cupones de manera consistente.",
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
      evolution: generateEvolutionData(),
      horizonteInversion: "Largo plazo"
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