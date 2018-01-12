new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct: []
    },
    filters: {
        formatMoney: function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    created: function () {
        this.cartView();
    },
    methods: {
        cartView: function () {
            this.$http.get("data/cartData.json").then(res => {
                //this.totalMoney = res.data.result.totalMoney;
                this.productList = res.data.result.list;
            })

        },
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else if (way < 0) {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectProduct: function (product) {
            if (typeof product.checked == 'undefined') {
                // Vue.set(product, "checked", true);
                this.$set(product, "checked", true);
            } else {
                product.checked = !product.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (value, index) {
                if (typeof value.checked == 'undefined') {
                    _this.$set(value, "checked", _this.checkAllFlag);
                } else {
                    value.checked = _this.checkAllFlag;
                }
            })
            _this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
})

Vue.filter("money", function (value, type) {
    return "￥" + value.toFixed(2) + type;
})