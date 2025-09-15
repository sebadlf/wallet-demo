import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Tag, Select, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import InvestmentCards from './InvestmentCards';
import InvestmentTable from './InvestmentTable';
import InvestmentConfirmation from '../components/investment-confirmation';
import type { InvestmentData } from '../utils';

const { Title } = Typography;
const { Option } = Select;

type ViewType = 'grilla' | 'lista';
type RiskLevel = 'conservador' | 'moderado' | 'agresivo';

const InvestmentSection: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('grilla');
  const [selectedRisks, setSelectedRisks] = useState<RiskLevel[]>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentData | null>(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth > 992; // lg breakpoint is 992px
      setIsLargeScreen(isLarge);
      
      // Force grid view on small screens
      if (!isLarge) {
        setViewType('grilla');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  const toggleRiskFilter = (risk: RiskLevel) => {
    setSelectedRisks(prev => {
      if (prev.includes(risk)) {
        return prev.filter(r => r !== risk);
      } else {
        return [...prev, risk];
      }
    });
  };

  const isRiskSelected = (risk: RiskLevel) => selectedRisks.includes(risk);

  // Show all items if all options are selected or none are selected
  const effectiveRiskFilter = selectedRisks.length === 0 || selectedRisks.length === 3 ? 'todos' : selectedRisks;
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
        <Col>
          <Title level={2} style={{ margin: 0, fontSize: '24px', fontWeight: 500 }}>
            Carteras de inversión
          </Title>
        </Col>
        {isLargeScreen && (
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
        )}
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
                  backgroundColor: isRiskSelected('conservador') ? '#2c5aa0' : '#fff',
                  borderColor: isRiskSelected('conservador') ? '#2c5aa0' : '#d9d9d9',
                  color: isRiskSelected('conservador') ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid'
                }}
                onClick={() => toggleRiskFilter('conservador')}
              >
                Conservador
              </Tag>
              <Tag 
                style={{ 
                  borderRadius: 16, 
                  padding: '4px 16px', 
                  cursor: 'pointer',
                  backgroundColor: isRiskSelected('moderado') ? '#2c5aa0' : '#fff',
                  borderColor: isRiskSelected('moderado') ? '#2c5aa0' : '#d9d9d9',
                  color: isRiskSelected('moderado') ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid'
                }}
                onClick={() => toggleRiskFilter('moderado')}
              >
                Moderado
              </Tag>
              <Tag 
                style={{ 
                  borderRadius: 16, 
                  padding: '4px 16px', 
                  cursor: 'pointer',
                  backgroundColor: isRiskSelected('agresivo') ? '#2c5aa0' : '#fff',
                  borderColor: isRiskSelected('agresivo') ? '#2c5aa0' : '#d9d9d9',
                  color: isRiskSelected('agresivo') ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid'
                }}
                onClick={() => toggleRiskFilter('agresivo')}
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
            riskFilter={effectiveRiskFilter}
            onInvestmentConfirm={handleInvestmentConfirm}
          />
        </div>
      ) : (
        <div style={{ marginTop: '32px' }}>
          <InvestmentTable 
            riskFilter={effectiveRiskFilter}
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