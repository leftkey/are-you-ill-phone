<template>
  <div class="hello">
  		<h3>浏览足迹</h3>
  		<a href="javascript:void(0);" @click="clearls">清除所有足迹</a>
    	<mu-flexbox v-for="(item,index) in steps" :key="index">
    		<mu-flexbox-item order="2" class="flex-demo">
    			<a  :href="'#/detail/'+item.id">
			      <img :src="item.img" alt="" class="step-img">
			      <div class="steps-title">
			      		<h3>{{item.name}}</h3>
			      		<h4><timeago :since="item.date" locale="zh-CN"></timeago>浏览</h4>
			      </div>
			    </a>
			</mu-flexbox-item>
		</mu-flexbox>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      steps:[]
    }
  },
  methods:{
  	clearls(){
  		this.$ls.remove("steps");
  		this.steps=[];
  	}
  },
  mounted(){
  	var steps=JSON.parse(this.$ls.get("steps",'[]'));
  	// console.log(steps)
  	this.steps=steps;
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
.flex-demo{
  height: 88px;
  background-color: #e0efff;
  text-align: center;
  line-height: 32px;
  margin: 5px 0;
}
.step-img{
	width: 25%;
	float: left;
	margin: 4px;
}
.steps-title{
	float: left;
	width: 70%;
	height: 80px;
	margin: 4px;
}
.steps-title h3{
	line-height: 25px;
}
</style>
