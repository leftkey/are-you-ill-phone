<template>
  <div class="hello">
    <div class="loadIcon" v-show="isLoad">
      <mu-circular-progress :size="90" color="#90a4ae" :strokeWidth="5"/>
      <br>
      <span class="loadTxt">
         没看到老子在玩命加载吗...
      </span>
    </div>
  
    <div class="demo-infinite-container" v-show="isShow">
        <mu-list>
          <mu-sub-header>Hey！病了么？病了别扛，吃点药！</mu-sub-header>
          <mu-list-item :title="drug.list_name" v-for="(drug,index) in drugs" :key="drug.list_id"  :to="/detail/+drug.list_id">
            <mu-avatar :src="drug.list_img" slot="leftAvatar"/>
            <span slot="describe">
              <span style="color:red;font-weight:bold;">￥{{drug.list_price}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<del style="color:#ccc;">￥{{drug.list_oldprice}}</del></span><br/>{{drug.list_des}}
            </span>
          </mu-list-item>
        </mu-list>
        <mu-infinite-scroll class="txt" :loading="loading" @load="loadMore" :loadingText="loadTxt"/>
    </div>
  </div>
</template>

<script>
import qs from "qs"
import axios from "axios"
export default {
  name: 'hello',
  data () {
    return {
      isLoad: true,
      isShow:false,
      drugs:[],
      start:0,
      num:30,
      total:0,
      loading: false,
      loadTxt:"别急,慢慢刷,药多着呢...",
      classname:'',
      keyword:'',
      isLoadMore:true
    }
  },
  methods:{
    getData(dateUrl,start,num,classname,keyword){
      var that=this;
      var myAjax = axios.create({
        baseURL:dateUrl,
        // headers: {'Content-Type':'application/json'}
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
      });
      myAjax({
          method:"post",
          url:'./Drugs',
          // headers:{'Content-Type':'application/json'},
          data: qs.stringify({  //转换发送的格式,否则为字符串拼接样式
              start:start,
              num:num,
              class:classname,
              keyword:keyword
          })
      }).then(function(res){
        console.log(res.data.data);
        if(res.data.code==1){
          if(res.data.data.length<=0){
            that.loading=true;
            that.isLoad=false;
            that.isShow=true;
            document.getElementsByClassName("mu-circle-spinner")[1].style.display="none";
            that.loadTxt="无药可救...";
          }else{
            that.isLoad=false;
            that.isShow=true;
            document.getElementsByClassName("mu-circle-spinner")[1].style.display="block";
            that.drugs=that.drugs.concat(res.data.data);
            that.start+=num;
            that.loading=false;
            that.loadTxt="别急,慢慢刷,药多着呢...";
          }
          that.total=that.drugs.length;
          that.isLoadMore=true
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    loadMore(){
      console.log("总数"+this.total)
      console.log("起始数"+this.start)
      console.log("个数"+this.num)
      if(this.start==0){
        return false;
      }
      if(this.isLoadMore){
        this.loading=true;
        this.getData(this.dateUrl,this.start,this.num,this.classname,this.keyword) 
      }
      
    }
  },
  mounted(){
    console.log("参数"+this.$route.params.keyword)
    this.keyword=this.$route.params.keyword==undefined?"":this.$route.params.keyword;
    if(this.keyword==""){
      this.$parent.search="";
    }
    this.getData(this.dateUrl,this.start,this.num,this.classname,this.keyword)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin-top:56px;
  margin-bottom:56px;
}
.loadIcon{
  margin-top: 150px;
}
.loadTxt{
  color:#90a4ae;
  font-size:2rem;
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
.txt{
  color:#ccc;
}
</style>
