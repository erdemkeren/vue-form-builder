<template>
    <div class="section">
        <template v-for="item in items">
            <Section v-if="item.type === 'section'"
                     :uuid="item.uuid"
                     :key="item.uuid"
                     :items="item.items"
                     :on-response-type-change="onResponseTypeChange"
                     :on-title-change="onTitleChange"
                     :on-append-section="onAppendSection"
                     :on-append-question="onAppendQuestion"
            />

            <Question v-if="item.type === 'question'" :key="item.uuid" :item="item"
                      :on-response-type-change="onResponseTypeChange"
                      :on-title-change="onTitleChange"
            />

        </template>
        <TButton :on-click="() => onAppendQuestion(uuid)">[+] Add Question</TButton>
        <TButton :on-click="() => onAppendSection(uuid)">[+] Add Section</TButton>
    </div>
</template>

<script>
    import TButton from './TButton.vue'
    import Question from './Question.vue'

    export default {
        name: "Section",
        props: ['uuid', 'items', 'onResponseTypeChange', 'onTitleChange', 'onAppendSection', 'onAppendQuestion'],
        components: {Question, Section: this, TButton}
    }
</script>

<style scoped>
    .section {
        margin-left: 100px;
    }
</style>