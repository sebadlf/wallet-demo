import React from 'react';
import { Card, Col, Row, Space, Typography, Tag, Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const getRiskLevelColor = (riskLevel?: RiskLevel) => {
  switch (riskLevel) {
    case 'conservador':
      return 'success';
    case 'moderado':
      return 'warning';
    case 'agresivo':
      return 'error';
    default:
      return 'success';
  }
};

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

type RiskLevel = 'conservador' | 'moderado' | 'agresivo';

interface InvestmentCardProps {
  title?: string;
  riskLevel?: RiskLevel;
  description?: string;
  performance?: PerformanceData[];
  holdings?: StockHolding[];
  onViewDetails?: () => void;
  onInvest?: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  title = "Ahorro $",
  riskLevel = "conservador",
  description = "Movilizá tu dinero hasta que lo necesites.",
  performance = [
    { period: "Semana", percentage: "0,10%" },
    { period: "Mes", percentage: "3,46%" },
    { period: "Trimestre", percentage: "8,19%" }
  ],
  holdings = [],
  onViewDetails,
  onInvest
}) => {
  // Get top 3 holdings by percentage
  const topHoldings = holdings
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);
  return (
    <Card
      style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      bodyStyle={{ padding: 20 }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Title level={4} style={{ margin: 0, color: '#2c5aa0' }}>
            {title}
          </Title>
          <Tag color={getRiskLevelColor(riskLevel)}>
            {riskLevel?.charAt(0).toUpperCase() + riskLevel?.slice(1)}
          </Tag>
        </Row>


        <Text type="secondary" style={{ fontSize: 14 }}>
          {description}
        </Text>

        <div>
          <Text strong style={{ fontSize: 14, marginBottom: 8, display: 'block' }}>
            Rendimientos
          </Text>
          <Row gutter={[16, 8]}>
            {performance.map((item, index) => (
              <Col span={8} key={index}>
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                    {item.period}
                  </Text>
                  <Space align="center" size={2} style={{ justifyContent: 'center', width: '100%' }}>
                    {item.isNegative ? (
                      <CaretDownOutlined style={{ color: '#ff4d4f', fontSize: 10 }} />
                    ) : (
                      <CaretUpOutlined style={{ color: '#52c41a', fontSize: 10 }} />
                    )}
                    <Text 
                      strong 
                      style={{ 
                        color: item.isNegative ? '#ff4d4f' : '#52c41a', 
                        fontSize: 14 
                      }}
                    >
                      {item.percentage}
                    </Text>
                  </Space>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {topHoldings.length > 0 && (
          <div>
            <Text strong style={{ fontSize: 14, marginBottom: 8, display: 'block' }}>
              Principales participaciones
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {topHoldings.map((holding, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong style={{ fontSize: 12, color: '#2c5aa0' }}>
                      {holding.symbol}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {holding.name}
                    </Text>
                  </div>
                  <Text strong style={{ fontSize: 12, color: '#52c41a' }}>
                    {holding.percentage.toFixed(1)}%
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}

        <Row gutter={12}>
          <Col span={12}>
            <Button 
              type="default"
              style={{ width: '100%', color: '#2c5aa0' }}
              onClick={onViewDetails}
            >
              Abrir detalle
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              style={{ width: '100%', backgroundColor: '#2c5aa0', borderColor: '#2c5aa0' }}
              onClick={onInvest}
            >
              Seleccionar
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default InvestmentCard;