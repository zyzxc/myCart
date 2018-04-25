new Vue({
    data: {},
    methods: {
        keyEvent: function (event) {
            alert(event.keyCode)
        },
        warn: function (message, event) {
            if (event) {
                event.preventDefault()
                alert(message)
            }
        }
    }
})