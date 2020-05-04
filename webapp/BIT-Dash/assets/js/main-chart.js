$(function () {
  "use strict";
  var chart2 = new Chartist.Bar(
    ".amp-pxl",
    {
      labels: [
        "Passion",
        "Perseverance",
        "Conscientiousness",
		"Resilience",
		"Courage"
      ],
      series: [
        [90, 50, 73, 77, 56],
        [60, 63, 79, 65, 84],
      ],
    },
    {
      axisX: {
        // On the x-axis start means top and end means bottom
        position: "end",
        showGrid: false,
      },
      axisY: {
        // On the y-axis start means left and end means right
        position: "start",
      },
      high: "100",
      low: "0",
      plugins: [Chartist.plugins.tooltip()],
    }
  );

  var chart = [chart2];

  for (var i = 0; i < chart.length; i++) {
    chart[i].on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 500 * data.index,
            dur: 500,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeInOutElastic,
          },
        });
      }
      if (data.type === "bar") {
        data.element.animate({
          y2: {
            dur: 500,
            from: data.y1,
            to: data.y2,
            easing: Chartist.Svg.Easing.easeInOutElastic,
          },
          opacity: {
            dur: 500,
            from: 0,
            to: 1,
            easing: Chartist.Svg.Easing.easeInOutElastic,
          },
        });
      }
    });
  }

  var chart = c3.generate({
    bindto: "#scores",
    data: {
      columns: [
        ["Passion", 70],
        ["Perseverance", 80],
        ["Conscientiousness", 40],
        ["Resilience", 50],
        ["Courage", 50],
      ],

      type: "donut",
    },
    donut: {
      label: {
        show: false,
      },
      title: "BIT Score: 78/100",
      width: 20,
    },

    legend: {
      hide: false,
      //or hide: 'data1'
      //or hide: ['data1', 'data2']
    },
    color: {
      pattern: ["#ada1ff", "#8576e8", "#6a54f7", "#bb00ff", "#32aef0"],
    },
  });
});

$(".progress-pie-chart").each(function ($ppc) {
  var $ppc = $(this),
    percent = parseInt($ppc.data("percent")),
    deg = (360 * percent) / 100;
  if (percent > 50) {
    $ppc.addClass("gt-50");
  }
  $( this ).find(".ppc-progress-fill").css("transform", "rotate(" + deg + "deg)");
  $( this ).find(".ppc-percents span").html(percent + "%");
});
