<template>
    <div id="app">

        <div class="header">
            <p>定点医院智能服务平台</p>
            <!-- <span v-text="userName"></span> -->
            <!-- <span @click="loginOut">退出</span> -->
           <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                管理员<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="password">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="filetitle">修改医院名</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
               
              </el-dropdown-menu>
            </el-dropdown>
        </div>
       
        <nav>
            <ul class="nav">

                <li class="routerNav el-icon-share"   @click="hospitalshow(1)">国家卫生统计网络直报
                  <el-collapse-transition>
                     <ul class="navlist" v-show="hospital">
                        <!-- <router-link v-show="nav.hospitalizationExamine" to="/hospitalizationExamine"><li>审核</li></router-link> -->
                        <router-link v-show="nav.HospitalizationInquiry" to="/HospitalizationInquiry"><li>病案首页上报</li></router-link>
                        <!-- <router-link v-show="nav.HospitalizationReexamine" to="/HospitalizationReexamine"><li>复审</li></router-link> -->
                      </ul>
                  </el-collapse-transition>
                </li>
               <!--  <li class="routerNav el-icon-document"   @click="hospitalshow(2)">住院报表
                  <el-collapse-transition>
                     <ul class="navlist" v-show="hospitalAnay">
                         <router-link v-show="nav.inquiryEnd"  to="/inquiryEnd"><li>审核结果分析</li></router-link>
                         <router-link v-show="nav.foultrend"  to="/foultrend"><li>违规趋势分析</li></router-link>
                         <router-link v-show="nav.foul"       to="/foul"><li>违规统计</li></router-link>
                         <router-link v-show="nav.Comprehen" to="/Comprehen"><li>综合分析</li></router-link>
                         <router-link v-show="nav.medical"  to="/medical"><li>病案科室</li></router-link>
                         <router-link v-show="nav.payment"  to="/payment"><li>扣款通知单</li></router-link>
                      </ul>
                   </el-collapse-transition>
                </li>

                <li class="routerNav el-icon-edit-outline"   @click="hospitalshow(5)" v-show="dataAll">数据统计
                  <el-collapse-transition>
                     <ul class="navlist" v-show="dataAnay">
                         <router-link v-show="nav.datacount"  to="/datacount"><li>诊断方案统计分析</li></router-link> 
                      </ul>
                   </el-collapse-transition>
                </li>

                 
                <li class="routerNav el-icon-share"   @click="hospitalshow(3)">门诊系统
                  <el-collapse-transition>
                      <ul class="navlist" v-show="clinic">
                        <router-link v-show="nav.clinicExamine" to="/clinicExamine"><li>审核</li></router-link>
                        <router-link v-show="nav.clinicInquiry" to="/clinicInquiry"><li>质询</li></router-link>
                        <router-link v-show="nav.clinicReexamine" to="/clinicReexamine"><li>复审</li></router-link>
                      </ul>
                  </el-collapse-transition>
                </li>
                 <li class="routerNav el-icon-document"   @click="hospitalshow(4)" v-show="clinicExcel">门诊报表
                   <el-collapse-transition>
                        <ul class="navlist" v-show="clinicAnay">
                     
                          <router-link to="/cliInquiryEnd"><li>审核结果分析</li></router-link>
                          <router-link to="/cliFoultrend"><li>违规趋势分析</li></router-link>
                          <router-link to="/cliFoul"><li>违规统计</li></router-link>
                          <router-link to="/cliComprehen"><li>综合分析</li></router-link>                      
                        </ul>
                     </el-collapse-transition>
                </li>      -->
            </ul>
        </nav>
        <router-view class="routerView"></router-view>
    </div>
</template>
<!--数据统计-->
<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      nav: {
        HospitalizationInquiry: true,
       
      },
      //菜单按钮改变颜色
      clickColor: 0,
      // hospitalExcel: true,
      clinicExcel: true,
      dataAll:true,
      list: [],
      userName: "",
      limit: "",
      hospital: false,
      hospitalAnay: false,
      clinic: false,
      clinicAnay: false,
      dataAnay: false,
      home: ""
    };
  },
  created() {
    // this.getLogin();
    this.getInfor();
    this.getUserName();
  },
  methods: {
    loginOut() {
      // console.log("ok");
      axios({
        method: "post",
        url: axios.PARK_API + "/sys-mgr/sys/logout",
        /*   params: {
           token: localStorage.getItem("token")
        } */
        /*  data: {
          token: localStorage.getItem("token")
        }, */
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            localStorage.removeItem("token");
            localStorage.removeItem("navList");
            localStorage.removeItem("limited");
            this.$router.push({ path: "/login" });
       
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    },
    // 下拉菜单的显示与隐藏
    hospitalshow(i) {
      if (i == 1) {
        this.hospital = !this.hospital;
        this.hospitalAnay = false;
        this.clinic = false;
        this.clinicAnay = false;
        this.dataAnay = false;
      } else if (i == 2) {
        this.hospitalAnay = !this.hospitalAnay;
        this.hospital = false;
        this.clinic = false;
        this.clinicAnay = false;
        this.dataAnay = false;
      } else if (i == 3) {
        this.clinic = !this.clinic;
        this.hospital = false;
        this.hospitalAnay = false;
        this.clinicAnay = false;
        this.dataAnay = false;
      } else if (i == 4) {
        this.clinicAnay = !this.clinicAnay;
        this.hospital = false;
        this.hospitalAnay = false;
        this.clinic = false;
        this.dataAnay = false;
      } else if (i == 5) {
        this.dataAnay = !this.dataAnay;
        this.hospital = false;
        this.hospitalAnay = false;
        this.clinic = false;
        this.clinicAnay = false;
      }
    },

   
    getInfor() {
      if (
        localStorage.getItem("token") == "" ||
        localStorage.getItem("token") == undefined
      ) {
        this.$router.push({ path: "/login" });
      }
    },
   
    //跳转至修改密码页面
    password() {
      this.$router.push({ path: "/password" });
    },
    filetitle() {
      this.$router.push({ path: "/filetitle" });
    },
    // 判断医院/合疗办
    getLogin() {
      this.limit = localStorage.getItem("limited");
      if (this.limit == "1") {
        this.nav.hospitalizationExamine = true;
        this.nav.HospitalizationInquiry = true;
        this.nav.HospitalizationReexamine = true;
        this.nav.clinicExamine = true;
        this.nav.clinicInquiry = true;
        this.nav.clinicReexamine = true;
        this.nav.inquiryEnd = true;
        this.nav.foultrend = true;
        this.nav.foul = true;
        this.nav.Comprehen = true;
        this.nav.medical = false;
        this.nav.payment = true;
        this.clinicExcel = true;
        this.dataAll = true;
      } else if (this.limit == "2") {
        this.$router.push({ path: "/HospitalizationInquiry" });
        this.nav.hospitalizationExamine = false;
        this.nav.HospitalizationInquiry = true;
        this.nav.HospitalizationReexamine = false;
        this.nav.clinicExamine = false;
        this.nav.clinicInquiry = true;
        this.nav.clinicReexamine = false;
        this.nav.inquiryEnd = false;
        this.nav.foultrend = false;
        this.nav.foul = false;
        this.nav.Comprehen = false;
        this.nav.medical = true;
        this.nav.payment = false;
        this.clinicExcel = false;
        this.dataAll = true;
      }
    },
    // 获取用户名
    getUserName() {
      this.userName = localStorage.getItem("userName");
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #551a8b;
}
.header p span {
  font-size: 16px;
  color: #e4efff;
}
.header {
  width: 100%;
  background: #607190;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  color: white;
  position: relative;
}
.header p {
  line-height: 50px;
  margin: 0;
  text-align: center;
  width: 500px;
  position: absolute;
  left: calc(50% - 250px);
}
.header span:nth-child(2) {
  position: absolute;
  right: 15%;
  line-height: 50px;
  font-size: 14px;
}

.header span:nth-child(3) {
  cursor: pointer;
  position: absolute;
  right: 20px;
  font-size: 14px;
  line-height: 50px;
}

.nav {
  display: flex;
  justify-content: space-around;
  background: #e4efff;
  border-bottom: 1px solid #c2d3f1;
  height: 34px;
  /* height: 30px; */
  margin: 0;
}

.routerView {
  width: 100%;
  /* width: calc(100% - 60px);. */
  /* height: 1000px; */
}

.routerNav {
  width: 12%;
  height: 28px;
  /* height: 25px; */
  margin-top: 2px;
  text-align: center;
  font-size: 12px;
  line-height: 25px;
  /* border-top-left-radius: 5px;
  border-top-right-radius: 5px; */
  border: 1px solid #c2d3f1;
  border-bottom: 0;
  cursor: pointer;
  color: black;
  border-radius: 8px;
  background: #e4efff;
  box-shadow: 0px 4px 0px rgba(228, 239, 255, 0.5),
    0px 2px 8px rgba(0, 0, 0, 0.5);
}
.navlist {
  line-height: 30px;
  text-align: center;
  padding: 0;
  background-color: #e4efff;
  position: relative;
  z-index: 999;
  margin-top: 20px;
  /* width: 120px; */
  width: 156px;
  border-radius: 6px;
  /* display: none; */
}
.navlist:before {
  content: "";
  position: absolute;
  top: -10px;
  right: 4px;
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid #e4efff;
}
.navlist li:hover {
  background-color: #f5fffa;
}
.router-link-active {
  background: #f5fffa;
  display: block;
  /* color: white; */
}
.el-dropdown {
  color: #fff;
  position: absolute;
  right: 10px;
  cursor: pointer;
}
/* 点击菜单改变背景色 */
.click-color {
  background: #f5fffa;
}
.default-color {
  background: #e8f1ff;
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
</style>
