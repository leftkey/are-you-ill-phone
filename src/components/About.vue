<template>
  <div class="hello">
    <mu-sub-header>关于我们</mu-sub-header>
  <mu-content-block v-html="txt">
  </mu-content-block>
    <img src="../assets/logo.png" width="100" alt="">
    <h3>版本号：{{version}}</h3>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      txt:"<p style='text-indent: 2em;'>“病了么”是一个集医疗保健和健康咨询为一身的家中常备APP，炫酷的UI设计和人性化的用户体验在逼格上远远高于其他同类型的APP。</p><p style='text-indent: 2em;'>不仅如此，丰富的药物选择、专业的药理咨询，定期的在线诊断成为“病了么”的一大亮点。</p><p style='text-indent: 2em;'>当然你会认为这么牛逼的APP背后一定有一个强大开发团队吧，你要这么想，那么你就错了，这个开发就老子一个人，O(∩_∩)O哈哈~~~</p><p style='text-indent: 2em;'>最后说一句，病了请想起“病了么”，医闹滚粗！！！</p>",
      version: '1.0.0'
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
</style>
