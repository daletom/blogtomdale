import Vue from 'vue'
import VueImgix from 'vue-imgix'

Vue.use(VueImgix, {
  domain: 'imgix.tomdale.website',
  defaultIxParams: {
    auto: 'format,compress',
    ch: 'width,dpr'
  }
})
