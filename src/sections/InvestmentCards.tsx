import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router';
import InvestmentCard from '../components/investment-card';
import { getAllInvestments } from '../utils';
import type { InvestmentData } from '../utils';

type RiskFilterType = 'todos' | 'conservador' | 'moderado' | 'agresivo';

interface InvestmentCardsProps {
  riskFilter: RiskFilterType;
  onInvestmentConfirm: (investment: InvestmentData) => void;
}


const InvestmentCards: React.FC<InvestmentCardsProps> = ({ riskFilter, onInvestmentConfirm }) => {
  const navigate = useNavigate();
  
  // Get all investment data from utils
  const investmentData = getAllInvestments();

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
            description={investment.description}
            performance={investment.performance}
            holdings={investment.holdings}
            onViewDetails={() => navigate(`/investment/${investment.id}`)}
            onInvest={() => onInvestmentConfirm({
              title: investment.title,
              riskLevel: investment.riskLevel,
              description: investment.description,
              performance: investment.performance,
              holdings: investment.holdings,
              evolution: investment.evolution
            })}
          />
        </Col>
      ))}
    </Row>
  );
};

export default InvestmentCards;