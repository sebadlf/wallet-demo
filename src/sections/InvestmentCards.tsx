import React from 'react';
import { Row, Col } from 'antd';
import InvestmentCard from '../components/investment-card';
import { getAllInvestments } from '../utils';
import type { InvestmentData } from '../utils';

type RiskLevel = 'conservador' | 'moderado' | 'agresivo';
type RiskFilterType = 'todos' | RiskLevel[];

interface InvestmentCardsProps {
  riskFilter: RiskFilterType;
  onInvestmentConfirm: (investment: InvestmentData) => void;
  onDirectConfirm: (investment: InvestmentData) => void;
}


const InvestmentCards: React.FC<InvestmentCardsProps> = ({ riskFilter, onInvestmentConfirm, onDirectConfirm }) => {
  
  // Get all investment data from utils
  const investmentData = getAllInvestments();

  const filteredData = riskFilter === 'todos' 
    ? investmentData 
    : investmentData.filter(investment => 
        Array.isArray(riskFilter) 
          ? riskFilter.includes(investment.riskLevel)
          : investment.riskLevel === riskFilter
      );

  return (
    <Row gutter={[24, 24]}>
      {filteredData.map((investment, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <InvestmentCard
            title={investment.title}
            riskLevel={investment.riskLevel}
            description={investment.description}
            performance={investment.performance}
            holdings={investment.holdings}
            horizonteInversion={investment.horizonteInversion}
            onViewDetails={() => onInvestmentConfirm({
              title: investment.title,
              riskLevel: investment.riskLevel,
              description: investment.description,
              performance: investment.performance,
              holdings: investment.holdings,
              evolution: investment.evolution,
              horizonteInversion: investment.horizonteInversion
            })}
            onInvest={() => onDirectConfirm({
              title: investment.title,
              riskLevel: investment.riskLevel,
              description: investment.description,
              performance: investment.performance,
              holdings: investment.holdings,
              evolution: investment.evolution,
              horizonteInversion: investment.horizonteInversion
            })}
          />
        </Col>
      ))}
    </Row>
  );
};

export default InvestmentCards;