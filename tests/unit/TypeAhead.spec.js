import {it, describe, expect} from 'vitest'
import {shallowMount} from '@vue/test-utils'
import VueSelect from '@/components/Select.vue'
import {mountDefault} from '#/helpers.js'

describe('Moving the Typeahead Pointer', () => {
    it('should set the pointer to zero when the filteredOptions watcher is called', async () => {
        const Select = shallowMount(VueSelect, {
            props: {options: ['one', 'two', 'three']},
            sync: false,
        })

        Select.vm.search = 'one'

        await Select.vm.$nextTick()
        expect(Select.vm.typeAheadPointer).toEqual(0)
    })

    it('should move the pointer visually up the list on up arrow keyUp', () => {
        const Select = mountDefault()

        Select.vm.typeAheadPointer = 1

        Select.get('input').trigger('keydown.up')

        expect(Select.vm.typeAheadPointer).toEqual(0)
    })

    it('should move the pointer visually down the list on down arrow keyUp', () => {
        const Select = mountDefault()

        Select.vm.typeAheadPointer = 1

        Select.get('input').trigger('keydown.down')

        expect(Select.vm.typeAheadPointer).toEqual(2)
    })

    it('should not move the pointer past the end of the list', () => {
        const Select = mountDefault()

        Select.vm.typeAheadPointer = 2
        Select.vm.typeAheadDown()
        expect(Select.vm.typeAheadPointer).toEqual(2)
    })

    it('will set the pointer to the selected option when opening', async () => {
        const Select = shallowMount(VueSelect, {
            propsData: {
                modelValue: 'three',
                options: ['one', 'two', 'three'],
            },
        })

        Select.get('input').trigger('focus')
        await Select.vm.$nextTick()

        expect(Select.vm.typeAheadPointer).toEqual(2)
    })

    it('will set the pointer to the reduced selected option when opening', async () => {
        const Select = shallowMount(VueSelect, {
            propsData: {
                modelValue: 3,
                reduce: ({value}) => value,
                options: [
                    {label: 'one', value: 1},
                    {label: 'two', value: 2},
                    {label: 'three', value: 3},
                ],
            },
        })

        Select.get('input').trigger('focus')
        await Select.vm.$nextTick()

        expect(Select.vm.typeAheadPointer).toEqual(2)
    })
})
