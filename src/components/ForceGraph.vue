<template>
  <div>
    <div class="graph" ref="forcechartdiv" id="forcechartdiv"></div>
  </div>
</template>

<script>
//import events from "@/data/events.json";
import forcegraphdata from "@/data/forcegraphdata.json";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "ForceGraph",
  data: () => ({
    chart: "",
    series: null,
    events: null,
  }),
  methods: {
    compute: function () {
      var output = {};
      for (let i = 0; i < events.length; i++) {
        var event = events[i];

        var room;
        if (event.action == "joined" || event.action == "left")
          room = event.roomname;
        if (event.action == "moved") room = event.toroomname;

        if (!output[room]) {
          // check room existence
          output[room] = {};
          (output[room].name = room), (output[room].children = []);
          output[room].link = [];
        }
        if (event.action == "moved") output[room].link.push(event.fromroomname);

        var obj = JSON.parse(
          '{ "name": "' +
            escape(event.name) +
            '", "image": "' +
            event.avatar +
            '", "value": "1"}'
        );

        if (
          // avoid duplicates
          output[room].children
            .map(function (e) {
              return e.name;
            })
            .indexOf(escape(event.name)) == -1
        )
          output[room].children.push(obj);
      }

      this.series.data = Object.values(output);
      console.log(JSON.stringify(Object.values(output)));
    },
  },
  watch: {
    series: function (values) {
      this.chart.invalidateData();
      //this.series.data = values;
    },
    deep: true,
  },

  mounted() {

    am4core.options.onlyShowOnViewport = true;
    am4core.ready(() => {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      // =========FORCE DIRECTED
      this.chart = am4core.create(
        "forcechartdiv",
        am4plugins_forceDirected.ForceDirectedTree
      );
      var series = this.chart.series.push(
        new am4plugins_forceDirected.ForceDirectedSeries()
      );

      series.data = forcegraphdata;

      this.chart.zoomable = true;
      series.maxLevels = 1;
      series.dataFields.value = "value";
      series.dataFields.name = "name";
      series.dataFields.id = "name";
      series.dataFields.children = "children";
      series.dataFields.linkWith = "link";

      // Add labels
      //series.nodes.template.label.text = "{name}";
      series.nodes.template.label.adapter.add("text", function (text, target) {
        if (target.dataItem) {
          switch (target.dataItem.level) {
            case 0:
              return "[bold]{name}[/]";
            case 1:
              return "";
            case 2:
              return "";
          }
        }
        return text;
      });
      series.nodes.template.label.valign = "center";
      series.nodes.template.label.fill = am4core.color("#000");
      //series.nodes.template.label.dy = 10;
      series.nodes.template.tooltipText = "[bold]{name}[/]";
      series.fontSize = 10;
      // series.minRadius = 30;
      // series.maxRadius = 30;

      // Configure circles
      series.nodes.template.circle.disabled = false;

      // Configure icons
      var icon = series.nodes.template.createChild(am4core.Image);
      icon.propertyFields.href = "image";
      icon.horizontalCenter = "middle";
      icon.verticalCenter = "middle";
      // icon.circle.radius = am4core.percent(100);
      // icon.circle.strokeWidth = 0;
      icon.width = 50;
      icon.height = 50;

      series.centerStrength = 0.8;
      this.series = series;
    }); // end am4core.ready()
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graph {
  width: 100%;
  height: 500px;
}
</style>