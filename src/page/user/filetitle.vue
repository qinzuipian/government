<template>
    <div>
             <div class="pass">
                 <span>————修改医院名————</span>
                <div class="passForm">
                   <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="医院名" prop="pass">
                        <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                    </el-form>
                </div>
            </div>
       
    </div>
    
</template>


<script>
import axios from "axios";
export default {
  data() {
  
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入医院名"));
      } 
    };

    return {
      ruleForm2: {
        pass: "",

      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],

      }
    };
  },
  methods: {
    submitForm(formName) {
  
          axios({
            method: "post",
            url: axios.PARK_API + "/guar/biz/health/updateD101orgName",
            data: {
              hospitalId: localStorage.getItem("othercode"),
              orgname: this.ruleForm2.pass
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            }
          })
            .then(res => {
              if (res.data.code == 0) {
                this.$message("修改成功");
                this.$router.push({ path: "/app" });
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(error => {
              // this.$message.error('请检查网络');
            });
     
    },
    hospitalFocus() {
       axios({
        method: "post",
        url: axios.PARK_API + "/guar/biz/health/queryD101orgName",
        data: {
          hospitalId: localStorage.getItem("othercode"),
          hosgrade: localStorage.getItem("hosgrade")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            // console.log(res.data.title);
            // this.titleName = res.data.title;
            console.log(res.data.title.substring(5))
            if (this.titleName == "0") {
              this.ruleForm2.pass = ""
            } else {
               this.ruleForm2.pass = res.data.title.substring(5);
            }
          }
        })
        .catch(error => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.hospitalFocus();
  }
};
</script>


<style scoped>
.pass {
  /* width: 500px; */
  /* height: 500px; */
  /* border: 1px solid #409EFF; */
  /* border-radius: 4px; */
  padding: 10px;
  margin: 80px auto;
  text-align: center;
}
.pass span {
  font-size: 26px;
  color: #409eff;
  margin-left: 100px;
}
.pass .passForm {
  width: 40%;
  margin: 50px auto 0 auto;
}
</style>

