import React from 'react';
import { Typography, Tag, Row, Col, Space, Divider, Button, Table } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';
import { getInvestmentData } from '../utils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import type { ColumnsType } from 'antd/es/table';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const { Title, Text, Paragraph } = Typography;

type RiskLevel = 'conservador' | 'moderado' | 'agresivo';

const InvestmentDetailSection: React.FC = () => {
  const navigate = useNavigate();
  const { investmentId } = useParams();


  const investment = investmentId ? getInvestmentData(investmentId) : null;

  if (!investment) {
    return (
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <Title level={2}>Inversión no encontrada</Title>
        <Button type="primary" onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </div>
    );
  }

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
        fees: '0.5% anual'
      },
      'Ahorro Plus': {
        minAmount: '$50.000',
        fees: '0.3% anual'
      },
      'Gestión MIX VI': {
        minAmount: '$100.000',
        fees: '1.2% anual'
      },
      'Cartera Renta $': {
        minAmount: '$250.000',
        fees: '1.5% anual'
      },
      'Bonos': {
        minAmount: '$500.000',
        fees: '2.0% anual'
      },
      'Cartera Renta Fija': {
        minAmount: '$1.000.000',
        fees: '1.8% anual'
      }
    };

    return details[title as keyof typeof details] || {
      minAmount: 'No especificado',
      fees: 'No especificado'
    };
  };

  const details = getInvestmentDetails(investment.title);

  const handleConfirmSelection = () => {
    console.log('Investment confirmed:', investment.title);
    // Here you would typically call an API to process the investment
    navigate('/');
  };

  const holdingsColumns: ColumnsType<any> = [
    {
      title: 'Símbolo',
      dataIndex: 'symbol',
      key: 'symbol',
      width: 100,
      render: (symbol: string) => (
        <Text strong style={{ color: '#2c5aa0' }}>{symbol}</Text>
      ),
    },
    {
      title: 'Empresa',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Text>{name}</Text>
      ),
    },
    {
      title: 'Participación',
      dataIndex: 'percentage',
      key: 'percentage',
      width: 120,
      render: (percentage: number) => (
        <Text strong>{percentage}%</Text>
      ),
      sorter: (a, b) => a.percentage - b.percentage,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
    },
  ];

  const getChartData = () => {
    const sortedHoldings = [...investment.holdings].sort((a, b) => b.percentage - a.percentage);
    const topFive = sortedHoldings.slice(0, 5);
    const others = sortedHoldings.slice(5);
    
    const labels = topFive.map(holding => holding.symbol);
    const data = topFive.map(holding => holding.percentage);
    
    if (others.length > 0) {
      const othersTotal = others.reduce((sum, holding) => sum + holding.percentage, 0);
      labels.push('Otros');
      data.push(othersTotal);
    }
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#2c5aa0',
            '#4472c4',
            '#5b9bd5',
            '#70ad47',
            '#ffc000',
            '#a5a5a5'
          ],
          borderWidth: 1,
          borderColor: '#fff',
        },
      ],
    };
  };

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  const getEvolutionChartData = () => {
    return {
      labels: investment.evolution.map(point => {
        const date = new Date(point.date);
        return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Evolución (%)',
          data: investment.evolution.map(point => point.percentage),
          borderColor: '#2c5aa0',
          backgroundColor: 'rgba(44, 90, 160, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: true,
          tension: 0.3,
        },
      ],
    };
  };

  const evolutionChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toFixed(2)}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Back Button */}
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: '24px', color: '#2c5aa0' }}
        onClick={() => navigate('/')}
      >
        Volver
      </Button>

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

      {/* Portfolio Evolution */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Evolución del Portafolio
        </Title>
        <div style={{ height: '300px', backgroundColor: '#fafafa', borderRadius: '8px', padding: '16px' }}>
          <Line data={getEvolutionChartData()} options={evolutionChartOptions} />
        </div>
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

      <Divider />

      {/* Holdings Section */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Composición de la Cartera
        </Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} lg={14}>
            <Table
              columns={holdingsColumns}
              dataSource={investment.holdings.map((holding, index) => ({
                ...holding,
                key: index
              }))}
              pagination={false}
              size="small"
              style={{ backgroundColor: '#fff' }}
            />
          </Col>
          <Col xs={24} lg={10}>
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pie data={chartData} options={chartOptions} />
            </div>
          </Col>
        </Row>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: 'center' }}>
        <Button 
          type="primary" 
          size="large"
          style={{ 
            backgroundColor: '#2c5aa0', 
            borderColor: '#2c5aa0',
            borderRadius: '20px',
            minWidth: '200px',
            height: '48px',
            fontSize: '16px'
          }}
          onClick={handleConfirmSelection}
        >
          Confirmar Selección
        </Button>
      </div>
    </div>
  );
};

export default InvestmentDetailSection;