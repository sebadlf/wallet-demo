import React, { useState } from 'react';
import { Row, Col, Typography, Tag, Select, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import InvestmentCards from './InvestmentCards';
import InvestmentTable from './InvestmentTable';
import InvestmentConfirmation from '../components/investment-confirmation';
import type { InvestmentData } from '../utils';

const { Title } = Typography;
const { Option } = Select;

type ViewType = 'grilla' | 'lista';
type RiskFilterType = 'todos' | 'conservador' | 'moderado' | 'agresivo';

const InvestmentSection: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('grilla');
  const [riskFilter, setRiskFilter] = useState<RiskFilterType>('todos');
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentData | null>(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleInvestmentConfirm = (investment: InvestmentData) => {
    setSelectedInvestment(investment);
    setConfirmationVisible(true);
  };

  const handleConfirmationCancel = () => {
    setConfirmationVisible(false);
    setSelectedInvestment(null);
  };

  const handleConfirmationConfirm = () => {
    console.log('Investment confirmed:', selectedInvestment?.title);
    setConfirmationVisible(false);
    setSelectedInvestment(null);
    // Here you would typically call an API to process the investment
  };
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
        <Col>
          <Title level={2} style={{ margin: 0, fontSize: '24px', fontWeight: 500 }}>
            Carteras de inversión
          </Title>
        </Col>
        <Col>
          <Select 
            value={viewType} 
            style={{ width: 120 }}
            onChange={(value: ViewType) => setViewType(value)}
          >
            <Option value="grilla">Grilla</Option>
            <Option value="lista">Lista</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={[24, 16]} style={{ marginBottom: '32px' }}>
        <Col>
          <Space direction="vertical" size={8}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Riesgo</span>
              <QuestionCircleOutlined style={{ color: '#bfbfbf' }} />
            </div>
            <Space size={8}>
              <Tag 
                style={{ 
                  borderRadius: 16, 
                  padding: '4px 16px', 
                  cursor: 'pointer',
                  backgroundColor: riskFilter === 'todos' ? '#2c5aa0' : '#fff',
                  borderColor: riskFilter === 'todos' ? '#2c5aa0' : '#d9d9d9',
                  color: riskFilter === 'todos' ? '#fff' : 'rgba(0, 0, 0, 0.65)'
                }}
                onClick={() => setRiskFilter('todos')}
              >
                Todos
              </Tag>
              <Tag 
                style={{ 
                  borderRadius: 16, 
                  padding: '4px 16px', 
                  cursor: 'pointer',
                  backgroundColor: riskFilter === 'conservador' ? '#2c5aa0' : '#fff',
                  borderColor: riskFilter === 'conservador' ? '#2c5aa0' : '#d9d9d9',
                  color: riskFilter === 'conservador' ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid'
                }}
                onClick={() => setRiskFilter('conservador')}
              >
                Conservador
              </Tag>
              <Tag 
                style={{ 
                  borderRadius: 16, 
                  padding: '4px 16px', 
                  cursor: 'pointer',
                  backgroundColor: riskFilter === 'moderado' ? '#2c5aa0' : '#fff',
                  borderColor: riskFilter === 'moderado' ? '#2c5aa0' : '#d9d9d9',
                  color: riskFilter === 'moderado' ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid'
                }}
                onClick={() => setRiskFilter('moderado')}
              >
                Moderado
              </Tag>
              <Tag 
                style={{ 
                  borderRadius: 16, 
                  padding: '4px 16px', 
                  cursor: 'pointer',
                  backgroundColor: riskFilter === 'agresivo' ? '#2c5aa0' : '#fff',
                  borderColor: riskFilter === 'agresivo' ? '#2c5aa0' : '#d9d9d9',
                  color: riskFilter === 'agresivo' ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid'
                }}
                onClick={() => setRiskFilter('agresivo')}
              >
                Agresivo
              </Tag>
            </Space>
          </Space>
        </Col>

      </Row>

      {viewType === 'grilla' ? (
        <div style={{ marginTop: '32px' }}>
          <InvestmentCards 
            riskFilter={riskFilter}
            onInvestmentConfirm={handleInvestmentConfirm}
          />
        </div>
      ) : (
        <div style={{ marginTop: '32px' }}>
          <InvestmentTable 
            riskFilter={riskFilter}
            onInvestmentConfirm={handleInvestmentConfirm}
          />
        </div>
      )}

      <InvestmentConfirmation
        visible={confirmationVisible}
        onCancel={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
        investment={selectedInvestment}
      />
    </div>
  );
};

export default InvestmentSection;