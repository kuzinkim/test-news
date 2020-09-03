var app = new Vue({
    el: '#app',
    data: {
        product: 'Лента Новостей',
        isTile: false,
        posts: [],
        page: 1,
        perPage: 1,
        pages: [],
        isSelected: false
    },
    mounted() {
        const newsElem = document.querySelector('.news')
        
        window.addEventListener('scroll', e => {
            var scrollTop = window.pageYOffset + window.innerHeight
            console.log(scrollTop, newsElem.scrollHeight)
            if(scrollTop >= newsElem.scrollHeight){
                this.loadMore();
            }
        });
    },
    methods: {
        getPosts () {
            axios
            .get('https://dev-kvant-14856-ng.ecosystem-kvant.com/api/H:1D6419D74772A07/P:WORK/B:1D56942E082C9E7/C:1D56DF2707EFEF7/I:PACK?format=json')
            .then(response => this.posts = response.data.$PACK[0].$OBJECT)
        },
        isShowTile() {
          this.isTile = true
          console.log(this.isTile)
        },
        loadMore(){
            this.perPage++
            this.pages = [];
            this.setPages();
        },
        isShowList() {
            this.isTile = false
            console.log(this.isTile)
        },
        setPages () {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  posts.slice(from, to);
        },
        onChangeCount(event) {
            var selectVal = event.target.value;
            this.perPage = selectVal;
            this.pages = [];
            this.setPages()
            localStorage.setItem('count', this.perPage)
        },
        onChange(event) {
            var val = event.target.value
            if(val === 'По дате'){
                this.sortByDate()
            }else{
                this.sortByName()
            }
        },
        sortByDate(){
            this.posts.sort((a,b) => a.date.localeCompare(b.date))
            this.pages = [];
        },
        sortByName(){
            this.posts.sort((a,b) => a.Title.localeCompare(b.Title))
            this.pages = [];
        },
        onChangePage() {
            localStorage.setItem('page', this.page)
        },
        onScrollNewsList() {
            console.log('fse')
        }
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.posts);
        }
    },
    watch: {
        posts () {
            this.setPages();
        }
    },
    created () {
        var currPage = localStorage.getItem('page')
        var currCount = localStorage.getItem('count')

        if(!currPage || !currCount ){
            this.getPosts();
        }else{
            this.getPosts();
            this.page = currPage
            this.perPage = currCount
        }
    }
})