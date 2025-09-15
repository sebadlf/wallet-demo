import React, { useState, useEffect } from 'react';
import { Typography, Tag, Row, Col, Space, Divider, Button, Table, Card, notification } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from 'react-router';
import { getInvestmentData } from '../utils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PerformanceChart from '../components/performance-chart/PerformanceChart';
import type { ColumnsType } from 'antd/es/table';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const { Title, Text, Paragraph } = Typography;

type RiskLevel = 'conservador' | 'moderado' | 'agresivo';

const InvestmentDetailSection: React.FC = () => {
  const navigate = useNavigate();
  const { investmentId } = useParams();
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [notificationApi, notificationContextHolder] = notification.useNotification();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 992); // Larger than lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


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

  const showSuccessNotification = () => {
    console.log('Show success notification!!!');
    notificationApi.success({
      message: 'Tu solicitud ha sido recibida',
      description: 'Un representante se pondrá en contacto contigo pronto para finalizar la selección de tu cartera.',
      duration: 6,
      placement: 'topRight',
    });
  };

  const handleConfirmSelection = () => {
    console.log('Investment confirmed:', investment.title);
    // Here you would typically call an API to process the investment
    showSuccessNotification();

    setTimeout(() => {
      navigate('/');
    }, 500);

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
            'rgba(44, 90, 160, 0.6)',
            'rgba(68, 114, 196, 0.6)',
            'rgba(91, 155, 213, 0.6)',
            'rgba(112, 173, 71, 0.6)',
            'rgba(255, 192, 0, 0.6)',
            'rgba(165, 165, 165, 0.6)'
          ],
          hoverBackgroundColor: [
            'rgba(44, 90, 160, 0.9)',
            'rgba(68, 114, 196, 0.9)',
            'rgba(91, 155, 213, 0.9)',
            'rgba(112, 173, 71, 0.9)',
            'rgba(255, 192, 0, 0.9)',
            'rgba(165, 165, 165, 0.9)'
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

  // Generate sample performance data based on evolution data
  const getPerformanceData = () => {
    const baseValue = 1000000; // Base value of 1M ARS
    return investment.evolution.map((point) => {
      const totalValue = baseValue * (1 + point.percentage / 100);
      return {
        date: point.date,
        pesos: totalValue * 0.7, // 70% in pesos
        dolares: (totalValue * 0.3) / 1200, // 30% in USD at ~1200 ARS/USD
        cotizacion: 1200 + Math.random() * 100, // Random exchange rate around 1200
        total: totalValue,
        porcentaje: point.percentage
      };
    });
  };

  const performanceData = getPerformanceData();

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Main Title with Back Arrow and Risk Tag */}
      <div style={{ marginBottom: '24px' }}>
        {isLargeScreen ? (
          <Row justify="space-between" align="middle">
            <Title level={2} style={{ margin: 0, fontSize: '24px', fontWeight: 500 }}>
              <ArrowLeftOutlined
                style={{
                  color: '#2c5aa0',
                  marginRight: '12px',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
                onClick={() => navigate('/')}
              />
              Detalle de cartera - <span style={{ color: '#2c5aa0' }}>{investment.title}</span>
            </Title>
            <Tag color={getRiskLevelColor(investment.riskLevel)} style={{ fontSize: '14px' }}>
              {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)}
            </Tag>
          </Row>
        ) : (
          <div>
            <Title level={2} style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 500 }}>
              <ArrowLeftOutlined
                style={{
                  color: '#2c5aa0',
                  marginRight: '12px',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
                onClick={() => navigate('/')}
              />
              Detalle de cartera
            </Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#2c5aa0', fontSize: '20px', fontWeight: 500 }}>
                {investment.title}
              </span>
              <Tag color={getRiskLevelColor(investment.riskLevel)} style={{ fontSize: '14px' }}>
                {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)}
              </Tag>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
      {notificationContextHolder}
        {/* Performance */}
        <div style={{ marginBottom: '16px' }}>
          {isLargeScreen ? (
            <Row gutter={[16, 16]}>
              {investment.performance.map((item, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card style={{ textAlign: 'center' }}>
                    <Text type="secondary" style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>
                      {item.period}
                    </Text>
                    <Space align="center" size={4}>
                      {item.isNegative ? (
                        <CaretDownOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                      ) : (
                        <CaretUpOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                      )}
                      <Text 
                        strong 
                        style={{ 
                          color: item.isNegative ? '#ff4d4f' : '#52c41a', 
                          fontSize: '22px'
                        }}
                      >
                        {item.percentage}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div>
              <Slider
                dots={false}
                infinite={false}
                speed={300}
                slidesToScroll={1}
                autoplay={true}
                arrows={false}
                responsive={[
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                    }
                  }
                ]}
              >
                {[...investment.performance].reverse().map((item, index) => (
                  <div key={index}>
                    <Card style={{ textAlign: 'center' }}>
                      <Text type="secondary" style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>
                        {item.period}
                      </Text>
                      <Space align="center" size={4}>
                        {item.isNegative ? (
                          <CaretDownOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                        ) : (
                          <CaretUpOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                        )}
                        <Text 
                          strong 
                          style={{ 
                            color: item.isNegative ? '#ff4d4f' : '#52c41a', 
                            fontSize: '22px'
                          }}
                        >
                          {item.percentage}
                        </Text>
                      </Space>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>

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

        <div style={{ backgroundColor: '#fafafa', borderRadius: '8px', padding: '16px' }}>
          <PerformanceChart data={performanceData} />
        </div>
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
          <Col xs={0} lg={10}>
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pie data={chartData} options={chartOptions} />
            </div>
          </Col>
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

      {/* Action Button */}
      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: '#2c5aa0',
            borderColor: '#2c5aa0'
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