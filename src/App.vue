<template>
  <div id="app">
      <mu-appbar title="" style="position:fixed;top:0;left:0;right:0;">
        <mu-icon-button icon="menu" slot="left" label="undocked drawer" @click="open('left')"/>
        <form @submit="demo">
        <mu-text-field icon="search" v-model="search" inputClass="searchInput" class="appbar-search-field" slot="right" hintText="寻医问药"/>
        </form>
      </mu-appbar>
    <transition name="fade">
      <router-view ref="profile" v-on:registandlogin="login"></router-view>
    </transition>    
    
      <mu-paper style="position:fixed;bottom:0;left:0;right:0;">
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
          <mu-bottom-nav-item value="home" title="首页" icon="home" to="/"/>
          <mu-bottom-nav-item value="list" title="药堂" icon="store" to="/list"/>
          <mu-bottom-nav-item value="info" title="个人中心" icon="person" to="/info"/>
          <mu-bottom-nav-item value="about" title="关于" icon="layers" to="/about"/>
        </mu-bottom-nav>
      </mu-paper>
      <div>
        <mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" @close="close('left')">
          <div class="tanchu">
            <div class="logoBar">
              <div class="logo"></div>
              <mu-icon-button icon="close" @click="close('left')" class="closeBtn" color="blue"/>
            </div>
            <div class="face">
                <mu-avatar class='my-face' slot="left" :src="faceUrl" :size="60"/>
                <div class="faceRight">
                  <h2 style="margin-top:12px;">Hi~</h2>
                  <p>{{username}}</p>
                </div>
            </div>
              <mu-menu class="demo-menu-divider" v-if="isLogin">
                <mu-text-field label="账号" v-model="telNum" hintText="请输入手机号" labelClass="labeStyle"hintTextClass="hintStyle" labelFloat/><br/>
                <mu-text-field label="密码" :errorText="errTxt" v-model="password" hintText="请输入密码" labelClass="labeStyle" hintTextClass="hintStyle" type="password" labelFloat/><br/>
                <a href="#/regist"  @click="reg" class="reg">快速注册</a>
                <mu-raised-button @click="denglu" label="登录" class="demo-raised-button"/>
              </mu-menu>
              <mu-list  v-show="settings">
                  <mu-list-item title="密码修改">
                    <mu-icon slot="left" value="vpn_key"/>
                  </mu-list-item>
                  <mu-list-item title="问题反馈">
                    <mu-icon slot="left" value="feedback"/>
                  </mu-list-item>
                  <mu-list-item title="设置">
                    <mu-icon slot="left" value="settings"/>
                  </mu-list-item>
                  <mu-list-item title="帮助">
                    <mu-icon slot="left" value="help_outline"/>
                  </mu-list-item> 
                  <mu-divider />
                  <mu-list-item title="注销" @click="cancel">
                    <mu-icon slot="left" value="power_settings_new"/>
                  </mu-list-item>
              </mu-list>
          </div>
          
        </mu-popup>
      </div>
      <mu-dialog :open="dialog" title="提示">
        确认“药”注销？
        <mu-flat-button label="确定" slot="actions" primary @click="isCancel(0)"/>
        <mu-flat-button label="取消" slot="actions" primary @click="isCancel(1)"/>
      </mu-dialog>
      <div class="zhezhao" v-if="zhezhao"></div>
  </div>
</template>

<script>
import qs from "qs"
import md5 from "js-md5"
import axios from "axios"
export default {
  name: 'app',
  data(){
    return {
      search:"",
      bottomNav: 'home',
      bottomNavColor: 'home',
      leftPopup: false,
      errTxt:"",
      username:"未登录",
      faceUrl:'../static/img/face.jpg',
      telNum:'',
      password:'',
      isLogin:true,
      zhezhao:false,
      settings:false,
      dialog: false
    }
  },
  methods:{
    reg(){
      //去注册
      this.leftPopup=false;
      console.log(111)
    },
    handleChange (val) {
      this.bottomNav = val
    },
    open (position) {
      this[position + 'Popup'] = true
    },
    close (position) {
      this[position + 'Popup'] = false
    },
    denglu(){
      // console.log(this.$children[1].needLogin)
      // this.$children[1].needLogin="已经登录了"
      // this.username="已登录"
      this.login(this.telNum,md5(this.password))
    },
    cancel(){//注销
        //弹出确认注销框
        this.dialog=true;
    },
    isCancel(n){
        //判断是否真的退出
        if(n){
          //取消退出
          this.dialog=false;
        }else{
          //确定退出
          this.isLogin=true//登录框出现
          this.settings=false //setting消失
          this.username="未登录";//用户名未登录
          this.telNum="";//电话清空
          this.password="";//密码清空
          //清除info信息
          if(this.$route.path=="/info"){
            //跳转主页
            console.log(this.$refs.profile);
            this.$refs.profile.loginSuccess("未登录",'../../static/img/face.jpg')
          }
          //清空本地登录信息
          this.$ls.remove("phone");
          this.$ls.remove("pwd");
          this.dialog=false;
        }
    },
    login(phone,pwd){
      var that=this;
      that.leftPopup=true//侧边栏出现
      that.zhezhao=true
      var myAjax = axios.create({
        baseURL:that.dateUrl,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      });
      myAjax({
          method:"post",
          url:'./Login/index',
          data: qs.stringify({
              phone:phone,
              pwd:pwd
          })
      }).then(function(res){
        console.log(res.data.data);
        
        if(res.data.code==1){
          //成功登录,登录并保存登录信息
          that.username=res.data.data.user_name;
          //判断是否有头像
          that.faceUrl=res.data.data.user_face==null?"../static/img/face.jpg":res.data.data.user_face;
          that.$ls.set("phone",phone);   //更新本地用户
          that.$ls.set("pwd",pwd,30*24*60*60*1000); //更新本地密码,设置时效为30天

          //判断是info页还是注册页
          switch(that.$route.path){
            case "/regist":
              that.$router.push({ name: 'Index'});
              that.handleChange("home");
              break;
            case "/info":
              that.$refs.profile.loginSuccess(that.username,that.faceUrl);
              break;
          }

          that.isLogin=false//登录框消失
          that.zhezhao=false//loding消失
          that.settings=true //setting出现
          that.errTxt=""
          that.leftPopup=false//侧边栏消失
        }else if(res.data.code==4){
          that.zhezhao=false//loding消失
          that.errTxt=res.data.data;
        }else{
          that.zhezhao=false//loding消失
          that.errTxt=""
          alert(res.data.data)
        }
   
      })
      .catch(function(err){
        that.zhezhao=false//loding消失
        alert("服务器错误!")
        console.log(err);
      });

    },
    demo(){
      if(this.search!=""){
        var that=this.$refs.profile;
          that.drugs=[];
          that.start=0;
          that.num=30;
          that.classname="";
          that.loading=false;
          that.isLoad=true;
          that.isShow=false;
          that.isLoadMore=false;
        if(this.$route.path!="/list"){
          this.$router.push({ name: 'List', params: { keyword: this.search}})
          this.handleChange("list");
        }else{
          that.keyword=this.search;
          this.$refs.profile.getData(that.dateUrl,that.start,that.num,that.classname,that.keyword)
        }
      }
    }
  },
  created(){
    //提取是否有登录信息,有就自动登录一次
    if(this.$ls.get("phone") && this.$ls.get("pwd")){
       this.login(this.$ls.get("phone"),this.$ls.get("pwd"))
    }
   
    switch(this.$route.path){
      case "/":
        this.handleChange("home");
        break;
      case "/list":
        this.handleChange("list");
        break;
      case "/info":
        this.handleChange("info");
        break;
      case "/about":
        this.handleChange("about");
        break;
      default:
        this.handleChange("list");
    }
    
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  outline: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
}
.zhezhao{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3) url("./assets/img/loading.gif") no-repeat 50%;
  background-size: 25%;
  z-index: 20141999;
}
.appbar-search-field{
  color: #fff;
  margin-bottom: 0;
  &.focus-state {
    color: #FFF;
  }
  .mu-text-field-hint {
    color: fade(#FFF, 54%);
  }
  .mu-text-field-input {
    color: #FFF;
  }
  .mu-text-field-focus-line {
    background-color: #FFF;
  }
}
.searchInput{
  color:#eee;
}
.demo-popup-left {
  display: flex;
  width: 68%;
  max-width: 375px;
  height: 100%;
  align-items: center;
}
.tanchu{
  width: 100%;
  height: 100%;
  background: #ffebee;
}
.logoBar{
  margin-top: 0;
  width: 100%;
  background: #eceff1;
  position: relative;
  height: 48px;
}
.logo{
  width: 80px;
  height: 80%;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
  background: url('../src/assets/logo.png') no-repeat;
  background-size:100% 100%;
}
.closeBtn{
  float:right;
}
.face{
  width: 100%;
  height: 80px;
}
.my-face{
  margin: 10px;
  border: 2px solid #fff;
}
.faceRight{
  width: 60%;
  height: 100%;
  float: right;
}
.mu-text-field{
  width: 200px;
  margin-left: 10px;
}
.labeStyle{
  font-weight: bold;
  color:#212121;
}
.hintStyle{
  color: #9e9e9e;
}
.demo-raised-button{
  background: #64ffda;
  float: right;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}
.mu-menu-list{
  position: relative;
}
.mu-menu-list .reg{
  position: absolute;
  bottom: 5px;
  left: 5px;
  text-decoration: underline;
}
</style>
