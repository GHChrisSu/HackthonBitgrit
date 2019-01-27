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
});

window.addEventListener('load', function () {
    // 检查web3是否已经注入到(Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // 使用 Mist/MetaMask 的提供者
        console.log("web3 new Instance");
        web3js = web3.currentProvider;
    } else {
        alert("Please install MetaMask!");
    }
    web3 = new Web3(web3js);
    startApp();
    $("#buy-ip-copyright").click(function () {
        buyIpCopyright();
    });
});

var contract;
function startApp() {
    var contractAddress = "0x520a56cef858bfd92d9e80a45715f0144d974fe8";
    contract = web3.eth.contract(Contract_ABI, contractAddress);
}

function buyIpCopyright() {
    // 获取当前metamask上激活的账户
    var userAccount = web3.eth.accounts[0];
    var ipOwner = '0x23C9b93B1b73Ad6002D2e41f73D1d956dECdAD3B';
    // var ISBN = '0xdfa57c542fea29ed292cef0ce135d0e22189365fa59abedc7a310b751ace684f';
    if (typeof userAccount !== 'undefined') {
        // 当前用户余额是否大于费用
        var price = $("#price").val();
        var accountBalance;
        web3.eth.getBalance(userAccount, (error, balance) => {
            if (error) return;
            accountBalance = balance.c[0];
            if (accountBalance < price * (10000)) {
                alert("余额不足");
            } else {
                // send the transaction
                transfer(userAccount, ipOwner, price);
                // contract.abi.buyIP(ipOwner, web3.fromAscii('aa')).send({ from: userAccount, value: 100 });
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

// Add animation/ Initialize Woo
$(document).ready(function () {

    'use strict';

    new WOW().init();

});
