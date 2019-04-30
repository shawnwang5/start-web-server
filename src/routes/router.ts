import VueRouter, { Route } from 'vue-router'
import IndexPage from './index/index/index/index.vue'
import AboutPage from './index/about.vue'
import SelectDatePage from './index/index/select-date.vue'
import { store } from '../store'
import { APP_HEIGHT, HAS_TAB_BAR, PAGE_TRANSITION, PageTransition } from '../store/modules/app'
import { environments } from '../environments'

export const router = new VueRouter({
    routes: [
        {
            path: '/index/index',
            component: IndexPage,
            meta: { appHeight: '100%', needTabBar: true, limitHeight: true, }
        },
        {
            path: '/index/index/selectDate',
            component: SelectDatePage,
            meta: { appHeight: '100%', needTabBar: true, noPageAnim: false, }
        },
        { path: '/index/about', component: AboutPage, meta: { appHeight: '100%', needTabBar: true } },
        { path: '*', redirect: '/index/index' }
    ]
})

router.beforeEach((to: Route, from: Route, next: any) => {
    store.commit(APP_HEIGHT, to.meta.appHeight)
    setPageTransition(to, from)
    document.title = to.meta.title || environments.docTitle
    store.commit(HAS_TAB_BAR, to.meta.needTabBar)
    next()
})

router.afterEach((to: Route, from: Route) => {
    dealMaxWidthLimit(to)
})

function isOldSafari () {
    return /OS\s[789]_\d{1,2}\slike\sMac\sOS/.test(navigator.userAgent)
}

function setPageTransition (to: Route, from: Route) {
    const toPathLength = to.fullPath.split('/').length
    const fromPathLength = from.fullPath.split('/').length
    const pageTransition: PageTransition = {
        name: 'slide-right',
        duration: 300
    }
    if (toPathLength < fromPathLength) {
        pageTransition.name = 'slide-left'
    } else if (toPathLength === fromPathLength) {
        pageTransition.name = ''
        pageTransition.duration = 0
    }
    if (isOldSafari() || to.meta.noPageAnim || typeof to.meta.noPageAnim === 'undefined' || from.fullPath === '/') {
        pageTransition.name = ''
        pageTransition.duration = 0
    }
    store.commit(PAGE_TRANSITION, pageTransition)
}

function limitHeight (to: Route) {
    const height = to.meta.limitHeight ? '100%' : 'auto'
    const appRootEle: HTMLElement = document.body.querySelector('#app-root') || document.createElement('div')
    appRootEle.style.height = height
}

function dealMaxWidthLimit (to: Route) {
    if (to.meta.noMaxWidthLimit) {
        document.body.style.maxWidth = 'none'
    } else {
        document.body.style.maxWidth = '750px'
    }
}