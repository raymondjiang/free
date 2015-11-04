
define(function(require , exports , module){
    require('./lib/zepto');
    var Base = require('./lib/base/index');
    var Iscroll = require('./lib/iscroll');
    var Routie = require('./lib/routie');
    module.exports = Base.extend({
        initialize: function () {
            var self = this;
            self.hookDom();
            self.initScroll();
            self.startRoutie();
            self.bindEvents();
        },

        hookDom: function () {
            var self = this;
            self.nav = $('#J_nav');
            self.currentNav = $('#J_nav .current');
            self.scrollWrap = $('#scroll-wrapper');
            self.pages = self.scrollWrap.find('.page');
            self.space = $('#J_space');
            self.currentSpaceMenu = self.space.find('li.selected');
        },
        bindEvents: function () {
            var self = this;

            self.nav.on('click', 'a', function (e) {
                e.preventDefault();
                var el = $(e.currentTarget);
                var key = el.parent().attr('data-menu');
                Routie(key);
            });

            self.scroll.on('scrollEnd', function () {
                var key = 'about';
                switch(this.y){
                    case 0 :
                        key = 'about'
                        break;
                    case -600 :
                        key = 'space'
                        break;
                    case -1200 :
                        key = 'service'
                        break;
                    case -1800 :
                        key = 'address'
                        break;
                }
                Routie(key);
            });

            $('#header').on('click', '.change-day', function (e) {
                self.changeDay(e);
            });

            $('#header').on('click', '.change-night', function (e) {
                self.changeNight(e);
            });

            self.space.on('click', 'li', function (e) {
                self.setSpaceBackground(e);
            });
        },

        initScroll: function () {
            this.scroll = new IScroll('#scroll-wrapper', {
                //mouseWheel: true,
                scrollX: true,
                snap: true
            });
        },

        startRoutie: function () {
            var self = this;
            var key;
            routie('*' , function (name) {
                switch (name) {

                    // 缺省hash
                    case '':
                        key = 'about';
                        self.currentPage = $('#J_about');
                        self.scroll.scrollToElement('#J_about')
                        self.setNavStatus('about');
                        break;
                    default:
                        key = name;
                        self.currentPage = $('#J_' + name);
                        self.scroll.scrollToElement('#J_' + name);
                        self.setNavStatus(name);
                        break;
                }
                self.setCurrentPage(key);

            }); 
        },

        setNavStatus: function (key) {
            var self = this;
            var nav = self.nav;
            var target = nav.children('[data-menu="' + key + '"]');

            if (target.hasClass('current')) {
                return;
            }
            self.currentNav.removeClass('current');
            target.addClass('current');
            self.currentNav = target;
        },

        changeDay: function (e) {
            e.preventDefault();
            document.body.className = 'day';
        },

        changeNight: function (e) {
            e.preventDefault();
            document.body.className = 'night';
        },

        setSpaceBackground: function (e) {
            var self = this;
            var el = $(e.currentTarget);

            if (el.hasClass('selected')) {
                return
            }
            self.currentSpaceMenu.removeClass('selected');
            el.addClass('selected');
            self.currentSpaceMenu = el;

            var tarIdx = el.attr('data-target');

            var spaceShow = self.space.find('.pic-show');
            spaceShow.removeClass('show').addClass('hide');
            setTimeout(function () {
                spaceShow.attr('data-class', tarIdx);
                spaceShow.removeClass('hide').addClass('show');
            }, 800)
            
        },
        setCurrentPage: function (key) {
            if (self.currentPage) {
                self.currentPage.removeClass('current');
            }
            $('#J_' + key).addClass('current');
            self.currentPage = $('#J_' + key);
        }
    });

});
