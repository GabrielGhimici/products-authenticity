export const area = (data: Array<any>, labels: Array<any>) => {
  return {
    chart: {
      type: 'area',
      backgroundColor: '#F6F6F6'
    },
    title: {
      text: 'Information about search events by day'
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    xAxis: {
      categories: labels,
    },
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:,.0f}</b>'
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          symbol: 'circle',
          fillColor: 'white',
          lineColor: 'rgb(124, 181, 236)',
          lineWidth: 2,
          radius: 4,
          states: {
            hover: {
              enabled: true
            }
          }
        },
        lineWidth: 2,

      }
    },
    series: [{
      name: 'Searches',
      data
    }]
  } as any;
};

export const column = (data: Array<any>, additionalData: Array<any>, labels: Array<any>) => {
  return {
    chart: {
      type: 'column',
      backgroundColor: '#F6F6F6'
    },
    title: {
      text: 'Information about search events by day split by devices'
    },
    xAxis: {
      categories: labels
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'Web',
      data
    }, {
      name: 'Mobile',
      data: additionalData
    }]
  } as any;
};
