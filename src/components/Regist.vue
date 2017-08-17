<template>
  <div class="regist">
  		<div class="title"></div>
      	<mu-text-field :underlineFocusClass="numLine" :iconClass="numIcon" :errorText="etxt" v-model="phone" hintText="手机号注册" type="number" icon="phone_iphone" @input="checkAll"/><br/>
      	<mu-text-field :underlineFocusClass="pwdLine" :iconClass="pwdIcon" :errorText="ptxt" v-model="pwd" hintText="设置密码" type="password" icon="lock" @input="checkAll"/><br/>
      	<mu-text-field :underlineFocusClass="repwdLine" :iconClass="repwdIcon" :errorText="reptxt" v-model="repwd"  hintText="确认密码" type="password" icon="lock" @input="checkAll"/><br/>
  		<br/>
  		<mu-raised-button @click="subReg" :disabled="isBtn" label="注册" fullWidth backgroundColor="#64ffda"/>

  		<mu-toast v-if="toast" :message="msg" @close="hideToast"/>
  </div>
</template>

<script>
import qs from "qs"
import axios from "axios"
import md5 from "js-md5"
import "../../static/css/regist.css"
export default {
  name: 'hello',
  data () {
    return {
      phone:'',
      pwd:'',
      repwd:'',
      etxt:'',
      numLine:"",
      numIcon:"",
  	  ptxt:"",
  	  pwdLine:"",
      pwdIcon:"",
      reptxt:"",
      repwdLine:"",
      repwdIcon:"",
      isBtn:true,
      toast: false,
      msg:""
    }
  },
  methods:{
  	confirmNum(){
  	var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
		var flag = this.phone.match(reg); //true

		if(!flag){
			this.etxt="手机号格式不正确";
			this.numLine="";
			return false;
		}else{
			this.etxt="";
			this.numLine="lineGreen";
			this.numIcon="iconGreen";
			return true;
		}
		console.log(this.numLine)
  	},
  	confirmPwd(){
  		var reg=/^[a-zA-Z0-9_]{8,16}$/;
  		var flag=this.pwd.match(reg);
  		if(!flag){
  			this.ptxt="8~16位数字、字母、下划线组合";
  			this.pwdLine="";
			return false;
  		}else{
  			this.ptxt="";
  			this.pwdLine="lineGreen";
			this.pwdIcon="iconGreen";
			return true;
  		}
  	},
  	confirmRepwd(){
  		if(this.repwd===this.pwd && this.repwd!=""){
  			this.reptxt="";
  			this.repwdLine="lineGreen";
			this.repwdIcon="iconGreen";
  			return true;
  		}else{
  			this.reptxt="两次密码不一致";
  			this.repwdLine="";
  			return false;
  		}
  	},
  	checkAll(){
  		if(this.confirmNum() && this.confirmPwd() &&this.confirmRepwd()){
  			this.isBtn=false
  		}else{
  			this.isBtn=true
  		}
  	},
    subReg(){
      var that=this;
      that.isBtn=true;
      that.msg="注册中..."
      that.showToast();
      var myAjax = axios.create({
        baseURL:that.dateUrl,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      });
      myAjax({
          method:"post",
          url:'./Regist/index',
          data: qs.stringify({
              phone:that.phone,
              pwd:that.pwd
          })
      }).then(function(res){
        console.log(res.data.data);
        
       	if(res.data.code==1){
       		//成功注册,登录并保存登录信息
          that.msg="注册成功..."
          that.showToast();
          that.$emit("registandlogin",that.phone,md5(that.pwd))
       	}else{
          that.msg=res.data.data;
          that.showToast();
          that.isBtn=false;
       	}
   
      })
      .catch(function(err){
        console.log(err);
      });
    },
	   showToast () {
	      this.toast = true
	      if (this.toastTimer) clearTimeout(this.toastTimer)
	      this.toastTimer = setTimeout(() => { this.toast = false }, 3000)
	    },
	    hideToast () {
	      this.toast = false
	      if (this.toastTimer) clearTimeout(this.toastTimer)
	    }
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.regist{
  margin-top:56px;
  margin-bottom:56px;
  list-style: none;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.title{
	width: 300px;
	height: 90px;
	margin: 0 auto;
	background: url('../assets/img/快速注册.png')0 15px/250% no-repeat;
	/* background-size:250%; */
}
.regist .mu-text-field{
	width: 83%;
	margin-right: 10%;
}

</style>
