<template>
    <div>
        <p style="text-align:left; margin:0;">
          <el-button type="primary" size="mini" @click="printBtn()">打印</el-button>
        </p>
        <div id="print">
              <h3>个人信息表</h3>
               <!--  <div class="biaotou">
                    <p>医疗机构名称：<span>{{medicalText.hospitalName}}</span></p>
                    <p>医疗机构级别：<span>{{medicalText.hospitalGrade}}</span></p>
                </div> -->
                <table class="ta" border="1" cellspacing="0" cellpadding="1" style="margin: auto">
                    <!--<tr>
                        <td>医疗机构名称（盖章）：</td>
                        <td colspan="2"></td>
                        <td>医疗机构级别：</td>
                        <td></td>
                        <td>结算日期：</td>
                        <td colspan="2"></td>
                    </tr>-->
                    <tr align='center'>
                        <td>姓名</td>
                        <td>{{issueData.xm}}</td>
                        <td>性别</td>
                        <td>{{issueData.xb==1?"男":"女"}}</td>
                         <td>出生日期</td>
                        <td>{{issueData.csrq}}</td>
                       <!--  <td>年龄</td>
                        <td>{{issueData.nl}}</td> -->
                         <td>民族</td>
                        <td>{{issueData.mz=='01'?"汉族":"其他"}}</td>              
                    </tr>
                    <tr align='center'>
                      <td>电话号码</td>
                        <td>{{issueData.dh}}</td>
                       <td>身份证号</td>
                        <td>{{issueData.sfzh}}</td>
                        <td>职业</td>
                        <td>{{issueData.zydm}}</td> 
                          <td>婚姻状况</td>
                        <td>{{issueData.hyzk}}</td>                       
                    </tr>
                    <tr align='center'>
                        <td>病案号</td>
                        <td>{{issueData.bah}}</td>
                         <td>付款方式</td>
                        <td>{{issueData.ylfkfs}}</td>
                        <td>住院总费用</td>
                        <td>{{issueData.zfy}}</td>
                         <td>自付费用</td>
                        <td>{{issueData.qzzfje}}</td>
                    </tr>
                    <tr align='center'>
                        <!-- <td>诊断</td>
                        <td colspan="3">{{issueData.zyzd}}</td> -->
                        <td>入院途径</td>
                        <td>{{issueData.rytj}}</td>
                         <td>入院日期</td>
                        <td>{{issueData.ryrq}}</td>
                        <td>出院日期</td>
                        <td>{{issueData.cyrq}}</td>   
                        <!-- <td>出院病房</td>
                        <td>{{issueData.cybf}}</td> -->
                       <!--  <td>住院总费用</td>
                        <td>{{issueData.zfy}}</td> -->
                        <td>住院次数</td>
                        <td>{{issueData.zycs}}</td>
                    </tr>
                    <tr align='center'>
                        <td>门急诊诊断</td>
                        <td>{{issueData.mjzzd}}</td>
                         <td>疾病编码</td>
                        <td>{{issueData.jbdm}}</td>           
                        <td>离院方式</td>
                        <td>{{issueData.lyfs}}</td>
                        <td>住院天数</td>
                        <td>{{issueData.zyts}}</td>
                    </tr>
                    <tr align='center'>
                        <td>出院时主要诊断</td>
                        <td>{{issueData.cyszyzd}}</td>
                         <td>出院时其他诊断</td>
                        <td colspan="2">{{issueData.cysqtzd}}</td>           
                        <td>入院病情</td>
                        <td colspan="2">{{issueData.rybq}}</td>
                        
                    </tr>
                     <tr align='center'>
                        <td>综合医疗服务费</td>
                        <td>{{issueData.zhylfwl}}</td>
                         <td>一般医疗服务费</td>
                        <td>{{issueData.ybylfwf}}</td>           
                        <td>一般治疗操作费</td>
                        <td>{{issueData.ybzlczfy}}</td>
                        <td>护理费</td>
                        <td>{{issueData.hlf}}</td>
                    </tr>
                     <tr align='center'>           
                        <td colspan="3">非手术治疗项目费</td>
                        <td>{{issueData.fsszlxmf}}</td>
                        <td colspan="3">手术治疗费</td>
                        <td>{{issueData.sszlf}}</td>
                    </tr>
                     <tr align='center'>
                        <td>西药费</td>
                        <td>{{issueData.xyf}}</td>
                         <td>抗菌药物费用</td>
                        <td>{{issueData.kjywfy}}</td>           
                        <td>中成药费</td>
                        <td>{{issueData.zcyfy}}</td>
                        <td>中草药费</td>
                        <td>{{issueData.zcyf}}</td>
                    </tr>
                    
                   <!--  <tr>
                        <td colspan="8">&nbsp;&nbsp;&nbsp;&nbsp;经中心审核，此病人住院病例存在以下问题：</td>
                    </tr>
                    <tr align='center'>
                        <td>序号</td>
                        <td>项目名称</td>
                        <td colspan="2">违规问题</td>
                        <td colspan="2">审核规则</td>
                        <td>违规金额（元）</td>
                        <td>异常个数</td>
                    </tr>
                    <tr align='center' v-for="(item,index) in issueData" :key="index">
                        <td style="width:50px;">{{index+1}}</td>
                        <td>{{item.itemName}}</td>
                        <td colspan="2">{{item.message}}</td>
                        <td colspan="2">{{item.type}}</td>
                        <td>{{item.amount}}</td>
                        <td>{{item.sum}}</td>
                    </tr> -->
                </table>
                <br>
                <br>
        </div>
        <!-- <button  @click="printBtn()">打 印</button> -->
    </div>
    
</template>



<script>
import axios from "axios";
export default {
  name: "Medical",
  props: ["medicalText"],
  data() {
    return {
      issueData: [],
      day: ""
    };
  },
  methods: {
    //获取异常信息列表
    getMedical() {
      axios({
        method: "post",
        url: axios.PARK_API + "/guar/biz/health/queryn041Info",
        params: {
          //   orderId: "74ddedfc-fcf0-40e8-bfc6-3653e0fd9d13"
          bah: this.medicalText.bah,
          hosgrade: localStorage.getItem("hosgrade")
        }
        /*  headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.issueData = res.data.data;
            console.log(this.issueData.lyfs);
            //离院方式
            switch (this.issueData.lyfs) {
              case "1":
                this.issueData.lyfs = "医嘱离院";
                break;
              case "2":
                this.issueData.lyfs = "医嘱转院";
                break;
              case "3":
                this.issueData.lyfs = "医嘱转社区卫生服务机构/乡镇卫生院";
                break;
              case "4":
                this.issueData.lyfs = "非医嘱离院";
                break;
              case "5":
                this.issueData.lyfs = "死亡";
                break;
              default:
                this.issueData.lyfs = "其他";
                break;
            }
            //入院途径
            switch (this.issueData.rytj) {
              case "1":
                this.issueData.rytj = "急诊";
                break;
              case "2":
                this.issueData.rytj = "门诊";
                break;
              case "3":
                this.issueData.rytj = "其他医疗机构转入";
                break;
              default:
                this.issueData.rytj = "其他";
                break;
            }
            //付款方式
            switch (this.issueData.ylfkfs) {
              case "01":
                this.issueData.ylfkfs = "城镇职工基本医疗保险";
                break;
              case "02":
                this.issueData.ylfkfs = "城镇居民基本医疗保险";
                break;
              case "03":
                this.issueData.ylfkfs = "新型农村合作医疗";
                break;
              case "04":
                this.issueData.ylfkfs = "贫困救助";
                break;
              case "05":
                this.issueData.ylfkfs = "商业医疗保险";
                break;
              case "06":
                this.issueData.ylfkfs = "全公费";
                break;
              case "07":
                this.issueData.ylfkfs = "全自费";
                break;
              case "08":
                this.issueData.ylfkfs = "其他社会保险";
                break;
              default:
                this.issueData.ylfkfs = "其他";
                break;
            }
            //职业
            switch (this.issueData.zydm) {
              case "11":
                this.issueData.zydm = "国家公务员";
                break;
              case "13":
                this.issueData.zydm = "专业技术人员";
                break;
              case "17":
                this.issueData.zydm = "职员";
                break;
              case "21":
                this.issueData.zydm = "企业管理人员";
                break;
              case "24":
                this.issueData.zydm = "工人";
                break;
              case "27":
                this.issueData.zydm = "农民";
                break;
              case "31":
                this.issueData.zydm = "学生";
                break;
              case "37":
                this.issueData.zydm = "现役军人";
                break;
              case "51":
                this.issueData.zydm = "自由职业者";
                break;
              case "54":
                this.issueData.zydm = "个体经营者";
                break;
              case "70":
                this.issueData.zydm = "无业人员";
                break;
              case "80":
                this.issueData.zydm = "退(离)休人员";
                break;
              default:
                this.issueData.zydm = "其他";
                break;
            }
            //婚姻状况
            switch (this.issueData.hyzk) {
              case "10":
                this.issueData.hyzk = "未婚";
                break;
              case "20":
                this.issueData.hyzk = "已婚";
                break;
              case "30":
                this.issueData.hyzk = "丧偶";
                break;
              case "40":
                this.issueData.hyzk = "离婚";
                break;
              case "90":
                this.issueData.hyzk = "其他";
                break;
            }
            //入院病情
             switch (this.issueData.rybq) {
              case "1":
                this.issueData.rybq = "有";
                break;
              case "2":
                this.issueData.rybq = "临床未确认";
                break;
              case "3":
                this.issueData.rybq = "情况不明";
                break;
              case "4":
                this.issueData.rybq = "无";
                break;
             
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    //打印表格数据
    printBtn() {
      let subOutputRankPrint = document.getElementById("print");
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    //计算时间相差天数
    timeFn() {
      //di作为一个变量传进来
      //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
      var dateEnd = new Date(this.medicalText.outDate.replace(/-/g, "/")); //将-转化为/，使用new Date
      var dateBegin = new Date(this.medicalText.inDate.replace(/-/g, "/")); //获取当前时间
      console.log(dateBegin);
      console.log(dateEnd);
      var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      this.day = dayDiff;
      var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      console.log(
        " 相差 " +
          dayDiff +
          "天 " +
          hours +
          "小时 " +
          minutes +
          " 分钟" +
          seconds +
          " 秒"
      );
      console.log(
        dateDiff + "时间差的毫秒数",
        dayDiff + "计算出相差天数",
        leave1 + "计算天数后剩余的毫秒数",
        hours + "计算出小时数",
        minutes + "计算相差分钟数",
        seconds + "计算相差秒数"
      );
    }
  },
  created() {
    this.getMedical();
    // this.timeFn();
  }
};
</script>



<style scoped>
h3 {
  /* margin-left: 44%;
  margin-bottom: 0; */
  margin: 0;
  padding: 0;
  text-align: center;
}
.ta td {
  width: 100px;
  height: 30px;
}
/*.ta tr:first-of-type td{
				border: 1px solid #fff;
			}*/
.biaotou {
  text-align: center;
}
.biaotou p {
  margin-left: 8%;
  display: inline-block;
}
.biaotou p:first-of-type {
  /* margin-left: 16%; */
}
</style>
