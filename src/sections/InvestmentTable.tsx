import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

type RiskLevel = 'conservador' | 'moderado' | 'agresivo';
type RiskFilterType = 'todos' | 'conservador' | 'moderado' | 'agresivo';

interface PerformanceData {
  period: string;
  percentage: string;
  isNegative?: boolean;
}

interface InvestmentData {
  key: string;
  id: string;
  title: string;
  riskLevel: RiskLevel;
  category: string;
  description: string;
  performance: PerformanceData[];
}

interface InvestmentTableProps {
  riskFilter: RiskFilterType;
  onInvestmentConfirm: (investment: Omit<InvestmentData, 'key'>) => void;
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

  const investmentData: InvestmentData[] = [
    {
      key: '1',
      id: 'ahorro',
      title: "Ahorro $",
      riskLevel: "conservador",
      category: "Alta liquidez",
      description: "Movilizá tu dinero hasta que lo necesites.",
      performance: [
        { period: "Semana", percentage: "0,10%" },
        { period: "Mes", percentage: "3,46%" },
        { period: "Trimestre", percentage: "8,19%" }
      ]
    },
    {
      key: '2',
      id: 'ahorro-plus',
      title: "Ahorro Plus",
      riskLevel: "conservador",
      category: "Alta liquidez",
      description: "Animate a más.",
      performance: [
        { period: "Semana", percentage: "0,12%" },
        { period: "Mes", percentage: "3,97%" },
        { period: "Trimestre", percentage: "8,82%" }
      ]
    },
    {
      key: '3',
      id: 'gestion-mix',
      title: "Gestión MIX VI",
      riskLevel: "moderado",
      category: "Renta Fija en Pesos",
      description: "Un pasito más para empezar a diversificar tu inversión.",
      performance: [
        { period: "Semana", percentage: "0,45%" },
        { period: "Mes", percentage: "4,19%" },
        { period: "Trimestre", percentage: "6,63%" }
      ]
    },
    {
      key: '4',
      id: 'cartera-renta',
      title: "Cartera Renta $",
      riskLevel: "moderado",
      category: "Renta Fija en Pesos",
      description: "Potencia tus ahorros.",
      performance: [
        { period: "Semana", percentage: "1,24%" },
        { period: "Mes", percentage: "3,41%" },
        { period: "Trimestre", percentage: "1,08%" }
      ]
    },
    {
      key: '5',
      id: 'bonos',
      title: "Bonos",
      riskLevel: "agresivo",
      category: "Renta Fija en Pesos",
      description: "Busca acompañar el tipo de cambio oficial.",
      performance: [
        { period: "Semana", percentage: "0,76%" },
        { period: "Mes", percentage: "6,94%" },
        { period: "Trimestre", percentage: "15,60%" }
      ]
    },
    {
      key: '6',
      id: 'cartera-renta-fija',
      title: "Cartera Renta Fija",
      riskLevel: "agresivo",
      category: "Renta Fija en Pesos",
      description: "Le da pelea a la inflación.",
      performance: [
        { period: "Semana", percentage: "1,68%" },
        { period: "Mes", percentage: "1,94%" },
        { period: "Trimestre", percentage: "-0,28%", isNegative: true }
      ]
    }
  ];

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

  const columns: ColumnsType<InvestmentData> = [
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
      render: (_, record: InvestmentData) => renderPerformance(record.performance),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 200,
      render: (_, record: InvestmentData) => (
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
              id: record.id,
              title: record.title,
              riskLevel: record.riskLevel,
              category: record.category,
              description: record.description,
              performance: record.performance
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
    : investmentData.filter(investment => investment.riskLevel === riskFilter);

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