var initData = [{
    name: 'Available',
    color: '#F7D674',
    data: [0],
    pointWidth: 28,
    showInLegend: false
}, {
    name: 'Storage Level',
    color: {
        linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
        },
        stops: [
            [0, '#0000E8'],
            [1, '#000']
        ]
    },
    data: [0],
    pointWidth: 28,
    showInLegend: false
}],
    chartid,
    chart;

function createCharts(index,capacity,histavg,cat) {
    initData[0].data = [capacity];
    chartid = '#flatdiv'+index;

    var maxlimit;
    if (capacity>900) //maxlimit set to 4600 to have a standard scale for comparison, if capacity is very less the maxlimit is adjust so that data is visible
        maxlimit = 4600;
    else
        maxlimit = 900;

    chart = $(chartid).highcharts({
        chart: {
            type: 'column',
            animation: Highcharts.svg,
            backgroundColor:'rgba(255, 255, 255, 0.2)',
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series1 = this.series[0];
                    var series2 = this.series[1];
                    setInterval(function () {
                        var x = Math.random() * capacity;
                        var y = capacity - x;

                        fillGauge(index, y, capacity);
                        var updateData = [{
                            name: 'Available',
                            data: [x]
                        }, {
                            name: 'Storage Level',
                            data: [y]
                        }];
                        series1.update(updateData[0], true);
                        series2.update(updateData[1], true);
                    }, 3000);

                }
            }
        },
        title: {
            text: false
        },
        xAxis: {
            categories: [cat],
            labels: {
                style: {
                    fontSize:'15px',
                    fontWeight: 'bold'
                }
            }
        },
        yAxis: {
            min: 0,
            max: maxlimit,
            title: {
                text: false
            },
            stackLabels: {
                enabled: false

            },
            plotLines:[{
                value:histavg,
                color: '#ff0000',
                width:2,
                zIndex:4,
                label:{text:'His Avg',
                       style : {color: '#ff0000'}
                      }
            }]
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: 'Capacity: {point.stackTotal:.2f}<br/>{series.name}: {point.y:.2f}'
        },
        plotOptions: {
            column: {
                stacking: 'normal', 
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        var pcnt = this.y;
                        return Highcharts.numberFormat(pcnt);
                    }
                }
            }
        },
        series: initData
    });
}

function fillGauge(index, y, capacity) {
    switch(index) {
        case 0: gauge0.update(Math.round((y/capacity)*100)); break;
        case 1: gauge1.update(Math.round((y/capacity)*100)); break;
        case 2: gauge2.update(Math.round((y/capacity)*100)); break;
        case 3: gauge3.update(Math.round((y/capacity)*100)); break;
        case 4: gauge4.update(Math.round((y/capacity)*100)); break;
        case 5: gauge5.update(Math.round((y/capacity)*100)); break;
        case 6: gauge6.update(Math.round((y/capacity)*100)); break;
        case 7: gauge7.update(Math.round((y/capacity)*100)); break;
        case 8: gauge8.update(Math.round((y/capacity)*100)); break;
        case 9: gauge9.update(Math.round((y/capacity)*100)); break;
        case 10: gauge10.update(Math.round((y/capacity)*100)); break;
        case 11: gauge11.update(Math.round((y/capacity)*100));
    }
}