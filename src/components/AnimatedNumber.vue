<template>
  <div>
  {{displayNumber}}
</div>
</template>
<script>
export default {
  props:{'number':{default:0}},
  data: function(){
      return {
        displayNumber:0,
        interval:false
      }
    },
    ready:function(){
      this.displayNumber = this.number ? this.number : 0;
    },
    watch:{
      number: function(){
        clearInterval(this.interval);
          if(this.number == this.displayNumber){
            return
          }
          this.interval = window.setInterval(function(){
            if(this.displayNumber != this.number){
              var change = (this.number - this.displayNumber) / 10;
              change = change >= 0 ? Math.ceil(change) : Math.floor(change);
              this.displayNumber = this.displayNumber + change;
            }
          }.bind(this), 20)
      }
    }
}
</script>