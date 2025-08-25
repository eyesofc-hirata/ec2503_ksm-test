$(function () {

    /////////// Drawer menu

    $('.nav-trigger').on('click', function (event) {
        event.preventDefault();
        if ($('.drawer-open #drawer').size() == 0) {
            $('.overlay').addClass('is-visible');
            $('#wrapper').addClass('drawer-open');
        } else {
            $('#wrapper').removeClass('drawer-open');
            $('.overlay').removeClass('is-visible');
            toggleCart('close')
        }
        return false;
    });

    //open cart form
    $('.cart-trigger').on('click', function (event) {
        event.preventDefault();
        toggleCart();
        $('#wrapper').removeClass('drawer-open');

    });

    //close lateral menu on mobile
    $('.overlay').on('swiperight', function () {
        if ($('#wrapper').hasClass('drawer-open')) {
            $('#wrapper').removeClass('drawer-open');
            $('.overlay').removeClass('is-visible');
        }
    });
    $('.overlay').on('click', function () {
        $('#wrapper').removeClass('drawer-open');
        toggleCart('close')
        $('.overlay').removeClass('is-visible');
    });

    function toggleCart(type) {
        if (type == "close") {
            //close cart
            $('.cart').removeClass('is-visible');
            $('.cart-trigger').removeClass('cart-is-visible');
            $('.overlay').removeClass('cart-is-visible');
        } else {
            //toggle cart visibility
            $('.cart').toggleClass('is-visible');
            $('.cart-trigger').toggleClass('cart-is-visible');
            $('.overlay').toggleClass('cart-is-visible');
            ($('.cart').hasClass('is-visible')) ? $('.overlay').addClass('is-visible') : $('.overlay').removeClass('is-visible');
        }
    }


    /////////// category accordion
    $("#category li .toggle").on('click', function () {
        var togglepanel = $(this).parent('a').next('ul');
        if (togglepanel.css("display") == "none") {
            $(this).parent('a').addClass("active");
            togglepanel.slideDown(300);
        } else {
            $(this).parent('a').removeClass("active");
            togglepanel.slideUp(300);
        }
        return false;
    });

    /////////// アコーディオン
    $(".accordion dl dt").on('click', function () {
        if ($(this).parent('dl').children('dd').css('display') == 'none') {
            $(this).addClass('active');
            $(this).parent('dl').children('dd').slideDown(300);
        } else {
            $(this).removeClass('active');
            $(this).parent('dl').children('dd').slideUp(300);
        }
        return false;
    });

    /////////// スムーススクロール
    $('a.anchor').on('click', function () {
        var speed = 400;//スクロール速度 単位：ミリ秒
        var href = $(this).attr("href");
        var destination = $(href == "#" || href == "" ? 'html' : href);
        var position = destination.offset().top;
        $("html,body").animate({scrollTop: position}, speed, 'swing');
        return false;
    });

    /////////// dropdownの中をクリックしても閉じないようにする
    $(".dropdown-menu").click(function (e) {
        e.stopPropagation();
    });

    /////////// 追従サイドバー + ページトップフェードイン

    // スクロールした時に以下の処理
    $(window).on("scroll", function () {
        // ページトップフェードイン
        if ($(this).scrollTop() > 300) {
            $('.pagetop').fadeIn();
        } else {
            $('.pagetop').fadeOut();
        }

        //PC表示の時のみに適用
        if (window.innerWidth > 767) {

            if ($('#shopping_confirm').length) {

                var side = $("#confirm_side"),
                    wrap = $("#shopping_confirm"),
                    min_move = wrap.offset().top,
                    max_move = min_move + wrap.height() - side.height() - 2 * parseInt(side.css("top")),
                    margin_bottom = max_move - min_move;

                var scrollTop = $(window).scrollTop();
                if (scrollTop > min_move && scrollTop < max_move) {
                    var margin_top = scrollTop - min_move;
                    side.css({"margin-top": margin_top});
                } else if (scrollTop < min_move) {
                    side.css({"margin-top": 0});
                } else if (scrollTop > max_move) {
                    side.css({"margin-top": margin_bottom});
                }

            }
        }
        return false;
    });

    // マスク処理
    $('.prevention-mask').on('click', function() {
        $overlay = $('<div class="prevention-masked">');
        $('body').append($overlay);
    });

    // ダブルクリック禁止
    $('.prevention-btn').on('click', function() {
        $(this).attr('disabled', 'disabled');
        var $form = $(this).parents('form');
        // マスク表示させるためsetTimeoutを使って処理を遅らせる
        setTimeout(function(){
            $form.submit();
        }, 0);
        return false;
    });

});


/////////// ロールオーバー
$.fn.rollover = function () {
    return this.each(function () {
        var src = $(this).attr('src');
        if (src.match('_on.')) return;
        var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1_on$2");
        $('').attr('src', src_on);
        $(this).hover(
            function () {
                $(this).attr('src', src_on);
            },
            function () {
                $(this).attr('src', src);
            }
        );
    });
};

// 画像をロールオーバーする箇所(imgタグ)を指定
$(function () {
    $('.rollover').rollover();
});


/////////// 高さ揃え
/**
 * jquery.matchHeight-min.js v0.6.0
 * http://brm.io/jquery-match-height/
 * License: MIT
 */
(function (c) {
    var n = -1, f = -1, g = function (a) {
        return parseFloat(a) || 0
    }, r = function (a) {
        var b = null, d = [];
        c(a).each(function () {
            var a = c(this), k = a.offset().top - g(a.css("margin-top")), l = 0 < d.length ? d[d.length - 1] : null;
            null === l ? d.push(a) : 1 >= Math.floor(Math.abs(b - k)) ? d[d.length - 1] = l.add(a) : d.push(a);
            b = k
        });
        return d
    }, p = function (a) {
        var b = {byRow: !0, property: "height", target: null, remove: !1};
        if ("object" === typeof a)return c.extend(b, a);
        "boolean" === typeof a ? b.byRow = a : "remove" === a && (b.remove = !0);
        return b
    }, b = c.fn.matchHeight =
        function (a) {
            a = p(a);
            if (a.remove) {
                var e = this;
                this.css(a.property, "");
                c.each(b._groups, function (a, b) {
                    b.elements = b.elements.not(e)
                });
                return this
            }
            if (1 >= this.length && !a.target)return this;
            b._groups.push({elements: this, options: a});
            b._apply(this, a);
            return this
        };
    b._groups = [];
    b._throttle = 80;
    b._maintainScroll = !1;
    b._beforeUpdate = null;
    b._afterUpdate = null;
    b._apply = function (a, e) {
        var d = p(e), h = c(a), k = [h], l = c(window).scrollTop(), f = c("html").outerHeight(!0), m = h.parents().filter(":hidden");
        m.each(function () {
            var a = c(this);
            a.data("style-cache", a.attr("style"))
        });
        m.css("display", "block");
        d.byRow && !d.target && (h.each(function () {
            var a = c(this), b = "inline-block" === a.css("display") ? "inline-block" : "block";
            a.data("style-cache", a.attr("style"));
            a.css({
                display: b,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px"
            })
        }), k = r(h), h.each(function () {
            var a = c(this);
            a.attr("style", a.data("style-cache") || "")
        }));
        c.each(k, function (a, b) {
            var e = c(b), f = 0;
            if (d.target)f =
                d.target.outerHeight(!1); else {
                if (d.byRow && 1 >= e.length) {
                    e.css(d.property, "");
                    return
                }
                e.each(function () {
                    var a = c(this), b = {display: "inline-block" === a.css("display") ? "inline-block" : "block"};
                    b[d.property] = "";
                    a.css(b);
                    a.outerHeight(!1) > f && (f = a.outerHeight(!1));
                    a.css("display", "")
                })
            }
            e.each(function () {
                var a = c(this), b = 0;
                d.target && a.is(d.target) || ("border-box" !== a.css("box-sizing") && (b += g(a.css("border-top-width")) + g(a.css("border-bottom-width")), b += g(a.css("padding-top")) + g(a.css("padding-bottom"))), a.css(d.property,
                    f - b))
            })
        });
        m.each(function () {
            var a = c(this);
            a.attr("style", a.data("style-cache") || null)
        });
        b._maintainScroll && c(window).scrollTop(l / f * c("html").outerHeight(!0));
        return this
    };
    b._applyDataApi = function () {
        var a = {};
        c("[data-match-height], [data-mh]").each(function () {
            var b = c(this), d = b.attr("data-mh") || b.attr("data-match-height");
            a[d] = d in a ? a[d].add(b) : b
        });
        c.each(a, function () {
            this.matchHeight(!0)
        })
    };
    var q = function (a) {
        b._beforeUpdate && b._beforeUpdate(a, b._groups);
        c.each(b._groups, function () {
            b._apply(this.elements,
                this.options)
        });
        b._afterUpdate && b._afterUpdate(a, b._groups)
    };
    b._update = function (a, e) {
        if (e && "resize" === e.type) {
            var d = c(window).width();
            if (d === n)return;
            n = d
        }
        a ? -1 === f && (f = setTimeout(function () {
            q(e);
            f = -1
        }, b._throttle)) : q(e)
    };
    c(b._applyDataApi);
    c(window).bind("load", function (a) {
        b._update(!1, a)
    });
    c(window).bind("resize orientationchange", function (a) {
        b._update(!0, a)
    })
})(jQuery);

// 高さ揃えの要素を指定
$(function () {

    $('.pickup_item').matchHeight({
        byRow: true,
        property: 'height'
    });

    $('.product_item .item_name').matchHeight({
        byRow: true,
        property: 'height'
    });
    $('button.thumbnail').matchHeight({
        byRow: true,
        property: 'height'
    });
    $('#login_box > div').matchHeight({});
});

// anchorをクリックした時にformを裏で作って指定のメソッドでリクエストを飛ばす
// Twigには以下のように埋め込む
// <a href="PATH" {{ csrf_token_for_anchor() }} data-method="(put/delete/postのうちいずれか)" data-confirm="xxxx" data-message="xxxx">
//
// オプション要素
// data-confirm : falseを定義すると確認ダイアログを出さない。デフォルトはダイアログを出す
// data-message : 確認ダイアログを出す際のメッセージをデフォルトから変更する
//
$(function () {
    var createForm = function (action, data) {
        var $form = $('<form action="' + action + '" method="post"></form>');
        for (input in data) {
            if (data.hasOwnProperty(input)) {
                $form.append('<input name="' + input + '" value="' + data[input] + '">');
            }
        }
        return $form;
    };

    $('a[token-for-anchor]').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var data = $this.data();
        if (data.confirm != false) {
            if (!confirm(data.message ? data.message : '削除してもよろしいですか?')) {
                return false;
            }
        }

        var $form = createForm($this.attr('href'), {
            _token: $this.attr('token-for-anchor'),
            _method: data.method
        }).hide();

        $('body').append($form); // Firefox requires form to be on the page to allow submission
        $form.submit();
    });
});


// ページ下部に直書きしていたスクリプトを移行
$(function () {
    $('a[href^="#"]').not(".noscroll").click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - $('header.page-header').outerHeight();
        $("html, body").animate({ scrollTop: position }, speed, "swing");
    });
});

$('.nav-main .nav-item.dropdown').hover(function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
}, function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
});

$(function () {
    $('.nav-main-sp .toggle').on('click', function () {
        if ($('.fas', $(this)).hasClass('open') == true) {
            $('.fas', $(this)).removeClass('fa-minus-circle').addClass('fa-plus-circle').removeClass('open');
        } else {
            $('.fas', $(this)).removeClass('fa-plus-circle').addClass('fa-minus-circle').addClass('open');
        }

        $(this).parent().parent().next().slideToggle();

        return false;
    });
});

// adjust #page-title height, margin and padding
$(window).on('load', function () {
    $('#page-title').css('margin-top', $('.page-header').outerHeight());
    $(window).on('resize', function () {
        $('#page-title').css('margin-top', $('.page-header').outerHeight());
    });

    if ($('#page-title').outerHeight() > 152) {
        $('#page-title').css('padding', '42px 0 41px');
    }
});

$(function () {
    $('.fa-bars').on('click', function () {
        if ($(this).hasClass('fa-times')) {
            $(this).removeClass('fa-times');
            $(this).toggleClass('fa fa-bars');
        } else {
            $(this).removeClass('fa-bars');
            $(this).toggleClass('fa fa-times');
        }
    })
});


// フォームの基本チェック
$(function () {
    // 住所検索
    $('#zip-search').click(function () {
        if($('#page-contact').length) {
            AjaxZip3.zip2addr('zip01', 'zip02', 'contact[pref]', 'contact[city]');
        }
        if($('#page-register').length) {
            AjaxZip3.zip2addr('customer[zip01]', 'customer[zip02]', 'customer[note][pref]', 'customer[note][city]');
        }

        return false;
    });

    // 個人情報チェック
    regalcheck();
    $('#regalcheck').on('change', function() {
        regalcheck();
    });

    function regalcheck() {
        if($('#regalcheck').prop("checked") == true) {
            $('#conf-button').prop("disabled", false);
        } else {
            $('#conf-button').prop("disabled", true);
        }
    }
});

// ログイン画面
$(function () {
    if(!$('#page-login').length) {
        return false;
    }

    const loginEl = document.getElementById('login');
    const recoverEl = document.getElementById('recover');
    const headingEl = document.querySelector('.container-fluid h1');
    const params = new URLSearchParams(window.location.search);
    const isHoujin = params.get('houjin') === '1';

    if(isHoujin) {
        // 法人画面から入った場合はユーザー登録は法人登録確認画面へ飛ばす
        $('#link_register').attr('href','/pages/houjin_register');
        $('#link_register').text('法人会員登録');
    }

    function showSection(section) {
      if (section === 'recover') {
        loginEl.style.display = 'none';
        recoverEl.style.display = 'block';
        if (headingEl) headingEl.textContent = 'パスワードリセット';
        $('.breadcrumb .breadcrumb-item:last-child').text('パスワードリセット');
      } else {
        loginEl.style.display = 'block';
        recoverEl.style.display = 'none';
        if (headingEl) headingEl.textContent = 'ユーザーログイン';
        $('.breadcrumb .breadcrumb-item:last-child').text('ユーザーログイン');
      }
    }

    // 初期表示判定
    const initialHash = location.hash.replace('#', '');
    showSection(initialHash === 'recover' ? 'recover' : 'login');

    // クリック時の切り替え処理
    document.querySelectorAll('a[href="#recover"], a[href="#login"]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').replace('#', '');
        showSection(target);
        history.replaceState(null, '', '#' + target); // URLのハッシュも書き換える
      });
    });
});

// ユーザー登録
$(function () {
    const $target = $('#page-register');
    const $form = $('#form-register');
    const $error_message = $('#error-message');

    if(!$target.length) {
        return false;
    }

    let isScene = 'input';

    // バリデート・入力→確認画面の遷移
    const $ipt = {
        last_name: $('#customer_last_name'),
        first_name: $('#customer_first_name'),
        email: $('#customer_email'),
        email2: $('#customer_email2'),
        password: $('#customer_password'),
        password2: $('#customer_password2'),
        regalcheck: $('#regalcheck')
    };

    const $conf = {
        last_name: $('#conf_customer_last_name'),
        first_name: $('#conf_customer_first_name'),
        email: $('#conf_customer_email')
    };

    const $btn = {
        conf: $('#conf-button'),
        back: $('#back-button'),
        send: $('#send-button')
    };

    const conf = {
        _error: "is-error"
    };

    let errors = [];

    // 確認ボタン
    $btn.conf.on('click', function(){
        let isError = false;
        errors = [];
        $error_message.empty();
        $error_message.removeClass(conf._error);

        // 入力チェック

        ///// 姓
        const _last_name = $ipt.last_name.val().trim();
        $conf.last_name.text(_last_name);
        if (!_last_name) {
            isError = true;
            errors.push('お名前（姓）を入力してください。');
        }

        ///// 名
        const _first_name = $ipt.first_name.val().trim();
        $conf.first_name.text(_first_name);
        if (!_first_name) {
            isError = true;
            errors.push('お名前（名）を入力してください。');
        }

        ///// メールアドレス
        const _email = $ipt.email.val().trim();
        const _email2 = $ipt.email2.val().trim();
        $conf.email.text(_email);
        // 構文チェック用の正規表現
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 入力チェック
        if (!_email) {
            isError = true;
            errors.push('メールアドレスを入力してください。');
        } else if (!emailRegex.test(_email)) {
            isError = true;
            errors.push('メールアドレスの形式が正しくありません。');
        }

        if (!_email2) {
            isError = true;
            errors.push('確認用のメールアドレスを入力してください。');
        } else if (!emailRegex.test(_email2)) {
            isError = true;
            errors.push('確認用のメールアドレスの形式が正しくありません。');
        }

        // 一致チェック
        if (_email && _email2 && _email !== _email2) {
            isError = true;
            errors.push('確認用のメールアドレスが一致しません。');
        }

        ///// パスワード
        const _password = $ipt.password.val().trim();
        const _password2 = $ipt.password2.val().trim();
        if (!_password || !_password2) {
            isError = true;
            errors.push('パスワードを入力してください。');
        } else {
            if (_password !== _password2) {
                isError = true;
                errors.push('パスワードが一致しません。');
            }

            if (_password.length < 6) {
                isError = true;
                errors.push('パスワードは6文字以上で入力してください。');
            }

            const hasLetter = /[a-zA-Z]/.test(_password);
            const hasNumber = /[0-9]/.test(_password);
            const hasSymbol = /[-_#$%]/.test(_password);
            const validSymbolsOnly = /^[a-zA-Z0-9\-_#$%]+$/.test(_password);

            if (!hasLetter) {
                isError = true;
                errors.push('パスワードには英字を1文字以上含めてください。');
            }
            if (!hasNumber) {
                isError = true;
                errors.push('パスワードには数字を1文字以上含めてください。');
            }
            if (!hasSymbol) {
                isError = true;
                errors.push('パスワードには記号（-_#$%）を1文字以上含めてください。');
            }
            if (!validSymbolsOnly) {
                isError = true;
                errors.push('使用できない記号が含まれています（使える記号：-_#$%）。');
            }
        }


        ///// 個人情報保護方針


        // エラーチェック
        if(isError) {
            errors.forEach(function (msg) {
                $error_message.append(`<li>${msg}</li>`);
            });
            $error_message.addClass(conf._error);
        } else {
            isScene = 'confirm';
            $target.attr('data-scene', isScene);
        }

        $('html, body').animate({scrollTop: $form.offset().top - $('.page-header').innerHeight()}, 400);
    });

    // 戻るボタン
    $btn.back.on('click', function(){
        isScene = 'input';
        $target.attr('data-scene', isScene);

        $('html, body').animate({scrollTop: $form.offset().top - $('.page-header').innerHeight()}, 400);
    });

    // 送信ボタン
    $btn.send.on('click', function(){
    });
});

// お問い合わせ
$(function () {
    const $target = $('#page-contact');
    const $form = $('#form-contact');
    const $error_message = $('#error-message');

    if(!$target.length) {
        return false;
    }

    let isScene = 'input';

    // バリデート・入力→確認画面の遷移
    const $ipt = {
        last_name: $('#contact_last_name'),
        first_name: $('#contact_first_name'),
        sei: $('#contact_sei'),
        mei: $('#contact_mei'),
        zip01: $('#contact_zip01'),
        zip02: $('#contact_zip02'),
        pref: $('#contact_pref'),
        city: $('#contact_city'),
        address: $('#contact_address'),
        tel: $('#contact_tel'),
        email: $('#contact_email'),
        contents: $('#contact_contents'),
        regalcheck: $('#regalcheck')
    };

    const $conf = {
        last_name: $('#conf_contact_last_name'),
        first_name: $('#conf_contact_first_name'),
        sei: $('#conf_contact_sei'),
        mei: $('#conf_contact_mei'),
        zip01: $('#conf_contact_zip01'),
        zip02: $('#conf_contact_zip02'),
        pref: $('#conf_contact_pref'),
        city: $('#conf_contact_city'),
        address: $('#conf_contact_address'),
        tel: $('#conf_contact_tel'),
        email: $('#conf_contact_email'),
        contents: $('#conf_contact_contents')
    };

    const $hidden = {
        zip: $('#contact_zip')
    };

    const $btn = {
        conf: $('#conf-button'),
        back: $('#back-button'),
        send: $('#send-button')
    };

    const conf = {
        _error: "is-error"
    };

    let errors = [];

    // 確認ボタン
    $btn.conf.on('click', function(){
        let isError = false;
        errors = [];
        $error_message.empty();
        $error_message.removeClass(conf._error);

        // 入力チェック

        ///// 姓
        const _last_name = $ipt.last_name.val().trim();
        $conf.last_name.text(_last_name);
        if (!_last_name) {
            isError = true;
            errors.push('お名前（姓）を入力してください。');
        }

        ///// 名
        const _first_name = $ipt.first_name.val().trim();
        $conf.first_name.text(_first_name);
        if (!_first_name) {
            isError = true;
            errors.push('お名前（名）を入力してください。');
        }

        ///// セイ
        const _sei = $ipt.sei.val().trim();
        $conf.sei.text(_sei);
        if (!_sei) {
            isError = true;
            errors.push('フリガナ（セイ）を入力してください。');
        }

        ///// メイ
         const _mei = $ipt.mei.val().trim();
         $conf.mei.text(_mei);
        if (!_mei) {
            isError = true;
            errors.push('フリガナ（メイ）を入力してください。');
        }

        ///// 郵便番号
        const _zip01 = $ipt.zip01.val().trim();
        const _zip02 = $ipt.zip02.val().trim();
        $conf.zip01.text(_zip01);
        $conf.zip02.text(_zip02);
        $hidden.zip.val(_zip01+'-'+_zip02);
        // 郵便番号の形式チェック用正規表現
        const zip1Regex = /^\d{3}$/;
        const zip2Regex = /^\d{4}$/;

        // 空チェックと形式チェック
        if (!_zip01 || !_zip02) {
            isError = true;
            errors.push('郵便番号をすべて入力してください。');
        } else {
            if (!zip1Regex.test(_zip01) || !zip2Regex.test(_zip02)) {
                isError = true;
                errors.push('郵便番号の3桁-4桁の数字で入力してください。');
            }
        }

        ///// 都道府県
        const _pref = $ipt.pref.val().trim();
        $conf.pref.text(_pref);
        if (!_pref) {
            isError = true;
            errors.push('都道府県を選択してください。');
        }

        ///// 市区町村
        const _city = $ipt.city.val().trim();
        $conf.city.text(_city);
        if (!_city) {
            isError = true;
            errors.push('市区町村を入力してください。');
        }

        ///// 番地・建物名
        const _address = $ipt.address.val().trim();
        $conf.address.text(_address);
        if (!_address) {
            isError = true;
            errors.push('番地・建物名を入力してください。');
        }

        ///// 電話番号（自宅）
        const _tel = $ipt.tel.val().trim();
        $conf.tel.text(_tel);
        if (!_tel) {
            isError = true;
            errors.push('電話番号（自宅）を入力してください。');
        }

        ///// メールアドレス
        const _email = $ipt.email.val().trim();
        $conf.email.text(_email);
        // 構文チェック用の正規表現
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 入力チェック
        if (!_email) {
            isError = true;
            errors.push('メールアドレスを入力してください。');
        } else if (!emailRegex.test(_email)) {
            isError = true;
            errors.push('メールアドレスの形式が正しくありません。');
        }


        ///// お問い合わせ内容
        const _contents = $ipt.contents.val().trim();
        $conf.contents.text(_contents);
        if (!_contents) {
            isError = true;
            errors.push('お問い合わせ内容を入力してください。');
        }


        ///// 個人情報保護方針


        // エラーチェック
        if(isError) {
            errors.forEach(function (msg) {
                $error_message.append(`<li>${msg}</li>`);
            });
            $error_message.addClass(conf._error);
        } else {
            isScene = 'confirm';
            $target.attr('data-scene', isScene);
        }

        $('html, body').animate({scrollTop: $form.offset().top - $('.page-header').innerHeight()}, 400);
    });

    // 戻るボタン
    $btn.back.on('click', function(){
        isScene = 'input';
        $target.attr('data-scene', isScene);

        $('html, body').animate({scrollTop: $form.offset().top - $('.page-header').innerHeight()}, 400);
    });

    // 送信ボタン
    $btn.send.on('click', function(){
    });
});



// 法人登録確認画面
$(function () {
    if(!$('#page-houjin_register').length) {
        return false;
    }

    // 法人の同意チェック
    houjincheck();
    $('#houjincheck').on('change', function() {
        houjincheck();
    });

    function houjincheck() {
        if($('#houjincheck').prop("checked")) {
            $('#houjin_register_link').removeClass("is-disabled");
        } else {
            $('#houjin_register_link').addClass("is-disabled");
        }
    }
});

// ユーザー登録確認画面
$(function () {
    if(!$('#page-register').length) {
        return false;
    }

    // 法人の同意チェック
    usercheck();
    $('#usercheck').on('change', function() {
        usercheck();
    });

    function usercheck() {
        if($('#usercheck').prop("checked")) {
            $('#user_register_link').removeClass("is-disabled");
        } else {
            $('#user_register_link').addClass("is-disabled");
        }
    }
});


// 基本JSの関数
$(function () {
    var App = App || {};

    /*----------------------------------------------------------------------
    TblMore
    ----------------------------------------------------------------------*/
    (function () {
        var p = TblMore.prototype;

        var $obj = {
            target: $('.js-tbl-more')
        };

        var conf = {
            _num: 3
        };

        // init
        function TblMore() {
            if ($obj.target.length < 1) {
                return false;
            }

            this._init();
        }

        p._init = function () {
            $obj.target.each(function(){
                var $tbl = $(this);
                var $tr =  $tbl.find('table tbody tr');
                var $btn = $tbl.find('.sec-history__more button');

                if($tr.length <= conf._num) {
                    $btn.hide();
                }

                $tr.each(function(e){
                    if(e >= conf._num) {
                        $(this).hide();
                    }
                });

                $btn.on('click', function () {

                   $tr.show();

                   $(this).hide();

                    return false;
                });
            });
        };

        App.TblMore = TblMore;
    }());


    /*----------------------------------------------------------------------
      MatchHeight
    ----------------------------------------------------------------------*/
    (function () {
        var p = MatchHeight.prototype;

        var $target = [
            //".m-product__list .item .item__hdg",
            ".sec-shipping .card-item .card-item__box"
        ];

        // init
        function MatchHeight() {
            this._init();
        }

        p._init = function () {
            $.each($target, function (index, target) {
                if ($(target).length > 0) {
                    $(target).matchHeight({ remove: true });

                    _set($(target));

                    setTimeout(function () {
                        _set($(target));
                    }, 500);
                }

                function _set(target) {
                    $(target).matchHeight();
                }
            });
        };

        App.MatchHeight = MatchHeight;
    })();

    /*----------------------------------------------------------------------
    SpTblScroll
    ----------------------------------------------------------------------*/
    (function () {
        var p = SpTblScroll.prototype;

        // init
        function SpTblScroll() {
            
            if (!$('.js-tbl-scroll').length) {
                return false;
            }

            this._init();
        }

        p._init = function () {

            $('.js-tbl-scroll').each(function () {
                new PerfectScrollbar(this);

                var $this = $(this);

                 $this.on('scroll click', function () {
                    $(this).addClass('is-scroll');
                });
            });

        };

        App.SpTblScroll = SpTblScroll;
    })();

    new App.MatchHeight();
    new App.TblMore();
    new App.SpTblScroll();
});



$(function () {
/**
   *
   *  Show/hide customer address forms
   *
   */
  function customerAddressForm() {
    var newAddressForm = document.getElementById('AddressNewForm');
    var newAddressFormButton = document.getElementById('AddressNewButton');

    if (!newAddressForm) {
      return;
    }

    // Initialize observers on address selectors, defined in shopify_common.js
    if (Shopify) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(
        'AddressCountryNew',
        'AddressProvinceNew',
        {
          hideElement: 'AddressProvinceContainerNew'
        }
      );
    }

    // Initialize each edit form's country/province selector
    document
      .querySelectorAll('.address-country-option')
      .forEach(function(option) {
        var formId = option.dataset.formId;
        var countrySelector = 'AddressCountry_' + formId;
        var provinceSelector = 'AddressProvince_' + formId;
        var containerSelector = 'AddressProvinceContainer_' + formId;

        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
          hideElement: containerSelector
        });
      });

    // Toggle new/edit address forms
    document.querySelectorAll('.address-new-toggle').forEach(function(button) {
      button.addEventListener('click', function() {
        var isExpanded =
          newAddressFormButton.getAttribute('aria-expanded') === 'true';

        newAddressForm.classList.toggle('hide');
        newAddressFormButton.setAttribute('aria-expanded', !isExpanded);
        newAddressFormButton.focus();

        // 要素までスクロール
        var headerHeight = $('header').outerHeight() || 0;
        var $target = $('#AddressNewForm');
        if($target.hasClass('hide')) {
            var position = $('.sec-shipping').offset().top - headerHeight;
        } else {
            var position = $target.offset().top - headerHeight;
        }
        $('html, body').animate({ scrollTop: position }, 600, 'swing');
      });
    });

    document.querySelectorAll('.address-edit-toggle').forEach(function(button) {
      button.addEventListener('click', function(evt) {
        var formId = evt.target.dataset.formId;
        var editButton = document.getElementById('EditFormButton_' + formId);
        var editAddress = document.getElementById('EditAddress_' + formId);
        var isExpanded = editButton.getAttribute('aria-expanded') === 'true';

        editAddress.classList.toggle('hide');
        editButton.setAttribute('aria-expanded', !isExpanded);
        editButton.focus();

        // 要素までスクロール
        var headerHeight = $('header').outerHeight() || 0;
        var $target = $('#EditAddress_' + formId);
        if($target.hasClass('hide')) {
            var position = $('.sec-shipping').offset().top - headerHeight;
        } else {
            var position = $target.offset().top - headerHeight;
        }
        $('html, body').animate({ scrollTop: position }, 600, 'swing');

      });
    });

    document.querySelectorAll('.address-delete').forEach(function(button) {
      button.addEventListener('click', function(evt) {
        var target = evt.target.dataset.target;
        var confirmMessage = evt.target.dataset.confirmMessage;

        // eslint-disable-next-line no-alert
        if (
          confirm(
            confirmMessage || 'Are you sure you wish to delete this address?'
          )
        ) {
          Shopify.postLink(target, {
            parameters: { _method: 'delete' }
          });
        }
      });
    });
  }

  customerAddressForm();
});
