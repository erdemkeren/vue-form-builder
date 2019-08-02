<template>
    <div class="select" @click="onclick">
        <fbuilder-option
                v-bind:letter="letter"
                v-bind:border-color="borderColor"
                v-bind:background-color="backgroundColor"
                v-bind:foreground-color="foregroundColor"
        >{{ label }}</fbuilder-option>

        <dropdown-icon/>

        <div class="select-options" :style="{display: isOpen ? 'block' : 'none'}" @click="handler">
            <fbuilder-option
                    value=""
                    letter=""
                    border-color="#7c7c7c"
                    background-color="#f8f8f8"
                    foreground-color="#ffffff"
            >None</fbuilder-option>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import DropdownIcon from './DropdownIcon.vue'
    import Option from './Option.vue'

    export default {
        name: 'Select',
        props: {
            defaultValue: String,
            onChange: Function,
        },
        created: function () {
            let self = this;

            window.addEventListener('click', function (e) {
                // close dropdown when clicked outside
                if (!self.$el.contains(e.target)) {
                    self.isOpen = false
                }
            })
        },
        mounted: function () {
            this.getOptions()
        },
        data() {
            return {
                isOpen: false,
                options: {}
            }
        },
        methods: {
            getOptions: function () {
                const options = {}
                const optionsArray = this.$slots.default.map(option => {
                    const label = option.componentInstance.$slots.default ? option.componentInstance.$slots.default[0].text : undefined
                    const _options = option.componentOptions.Ctor.options
                    const _propsData = option.componentOptions.propsData

                    if (!_options.name === 'Option') {
                        return false
                    }

                    return {..._propsData, label}
                })

                optionsArray.forEach(option => {
                    options[option.value] = option
                })

                this.options = {
                    '': {
                        label: 'Select...',
                        letter: '',
                        borderColor: '#7c7c7c',
                        backgroundColor: '#f8f8f8',
                        foregroundColor: '#ffffff',
                    }, ...options
                }
            },
            onclick: function () {
                this.isOpen = !this.isOpen
            },
            handler: function (e) {
                let target = e.target
                let value = e.target.dataset.value

                while (value === undefined && target !== e.currentTarget) {
                    target = target.parentNode

                    value = target.dataset.value
                }

                if (value === undefined) {
                    return
                }

                this.onChange(value)
            }
        },
        components: {
            'dropdown-icon': DropdownIcon,
            'fbuilder-option': Option,
        },
        computed: {
            label: function () {
                return this.options[this.defaultValue || ""] ? this.options[this.defaultValue || ""].label : undefined
            },
            letter: function () {
                return this.options[this.defaultValue || ""] ? this.options[this.defaultValue || ""].letter : undefined
            },
            borderColor: function () {
                return this.options[this.defaultValue || ""] ? this.options[this.defaultValue || ""].borderColor : undefined
            },
            backgroundColor: function () {
                return this.options[this.defaultValue || ""] ? this.options[this.defaultValue || ""].backgroundColor : undefined
            },
            foregroundColor: function () {
                return this.options[this.defaultValue || ""] ? this.options[this.defaultValue || ""].foregroundColor : undefined
            },
        }
    }
</script>

<style scoped>
    .select {
        border-radius: 5px;
        background-color: #f8f8f8;
        padding: 9px 12px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 240px;
        position: relative;
    }

    .select > .select-options {
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 999;
        background-color: #f8f8f8;
        width: 240px;
    }
</style>
