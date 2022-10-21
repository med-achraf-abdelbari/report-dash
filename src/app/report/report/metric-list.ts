export let FINANCIAL_METRIC_LIST: { metricTitle: string, type: string, MetricObj: any }[] = [
    {
        metricTitle: 'BUSINESS PERFORMANCE',
        type: 'chart',
        MetricObj: {
            colors: ['#486076', '#536a80', '#c9d1d6'],
            fill: {
                colors: ['#486076', '#536a80', '#c9d1d6'],
            },
            series: [
                {
                    name: 'My-series',
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                }
            ],
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: false
                    }
                },
                tooltip: {
                    show: false
                },
                height: 350,
                type: 'bar'
            },
            title: {
                text: 'My First Angular Chart'
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
            }
        }
    },
    {
        metricTitle: 'REVENUE RETENTION',
        type: 'chart',
        MetricObj: {
            series: [44, 55, 13, 43, 22],
            colors: ['#486076', '#536a80', '#c9d1d6'],
            fill: {
                colors: ['#486076', '#536a80', '#c9d1d6'],
            },
            toolbar: {
                show: false
            },
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: false
                    }
                },
                type: 'donut'
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            toolbar: {
                                show: true,
                                tools: {
                                    download: false
                                }
                            },
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        }
    },
    {
        metricTitle: 'MARKET GROWTH',
        type: 'chart',
        MetricObj: {
            series: [
                {
                    name: 'TEAM A',
                    type: 'column',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                },
                {
                    name: 'TEAM B',
                    type: 'area',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
                },
                {
                    name: 'TEAM C',
                    type: 'line',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
                }
            ],
            colors: ['#486076', '#536a80', '#c9d1d6'],
            chart: {
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
                height: 350,
                type: 'line',
                stacked: false
            },
            stroke: {
                width: [0, 2, 5],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%'
                }
            },

            fill: {
                colors: ['#486076', '#536a80', '#c9d1d6'],
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: 'vertical',
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100]
                }
            },
            labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003'
            ],
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                title: {
                    text: 'Points'
                },
                min: 0
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== 'undefined') {
                            return y.toFixed(0) + ' points';
                        }
                        return y;
                    }
                }
            }
        }
    },
    {
        metricTitle: 'MARKET SIZE',
        type: 'chart',
        MetricObj: {
            series: [
                {
                    name: 'Bubble1',
                    data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
                        min: 10,
                        max: 60
                    })
                },
            ],
            colors: ['#486076', '#536a80', '#c9d1d6'],
            chart: {
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
                height: 350,
                type: 'bubble'
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 0.8,
                colors: ['#486076', '#536a80', '#c9d1d6'],
            },
            title: {
                text: 'Simple Bubble Chart'
            },
            xaxis: {
                tickAmount: 12,
                type: 'category'
            },
            yaxis: {
                max: 70
            }
        }
    },
    {
        metricTitle: 'FINANCIAL PERFORMANCE',
        type: 'chart & table',
        MetricObj: {
            series: [
                {
                    name: 'Income',
                    type: 'column',
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                },
                {
                    name: 'Cashflow',
                    type: 'column',
                    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
                },
                {
                    name: 'Revenue',
                    type: 'line',
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                }
            ],
            colors: ['#486076', '#536a80', '#c9d1d6'],
            fill: {
                colors: ['#486076', '#536a80', '#c9d1d6'],
            },
            chart: {
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
                height: 350,
                type: 'line',
                stacked: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 4]
            },
            title: {
                text: 'XYZ - Stock Analysis (2009 - 2016)',
                align: 'left',
                offsetX: 110
            },
            xaxis: {
                categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB'
                    },
                    labels: {
                        style: {
                            color: '#008FFB'
                        }
                    },
                    title: {
                        text: 'Income (thousand crores)',
                        style: {
                            color: '#008FFB'
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: 'Income',
                    opposite: true,
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            color: '#00E396'
                        }
                    },
                    title: {
                        text: 'Operating Cashflow (thousand crores)',
                        style: {
                            color: '#00E396'
                        }
                    }
                },
                {
                    seriesName: 'Revenue',
                    opposite: true,
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019'
                    },
                    labels: {
                        style: {
                            color: '#FEB019'
                        }
                    },
                    title: {
                        text: 'Revenue (thousand crores)',
                        style: {
                            color: '#FEB019'
                        }
                    }
                }
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                }
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            },
            columns: [
                {
                    title: 'Cost of Goods Sold',
                    value: ''
                },
                {
                    title: 'Monthly Recurring Revenue',
                    value: ''
                },
                {
                    title: 'Total Debt',
                    value: ''
                },
                {
                    title: 'Turnover to Staff',
                    value: ''
                },
                {
                    title: 'Promotion to Sales',
                    value: ''
                },
                {
                    title: 'Compound Annual Growth Rate (revenues)',
                    value: ''
                },
                {
                    title: 'Gross Margin Growth (3 years)',
                    value: ''
                },
            ]
        }
    },
    {
        metricTitle: 'CASH & OPERATION',
        type: 'table',
        MetricObj: {
            columns: [
                {
                    title: 'Cash and cash equivalent',
                    value: ''
                },
                {
                    title: 'Net Cash',
                    value: ''
                },
                {
                    title: 'Monthly Burn Rate',
                    value: ''
                },
                {
                    title: 'Net Burn Rate',
                    value: ''
                },
                {
                    title: 'Runway',
                    value: ''
                },
            ]
        }
    },
    {
        metricTitle: 'MARKETING PERFORMANCE',
        type: 'table',
        MetricObj: {
            columns: [
                {
                    title: 'New Revenue per Marketing Spend',
                    value: 'Test Value'
                },
                {
                    title: 'Net LTV/CAC',
                    value: ''
                },
                {
                    title: 'Marketing Efficiency',
                    value: ''
                },
                {
                    title: 'Retained Revenue',
                    value: ''
                },
            ]
        }
    },
];

function generateData(baseval, count, yrange) {
    let i = 0;
    const series = [];
    while (i < count) {
        const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
        const y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}
