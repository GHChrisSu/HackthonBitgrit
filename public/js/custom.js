/* Show and hide menu */

$(document).ready(function () {

    'use strict';

    $(window).scroll(function () {

        'use strict';

        if ($(window).scrollTop() < 80) {

            $('.navbar').css({
                'margin-top': '-100px',
                'opacity': '0'

            });

            $('.navbar-default').css({
                'background-color': 'rgba(59, 59 , 59, 0)'

            });

        } else {

            $('.navbar').css({
                'margin-top': '0px',
                'opacity': '1'

            });

            $('.navbar-default').css({
                'background-color': 'rgba(59, 59 , 59, 0.7)',
                'border-color': '#444'

            });

            $('.navbar-brand img').css({
                'height': '35px',
                'padding-top': '0px'

            });

            $('.navbar-nav > li > a ').css({
                'padding-top': '15px'


            });


        }


    });


});

//add smooth scrolling
$(document).ready(function () {

    'use strict';


    $('.nav-item, #scroll-to-top').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });


});

/* active menu item on click */
$(document).ready(function () {

    'use strict';


    $('.navbar-nav li a').click(function () {

        'use strict';

        $('.navbar-nav li a').parent().removeClass("active");

        $(this).parent().addClass("active");

    });
});

// highlight menu item on scroll
$(document).ready(function () {

    'use strict';

    $(window).scroll(function () {

        'use strict';

        $("section").each(function () {

            'use strict';

            var bb = $(this).attr("id");  // ABOUT, CONTACT, DOWNLOAD
            var hei = $(this).outerHeight();
            var grttop = $(this).offset().top - 70;

            if ($(window).scrollTop() > grttop && $(window).scrollTop() < grttop + hei) {

                $(".navbar-nav li a[href='#" + bb + "']").parent().addClass("active");

            } else {
                $(".navbar-nav li a[href='#" + bb + "']").parent().removeClass("active");

            }


        });


    });


});

// add auto padding to header

$(document).ready(function () {

    'use strict';

    setInterval(function () {

        'use strict';

        var windowHeight = $(window).height();

        var containerHeight = $(".header-container").height();

        var padTop = windowHeight - containerHeight;

        $(".header-container").css({

            'padding-top': Math.round(padTop / 2) + 'px',
            'padding-bottom': Math.round(padTop / 2) + 'px'

        });


    }, 10)


});

// Add bx slider to screens
$(document).ready(function () {

    $('.bxslider').bxSlider({

        slideWidth: 292.5,
        auto: true,
        minSlides: 1,
        maxSlides: 3,
        slideMargin: 50
    });

});


// Add counter
$(document).ready(function () {

    $('.counter-num').counterUp({
        delay: 10,
        time: 2000
    });

    $("#buy-ip-copyright").click(function () {
        dosomething();
    });
});


window.addEventListener('load', function () {
    // 检查web3是否已经注入到(Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // 使用 Mist/MetaMask 的提供者
        console.log("web3 new Instance");
        web3 = new Web3(web3.currentProvider);
    } else {
        alert("安装 MetaMask");
    }

})

function dosomething() {
    // 获取当前metamask上激活的账户
    var userAccount = web3.eth.accounts[0];
    var toAccount = "0x5fA7241620B064bDBDcd8C14e3A1C0b1e5266521";
    if (typeof userAccount !== 'undefined') {
        // 当前用户余额是否大于费用
        var price = $("#price").val();
        var rate = $("#rate").val();
        var accountBalance;
        var didPrivateKey;
        var did;
        web3.eth.getBalance(userAccount, (error, balance) => {
            if (error) return;
            accountBalance = balance.c[0];
            if (accountBalance < price * (10000)) {
                alert("余额不足");
            } else {
                // 调用did接口生成新的did
                $.ajax({
                    type: "GET",
                    url: "http://18.179.20.67:8080/api/1/did",
                    success: function (resp) {
                        // console.log(resp);
                        var jsonResult = JSON.parse(resp);
                        didPrivateKey = jsonResult.result.privateKey;
                        publicKey = jsonResult.result.publicKey;
                        did = jsonResult.result.did;

                    },
                    error: function (e) {
                        alert('出问题了' + e);
                    }
                });

                // setdidInfo
                // var setDidInfoData = ;
                // 设定didinfo，返回txid
                $.ajax({
                    type: "POST",
                    url: "http://18.179.20.67:8080/api/1/setDidInfo",
                    contentType: 'application/json;charset=UTF-8',
                    data: {
                        "privateKey": "C740869D015E674362B1F441E3EDBE1CBCF4FE8B709AA1A77E5CCA2C92BAF99D",
                        "settings": {
                            "privateKey": "E763239857B390502289CF75FF06EEEDC3252A302C50E1CBB7E5FAC8A703486F",
                            "info": {
                                "family": {
                                    "child": 4000,
                                    "money": 10000,
                                    "history": "hey myfriend,watch your language"
                                }
                            }
                        }
                    },


                    // {
                    //    "privateKey": "4439D27F693591C17EF3358BA6DD8D2B0598F62C24959E9DB926C7B4730679D8",
                    //    "settings": {
                    //      "privateKey": "ACDD5F69072C3A9D4BE09FECCD1A2EDF95412AF343917C13398B3945ECDFE91B",
                    //      "info": {
                    //        "ACDD5F69072C3A9D4BE09FECCD1A2EDF95": {
                    //          "child": 4000,
                    //          "money": 10000,
                    //          "history": ["hello","how","what"]
                    //        }
                    //      }
                    //    }
                    //  },
                    success: function (resp) {
                        console.log(resp);
                    },
                    error: function (e) {
                        alert('出问题了' + e);
                    }
                });
            }
        });

        // 转账
        // transfer(userAccount, toAccount, price);

        // 通过调用智能合约把关键信息保存进以太坊
        // saveInfoToEtherum();

    } else {
        alert("请登录metamask");
    }
}

function transfer(fromAccount, toAccount, amount) {
// 对输入的数字做一个检查
    if (web3.isAddress(fromAccount) &&
        web3.isAddress(toAccount) &&
        amount != null && amount.length > 0) {
        var message = {from: fromAccount, to: toAccount, value: web3.toWei(amount, 'ether')};

        web3.eth.sendTransaction(message, (err, res) => {
            var output = "";
            if (!err) {
                output += res;
                console.log(output);
            } else {
                output = "Error";
            }
        });
    }
}

function saveInfoToetherum() {
    // 实例化 myContract
    var myContract = new web3js.eth.Contract(myABI, myContractAddress);
    myContract.methods.myMethod(123).call();
    // 这将需要一段时间，所以在界面中告诉用户这一点
    // 事务被发送出去了
    $("#txStatus").text("正在区块链上创建僵尸，这将需要一会儿...");
    // 把事务发送到我们的合约:
    return cryptoZombies.methods.createRandomZombie(name)
        .send({from: userAccount})
        .on("receipt", function (receipt) {
            $("#txStatus").text("成功生成了 " + name + "!");
            // 事务被区块链接受了，重新渲染界面
            getZombiesByOwner(userAccount).then(displayZombies);
        })
        .on("error", function (error) {
            // 告诉用户合约失败了
            $("#txStatus").text(error);
        });
}

// Add animation/ Initialize Woo
$(document).ready(function () {

    'use strict';

    new WOW().init();

});
