<template>
  <div class="content charts_box">
    <div class="charts_banner" id="chinaMap"></div>
  </div>
</template>

<script>
import d from "@/config/staticData.js";
var echarts = require('echarts/lib/echarts');
require("echarts/lib/chart/candlestick");
require("echarts/lib/chart/line");
require("echarts/lib/chart/map");
require("echarts/lib/chart/effectScatter");
require("echarts/lib/chart/lines");
import china from "echarts/map/json/china.json";
console.log(china)
echarts.registerMap("china", china);
export default {
  mounted() {
    this.$nextTick(() => {
      this.renderMap();
    });
  },
  methods: {
    renderMap() {
      console.log(d.geoCood)
      let dom = document.getElementById("chinaMap");
      let map = echarts.init(dom);
      console.log(this.getMapOpt())
      map.setOption(this.getMapOpt(), true);
    },
    getMapOpt(place) {
      return {
        backgroundColor: "",
        tooltip: {
          trigger: "item"
          //   formatter: s => {
          //     let list = this.chinaMapData
          //       .filter(x => {
          //         return x.province === s.data.province;
          //       })
          //       .map(
          //         y =>
          //           '<span style="fontSize:12px;color:#3ec8f1">' +
          //           y.organizationName +
          //           "</span>" +
          //           "<br />"
          //       );
          //     return list.toString().replace(/,/g, "");
          //   }
        },
        series: [
          {
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 3,
              trailLength: 0.8,
              color: "#3ec8f1",
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: "#3ec8f1",
                width: 0,
                curveness: 0.2
              }
            },
            
            data: d.geoCood.map(x=>{
                return{
                    coords:[x.value, [105.87, 50.28]]
                }
            })  
          },
          {
            name: "机构",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: d.geoCood.map((x)=>{
                return {
                name:x.name,
                value:[...x.value,30]
            }}),
            encode: {
              value: 3
            },
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              scale: 3
            },
            // hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
                fontWeight: 100,
                fontFamily: "monospace"
              }
              // emphasis: {
              //   color: "#f4e925",
              //   formatter: "{b}",
              //   position: "right",
              //   // fontSize:16,
              //   fontWeight: "bold",
              //   show: true
              // }
            },
            //"#3ec8f1",
            itemStyle: {
              normal: {
                color: "#3ec8f1"
                // shadowBlur: 5,
                // shadowColor: "#333",
                // transform: "rotateX(-45deg)"
              }
              // emphasis: {
              //   color: "#f4e925",
              //   shadowBlur: 5,
              //   shadowColor: "#f4e925"
              // }
            },

            zlevel: 1
          }
        ],
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#326B74",
              borderColor: "#131414",
              borderWidth: 1.5,
              opacity: 0.5
            },
            emphasis: {
              areaColor: "#21A0A6"
            }
          }
        }
      };
    }
  }
};
</script>

<style lang='scss'>
.charts_box {
  overflow-y: auto;
  .charts_banner {
    height: 350px;
    width: 100%;
  }
}
</style>