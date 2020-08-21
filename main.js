var app = new Vue({
    el: '#app',
    data: {
        product: 'Лента Новостей',
        isTile: false
    },
    methods: {
        isShowTile() {
          this.isTile = true
          console.log(this.isTile)
        },
        isShowList() {
            this.isTile = false
            console.log(this.isTile)
        }
    }
})