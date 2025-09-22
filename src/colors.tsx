// Alpha constants for chart colors
export const CHART_ALPHA = {
  DEFAULT: 0.65,
  HOVER: 0.85
} as const;

export interface InstrumentColors {
  default: string;
  hover: string;
}

// Base RGB colors for each instrument type
const BASE_COLORS = {
  'Dólares (USD)': '47,109,58',
  'Pesos (ARS)': '42,144,209',
  'Bonos (Soberanos)': '44,62,143',
  'Obligaciones Negociables (ONs)': '0,105,92',
  'Acciones (Locales)': '230,126,34',
  'CEDEARs': '126,87,194',
  'Otros / No categorizados': '158,158,158'
} as const;

export const INSTRUMENT_COLORS: Record<string, InstrumentColors> = {
  'Dólares (USD)': {
    default: `rgba(${BASE_COLORS['Dólares (USD)']},${CHART_ALPHA.DEFAULT})`,
    hover: `rgba(${BASE_COLORS['Dólares (USD)']},${CHART_ALPHA.HOVER})`
  },
  'Pesos (ARS)': {
    default: `rgba(${BASE_COLORS['Pesos (ARS)']},${CHART_ALPHA.DEFAULT})`,
    hover: `rgba(${BASE_COLORS['Pesos (ARS)']},${CHART_ALPHA.HOVER})`
  },
  'Bonos (Soberanos)': {
    default: `rgba(${BASE_COLORS['Bonos (Soberanos)']},${CHART_ALPHA.DEFAULT})`,
    hover: `rgba(${BASE_COLORS['Bonos (Soberanos)']},${CHART_ALPHA.HOVER})`
  },
  'Obligaciones Negociables (ONs)': {
    default: `rgba(${BASE_COLORS['Obligaciones Negociables (ONs)']},${CHART_ALPHA.DEFAULT})`,
    hover: `rgba(${BASE_COLORS['Obligaciones Negociables (ONs)']},${CHART_ALPHA.HOVER})`
  },
  'Acciones (Locales)': {
    default: `rgba(${BASE_COLORS['Acciones (Locales)']},${CHART_ALPHA.DEFAULT})`,
    hover: `rgba(${BASE_COLORS['Acciones (Locales)']},${CHART_ALPHA.HOVER})`
  },
  'CEDEARs': {
    default: `rgba(${BASE_COLORS['CEDEARs']},${CHART_ALPHA.DEFAULT})`,
    hover: `rgba(${BASE_COLORS['CEDEARs']},${CHART_ALPHA.HOVER})`
  },
  'Otros / No categorizados': {
    default: `rgba(${BASE_COLORS['Otros / No categorizados']},${CHART_ALPHA.DEFAULT})`,
    hover: `rgba(${BASE_COLORS['Otros / No categorizados']},${CHART_ALPHA.HOVER})`
  }
};