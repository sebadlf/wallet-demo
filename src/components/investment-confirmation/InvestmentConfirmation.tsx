import React from 'react';
import { Modal, Typography, Tag, Row, Col, Button } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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
      title={null}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
    >
      <div style={{ padding: '24px', textAlign: 'center' }}>
        {/* Icon */}
        <ExclamationCircleOutlined 
          style={{ 
            fontSize: '48px', 
            color: '#faad14', 
            marginBottom: '24px',
            display: 'block'
          }} 
        />

        {/* Title */}
        <Title level={3} style={{ marginBottom: '16px', color: '#2c5aa0' }}>
          Confirmar Selección
        </Title>

        {/* Message */}
        <Text style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)', marginBottom: '24px', display: 'block' }}>
          ¿Estás seguro de que deseas seleccionar la siguiente cartera de inversión?
        </Text>

        {/* Investment Summary */}
        <div style={{ 
          backgroundColor: '#fafafa', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '32px',
          border: '1px solid #e8e8e8'
        }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '12px' }}>
            <Title level={4} style={{ margin: 0, color: '#2c5aa0' }}>
              {investment.title}
            </Title>
            <Tag color={getRiskLevelColor(investment.riskLevel)}>
              {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)}
            </Tag>
          </Row>

          <Text style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)', display: 'block' }}>
            {investment.description}
          </Text>
        </div>

        {/* Action Buttons */}
        <Row gutter={12} justify="center">
          <Col>
            <Button 
              size="large" 
              onClick={onCancel}
              style={{ minWidth: '100px' }}
            >
              Cancelar
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
              onClick={onConfirm}
            >
              Confirmar
            </Button>
          </Col>
        </Row>

        {/* Additional Info */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
          <Text style={{ fontSize: '12px', color: '#52c41a' }}>
            Al confirmar, procederás con la selección de esta cartera de inversión.
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default InvestmentConfirmation;