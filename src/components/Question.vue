<template>
    <div class="question" v-if="item.type === 'question'" :key="item.uuid">
        <fbuilder-input placeholder="Please write your question here..." :value="item.title" :keyup="value => {onTitleChange(item.uuid, value)}" />
        <fbuilder-select
                :default-value="item.response_type"
                :on-change="value => {onResponseTypeChange(item.uuid, value)}"
        >
            <fbuilder-option letter="T"
                             border-color="#50b8ff"
                             background-color="#cfefff"
                             foreground-color="#50b8ff"
                             value="text"
            >Text</fbuilder-option>

            <fbuilder-option letter="#"
                             border-color="#ba31ed"
                             background-color="#f5defe"
                             foreground-color="#ba31ed"
                             value="number"
            >Number</fbuilder-option>
        </fbuilder-select>
    </div>
</template>

<script>
    import Input from './Input.vue'
    import Select from './Select/index.vue'
    import Option from './Select/Option.vue'

    export default {
        name: "Item",
        props: ['item', 'onResponseTypeChange', 'onTitleChange'],
        components: {
            'fbuilder-input': Input,
            'fbuilder-select': Select,
            'fbuilder-option': Option,
        }
    }
</script>

<style scoped>
    .question {
        display: flex;
        height: 60px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e3e3e3;
    }
</style>