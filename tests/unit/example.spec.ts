import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils'
import Dashboard from '@/components/Dashboard.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'

describe('Dashboard.vue', () => {
  let wrapper: Wrapper<any>
  const msg = 'new message'

  beforeEach(() => {
    const localVue = createLocalVue()
    Vue.use(Vuetify)
    wrapper = shallowMount(Dashboard, {
      localVue,
      propsData: { msg }
    })
  })

  it('renders a vue instance', () => {
    expect(shallowMount(Dashboard).isVueInstance()).toBe(true)
  })

  it('renders props.msg when passed', () => {
    expect(wrapper.props()['msg']).toMatch(msg)
  })
})
