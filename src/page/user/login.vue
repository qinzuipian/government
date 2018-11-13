<template>
    <div class="content">
		<img src="/static/img/login.jpg"/>
    <!-- <h1>智能审核 -- 经办单位</h1> -->
		<div class="login">
  
			<!--<h1>登  录</h1>-->
			<div class="account">
				账  号：<input type="text" v-model="userName"/>
			</div>
			<div class="psd">
				密  码：<input type="password" v-model="password" @focus="loginBlur"/>
			</div>
			<div>
                <!--<router-link class="loginBtn" :to="{ path: '/welcome'}">登  录</router-link>-->
        <input type="button" value="登  录" @click="login"/>
			</div>
			
		</div>
    <div class="loginfont">
          西安卫康数据系统有限公司 
          <!-- <br> -->
          &nbsp;&nbsp;
          技术支持电话：18192163896
    </div>
    </div>    
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      userName: localStorage.getItem("user"),
      password: ""
    };
  },
  created() {},
  methods: {
    login() {
      localStorage.setItem("user", this.userName);
      axios({
        method: "post",
        url: axios.PARK_API + "/sys-mgr/sys/login",
        data: {
          userName: this.userName,
          password: this.password
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("navList", res.data.roleList);

            // todo  路由有一个问题，这里跳转到app    app默认路由是住院审核   如果用户没有住院审核的页面权限   那么会产生冲突  会404页面
            this.$router.push({ path: "/app" });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    },
    loginBlur() {
      axios({
        method: "post",
        url: axios.PARK_API + "/sys-mgr/info",
        data: {
          userName: this.userName
        }
      })
        .then(res => {
          if (res.data.code == 0 && res.data.data) {
            localStorage.setItem("userName", res.data.data.d10111);
            localStorage.setItem("hosName", res.data.data.d10102);
            localStorage.setItem("userTime", res.data.data.parmCode);
            localStorage.setItem("othercode", res.data.data.d10101);
            localStorage.setItem("regionId", res.data.data.regionId);
            localStorage.setItem("hosgrade", res.data.data.d10131);
          } else if (res.data.code == 0 && !res.data.data) {
            this.$message("没有此用户");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  position: absolute;
}
.content img {
  display: block;
  outline: none;
  border: 0;
  height: 100%;
  width: 100%;
}
.content h1 {
  position: absolute;
  top: 90px;
  right: 280px;
  color: #fff;
  font-size: 36px;
  font-family: "微软雅黑";
}
.content .loginfont {
  /* width: 18%; */
  /* height: 60px; */
  line-height: 30px;
  border-radius: 4px;
  /* line-height: 60px; */
  text-align: left;
  /* background:rgba(0,0,0, .5); */
  position:absolute;
  bottom: 2px;
  right: 30%;
  color:#000;
  font-size: 14px;
}
.login {
  /* width: 400px; */
  height: 300px;
  background-color: transparent;
  position: absolute;
  /*  right: 10%;
  top: 30%; */
  right: 6%;
  top: 32%;
  border-radius: 5px;
  padding-left: 15px;
  /* box-shadow: #b7c8d6 0px 0px 30px 5px; */
}
.login .account {
  margin-top: 50px;
}
.login .account input,
.login .psd input {
  width: 280px;
  height: 40px;
  color: #666;
  border-radius: 5px;
  margin-bottom: 25px;
  padding-left: 5px;
  outline: none;
  border: 1px solid #e3e3e3;
}
.login input[type="button"] {
  width: 280px;
  height: 40px;
  border: none;
  color: #fff;
  font-size: 16px;
  /* background-color: #5ab33d; */
  background-color: #0072B0;
  border: 0;
  /* margin-top: 12px; */
  margin-left: 12%;
  border-radius: 5px;
  cursor: pointer;
}
.loginBtn {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
</style>

