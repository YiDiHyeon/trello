<template>
  <j-row>
    <div class="card">
      <div class="title">
        <b> 111</b>
      </div>
      <div class="contents mg-t-10">
        <span> 222</span>
        <div class="btn-wrap">
          <button class="btn gray mg-l-10">Del</button>
          <button class="btn gray mg-l-10">Modi</button>
        </div>
      </div>
    </div>
  </j-row>
</template>

<script>
import JRow from '@/components/layout/j-row'
export default {
  name: 'CardItem',
  components: { JRow },
}
</script>

<style scoped></style>
