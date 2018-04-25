new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct: [],
        hasGoods: "有货"
    },
    filters: {
        formatMoney: function (value, type) {
            return "￥" + value.toFixed(2) + type;
        }
    },
    created: function () {
        this.cartView();
    },
    methods: {
        cartView: function () {
            this.$http.get(webRoot + "goods/getUserCart").then(res => {
                //this.totalMoney = res.data.result.totalMoney;
                this.productList = res.data.result.list;
                this.productList.forEach(function (item, index) {
                    item["productQuantity"] = item["count"];
                })
            })

        },
        changeMoney: function (product, way) {
            if (product.productQuantity > product.amount) {
                this.hasGoods = "货物紧缺";
                return;
            }
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
                    _this.totalMoney += item.price * item.productQuantity;
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