import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router';
import InvestmentCard from '../components/investment-card';

type RiskFilterType = 'todos' | 'conservador' | 'moderado' | 'agresivo';
type RiskLevel = 'conservador' | 'moderado' | 'agresivo';

interface PerformanceData {
  period: string;
  percentage: string;
  isNegative?: boolean;
}

interface InvestmentData {
  title: string;
  riskLevel: RiskLevel;
  category: string;
  description: string;
  performance: PerformanceData[];
}

interface InvestmentCardsProps {
  riskFilter: RiskFilterType;
  onInvestmentConfirm: (investment: InvestmentData) => void;
}

const InvestmentCards: React.FC<InvestmentCardsProps> = ({ riskFilter, onInvestmentConfirm }) => {
  const navigate = useNavigate();
  const investmentData = [
    {
      id: 'ahorro',
      title: "Ahorro $",
      riskLevel: "conservador" as const,
      category: "Alta liquidez",
      description: "Movilizá tu dinero hasta que lo necesites.",
      performance: [
        { period: "Semana", percentage: "0,10%" },
        { period: "Mes", percentage: "3,46%" },
        { period: "Trimestre", percentage: "8,19%" }
      ]
    },
    {
      id: 'ahorro-plus',
      title: "Ahorro Plus",
      riskLevel: "conservador" as const,
      category: "Alta liquidez",
      description: "Animate a más.",
      performance: [
        { period: "Semana", percentage: "0,12%" },
        { period: "Mes", percentage: "3,97%" },
        { period: "Trimestre", percentage: "8,82%" }
      ]
    },
    {
      id: 'gestion-mix',
      title: "Gestión MIX VI",
      riskLevel: "moderado" as const,
      category: "Renta Fija en Pesos",
      description: "Un pasito más para empezar a diversificar tu inversión.",
      performance: [
        { period: "Semana", percentage: "0,45%" },
        { period: "Mes", percentage: "4,19%" },
        { period: "Trimestre", percentage: "6,63%" }
      ]
    },
    {
      id: 'cartera-renta',
      title: "Cartera Renta $",
      riskLevel: "moderado" as const,
      category: "Renta Fija en Pesos",
      description: "Potencia tus ahorros.",
      performance: [
        { period: "Semana", percentage: "1,24%" },
        { period: "Mes", percentage: "3,41%" },
        { period: "Trimestre", percentage: "1,08%" }
      ]
    },
    {
      id: 'bonos',
      title: "Bonos",
      riskLevel: "agresivo" as const,
      category: "Renta Fija en Pesos",
      description: "Busca acompañar el tipo de cambio oficial.",
      performance: [
        { period: "Semana", percentage: "0,76%" },
        { period: "Mes", percentage: "6,94%" },
        { period: "Trimestre", percentage: "15,60%" }
      ]
    },
    {
      id: 'cartera-renta-fija',
      title: "Cartera Renta Fija",
      riskLevel: "agresivo" as const,
      category: "Renta Fija en Pesos",
      description: "Le da pelea a la inflación.",
      performance: [
        { period: "Semana", percentage: "1,68%" },
        { period: "Mes", percentage: "1,94%" },
        { period: "Trimestre", percentage: "-0,28%", isNegative: true }
      ]
    }
  ];

  const filteredData = riskFilter === 'todos' 
    ? investmentData 
    : investmentData.filter(investment => investment.riskLevel === riskFilter);

  return (
    <Row gutter={[24, 24]}>
      {filteredData.map((investment, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <InvestmentCard
            title={investment.title}
            riskLevel={investment.riskLevel}
            category={investment.category}
            description={investment.description}
            performance={investment.performance}
            onViewDetails={() => navigate(`/investment/${investment.id}`)}
            onInvest={() => onInvestmentConfirm(investment)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default InvestmentCards;