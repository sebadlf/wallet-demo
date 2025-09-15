import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';
import { getAllInvestments } from '../utils';
import type { InvestmentData } from '../utils';

type RiskLevel = 'conservador' | 'moderado' | 'agresivo';
type RiskFilterType = 'todos' | RiskLevel[];

interface PerformanceData {
  period: string;
  percentage: string;
  isNegative?: boolean;
}

interface TableInvestmentData extends InvestmentData {
  key: string;
  id: string;
}

interface InvestmentTableProps {
  riskFilter: RiskFilterType;
  onInvestmentConfirm: (investment: InvestmentData) => void;
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({ riskFilter, onInvestmentConfirm }) => {
  const navigate = useNavigate();
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

  // Get all investment data from utils and add keys for table
  const investmentData: TableInvestmentData[] = getAllInvestments().map((investment, index) => ({
    ...investment,
    key: (index + 1).toString()
  }));

  const renderPerformance = (performance: PerformanceData[]) => {
    return (
      <Space size="large">
        {performance.map((item, index) => (
          <div key={index} style={{ textAlign: 'center', minWidth: '60px' }}>
            <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)', marginBottom: '4px' }}>
              {item.period}
            </div>
            <Space align="center" size={2}>
              {item.isNegative ? (
                <CaretDownOutlined style={{ color: '#ff4d4f', fontSize: 10 }} />
              ) : (
                <CaretUpOutlined style={{ color: '#52c41a', fontSize: 10 }} />
              )}
              <span 
                style={{ 
                  color: item.isNegative ? '#ff4d4f' : '#52c41a', 
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                {item.percentage}
              </span>
            </Space>
          </div>
        ))}
      </Space>
    );
  };

  const columns: ColumnsType<TableInvestmentData> = [
    {
      title: 'Inversión',
      dataIndex: 'title',
      key: 'title',
      width: 180,
      render: (title: string) => (
        <div style={{ 
          fontWeight: 600, 
          fontSize: '16px', 
          color: '#2c5aa0'
        }}>
          {title}
        </div>
      ),
    },
    {
      title: 'Perfil de Riesgo',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 140,
      render: (riskLevel: RiskLevel) => (
        <Tag color={getRiskLevelColor(riskLevel)}>
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (description: string) => (
        <span style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)' }}>
          {description}
        </span>
      ),
    },
    {
      title: 'Rendimientos',
      key: 'performance',
      width: 280,
      render: (_, record: TableInvestmentData) => renderPerformance(record.performance),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 200,
      render: (_, record: TableInvestmentData) => (
        <Space>
          <Button 
            type="text" 
            style={{ color: '#2c5aa0' }}
            onClick={() => navigate(`/investment/${record.id}`)}
          >
            Abrir detalle
          </Button>
          <Button 
            type="primary"
            style={{ 
              backgroundColor: '#2c5aa0', 
              borderColor: '#2c5aa0',
              borderRadius: '20px'
            }}
            onClick={() => onInvestmentConfirm({
              title: record.title,
              riskLevel: record.riskLevel,
              description: record.description,
              performance: record.performance,
              holdings: [],
              evolution: []
            })}
          >
            Seleccionar
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = riskFilter === 'todos' 
    ? investmentData 
    : investmentData.filter(investment => 
        Array.isArray(riskFilter) 
          ? riskFilter.includes(investment.riskLevel)
          : investment.riskLevel === riskFilter
      );

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={false}
      size="large"
      style={{ backgroundColor: '#fff' }}
      rowClassName={() => 'investment-table-row'}
    />
  );
};

export default InvestmentTable;