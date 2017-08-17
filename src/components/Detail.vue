<template>
  <div class="hello">
      <mu-flat-button @click="goBack" label="返回" class="demo-flat-button" icon="keyboard_backspace" mini color="#e8eaf6"/>
      <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(drugImage,index) in drugImages" :key="index"><img :src="drugImage"></swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"><mu-icon color="#18ffff" value="navigate_before" :size="30"/></div>
        <div class="swiper-button-next" slot="button-next"><mu-icon color="#18ffff" value="navigate_next" :size="30"/></div>
      </swiper>
      <h3 class="txtStyle">{{drugName}}</h3><br>
      <span class="txtStyle">厂家：{{drugCompany}}</span>
      <div class="des"><p>{{drugDes}}</p></div>
      <div class="txtStyle">
        <div class="newPrice">￥{{drugPrice}}</div>
        <del class="oldPrice">原价：￥{{drugOldPrice}}</del>
        <div class="oldPrice lisheng">立省{{drugOldPrice-drugPrice}}元</div>
      </div>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="商品介绍"/>
      <mu-tab value="tab2" title="说明书"/>
      <mu-tab value="tab3" @active="handleActive" title="商品评价"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'" class="leave">
      <div class="intro" v-html="drugIntroduce"></div>
    </div>
    <div v-if="activeTab === 'tab2'" class="leave">
      <div class="use" v-html="drugUsebook"></div>
    </div>
    <div v-if="activeTab === 'tab3'" class="leave">
      <h2>Tab Three</h2>
      <p>
        这是第三个 tab
      </p>
    </div>
    <mu-flexbox class="buy" :gutter='gutter'>
      <mu-flexbox-item class="flex-demo">
        <a href="tel:15052929215" class="tel"><mu-icon value="phone" :size="40"/></a>
      </mu-flexbox-item>
      <mu-flexbox-item class="flex-demo" grow="2">
        <a href="javascript:void(0);" class="cart" ref="addCart" @click="add(drugId,drugName,drugImg,drugPrice)">加入购物车</a>
        <mu-tooltip label="+1"  :trigger="trigger" :show="addShow" verticalPosition="top" horizontalPosition="center"/>
      </mu-flexbox-item>
      <mu-flexbox-item class="flex-demo" grow="2">
        <a href="javascript:void(0);" class="nowBuy">立即购买</a>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
import qs from "qs"
import axios from "axios"
import "../../static/css/detail.css"
export default {
  name: 'hello',
  data () {
    return {
      drugName: '',//药品名称
      drugIntroduce: '',//商品介绍
      drugOldPrice: 0, //原价
      drugPrice: 0, //现价
      drugDes: '',//描述
      drugClass: '',//科目
      drugUsebook:'', //说明书
      drugCurrency:'',//通用名
      drugCode:'',//国药准字
      drugCompany:'',//厂家
      drugImages:[],//轮播图片
      drugId:NaN,
      activeTab: 'tab1',
      gutter:0,
      trigger:null,
      addShow:false,
      swiperOption: {
          notNextTick: true,
          loop:true,
          autoplay: 2000,
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          initialSlide:1,
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
            // console.log(swiper)
          }
        }
    }
  },
  methods:{
    goBack(){ //返回
      this.$router.go(-1)
    },
    getDataDetail(dateUrl,id){
      var that=this;
      var myAjax = axios.create({
        baseURL:dateUrl,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      });
      myAjax({
          method:"post",
          url:'./Drugs/detail',
          data: qs.stringify({
              drug_id:id
          })
      }).then(function(res){
        console.log(res.data.data);
        if(res.data.code==1){
          var drugDetail=res.data.data
          that.drugName=drugDetail.list_name;
          that.drugIntroduce=drugDetail.detail_introduce;
          that.drugOldPrice=drugDetail.list_oldprice;
          that.drugPrice=drugDetail.list_price;
          that.drugDes=drugDetail.list_des;
          that.drugClass=drugDetail.list_class;
          that.drugUsebook=drugDetail.detail_usebook;
          that.drugCurrency=drugDetail.detail_currency;
          that.drugCode=drugDetail.detail_code;
          that.drugCompany=drugDetail.detail_company;
          that.drugId=drugDetail.list_id;
          that.drugImg=drugDetail.list_img;
          that.drugImages=JSON.parse(drugDetail.detail_images);

            //缓存处理
          var steps=that.$ls.get("steps","[]");
          
          steps=JSON.parse(steps)
          // console.log(steps)
          var d=new Date();
          var addtime=d.getTime();
          var idArr=[];
          for(var i=0;i<steps.length;i++){
              idArr.push(steps[i].id)
          }
          // console.log(idArr)
          if(idArr.indexOf(id)==-1){
            //不存在,添加
            steps.unshift({"id":id,"name":drugDetail.list_name,"img":drugDetail.list_img,"date":addtime})
          }else{
            //存在
            // console.log(id)
            // console.log(idArr.indexOf(id))
            steps[idArr.indexOf(id)].date=addtime;
            // console.log(steps)
          }
          steps.sort(function(a,b){
            // console.log(b.date)
            return b.date-a.date
          });
          // console.log(steps.length)
          if(steps.length>10){
            //如果浏览足迹大于10条,就删除最后一条
            steps.pop()
          }
          that.$ls.set('steps', JSON.stringify(steps));//localstorage缓存
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      window.alert('获取相关评价数据!!')
    },
    add(id,name,img,price){
      var that=this;
      var n=0;
      console.log(id);
      //缓存处理
      var cart=that.$ls.get("cart","[]");
      cart=JSON.parse(cart);

      console.log(cart)
      for(var i=0;i<cart.length;i++){
        if(cart[i].id==id){
          cart[i].num+=1;
          n=1;
        }
      }
      if(!n){
        cart.push({id:id,name:name,img:img,price:price,num:1});
      }
      that.$ls.set('cart', JSON.stringify(cart));
      
      that.addShow=true;
      setTimeout(function(){
        that.addShow=false;
      },500);
    }
  },
  mounted(){
    this.trigger = this.$refs.addCart
    console.log(this.$route.params.drug_id);//获取药品ID
    this.getDataDetail(this.dateUrl,this.$route.params.drug_id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
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
.demo-flat-button{
  float: left;
}
.mySwiper{
  width: 100%;
}
.swiper-slide{
  height: 280px;
}
.swiper-slide img{
  width: 100%;
  height: 100%;
}
.swiper-button-prev,.swiper-button-next{
  height: 30px;
  background: rgba(111,111,111,.3);
  border-radius: 15px;
  top: 30px;
}
.des{
  float: left;
  width: 100%;
}
.des p{
  margin: 0 auto;
  width: 90%;
  text-indent:1.5em;
  color:blue;
  font-size: 12px;
  text-align: left;
}
.txtStyle{
  float: left;
  padding: 5px 0 0 15px;
}
.newPrice{
  float: left;
  color:red;
  font-size: 25px;
  font-weight: bold;
  text-indent: 1em;
}
.oldPrice{
  float: left;
  color:#ccc;
  line-height: 2.5em;
  text-indent: 1.5em;
}
.lisheng{
  font-style: italic;
  color:red;
}
.mu-tabs{
  z-index: 0;
  background: #1a237e;
}
.leave{
  margin-bottom:110px;
  border:1px solid lightblue;
}
.buy{
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 56px;
  left: 0;
}
.flex-demo{
  height: 100%;
}
.flex-demo a{
  width: 100%;
  height: 100%;
  text-align: center;
  display: inline-block;
  border-right:1px solid #505050;
}
.tel{
  padding-top:5px; 
  background: #fff;
  color:#ff4081;
}
.nowBuy{
  padding-top:12px; 
  background: #f44336;
  color:#fff;
  font-size: 18px;
}
.cart{
  padding-top:12px;
  background: #2979ff;
  color:#fff;
  font-size: 18px;
}
.cart:active{
  background: #2979cd;
}
.nowBuy:active{
  background: #f44300;
}
</style>
