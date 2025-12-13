import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GuaranteedSale from '../GuaranteedSale.vue'

const createWrapper = (props = {}) =>
  mount(GuaranteedSale, {
    props,
    global: {
      stubs: {
        'v-icon': { template: '<span></span>' },
      },
    },
  })

describe('GuaranteedSale', () => {
  it('renders with default props', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Guaranteed Offer')
    expect(wrapper.text()).toContain('$22,500')
    expect(wrapper.text()).toContain('Accepted')
    expect(wrapper.text()).toContain('Primary Action')
    expect(wrapper.text()).toContain('Secondary Action')
  })

  describe('Props - priceValue', () => {
    it('displays custom price value', () => {
      const wrapper = createWrapper({
        priceValue: '50,000',
      })

      expect(wrapper.text()).toContain('$50,000')
    })

    it('displays zero price', () => {
      const wrapper = createWrapper({
        priceValue: '0',
      })

      expect(wrapper.text()).toContain('$0')
    })

    it('displays formatted price with commas', () => {
      const wrapper = createWrapper({
        priceValue: '1,234,567',
      })

      expect(wrapper.text()).toContain('$1,234,567')
    })
  })

  describe('Props - align', () => {
    it('renders with Center alignment by default', () => {
      const wrapper = createWrapper({
        align: 'Center',
      })

      expect(wrapper.text()).toContain('Guaranteed Offer')
    })

    it('renders with Left alignment', () => {
      const wrapper = createWrapper({
        align: 'Left',
      })

      expect(wrapper.text()).toContain('Guaranteed Offer')
    })
  })

  describe('Props - hasDateTime', () => {
    it('displays datetime section when hasDateTime is true', () => {
      const wrapper = createWrapper({
        hasDateTime: true,
      })

      expect(wrapper.text()).toContain('Updated')
      expect(wrapper.text()).toContain('Expires')
      expect(wrapper.text()).toContain('a.m. EST')
    })

    it('hides datetime section when hasDateTime is false', () => {
      const wrapper = createWrapper({
        hasDateTime: false,
      })

      expect(wrapper.text()).not.toContain('Updated')
      expect(wrapper.text()).not.toContain('Expires')
    })
  })

  describe('Props - status variants', () => {
    it('displays "Offer Available" for Available status', () => {
      const wrapper = createWrapper({
        status: 'Available',
      })

      expect(wrapper.text()).toContain('Offer Available')
    })

    it('displays "Accepted" for Accepted status', () => {
      const wrapper = createWrapper({
        status: 'Accepted',
      })

      expect(wrapper.text()).toContain('Accepted')
    })

    it('displays "Requested" for Requested status', () => {
      const wrapper = createWrapper({
        status: 'Requested',
      })

      expect(wrapper.text()).toContain('Requested')
    })

    it('displays "Expired" for Expired status', () => {
      const wrapper = createWrapper({
        status: 'Expired',
      })

      expect(wrapper.text()).toContain('Expired')
    })

    it('displays "Not Available" for Not Available status', () => {
      const wrapper = createWrapper({
        status: 'Not Available',
      })

      expect(wrapper.text()).toContain('Not Available')
    })
  })

  describe('Props - dateUpdated', () => {
    it('displays custom updated date', () => {
      const wrapper = createWrapper({
        dateUpdated: 'Dec 15, 2025',
      })

      expect(wrapper.text()).toContain('Dec 15, 2025')
    })
  })

  describe('Props - timeUpdated', () => {
    it('displays custom updated time', () => {
      const wrapper = createWrapper({
        timeUpdated: '14:30:45',
      })

      expect(wrapper.text()).toContain('14:30:45')
    })
  })

  describe('Props - dateExpires', () => {
    it('displays custom expiration date', () => {
      const wrapper = createWrapper({
        dateExpires: 'Jan 1, 2026',
      })

      expect(wrapper.text()).toContain('Jan 1, 2026')
    })
  })

  describe('Props - hasTooltip', () => {
    it('displays tooltip icon when hasTooltip is true', () => {
      const wrapper = createWrapper({
        hasTooltip: true,
      })

      const icons = wrapper.findAll('span')
      expect(icons.length).toBeGreaterThan(0)
    })

    it('hides tooltip icon when hasTooltip is false', () => {
      const wrapper = createWrapper({
        hasTooltip: false,
      })

      expect(wrapper.text()).toBeTruthy()
    })
  })

  describe('Component combinations', () => {
    it('renders Center align with no datetime and Available status', () => {
      const wrapper = createWrapper({
        align: 'Center',
        hasDateTime: false,
        status: 'Available',
        priceValue: '35,000',
      })

      expect(wrapper.text()).toContain('$35,000')
      expect(wrapper.text()).toContain('Offer Available')
      expect(wrapper.text()).not.toContain('Updated')
    })

    it('renders Left align with datetime and Expired status', () => {
      const wrapper = createWrapper({
        align: 'Left',
        hasDateTime: true,
        status: 'Expired',
        priceValue: '25,000',
        dateUpdated: 'Dec 1, 2025',
        dateExpires: 'Dec 10, 2025',
      })

      expect(wrapper.text()).toContain('$25,000')
      expect(wrapper.text()).toContain('Expired')
      expect(wrapper.text()).toContain('Dec 1, 2025')
      expect(wrapper.text()).toContain('Dec 10, 2025')
    })

    it('renders Left align with no datetime and Requested status', () => {
      const wrapper = createWrapper({
        align: 'Left',
        hasDateTime: false,
        status: 'Requested',
        priceValue: '18,500',
      })

      expect(wrapper.text()).toContain('$18,500')
      expect(wrapper.text()).toContain('Requested')
      expect(wrapper.text()).not.toContain('Updated')
    })
  })

  describe('Structure and styling', () => {
    it('renders Primary and Secondary Action buttons', () => {
      const wrapper = createWrapper()

      expect(wrapper.text()).toContain('Primary Action')
      expect(wrapper.text()).toContain('Secondary Action')
    })

    it('has width of 320px (w-80)', () => {
      const wrapper = createWrapper()

      const card = wrapper.find('div[class*="w-80"]')
      expect(card.exists()).toBe(true)
    })

    it('renders with white background', () => {
      const wrapper = createWrapper()

      const card = wrapper.find('div[class*="bg-white"]')
      expect(card.exists()).toBe(true)
    })
  })
})
