import React from 'react';
import { Modal, Typography, Tag, Row, Col, Space, Divider, Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

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

interface InvestmentDetailProps {
  visible: boolean;
  onClose: () => void;
  investment: InvestmentData | null;
}

const InvestmentDetail: React.FC<InvestmentDetailProps> = ({
  visible,
  onClose,
  investment
}) => {
  if (!investment) return null;

  const getRiskLevelColor = (riskLevel: RiskLevel) => {
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

  const getRiskDescription = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'conservador':
        return 'Perfil de bajo riesgo con menor volatilidad. Ideal para inversores que buscan estabilidad y preservar el capital.';
      case 'moderado':
        return 'Perfil de riesgo equilibrado que busca un balance entre crecimiento y estabilidad del capital.';
      case 'agresivo':
        return 'Perfil de alto riesgo con mayor potencial de crecimiento. Adecuado para inversores con alta tolerancia al riesgo.';
      default:
        return '';
    }
  };

  const getInvestmentDetails = (title: string) => {
    const details = {
      'Ahorro $': {
        minAmount: '$10.000',
        duration: 'Sin plazo fijo',
        fees: '0.5% anual',
        liquidity: 'Inmediata'
      },
      'Ahorro Plus': {
        minAmount: '$50.000',
        duration: 'Sin plazo fijo',
        fees: '0.3% anual',
        liquidity: 'Inmediata'
      },
      'Gestión MIX VI': {
        minAmount: '$100.000',
        duration: 'Mínimo 90 días',
        fees: '1.2% anual',
        liquidity: '24 horas hábiles'
      },
      'Cartera Renta $': {
        minAmount: '$250.000',
        duration: 'Mínimo 180 días',
        fees: '1.5% anual',
        liquidity: '24 horas hábiles'
      },
      'Bonos': {
        minAmount: '$500.000',
        duration: 'Variable según bono',
        fees: '2.0% anual',
        liquidity: '48 horas hábiles'
      },
      'Cartera Renta Fija': {
        minAmount: '$1.000.000',
        duration: 'Mínimo 1 año',
        fees: '1.8% anual',
        liquidity: '48 horas hábiles'
      }
    };

    return details[title as keyof typeof details] || {
      minAmount: 'No especificado',
      duration: 'No especificado',
      fees: 'No especificado',
      liquidity: 'No especificado'
    };
  };

  const details = getInvestmentDetails(investment.title);

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
    >
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '12px' }}>
            <Title level={2} style={{ margin: 0, color: '#2c5aa0' }}>
              {investment.title}
            </Title>
            <Tag color={getRiskLevelColor(investment.riskLevel)} style={{ fontSize: '14px' }}>
              {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)}
            </Tag>
          </Row>

          <Tag style={{ 
            borderRadius: 12, 
            border: '1px solid #d9d9d9', 
            backgroundColor: '#fafafa',
            padding: '4px 12px',
            marginBottom: '16px'
          }}>
            {investment.category}
          </Tag>

          <Paragraph style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)', marginBottom: 0 }}>
            {investment.description}
          </Paragraph>
        </div>

        <Divider />

        {/* Risk Profile */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoCircleOutlined style={{ color: '#2c5aa0' }} />
            Perfil de Riesgo
          </Title>
          <Text style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)' }}>
            {getRiskDescription(investment.riskLevel)}
          </Text>
        </div>

        <Divider />

        {/* Performance */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>
            Rendimientos Históricos
          </Title>
          <Row gutter={[32, 16]}>
            {investment.performance.map((item, index) => (
              <Col span={8} key={index}>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
                  <Text type="secondary" style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                    {item.period}
                  </Text>
                  <Space align="center" size={4}>
                    {item.isNegative ? (
                      <CaretDownOutlined style={{ color: '#ff4d4f', fontSize: 12 }} />
                    ) : (
                      <CaretUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                    )}
                    <Text 
                      strong 
                      style={{ 
                        color: item.isNegative ? '#ff4d4f' : '#52c41a', 
                        fontSize: '18px'
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

        <Divider />

        {/* Investment Details */}
        <div style={{ marginBottom: '32px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>
            Detalles de la Inversión
          </Title>
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                  Monto Mínimo
                </Text>
                <Text style={{ fontSize: '16px', color: '#2c5aa0' }}>
                  {details.minAmount}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                  Comisiones
                </Text>
                <Text style={{ fontSize: '16px', color: '#2c5aa0' }}>
                  {details.fees}
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* Action Buttons */}
        <Row gutter={12} justify="end">
          <Col>
            <Button size="large" onClick={onClose}>
              Volver
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              size="large"
              style={{ 
                backgroundColor: '#2c5aa0', 
                borderColor: '#2c5aa0',
                borderRadius: '20px',
                minWidth: '120px'
              }}
              onClick={() => {
                console.log('Confirming selection:', investment.title);
                onClose();
              }}
            >
              Confirmar Selección
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default InvestmentDetail;