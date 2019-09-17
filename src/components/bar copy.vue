<template>
    <div>
        <div class="swiper-container" id="nav">
            <div class="swiper-wrapper">
                <div class="swiper-slide"> <span>tab1</span></div>
                <div class="swiper-slide"> <span>tab2</span></div>
                <div class="swiper-slide"> <span>tab3</span></div>
                <div class="swiper-slide"> <span>tab4</span></div>
                <div class="swiper-slide"> <span>tab5</span></div>
                <div class="swiper-slide"> <span>tab6</span></div>
                <div class="swiper-slide"> <span>tab7</span></div>
                <div class="bar"><div class="color"></div></div>
            </div>
        </div>
        <div class="swiper-container" id="page">
            <div class="swiper-wrapper">
                <div class="swiper-slide">con1</div>
                <div class="swiper-slide">con2</div>
                <div class="swiper-slide">con3</div>
                <div class="swiper-slide">con4</div>
                <div class="swiper-slide">con5</div>
                <div class="swiper-slide">con6</div>
                <div class="swiper-slide">con7</div>
            </div>
        </div>
    </div>    
</template>
<script>
    import $ from 'jquery';
    import Swiper from 'swiper'
    export default{
        name:'bar',
        data () {
            return {
                bar:{}
            }
        },
        methods:{
            barinit:function(){
                //暂时设计每个slide大小需要一致
                var barwidth = 36 //导航粉色条的长度px
                var tSpeed = 200 //切换速度300ms
                var bar,clientWidth,navSlideWidth,navWidth,navSum,slideProgress,r,g,b ;
                var navSwiper = new Swiper('#nav', {
                            slidesPerView: 6,
                            freeMode: true,
                            on: {
                                init: function() {
                                    navSlideWidth = this.slides.eq(0).css('width'); //导航字数需要统一,每个导航宽度一致
                                    bar = this.$el.find('.bar');
                                    bar.css('width', navSlideWidth) 
                                    bar.transition(tSpeed) 
                                    navSum = this.slides[this.slides.length - 1].offsetLeft //最后一个slide的位置
                                    clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
                                    navWidth = 0
                                    for (var i = 0; i < this.slides.length; i++) {
                                        navWidth += parseInt(this.slides.eq(i).css('width'))
                                    }
                                    var topBar = this.$el.parents('body').find('#top') //页头
                                },

                            },
                });

                var pageSwiper = new Swiper('#page', {
                            watchSlidesProgress: true,
                            resistanceRatio: 0,
                            on: {
                                touchMove: function() {
                                    var progress = this.progress 
                                    bar.transition(0) 
                                    bar.transform('translateX(' + navSum * progress + 'px)')
                                    //粉色255,72,145灰色51,51,51
                                    for (var i = 0; i < this.slides.length; i++) {
                                        slideProgress = this.slides[i].progress
                                        if (Math.abs(slideProgress) < 1) {
                                            r = Math.floor((255 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51) 
                                            g = Math.floor((72 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51) 
                                            b = Math.floor((145 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51) 
                                            navSwiper.slides.eq(i).find('span').css('color', 'rgba(' + r + ',' + g + ',' + b + ',1)')
                                        }
                                    }
                                },
                                transitionStart: function() {
                                    var activeIndex = this.activeIndex 
                                    var activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft
                                    bar.transition(tSpeed) 
                                    bar.transform('translateX(' + activeSlidePosition + 'px)')
                                    //释放时文字变色过渡
                                    navSwiper.slides.eq(activeIndex).find('span').transition(tSpeed)
                                    navSwiper.slides.eq(activeIndex).find('span').css('color', 'rgba(255,72,145,1)') 
                                    if (activeIndex > 0) {
                                        navSwiper.slides.eq(activeIndex - 1).find('span').transition(tSpeed) 
                                        navSwiper.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(51,51,51,1)')
                                    }
                                    if (activeIndex < this.slides.length) {
                                        navSwiper.slides.eq(activeIndex + 1).find('span').transition(tSpeed) 
                                        navSwiper.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(51,51,51,1)')
                                    }
                                    //导航居中
                                    var navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft //activeSlide距左边的距离
                                    navSwiper.setTransition(tSpeed) 
                                    if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
                                        navSwiper.setTranslate(0)
                                    } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
                                        navSwiper.setTranslate(clientWidth - navWidth)
                                    } else {
                                        navSwiper.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
                                    }

                                },
                            }
                });

                navSwiper.$el.on('touchstart',
                            function(e) {
                                e.preventDefault() //去掉按压阴影
                            }) 
                navSwiper.on('tap',function(e) {
                            var clickIndex = this.clickedIndex 
                            var clickSlide = this.slides.eq(clickIndex) 
                            pageSwiper.slideTo(clickIndex, 0);
                            this.slides.find('span').css('color', 'rgba(51,51,51,1)');
                            clickSlide.find('span').css('color', 'rgba(255,72,145,1)');
                })
            }
        },
        mounted:function(){
            this.barinit()
        }
    }
</script>
<style scoped>