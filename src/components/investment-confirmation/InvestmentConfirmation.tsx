import React from 'react';
import { Modal, Typography, Tag, Row, Col, Button, Space, Alert } from 'antd';

const { Title, Text } = Typography;

type RiskLevel = 'conservador' | 'moderado' | 'agresivo';

interface PerformanceData {
  period: string;
  percentage: string;
  isNegative?: boolean;
}

interface InvestmentData {
  title: string;
  riskLevel: RiskLevel;
  description: string;
  performance: PerformanceData[];
}

interface InvestmentConfirmationProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  investment: InvestmentData | null;
}

const InvestmentConfirmation: React.FC<InvestmentConfirmationProps> = ({
  visible,
  onConfirm,
  onCancel,
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

  return (
    <Modal
      title={
        <span>
          Confirmar Selección - <span style={{ color: '#2c5aa0' }}>{investment.title}</span>
        </span>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={560}
      centered
      style={{ borderRadius: '12px' }}
    >
      {/* Content */}
      <div style={{ paddingTop: '16px' }}>

        {/* Investment Header */}
        <div style={{ marginBottom: '24px' }}>
          <Text style={{ 
            fontSize: '15px', 
            color: 'rgba(0, 0, 0, 0.75)', 
            display: 'block',
            lineHeight: '1.6'
          }}>
            {investment.description}
          </Text>
        </div>

        {/* Performance Section */}
        <div style={{ marginBottom: '32px' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
            <Title level={4} style={{ margin: 0, color: '#2c5aa0', fontWeight: 600 }}>
              Rendimientos Recientes
            </Title>
            <Tag 
              color={getRiskLevelColor(investment.riskLevel)}
              style={{ 
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)}
            </Tag>
          </Row>
          
          <div style={{ 
            background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
            padding: '24px', 
            borderRadius: '12px',
            border: '1px solid #e8f4fd',
            boxShadow: '0 4px 12px rgba(44, 90, 160, 0.08)',
            textAlign: 'center'
          }}>
            <Space size="large">
              {investment.performance.slice(0, 3).map((perf, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                    {perf.period}
                  </Text>
                  <Text strong style={{ 
                    color: perf.isNegative ? '#ff4d4f' : '#52c41a',
                    fontSize: '16px'
                  }}>
                    {perf.percentage}
                  </Text>
                </div>
              ))}
            </Space>
          </div>
        </div>

        <Text style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)', marginBottom: '24px', display: 'block' }}>
          Estás a punto de seleccionar una nueva cartera de inversión
        </Text>

        {/* Info Banner */}
        <Alert
          message="Información importante"
          description="Al confirmar, esta cartera será agregada a tu perfil de inversión. Podrás modificar tu selección en cualquier momento."
          type="info"
          showIcon
          style={{ marginBottom: '32px' }}
        />

        {/* Action Buttons */}
        <Row gutter={16} justify="end">
          <Col>
            <Button
              onClick={onCancel}
              type="default"
              style={{ color: '#2c5aa0' }}
            >
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              style={{ 
                backgroundColor: '#2c5aa0', 
                borderColor: '#2c5aa0'
              }}
              onClick={onConfirm}
            >
              Confirmar Selección
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default InvestmentConfirmation;