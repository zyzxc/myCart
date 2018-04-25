new Vue({
    el: '#example-1',
    data() {
        return {
            show: true
        }
    }
})

new Vue({
    el: '#example-2',
    data: {
        show: true
    }
})
new Vue({
    el: '#flip-list-demo',
    data: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    methods: {
        shuffle: function () {
            this.items = _.shuffle(this.items)
        }
    }
})

new Vue({
    el: '#list-complete-demo',
    data: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10
    },
    methods: {
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1)
        },
        shuffle: function () {
            this.items = _.shuffle(this.items)
        }
    }
})