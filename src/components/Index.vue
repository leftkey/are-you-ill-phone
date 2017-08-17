<template>
  <div class="hello">
    <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
      <!-- slides -->
      <swiper-slide><img src="../../static/img/timg (2).jpg"></swiper-slide>
      <swiper-slide><img src="../../static/img/timg.jpg"></swiper-slide>
      <swiper-slide><img src="../../static/img/timg (3).jpg"></swiper-slide>
      <swiper-slide><img src="../../static/img/timg (1).jpg"></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <div class="gridlist-demo-container" v-for="item in lists">
      <mu-grid-list class="gridlist-demo">
        <mu-sub-header>{{item.title}}新药</mu-sub-header>
        <mu-grid-tile v-for="tile,index in item.classlist" :key="'tile' + index" titlePosition="top" actionPosition="left" :rows="tile.featured ? 2 : 1" :cols="tile.featured ? 2 : 1">
          <!-- <router-link >     -->
            <img :src="tile.list_img"/>
            <span slot="title">{{tile.list_name}}</span>
            <span slot="subTitle">价格： <b style="color:#f44336;">￥：{{tile.list_price}}</b></span>
            <mu-icon-button icon="pages" slot="action" :to="'/detail/'+tile.list_id"/>
          <!-- </router-link>   -->
        </mu-grid-tile>
      </mu-grid-list>
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
      swiperOption: {
          notNextTick: true,
          loop:true,
          autoplay: 2000,
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
            // console.log(swiper)
          }
      },
      lists:[
        {
          title:"补益用药",
          classlist:[]
        },
        {
          title:"肝胆科",
          classlist:[]
        }
        ,
        {
          title:"内分泌科",
          classlist:[]
        }
        ,
        {
          title:"皮肤科",
          classlist:[]
        }
        ,
        {
          title:"肿瘤科",
          classlist:[]
        }
      ]
    }
  },
  methods:{
    indexData(n){
        var that=this;
        var myAjax = axios.create({
          baseURL:that.dateUrl,
          headers: {'Content-Type':'application/x-www-form-urlencoded'}
        });
        myAjax({
            method:"post",
            url:'./Drugs/index',
            data: qs.stringify({
                class:that.lists[n].title,
                start:0,
                num:5
            })
        }).then(function(res){
          console.log(res.data.data);
          that.lists[n].classlist=res.data.data
          that.lists[n].classlist[0].featured=true
     
        })
        .catch(function(err){
      
        });
    }
  },
  mounted(){
    this.lists.map((k,v)=>{
      this.indexData(v)
    })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin-top:56px;
  margin-bottom:60px;
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
.mySwiper{
  width: 100%;
}
.swiper-slide{
  height: 200px;
}
.swiper-slide img{
  width: 100%;
  height: 100%;
}
.mu-grid-tile img{
  width: 100%;
  height: 100%;
}
</style>
