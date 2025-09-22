import React from 'react';
import { Modal, Typography, Tag, Row, Col, Button, Space, Alert, Divider } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, CheckCircleOutlined } from '@ant-design/icons';

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
  horizonteInversion: string;
}

interface InvestmentSelectionModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  investment: InvestmentData | null;
}

const InvestmentSelectionModal: React.FC<InvestmentSelectionModalProps> = ({
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
          <span>Confirmar selección de cartera</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      style={{ borderRadius: '12px' }}
    >
      <div style={{ paddingTop: '16px' }}>
        {/* Investment Header */}
        <div style={{ marginBottom: '24px' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '12px' }}>
            <Title level={3} style={{ margin: 0, color: '#2c5aa0' }}>
              {investment.title}
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

          <Text style={{ fontSize: '15px', color: 'rgba(0, 0, 0, 0.75)', display: 'block', marginBottom: '16px' }}>
            {investment.description}
          </Text>

          {/* Investment Details */}
          <div>
            <Text strong style={{ fontSize: '14px', color: '#595959', display: 'block', marginBottom: '4px' }}>
              Horizonte de inversión
            </Text>
            <Text style={{ fontSize: '16px', color: '#2c5aa0', fontWeight: 500 }}>
              {investment.horizonteInversion}
            </Text>
          </div>
        </div>

        <Divider />

        {/* Performance Section */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5} style={{ marginBottom: '16px' }}>
            Rendimientos recientes
          </Title>

          <div style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e8f4fd',
            boxShadow: '0 2px 8px rgba(44, 90, 160, 0.08)'
          }}>
            <Row gutter={[24, 0]} justify="center">
              {investment.performance.slice(0, 3).map((perf, index) => (
                <Col key={index} style={{ textAlign: 'center' }}>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                    {perf.period}
                  </Text>
                  <Space align="center" size={4}>
                    {perf.isNegative ? (
                      <CaretDownOutlined style={{ color: '#ff4d4f', fontSize: 12 }} />
                    ) : (
                      <CaretUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                    )}
                    <Text strong style={{
                      color: perf.isNegative ? '#ff4d4f' : '#52c41a',
                      fontSize: '18px'
                    }}>
                      {perf.percentage}
                    </Text>
                  </Space>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Important Notice */}
        <Alert
          message="Próximos pasos"
          description="Al confirmar, un representante se pondrá en contacto contigo para finalizar la configuración de tu cartera de inversión y completar el proceso."
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        {/* Action Buttons */}
        <Row gutter={16} justify="end">
          <Col>
            <Button
              size="large"
              onClick={onCancel}
              style={{ color: '#2c5aa0' }}
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
                minWidth: '140px'
              }}
              onClick={onConfirm}
            >
              Confirmar selección
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default InvestmentSelectionModal;