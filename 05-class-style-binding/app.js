const app = Vue.createApp({
    data () {
        return {
            showBorder : false,
            redBg : false,
            bgColor : "",
            boxClass : "border red"
        };
    },
    computed : {
        boxClasses()
        {
            return {
                border : this.showBorder,
                red : this.redBg
            };
        }
    }

}).mount("#app");