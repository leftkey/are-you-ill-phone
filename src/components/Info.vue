<template>
  <div class="hello">
    <mu-paper class="demo-paper" circle :zDepth="2">
      <img :src="face" style="width: 100%;height: 100%;">
    </mu-paper>
    <h2 v-text="needLogin" class="username"></h2>
    <mu-flat-button label="登录去" class="demo-flat-button" @click="login()" secondary v-if="showLogin"/>
    <mu-linear-progress />
    <div v-if="isLogin">
      <mu-flexbox class="mt8">
        <mu-flexbox-item class="flex-demo">
          <mu-flat-button to="/cart" label="购物车" class="demo-flat-button" icon="shopping_cart" iconClass="iconStyle" labelClass="labelStyle"/>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-flat-button to="/order" label="订单" class="demo-flat-button" icon="receipt" iconClass="iconStyle" labelClass="labelStyle"/>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <mu-flat-button to="/steps" label="足迹" class="demo-flat-button" icon="directions_walk" iconClass="iconStyle" labelClass="labelStyle"/>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-list>
        <mu-list-item title="收货地址">
          <mu-icon slot="left" value="room"/>
        </mu-list-item>
        <mu-divider />
        <mu-list-item title="在线客服">
          <mu-icon slot="left" value="perm_phone_msg"/>
        </mu-list-item>
        <mu-divider />
        <mu-list-item title="热门问题">
          <mu-icon slot="left" value="help_outline"/>
        </mu-list-item>
        <mu-divider />
        <mu-list-item title="加盟合作">
          <mu-icon slot="left" value="people"/>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
import "../../static/css/info.css"
export default {
  name: 'hello',
  data () {
    return {
      showLogin:true,
      needLogin: '未登录',
      isLogin:false,
      face:"../../static/img/face.jpg"
    }
  },
  methods:{
    login(){
      this.$parent.leftPopup=true
    },
    loginSuccess(user,face){
      this.needLogin=user;
      this.face=face;
      if(user=="未登录"){
        this.isLogin=false;
        this.showLogin=true;
      }else{
        this.isLogin=true;
        this.showLogin=false;
      } 
    }
  },
  created(){
    console.log(this.$parent.username)
    if(this.$parent.username!="未登录"){
      this.loginSuccess(this.$parent.username,this.$parent.faceUrl)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin-top:56px;
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
.username{
  color:#2196f3;
  text-shadow: 2px -2px 5px #bbdefb;
}
.demo-paper {
  display: inline-block;
  height: 100px;
  width: 100px;
  margin: 20px;
  text-align: center;
  overflow: hidden;
}
.mt8 {
  margin-top: 8px;
}
.flex-demo {
  height: 76px;
  text-align: center;
  line-height: 76px;
}
.demo-flat-button{
  border: 1px solid #e0e0e0;
  width: 70px;
  height: 70px;
}

</style>
