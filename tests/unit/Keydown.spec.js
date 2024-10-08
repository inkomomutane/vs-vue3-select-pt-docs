import {afterEach, describe, expect, it, vi} from 'vitest'
import typeAheadPointer from '@/mixins/typeAheadPointer.js'
import {mountDefault} from '#/helpers.js'
import {shallowMount} from "@vue/test-utils";
import VueSelect from "@/components/Select.vue";

describe('Custom Keydown Handlers', () => {
    let spy
    afterEach(() => {
        if (spy) spy.mockClear()
    })

    it('can use the map-keydown prop to trigger custom behaviour', async () => {
        const onKeyDown = vi.fn()
        const Select = mountDefault({
            mapKeydown: (defaults, vm) => ({...defaults, 32: onKeyDown}),
        })

        await Select.get('input').trigger('keydown.space')

        expect(onKeyDown.mock.calls.length).toBe(1)
    })

    it('selectOnKeyCodes should trigger a selection for custom keycodes', () => {
        spy = vi.spyOn(typeAheadPointer.methods, 'typeAheadSelect')

        const Select = mountDefault({
            selectOnKeyCodes: [32],
        })

        Select.get('input').trigger('keydown.space')

        expect(spy).toHaveBeenCalledTimes(1)
    })

    it('even works when combining selectOnKeyCodes with map-keydown', () => {
        spy = vi.spyOn(typeAheadPointer.methods, 'typeAheadSelect')

        const onKeyDown = vi.fn()
        const Select = mountDefault({
            mapKeydown: (defaults, vm) => ({...defaults, 32: onKeyDown}),
            selectOnKeyCodes: [9],
        })

        Select.get('input').trigger('keydown.space')
        expect(onKeyDown.mock.calls.length).toBe(1)

        Select.get('input').trigger('keydown.tab')
        expect(spy).toHaveBeenCalledTimes(1)
    })

    describe('CompositionEvent support', () => {
        it('will not select a value with enter if the user is composing', () => {
            spy = vi.spyOn(typeAheadPointer.methods, 'typeAheadSelect')

            const Select = mountDefault()

            Select.get('input').trigger('compositionstart')
            Select.get('input').trigger('keydown.enter')
            expect(spy).toHaveBeenCalledTimes(0)

            Select.get('input').trigger('compositionend')
            Select.get('input').trigger('keydown.enter')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    it('can select an option on tab', () => {
        spy = vi.spyOn(typeAheadPointer.methods, 'typeAheadSelect')
        const Select = shallowMount(VueSelect, {
            props: {
                selectOnKeyCodes: [13, 9],
            },
        })

        Select.get('input').trigger('keydown.tab')

        expect(spy).toHaveBeenCalledWith()
    })

})
