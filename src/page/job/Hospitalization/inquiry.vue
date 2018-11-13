<template>
    <div class="content">

        <div class="leftContent" :class="{'content-left-fold': !screenOpen}">
            <!-- <screen v-on:hiddenScreen="hiddenScreen" v-show="showRen" v-on:serchList="serchList" v-on:clear="clear"></screen> -->
             <div class="screen">
                <div class="screenHeader">
                    <p class="screenHeaderTitle" v-show="screenOpen">查询</p>
                    <p class="screenButton" v-show="screenOpen" @click="hiddenScreen(1)"><<</p>
                    <p class="screenButton" v-show="!screenOpen" @click="hiddenScreen(2)">>></p>
                </div>
                <transition name="el-zoom-in-center" class="transitionScreen">
                    <div v-show="screenOpen" class="transition-box">
                        <p>医院名字</p>
                      
                        <el-input v-model="hosName" :disabled="true" placeholder="请输入内容"></el-input>
                      
                      
                        <div class="border"></div>
                        <p>选择年份</p>
                         <div class="block">
                            <el-date-picker
                              v-model="yearval"
                              type="year"
                              value-format="yyyy"
                              @change="getyear"
                              placeholder="选择年">
                            </el-date-picker>
                          </div>
                        <!-- <el-select size="mini" v-model="dataWay" placeholder="请选择" class="leixingSelect">
                            <el-option
                                    v-for="item in selectdate"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select> -->
                       <!--  <div class="block">
                            <el-date-picker
                              v-model="inDateTime"
                              type="month"
                              @change="getTime"
                             value-format="yyyy-MM" 
                              placeholder="选择月">
                            </el-date-picker>
                        </div>
                        <p class="shijianlianjie">至</p>
                        <div class="block">
                          <el-date-picker
                              v-model="inDateEnd"
                              type="month"
                              value-format="yyyy-MM" 
                              placeholder="选择月">
                            </el-date-picker>
                        </div> -->
                        
                        <div class="border"></div>
                          <p>按季度选择日期</p>
                         <el-select v-model="monthVal" @change="getATime" placeholder="请选择">  <!-- @change="getTime" --> 
                            <el-option
                              v-for="item in monthOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="border"></div> 
                        <p>个人信息</p>
                        <el-select size="mini" v-model="person" placeholder="请选择" class="leixingSelect">
                            <el-option
                                    v-for="item in personOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input size="mini" v-model="personText" placeholder="请输入内容"></el-input>
                        <div class="border"></div>
                          
                        <el-button plain style="width: 40%; background: #e8f1ff;margin-top: 20px;" @click="searchList">搜索</el-button>
                        <el-button plain style="width: 40%; background: #e8f1ff;margin-top: 20px;" @click="clear()">清除</el-button>
                    </div>
                </transition>
              </div>
        </div>
        <div class="rightContent" :class="{'content-right-fold': !screenOpen}">
            <div class="top">
                <div class="left-bck">
                    <ul>
                        <li :class="{'active': leftBck == 0}" @click="leftBck = 0">住院信息</li>
                        <!-- <li :class="{'active': leftBck == 1}" @click="leftBck = 1">明细视图</li> -->
                        <!-- <li :class="{'active': leftBck == 2}" @click="leftBck = 2">收费明细</li> -->
                    </ul>
                </div>
                <div class="right-ctn">
                     <p style="margin:0;text-align:left;">
                       <el-button type="primary" size="mini" icon="el-icon-printer" @click="dataExport">导出</el-button>
                       <el-button type="primary" size="mini" icon="el-icon-printer" v-show="yearshow" @click="quarterExport">按季度导出</el-button>
                     </p>
                    <div v-show="leftBck == 0">
                
                        <div v-show="mainShow">
                            <el-table
                                ref="multipleTable"
                                highlight-current-row
                                :data="inquirylist.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                                height="500"
                                border
                                tooltip-effect="dark"
                                style="width: 100%"
                                @row-click="rowClick"
                                :cell-style="cellStyle"
                                 @selection-change="selectThisItem"
                                :header-cell-style="rowClass">
                                <el-table-column
                                  type="index"
                                  width="50">
                                  <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * 10 + 1}} </span></template>
                                </el-table-column>
                                <el-table-column ref="quanxuan" type="selection" :reserve-selection="true"  width="55">
                                </el-table-column>
                                <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                    <template slot-scope="scope">
                                      <el-button @click="handleClick(scope.row)" type="text" size="small">详细信息</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="xm"
                                        label="姓名">
                                </el-table-column>
                                <el-table-column
                                        prop="csrq"
                                        label="出生日期"
                                        width="100px"
                                         :formatter="dateFormat"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="xb"
                                        label="性别"
                                        width="50px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="mz"
                                        label="民族"
                                        width="50px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="sfzh"
                                        label="身份证号"
                                        width="160px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                 <el-table-column
                                        prop="hyzk"
                                        label="婚姻状况"
                                        width="80px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="zydm"
                                        label="职业"
                                        width="80px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                 <el-table-column
                                        prop="bah"
                                        label="病案号"
                                        width="120px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="zycs" label="住院次数"  width="80px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="zyts" label="天数" width="50" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="rytj"
                                        label="入院途径"
                                        width="90px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                  <el-table-column
                                        prop="ryrq"
                                        label="入院日期"
                                        :formatter="dateFormat"
                                        width="100px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="cyrq"
                                        label="出院日期"
                                        :formatter="dateFormat"
                                        width="100px"
                                        show-overflow-tooltip>
                                </el-table-column>
                               <el-table-column
                                        prop="lyfs"
                                        label="离院方式"
                                        width="90px"
                                        show-overflow-tooltip>
                                </el-table-column>
                               
                              <el-table-column
                                        prop="ylfkfs"
                                        label="付款方式"
                                        width="130px"
                                        show-overflow-tooltip>
                                </el-table-column>
                              
                                <!--   <el-table-column
                                        prop="reimbNo"
                                        label="合疗登记号"
                                        width="110px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="hospitalName"
                                        label="医院名字"
                                        width="160px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="hospitalId"
                                        label="医院编码"
                                        width="200px"
                                        show-overflow-tooltip>
                                </el-table-column> -->
                         
                            </el-table>
                            <div class="block" id="fenye">
                            <!--    <el-pagination
                                  @size-change="handleSizeChange"
                                  @current-change="handleCurrentChange"
                                  :current-page="currentPage4"
                                  :page-sizes="[100, 200, 300, 400]"
                                  :page-size="100"
                                  layout="total, sizes, prev, pager, next, jumper"
                                  :total="400">
                                </el-pagination> -->
                                <el-pagination
                                        background
                                        layout="total,sizes,prev, pager, next"
                                        @size-change="dragSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10,100, 200, 300]"
                                        :page-size="pageSize"
                                        :total=total>
                                </el-pagination>
                            </div>
                        </div>

                        <div v-show="otherShow">
                            <el-table
                                ref="multipleTable"
                                highlight-current-row
                                :data="inqdata.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                                height="500"
                                border
                                tooltip-effect="dark"
                                style="width: 100%"
                                @row-click="rowClick"
                                :cell-style="cellStyle"
                                 @selection-change="selectThisItem"
                                :header-cell-style="rowClass">
                                <el-table-column
                                  type="index"
                                  width="50">
                                  <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * 10 + 1}} </span></template>
                                </el-table-column>
                                <el-table-column ref="quanxuan" type="selection"  width="55">
                                </el-table-column>
                                <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                    <template slot-scope="scope">
                                      <el-button @click="handleClick(scope.row)" type="text" size="small">详细信息</el-button>
                                    </template>
                                </el-table-column>
                                 <el-table-column
                                        prop="xm"
                                        label="姓名">
                                </el-table-column>
                                <el-table-column
                                        prop="csrq"
                                        label="出生日期"
                                        width="100px"
                                         :formatter="dateFormat"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="xb"
                                        label="性别"
                                        width="50px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="mz"
                                        label="民族"
                                        width="50px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="sfzh"
                                        label="身份证号"
                                        width="160px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                 <el-table-column
                                        prop="hyzk"
                                        label="婚姻状况"
                                        width="80px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="zydm"
                                        label="职业"
                                        width="80px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                 <el-table-column
                                        prop="bah"
                                        label="病案号"
                                        width="120px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="zycs" label="住院次数"  width="80px" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="zyts" label="天数" width="50" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="rytj"
                                        label="入院途径"
                                        width="90px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                  <el-table-column
                                        prop="ryrq"
                                        label="入院日期"
                                        :formatter="dateFormat"
                                        width="100px"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="cyrq"
                                        label="出院日期"
                                        :formatter="dateFormat"
                                        width="100px"
                                        show-overflow-tooltip>
                                </el-table-column>
                               <el-table-column
                                        prop="lyfs"
                                        label="离院方式"
                                        width="90px"
                                        show-overflow-tooltip>
                                </el-table-column>
                               
                              <el-table-column
                                        prop="ylfkfs"
                                        label="付款方式"
                                        width="130px"
                                        show-overflow-tooltip>
                                </el-table-column>
                              
                         
                            </el-table>
                            <div class="block" id="fenye">
                              <!-- <span>共1000条</span> -->
                                <el-pagination
                                        background
                                        layout="total,sizes,prev, pager, next"
                                        @size-change="dragSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10,100, 200, 1000]"
                                        :page-size="pageSize"
                                        :total=searchtotal>
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                   
                   <!--  <div v-show="leftBck == 2">
                      <div class="right-ctn-title">
                            
                            <span>项目类型:</span>
                            <el-select v-model="itemtype" size="mini" placeholder="请选择">
                                <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <span style="margin-left: 40px;">项目名称:</span>
                            <el-input style="width: 140px; height: 30px;" v-model="itemSearch" @focus="itemFocus" @blur="itemBlur" size="mini" placeholder="请输入内容"></el-input>
                              <ul class="upText" v-show="upShow">
                                  <li class="Liactive" v-for="(it, index) in itemList" :key="index" @mousedown="Liactive">{{it}}</li>
                              </ul>
                            <el-button size="mini"  style="margin-left: 40px;" @click="searchTable">查询</el-button>
                            <el-button size="mini"  type="primary"  v-show="btnshow" @click="plusTable">合并列表</el-button>
                            <el-button size="mini"  type="primary" v-show="cancel" @click="cancelTable">取消合并</el-button>

                        </div>

                        <div v-show="tableShow">
                          <el-table ref="multipleTable" :header-cell-style="rowClass" :data="moneyDataList.slice((dragPage-1)*pageSize,dragPage*pageSize)" height="490"  border tooltip-effect="dark" style="width: 100%">
                            <el-table-column prop="thirdName" label="项目名称" width="140px" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="thirdForm" label="项目剂型" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="itemType" label="项目类型" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="type" label="医嘱类型" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="docName" label="医生姓名">
                            </el-table-column>

                            <el-table-column prop="price" label="单价" width="50px" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="quantity" label="数量" width="50px" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="amount" label="金额" show-overflow-tooltip>
                               <template slot-scope="scope">
                                  <span>{{scope.row.amount-0 | rounding}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="spec" label="规格" show-overflow-tooltip>
                            </el-table-column>

                            <el-table-column prop="selfProportion" label="自费比例"  show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="pack" label="包装含量值" width="100px;" show-overflow-tooltip>
                               <template slot-scope="scope">
                                  <span>{{scope.row.pack-0 | rounding}}</span>
                                </template>
                            </el-table-column>

                          
                            <el-table-column prop="firstExecuteTime" label="首次执行日期" :formatter="dateFormat"  width="120px;" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="startTime" label="开始日期" :formatter="dateFormat" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="endTime" label="结束日期" :formatter="dateFormat" show-overflow-tooltip>
                            </el-table-column>

                          </el-table>
                          <div class="block" id="fenye">
                              <el-pagination
                                      background
                                      layout="prev, pager, next"
                                      @size-change="dragSizeChange"
                                      @current-change="dragCurrentChange"
                                      :current-page="dragPage"
                                      :page-sizes="[10, 20, 30]"
                                      :page-size="pageSize"
                                      :total=dragtotal>
                              </el-pagination>
                          </div>
                        </div>
                        <div v-show="hebingShow">
                                <el-table ref="multipleTable" :header-cell-style="rowClass" :data="plusDataList.slice((dragPage-1)*pageSize,dragPage*pageSize)" height="490" border tooltip-effect="dark" style="width: 100%">
                                    <el-table-column prop="itemName"  label="项目名称" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="itemType" label="项目类型" show-overflow-tooltip>
                                    </el-table-column>
                 
                    
                                    <el-table-column prop="price" label="单价" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="quantity" label="数量" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="amount" label="金额" show-overflow-tooltip>
                                    </el-table-column>
    
                                </el-table>
                                  <div class="block" id="fenye">
                                      <el-pagination
                                              background
                                              layout="prev, pager, next"
                                              @size-change="dragSizeChange"
                                              @current-change="dragCurrentChange"
                                              :current-page="dragPage"
                                              :page-sizes="[10, 20, 30]"
                                              :page-size="pageSize"
                                              :total=plustotal>
                                      </el-pagination>
                                  </div>
                       </div>
                    </div> -->
                </div>
            </div>
       

        </div>
        <el-dialog title="" v-if='medicalVisible' :visible.sync="medicalVisible" width="80%"
                           top="20px">
            <Medical :medicalText="otherData"></Medical>
        </el-dialog>
    </div>
</template>
<script>
// import screen from "@/components/screen";
import Medical from "@/components/Medical";

import axios from "axios";
let moment = require("moment");
export default {
  name: "inquiry",
  data() {
    return {
      screenOpen: true,
      leftBck: 0,
      monthOption: [
        {
          value: "1",
          label: "第一季度"
        },
        {
          value: "2",
          label: "第二季度"
        },
        {
          value: "3",
          label: "第三季度"
        },
        {
          value: "4",
          label: "第四季度"
        }
      ],
      monthVal: "",
      yearval: "",
      searchtotal: 0,
      //列表的显示与隐藏
      mainShow: true,
      otherShow: false,
      yearshow: false,
      //页面初始化数据
      inquirylist: [],
      inqdata: [],
      // 一共多少页
      total: 0,
      currentPage: 1,
      iqrn: 1,
      hospitalName: "",
      //收费明细列表页数
      dragtotal: 0,
      dragPage: 1,
      pageSize: 10,
      btnshow: true,
      cancel: false,
      inquirydata: [],
      remark: "",
      name: "",
      orderId: "",
      statusMsg: {},
      copyStatusMsg: "",
      dialogFormVisible: false,
      childMsg: [],
      childMsgData: {},

      leftStatus: 1,

      hasMsg: false,
      // 上传文件
      fileName: [],
      filePath: [],
      showRen: true,
      // 是否为搜索状态
      isSearch: false,
      //收费明细传递的数据
      upShow: false,
      moneyDataList: [],
      itemtype: "",
      typeOption: [
        {
          value: 1,
          label: "药品"
        },
        {
          value: 2,
          label: "服务"
        },
        {
          value: 3,
          label: "材料"
        }
      ],
      itemList: [],
      //合并收费明细
      plusDataList: [],
      itemSearch: "",
      plustotal: 0,
      //合并费用明细表格
      tableShow: true,
      hebingShow: false,
      code: "",

      //审核情况费用明细
      viewLeftList: [],
      //明细视图bottom明细视图部分
      viewbotList: [],
      dateList: [],
      isdateList: [],
      isData: [],
      //药品说明书
      drugVisible: false,
      user: 1,

      otherMsg: [],
      addVisible: false,
      operShow: true,
      medicalVisible: false,
      //侧边栏数据
      // screenOpen: true,
      hosName: localStorage.getItem("hosName"),
      dataWay: 1,
      selectdate: [
        {
          value: 1,
          label: "按季度选择"
        }
      ],
      inDateTime: "",
      inDateEnd: "",
      /*  jishen: "",
      jishenOptions: [
        {
          value: 1,
          label: "通过"
        },
        {
          value: 2,
          label: "不通过"
        },
        {
          value: 3,
          label: "待确认"
        }
      ], */
      person: 1,
      personOptions: [
        {
          value: 1,
          label: "姓名"
        } /* ,
        {
          value: 2,
          label: "病案号"
        } */
      ],
      personText: "",
      searchrn: localStorage.getItem("rn"),
      /*  leixing: 1,
      leixingText: "",
      examineText: "", */

      // 搜索的数据
      // serchData: {},
      //首字母查询
      piliangIdList: [],
      hospitalText: [],
      examineList: [],
      titleName: ""
    };
  },
  filters: {
    rounding(value) {
      if (!isNaN(value)) {
        return value.toFixed(2);
      } else {
        return 0;
      }
    },
    formatDate: function(val) {
      var value = new Date(val);
      var year = value.getFullYear();
      var month = value.getMonth() + 1;
      var day = value.getDate();
      return year + "-" + month + "-" + day;
    }
  },
  methods: {
    //侧边栏
    hiddenScreen(j) {
      if (j == 1) {
        let _this = this;
        _this.screenOpen = !this.screenOpen;
        setTimeout(() => {
          this.$emit("hiddenScreen");
        }, 100);
      } else {
        let _this = this;
        this.$emit("hiddenScreen");
        setTimeout(() => {
          _this.screenOpen = !this.screenOpen;
        }, 100);
      }
    },
    handleItemChange(val) {
      console.log(val);
      //localStorage.setItem('city',val);
    },
    getyear(val) {
      console.log(val);
      // this.yearval = val;
      this.yearval = new Date(val);
      this.getATime();
      // console.log(d)
    },
    getyeartime() {
      this.yearval = new Date();
      // let y = d.getFullYear();
      // console.log(y)
    },
    // 设置开始日期的默认时间
    getATime(val) {
      // console.log(val)
      console.log(this.monthVal);
      let y = this.yearval.getFullYear();
      // let y = this.yearval;
      if (this.monthVal == 1) {
        let startTime =
          y +
          "-" +
          "0" +
          1 +
          "-" +
          "0" +
          1 +
          " " +
          "0" +
          0 +
          ":" +
          "0" +
          0 +
          ":" +
          "0" +
          0;
        let endTime =
          y + "-" + "0" + 3 + "-" + 31 + " " + 12 + ":" + 59 + ":" + 59;
        this.inDateTime = startTime;
        this.inDateEnd = endTime;
        console.log(this.inDateTime);
        console.log(this.inDateEnd);
      } else if (this.monthVal == 2) {
        let startTime =
          y +
          "-" +
          "0" +
          4 +
          "-" +
          "0" +
          1 +
          " " +
          "0" +
          0 +
          ":" +
          "0" +
          0 +
          ":" +
          "0" +
          0;
        let endTime =
          y + "-" + "0" + 6 + "-" + 30 + " " + 12 + ":" + 59 + ":" + 59;
        this.inDateTime = startTime;
        this.inDateEnd = endTime;
        console.log(this.inDateTime);
        console.log(this.inDateEnd);
      } else if (this.monthVal == 3) {
        let startTime =
          y +
          "-" +
          "0" +
          7 +
          "-" +
          "0" +
          1 +
          " " +
          "0" +
          0 +
          ":" +
          "0" +
          0 +
          ":" +
          "0" +
          0;
        let endTime =
          y + "-" + "0" + 9 + "-" + 30 + " " + 12 + ":" + 59 + ":" + 59;
        this.inDateTime = startTime;
        this.inDateEnd = endTime;
        console.log(this.inDateTime);
        console.log(this.inDateEnd);
      } else if (this.monthVal == 4) {
        let startTime =
          y +
          "-" +
          10 +
          "-" +
          "0" +
          1 +
          " " +
          "0" +
          0 +
          ":" +
          "0" +
          0 +
          ":" +
          "0" +
          0;
        let endTime = y + "-" + 12 + "-" + 31 + " " + 12 + ":" + 59 + ":" + 59;
        this.inDateTime = startTime;
        this.inDateEnd = endTime;
        console.log(this.inDateTime);
        console.log(this.inDateEnd);
      }

      /*    let date = new Date(val);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let x = date.getMonth() + 3;
      let startTime =
        val + "-" + "0" + 1 + " " + "0" + 0 + ":" + "0" + 0 + ":" + "0" + 0;
      console.log(startTime);
      this.inDateTime = startTime;
      // let time = y + "-" + m;
      if (m < 9) {
        let endtime =
          y + "-" + "0" + x + "-" + 30 + " " + 12 + ":" + 59 + ":" + 59;
        this.inDateEnd = endtime;
        console.log(endtime);
      } else if (m >= 9) {
        let endtime = y + "-" + x + "-" + 30 + " " + 12 + ":" + 59 + ":" + 59;
        this.inDateEnd = endtime;
        console.log(endtime);
      } */
      /*   let endtime =
        y + "-" + "0" + x + "-" + 30 + " " + 12 + ":" + 59 + ":" + 59; */

      // console.log(endtime);
      // this.inDateEnd = endtime;
    },

    hiddenScreen() {
      this.screenOpen = !this.screenOpen;
    },

    hiddenReply() {
      this.dialogFormVisible = false;
    },
    hiddenadd() {
      this.addVisible = false;
    },
    // 复选框的操作示例
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    indexMethod(index) {
      return index * 1 + 1;
    },

    // 页面初始化请求数据
    getInquiry() {
      axios({
        method: "post",
        // url: axios.PARK_API + "/hospitalization/biz/health/list",
        url: axios.PARK_API + "/guar/biz/health/list",
        data: {
          /*   hospitalId: localStorage.getItem("othercode"),
          regionId: localStorage.getItem("regionId") */
          /*  hosgrade: "11",
          hospitalId: "43636389X61102111C2101" */
          hospitalId: localStorage.getItem("othercode")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res);
            this.mainShow = true;
            this.otherShow = false;
            this.inquirylist = res.data.data;
            this.total = this.inquirylist.length;
            for (let i = 0; i < this.inquirylist.length; i++) {
              switch (this.inquirylist[i].xb) {
                case "1":
                  this.inquirylist[i].xb = "男";
                  break;
                case "2":
                  this.inquirylist[i].xb = "女";
                  break;
              }

              switch (this.inquirylist[i].mz) {
                case "01":
                  this.inquirylist[i].mz = "汉族";
                  break;
                default:
                  this.inquirylist[i].mz = "其他";
              }
              //婚姻状况
              switch (this.inquirylist[i].hyzk) {
                case "10":
                  this.inquirylist[i].hyzk = "未婚";
                  break;
                case "20":
                  this.inquirylist[i].hyzk = "已婚";
                  break;
                case "30":
                  this.inquirylist[i].hyzk = "丧偶";
                  break;
                case "40":
                  this.inquirylist[i].hyzk = "离婚";
                  break;
                case "90":
                  this.inquirylist[i].hyzk = "其他";
                  break;
              }
              //离院方式
              switch (this.inquirylist[i].lyfs) {
                case "1":
                  this.inquirylist[i].lyfs = "医嘱离院";
                  break;
                case "2":
                  this.inquirylist[i].lyfs = "医嘱转院";
                  break;
                case "3":
                  this.inquirylist[i].lyfs =
                    "医嘱转社区卫生服务机构/乡镇卫生院";
                  break;
                case "4":
                  this.inquirylist[i].lyfs = "非医嘱离院";
                  break;
                case "5":
                  this.inquirylist[i].lyfs = "死亡";
                  break;
                default:
                  this.inquirylist[i].lyfs = "其他";
                  break;
              }

              //职业
              switch (this.inquirylist[i].zydm) {
                case "11":
                  this.inquirylist[i].zydm = "国家公务员";
                  break;
                case "13":
                  this.inquirylist[i].zydm = "专业技术人员";
                  break;
                case "17":
                  this.inquirylist[i].zydm = "职员";
                  break;
                case "21":
                  this.inquirylist[i].zydm = "企业管理人员";
                  break;
                case "24":
                  this.inquirylist[i].zydm = "工人";
                  break;
                case "27":
                  this.inquirylist[i].zydm = "农民";
                  break;
                case "31":
                  this.inquirylist[i].zydm = "学生";
                  break;
                case "37":
                  this.inquirylist[i].zydm = "现役军人";
                  break;
                case "51":
                  this.inquirylist[i].zydm = "自由职业者";
                  break;
                case "54":
                  this.inquirylist[i].zydm = "个体经营者";
                  break;
                case "70":
                  this.inquirylist[i].zydm = "无业人员";
                  break;
                case "80":
                  this.inquirylist[i].zydm = "退(离)休人员";
                  break;
                default:
                  this.inquirylist[i].zydm = "其他";
                  break;
              }

              //付款方式
              switch (this.inquirylist[i].ylfkfs) {
                case "01":
                  this.inquirylist[i].ylfkfs = "城镇职工基本医疗保险";
                  break;
                case "02":
                  this.inquirylist[i].ylfkfs = "城镇居民基本医疗保险";
                  break;
                case "03":
                  this.inquirylist[i].ylfkfs = "新型农村合作医疗";
                  break;
                case "04":
                  this.inquirylist[i].ylfkfs = "贫困救助";
                  break;
                case "05":
                  this.inquirylist[i].ylfkfs = "商业医疗保险";
                  break;
                case "06":
                  this.inquirylist[i].ylfkfs = "全公费";
                  break;
                case "07":
                  this.inquirylist[i].ylfkfs = "全自费";
                  break;
                case "08":
                  this.inquirylist[i].ylfkfs = "其他社会保险";
                  break;
                default:
                  this.inquirylist[i].ylfkfs = "其他";
                  break;
              }

              //入院途径
              switch (this.inquirylist[i].rytj) {
                case "1":
                  this.inquirylist[i].rytj = "急诊";
                  break;
                case "2":
                  this.inquirylist[i].rytj = "门诊";
                  break;
                case "3":
                  this.inquirylist[i].rytj = "其他医疗机构转入";
                  break;
                default:
                  this.inquirylist[i].rytj = "其他";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },

    //搜索结果
    searchList() {
      // this.isSearch = true;
      // console.log(val);
      /*  let data = {};
      if (this.person == 1) {
        data.ryrq = this.inDateTime;
        data.cyrq = this.inDateEnd;
        data.xm = this.personText;
        data.bah = "";
        data.hospitalId = localStorage.getItem("othercode");
      } else if (this.person == 2) {
        data.ryrq = this.inDateTime;
        data.cyrq = this.inDateEnd;
        data.bah = this.personText;
        data.xm = "";
        data.hospitalId = localStorage.getItem("othercode");
      } */
      axios({
        method: "post",
        url: axios.PARK_API + "/guar/biz/health/list",
        data: {
          startcyrq: this.inDateTime,
          endcyrq: this.inDateEnd,
          xm: this.personText,
          hospitalId: localStorage.getItem("othercode")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.mainShow = false;
            this.otherShow = true;
            this.yearshow = true;
            this.inqdata = res.data.data;
            this.searchtotal = this.inqdata.length;
            for (let i = 0; i < this.inquirylist.length; i++) {
              switch (this.inqdata[i].xb) {
                case "1":
                  this.inqdata[i].xb = "男";
                  break;
                case "2":
                  this.inqdata[i].xb = "女";
                  break;
              }

              switch (this.inqdata[i].mz) {
                case "01":
                  this.inqdata[i].mz = "汉族";
                  break;
                default:
                  this.inqdata[i].mz = "其他";
              }
              //婚姻状况
              switch (this.inqdata[i].hyzk) {
                case "10":
                  this.inqdata[i].hyzk = "未婚";
                  break;
                case "20":
                  this.inqdata[i].hyzk = "已婚";
                  break;
                case "30":
                  this.inqdata[i].hyzk = "丧偶";
                  break;
                case "40":
                  this.inqdata[i].hyzk = "离婚";
                  break;
                case "90":
                  this.inqdata[i].hyzk = "其他";
                  break;
              }
              //离院方式
              switch (this.inqdata[i].lyfs) {
                case "1":
                  this.inqdata[i].lyfs = "医嘱离院";
                  break;
                case "2":
                  this.inqdata[i].lyfs = "医嘱转院";
                  break;
                case "3":
                  this.inqdata[i].lyfs = "医嘱转社区卫生服务机构/乡镇卫生院";
                  break;
                case "4":
                  this.inqdata[i].lyfs = "非医嘱离院";
                  break;
                case "5":
                  this.inqdata[i].lyfs = "死亡";
                  break;
                default:
                  this.inqdata[i].lyfs = "其他";
                  break;
              }

              //职业
              switch (this.inqdata[i].zydm) {
                case "11":
                  this.inqdata[i].zydm = "国家公务员";
                  break;
                case "13":
                  this.inqdata[i].zydm = "专业技术人员";
                  break;
                case "17":
                  this.inqdata[i].zydm = "职员";
                  break;
                case "21":
                  this.inqdata[i].zydm = "企业管理人员";
                  break;
                case "24":
                  this.inqdata[i].zydm = "工人";
                  break;
                case "27":
                  this.inqdata[i].zydm = "农民";
                  break;
                case "31":
                  this.inqdata[i].zydm = "学生";
                  break;
                case "37":
                  this.inqdata[i].zydm = "现役军人";
                  break;
                case "51":
                  this.inqdata[i].zydm = "自由职业者";
                  break;
                case "54":
                  this.inqdata[i].zydm = "个体经营者";
                  break;
                case "70":
                  this.inqdata[i].zydm = "无业人员";
                  break;
                case "80":
                  this.inqdata[i].zydm = "退(离)休人员";
                  break;
                default:
                  this.inqdata[i].zydm = "其他";
                  break;
              }

              //付款方式
              switch (this.inqdata[i].ylfkfs) {
                case "01":
                  this.inqdata[i].ylfkfs = "城镇职工基本医疗保险";
                  break;
                case "02":
                  this.inqdata[i].ylfkfs = "城镇居民基本医疗保险";
                  break;
                case "03":
                  this.inqdata[i].ylfkfs = "新型农村合作医疗";
                  break;
                case "04":
                  this.inqdata[i].ylfkfs = "贫困救助";
                  break;
                case "05":
                  this.inqdata[i].ylfkfs = "商业医疗保险";
                  break;
                case "06":
                  this.inqdata[i].ylfkfs = "全公费";
                  break;
                case "07":
                  this.inqdata[i].ylfkfs = "全自费";
                  break;
                case "08":
                  this.inqdata[i].ylfkfs = "其他社会保险";
                  break;
                default:
                  this.inqdata[i].ylfkfs = "其他";
                  break;
              }

              //入院途径
              switch (this.inqdata[i].rytj) {
                case "1":
                  this.inqdata[i].rytj = "急诊";
                  break;
                case "2":
                  this.inqdata[i].rytj = "门诊";
                  break;
                case "3":
                  this.inqdata[i].rytj = "其他医疗机构转入";
                  break;
                default:
                  this.inqdata[i].rytj = "其他";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error("请检查网络");
        });
    },
    //清除搜索结果
    clear() {
      this.yearval = "";
      this.personText = "";
      this.yearshow = false;
      this.getInquiry();
    },
    //导出打印数据
    dataExport() {
        if (this.titleName == "0") {
            this.$message.warning("请修改医院名");
        } else {
        axios({
        method: "post",
        url: axios.PARK_API + "/guar/biz/health/csvexport",
        data: {
          hospitalId: localStorage.getItem("othercode"),
          bah: this.piliangIdList,
          hosgrade: localStorage.getItem("hosgrade")
        },
        responseType: "blob",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          this.download(res.data);
          // location.reload();
          //  console.log(res.data)
          /* if (res.data.code == 0) {
            console.log(res)
          } else {
            this.$message.error(res.data.msg);
          } */
        })
        .catch(error => {
          // this.$message.error("请检查网络");
        });
        }
     
    },

    //按季度导出数据
    quarterExport() {
        if (this.titleName == "0") {
            this.$message.warning("请修改医院名");
        } else {
        axios({
        method: "post",
        url: axios.PARK_API + "/guar/biz/health/csvexportbycyrq",
        data: {
          startcyrq: this.inDateTime,
          endcyrq: this.inDateEnd,
          hospitalId: localStorage.getItem("othercode"),
          hosgrade: localStorage.getItem("hosgrade")
        },
        responseType: "blob",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          this.download(res.data);
        })
        .catch(error => {
          // this.$message.error("请检查网络");
        });
        }

    },
    //前端导出数据函数
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", this.titleName + ".csv");
      document.body.appendChild(link);
      link.click();
    },
    //判断title是否已经修改过。
    loadtitle() {
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
            this.titleName = res.data.title;
            if (this.titleName == "0") {
              this.$confirm("请修改医院名", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.$router.push({ path: "/filetitle" });
                })
                .catch(() => {});
            } else {
              // alert('ok')
            }
          }
        })
        .catch(error => {});
    },
    handleClick(scope) {
      console.log(scope);
      this.otherData = scope;

      this.medicalVisible = true;
    },
    // 批量选择
    selectThisItem(val) {
      this.piliangIdList = [];
      for (let i = 0; i < val.length; i++) {
        let obj = "";
        obj = val[i].bah;
        this.piliangIdList.push(obj);
      }
      console.log(this.piliangIdList);
    },
    // 点击表格行触发
    rowClick(row) {
      this.orderId = row.orderId;
      this.getIndex = row.index;
      // this.getStatus();
      this.name = row.name;
      // this.moneyList();
    },

    // 页码改变时去请求数据
    handleCurrentChange(val) {
      this.currentPage = val;
      // window.localStorage.setItem("rn", val);
      /*  this.iqrn = val;
      if (this.isSearch == true) {
        this.searchList(val);
      } else {
        this.getInquiry(val);
      } */
    },

    // 指定查看回复这一列的样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.sysFlag == "通过" && columnIndex === 5) {
        return "background:rgba(0,255,0,0.3);";
        //  return "color:rgba(0,255,0);";
      } else if (row.sysFlag == "不通过" && columnIndex === 5) {
        return "background:rgba(255,0,0,0.3);";
        //  return "color:rgba(255,0,0,0.8);";
      } else if (row.sysFlag == "待确定" && columnIndex === 5) {
        return "background:rgba(255,165,0,0.3)";
        //  return "color:rgba(255,165,0)";
      }
    },

    rowClass({ row, rowIndex }) {
      return "border-bottom:2px solid #ccc;border-top:2px solid #ccc";
    },

    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    //页面请求
    dragCurrentChange(val) {
      this.dragPage = val;
    },
    dragSizeChange(val) {
      this.pageSize = val;
    }

    /*  // 收费明细列表查询
    moneyList() {
      axios({
        method: "post",
        url:
          axios.PARK_API + "/hospitalization/biz/bizdatorderitem/queryInfoById",
        data: {
          orderId: this.orderId,
          code: 1
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
    
      })
        .then(res => {
          if (res.data.code == 0) {
            this.moneyDataList = res.data.data;
            this.dragtotal = this.moneyDataList.length;
            for (var i = 0; i < this.moneyDataList.length; i++) {
              switch (this.moneyDataList[i].itemType) {
                case 1:
                  this.moneyDataList[i].itemType = "药品";
                  break;
                case 2:
                  this.moneyDataList[i].itemType = "服务";
                  break;
                case 3:
                  this.moneyDataList[i].itemType = "材料";
                  break;
                default:
                  this.hostpitalList[i].sysFlag = "数据错误";
                  break;
              }
            }
            // console.log(res);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    },
    itemFocus() {
      axios({
        method: "post",
        url:
          axios.PARK_API + "/hospitalization/biz/bizdatorderitem/queryItemName",
        params: {
          orderId: this.orderId
        }
        
      })
        .then(res => {
          if (res.data.code == 0) {
            this.itemList = res.data.data;
            this.upShow = true;
            console.log(this.itemList);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    },
    itemBlur() {
      this.upShow = false;
    },
    Liactive(val) {
      console.log(val.path[0].innerHTML);
      this.itemSearch = val.path[0].innerHTML;
      this.upShow = false;
    },
    searchTable() {
      if (this.hebingShow == true) {
        this.code = 2;
      } else {
        this.code = 1;
      }
      axios({
        method: "post",
        url:
          axios.PARK_API + "/hospitalization/biz/bizdatorderitem/queryInfoById",
   
        data: {
          orderId: this.orderId,
          code: this.code,
          // code: 1,
          itemtype: this.itemtype,
          itemname: this.itemSearch
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.moneyDataList = res.data.data;
            this.dragtotal = this.moneyDataList.length;
            //合并之后的数据
            this.plusDataList = res.data.data;
            this.plustotal = this.plusDataList.length;
            // console.log(this.dragtotal)
            for (var i = 0; i < this.moneyDataList.length; i++) {
              switch (this.moneyDataList[i].itemType) {
                case 1:
                  this.moneyDataList[i].itemType = "药品";
                  break;
                case 2:
                  this.moneyDataList[i].itemType = "服务";
                  break;
                case 3:
                  this.moneyDataList[i].itemType = "材料";
                  break;
                default:
                  this.hostpitalList[i].sysFlag = "数据错误";
                  break;
              }
            }
            // console.log(res);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    },
    //合并收费明细列表表格
    plusTable() {
      this.cancel = true;
      this.btnshow = false;
      axios({
        method: "post",
        url:
          axios.PARK_API + "/hospitalization/biz/bizdatorderitem/queryInfoById",
        data: {
          orderId: this.orderId,
          code: 2,
          itemtype: this.itemtype,
          itemname: this.itemSearch
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.tableShow = false;
            this.hebingShow = true;
            this.plusDataList = res.data.data;
            this.plustotal = this.plusDataList.length;
            // console.log(this.dragtotal)
            for (var i = 0; i < this.plusDataList.length; i++) {
              switch (this.plusDataList[i].itemType) {
                case 1:
                  this.plusDataList[i].itemType = "药品";
                  break;
                case 2:
                  this.plusDataList[i].itemType = "服务";
                  break;
                case 3:
                  this.plusDataList[i].itemType = "材料";
                  break;
                default:
                  this.plusDataList[i].sysFlag = "数据错误";
                  break;
              }
            }
            // console.log(res);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    },
    cancelTable() {
      this.cancel = false;
      this.btnshow = true;
      this.tableShow = true;
      this.hebingShow = false;
    },
   
    // 重置按钮
    reset() {
      this.statusMsg.sysFlag = this.copyStatusMsg;
      this.remark = "";
    } */
  },
  created() {
    this.getInquiry();
    this.loadtitle();
    this.getyeartime();
    this.getATime();
    // this.search()
    // this.getScreen();
  },
  components: {
    Medical
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
}

.leftContent {
  width: 15%;
}

.rightContent {
  width: 85%;
}

.content-left-fold {
  width: 2%;
}

.content-right-fold {
  width: 98%;
}

.top {
  display: flex;
  width: 100%;
}

.left-bck {
  width: 40px;
  /* height: 100%; */
  background: #e8f1ff;
}

.left-bck ul {
  padding-left: 18px;
}

.left-bck ul li {
  list-style: none;
  font-size: 12px;
  text-align: center;
  width: 20px;
  border: 1px solid #c3d3ed;
  border-radius: 6px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 0px rgba(228, 239, 255, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.5);
  /* border-top-left-radius: 4px; */
  /* border-bottom-left-radius: 4px; */
  line-height: 18px;
  padding: 2px 1px;
  cursor: pointer;
  margin-left: -4px;
}

.active {
  background: white;
}

#fenye {
  background: #c1c1c1;
}

.el-pagination {
  padding: 10px 18px;
  text-align: left;
}

.right-ctn {
  width: calc(100% - 40px);
}

.right-ctn .topView {
  width: 100%;
  height: 100px;
  background-color: #eee;
  position: relative;
}
.right-ctn .topView .dataView {
  position: absolute;
  bottom: 0;
  left: 10px;
  font-size: 14px;
}
.right-ctn .topView .dataView span {
  margin-left: 10px;
}
.topView .special {
  position: absolute;
  bottom: 0;
  right: 30px;
  font-size: 14px;
}
.topView .special i {
  font-size: 26px;
  color: #f00;
}
.right-ctn .database {
  width: 1000px;
  white-space: nowrap;
  /* position: relative; */
  overflow: auto;
}
.right-ctn .database table {
  border-collapse: collapse;
  border: 1px solid #aaa;
}
.right-ctn .database table .tdclass {
  color: #f00;
  font-size: 22px;
}
.plus,
.remove {
  font-size: 20px;
  color: #409eff;
  cursor: pointer;
  position: absolute;
  z-index: 999;
}
.plus {
  top: 4px;
  left: 6px;
}
.remove {
  top: 4px;
  left: 16%;
}
.upText {
  position: absolute;
  background: #fff;
  left: 46%;
  top: 17%;
  z-index: 999;
  width: 140px;
  height: 200px;
  overflow: auto;
  margin-top: 10px;
  padding: 0;
  text-align: left;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.upText li {
  font-size: 14px;
  margin-bottom: 2px;
  color: #606266;
  padding: 0 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 34px;
}
.Liactive:hover {
  cursor: pointer;
  background-color: #aaaaaa;
}

.right-ctn-title {
  width: 100%;
  height: 40px;
  text-align: left;
  padding-left: 20px;
}

.right-ctn-title span {
  font-size: 14px;
  line-height: 40px;
}

.el-radio {
  font-weight: normal;
  margin-left: 5px;
}

/*bottom视图*/
.noMsg {
  color: rgb(144, 147, 153);
  font-size: 14px;
  line-height: 250px;
}
.bottom {
  border-top: 10px solid #e8f1ff;
  display: flex;
}

.bottom-left {
  width: 40%;
  height: 300px;
  border-left: 5px solid #e8f1ff;
  border-right: 2px solid #e8f1ff;
}

.bom-left-title {
  width: 100%;
  background: #e8f1ff;
  height: 30px;
  position: relative;
  border-bottom: 1px solid #c3d3ed;
}

.bom-left-title div {
  font-size: 12px;
  position: absolute;
  line-height: 29px;
  padding: 0 5px;
}

.bom-left-title div:nth-child(1) {
  left: 10px;
  background: white;
  border: 1px solid #c3d3ed;
  border-bottom-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.bom-left-title div:nth-child(2) {
  right: 150px;
  background: #b5b5b5;
  border-radius: 4px;
  color: white;
}

.bom-left-title div:nth-child(3) {
  right: 80px;
  background: #b5b5b5;
  border-radius: 4px;
  color: white;
}

.bom-left-title div:nth-child(4) {
  right: 10px;
  background: #b5b5b5;
  border-radius: 4px;
  color: white;
}

.bom-left-title-div-active {
  background: #f47b1d !important;
}

.bom-left-title img {
  position: absolute;
  width: 20px;
  top: 5px;
}
.remark {
  float: left;
  margin: 10px 0 0 10px;
  width: 80%;
}
.beizhu {
  display: flex;
  justify-content: space-around;
}

.beizhu p {
  margin: 6px 0 0 10px;
  width: 20%;
}

.bottom-right {
  width: 60%;
}
.bottom-right .cutmoney {
  color: #f00;
}

/* .exAmount {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
} */
.exAmount .exOther {
  width: 150px;
  text-align: left;
  float: left;
}
.exAmount span {
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
  color: #606266;
}

p {
  font-size: 12px;
  margin: 0;
  padding: 0;
}

.border {
  width: 125%;
  margin-left: -20px;
  height: 1px;
  margin-top: 10px;
  background: #c3d3ed;
}

/*展开*/
.screenHeader {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #e8f1ff;
}

.screenHeader p:nth-child(1) {
  width: 50%;
  padding-left: 10px;
  text-align: left;
}

.screenHeader p:nth-child(2) {
  width: 50%;
  text-align: right;
  padding-right: 10px;
}

.screenHeader p:nth-child(3) {
  width: 50%;
  text-align: right;
}

.screenHeader p {
  font-size: 12px;
  line-height: 30px;
  margin: 0;
}

.screenButton {
  width: 15%;
  border: 0;
}

.transition-box {
  width: 80%;
  text-align: center;
  box-sizing: border-box;
  margin-left: 10%;
}

.transition-box p {
  text-align: left;
  padding: 10px 0;
}

.leixingSelect {
  margin-bottom: 10px;
}

.hosptDataSel {
  width: 100%;
}

.shijianlianjie {
  text-align: center !important;
}

.upText {
  width: 160px;
  height: 200px;
  overflow: auto;
  margin-top: 10px;
  padding: 0;
  text-align: left;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
