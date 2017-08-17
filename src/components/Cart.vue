<template>
  <div class="hello">
	  <div v-if="isCart">
	  		<mu-flexbox>
				<mu-flexbox-item class="flex-demo">
				      <mu-icon-button :icon="checkAll" :class="allColor" class="checkAll" @click="choiceAll"/>
				</mu-flexbox-item>
			</mu-flexbox>
			<mu-divider />
			<div v-for="(item,index) in cart" :key="index">
			    <mu-flexbox class="mt8">
				   <mu-flexbox-item class="flex-demo flex1">
				      <mu-checkbox class="demo-checkbox" @input="zongji(list)" v-model="list" :nativeValue="String(item.id)"/>
				   </mu-flexbox-item>
				   <mu-flexbox-item class="flex-demo flex2">
				   	  <a :href="'#/detail/'+item.id">
					      <img :src="item.img" alt="" class="fleximg">
					      <div class="flexname">
					      		{{item.name}}
					      </div>
				      </a>
				   </mu-flexbox-item>
				   <mu-flexbox-item class="flex-demo flex3">
				      <p class="flexprice">单价￥：{{item.price}}</p>
				      <div class="flexnum">
				      	<button @click="jisuan('jian',item)">-</button><input type="text" readonly v-model="item.num"><button @click="jisuan('jia',item)">+</button>
				      </div>
				   </mu-flexbox-item>
				</mu-flexbox>	
				<mu-divider />			
			</div>
			<mu-flexbox class="mt8">
				<mu-flexbox-item class="flex-demo total">
				      总计：￥{{total}}
				</mu-flexbox-item>
				<mu-flexbox-item class="flex-demo">
				      <mu-raised-button label="结算" class="demo-raised-button"/>
				</mu-flexbox-item>

			</mu-flexbox>
	  </div>
	  <div v-else>
	  		<mu-paper class="demo-paper" :zDepth="2">
		      	你的药呢？
		    </mu-paper>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      	isCart:false,
      	cart:[],
      	list:[],
      	checkAll:"check_box_outline_blank",
      	allColor:"nochoice",
      	total:'0.00'
    }
  },
  methods:{
  	zongji(arr){
  		this.total=0;
  		for(var i=0;i<arr.length;i++){
  			for(var j=0;j<this.cart.length;j++){
  				if(this.cart[j].id==arr[i]){
					this.total+=this.cart[j].price*this.cart[j].num
  				}
  			}	
  			
  		}
  		this.total=this.total.toFixed(2)
  		this.ischangAll()
  	},
  	setLs(cart){
  		if(cart.length==0){
  			this.isCart=false;
  		}
  		this.$ls.set('cart', JSON.stringify(cart));
  	},
  	choiceAll(){
  		this.list=[];
  		if(this.checkAll=="check_box"){
			this.checkAll="check_box_outline_blank"
			this.allColor="nochoice"
  		}else{
  			this.checkAll="check_box"
  			this.allColor="yeschoice"
  			for(var i=0;i<this.cart.length;i++){
  				this.list.push(this.cart[i].id)
  			}
  		}
  	},
  	ischangAll(){
  		if(this.list.length==this.cart.length){
  			this.checkAll="check_box"
  			this.allColor="yeschoice"
  		}else{
  			this.checkAll="check_box_outline_blank"
			this.allColor="nochoice"
  		}
  	},
  	jisuan(fuhao,obj){
  		switch(fuhao){
  			case "jia":
  				// obj.num++;
  				
  				for(var i=0;i<this.cart.length;i++){
  					if(this.cart[i].id==obj.id){
  						this.cart[i].num++;
  					}
  				}
  			break;
  			case "jian":
  				if(obj.num<=1){//去除
  					var n=this.list.indexOf(String(obj.id))
  					if(n>-1){//勾选了
	  					//
	  					this.list.splice(n,1);
	  				}
	  				//删除购物车里的
	  				for(var k=0;k<this.cart.length;k++){
	  					if(this.cart[k].id==obj.id){
	  						this.cart.splice(k,1);
	  					}
	  				}
  				}else{
  					for(var i=0;i<this.cart.length;i++){
	  					if(this.cart[i].id==obj.id){
	  						this.cart[i].num--;
	  					}
	  				}
  				}		
  			break;
  		}
  		this.zongji(this.list)
  		this.setLs(this.cart)
  	}
  },
  mounted(){
  	var cart=this.$ls.get("cart","[]");
  	// console.log(cart)
  	if(cart=="[]"){
  		this.isCart=false
  	}else{
  		this.isCart=true
  		this.cart=JSON.parse(cart);
  		// console.log(cart)
  	}	
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
.checkAll{
	float: left;
}
.nochoice{
	color: #7e848c;
}
.yeschoice{
	color:#ff5252;
}
.checkAll::after{
	content:"全部";
	position: absolute;
	font-size: 16px;
	top: 16px;
	left: 40px;
	width: 48px;
}
.flex-demo {
  /* height: 32px; */
  /* background-color: #e0e0e0; */
  text-align: center;
  line-height: 32px;
}
.mt8{
	margin: 5px 0;
}
.flex1{}
.flex2{
	border-left: 1px solid #e0e0e0;
	margin-left: 0 !important;
	flex:4 1 auto !important;
}
.flex3{
	border-left: 1px solid #e0e0e0;
	margin-left: 0 !important;
	flex:2 1 auto !important;
}
.demo-paper {
  display: inline-block;
  height: 100px;
  width: 260px;
  margin: 20px;
  text-align: center;
  line-height: 100px;
  font-size: 40px;
  letter-spacing: 10px;
  font-weight: bold;
  color:#ffa000;
  text-shadow: 5px 5px 5px #ffab91;
}
.fleximg{
	float: left;
	height:70px;
	width: 70px;
}
.flexname{
	height: 70px;
	line-height: 20px;
	padding-top: 8px;
}
.flexprice{
	height: 25px;
	font-size:14px;
	letter-spacing:-1px;
}
.flexnum{
	height: 45px;
}
.flexnum button,.flexnum input{
	margin-top: 15px;
	height: 25px;
	border:0;
	float: left;
	text-align: center;
	line-height: 25px;
}
.flexnum button{
	width: 28%;
	font-size: 20px;
	background: #e0f7fa;
}
.flexnum button:active{
	background: #b2ebf2;
}
.flexnum input{
	border-top: 1px solid #e0f7fa;
	border-bottom: 1px solid #e0f7fa;
	height: 25px;
	width: 40%;
}
.total{
	text-align: left;
	text-indent: 5px;
	color:red;
	font-weight: bold;
	font-size: 18px;
}
</style>
