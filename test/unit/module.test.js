import { setupTest } from '@nuxt/test-utils'
import { mount } from "@vue/test-utils";
import Title from '../../components/Title.vue'

describe('Title', () => {
    setupTest({
        testDir: __dirname,
        server: true
    })
    const wrapper = mount(Title,{
        props:{title:"A|B|C"}
    });
    test('this title should split in lines', async () => {

        expect(wrapper.html()).toContain('A -')
        expect(wrapper.html()).toContain('B -')
        expect(wrapper.html()).toContain('C')

    })
})