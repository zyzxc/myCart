new Vue({
    el: '.container',
    data: {
        limitNum: 3,
        addressList: [],
        currentIndex: 0,
        shopingMethod: 1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function () {
            var _this = this;
            this.$http.get(webRoot + "address/getAddressList").then(res => {
                var _res = res.data;
                if (_res.code == 0) {
                    _this.addressList = _res.result
                }
            })
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (item, index) {
                if (item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        }
    }
})