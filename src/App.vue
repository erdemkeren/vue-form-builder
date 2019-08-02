<template>
    <div>
        <div class="form">
            <div v-for="page in form.items" :key="page.uuid">
                <h1>{{ page.title }}</h1>
                <div class="page">
                    <template v-for="item in page.items">
                        <Section v-if="item.type === 'section'"
                                 :key="item.uuid"
                                 :items="item.items"
                                 :uuid="item.uuid"
                                 :on-response-type-change="handleQuestionResponseTypeChange"
                                 :on-title-change="handleQuestionTitleChange"
                                 :on-append-section="appendSection"
                                 :on-append-question="appendQuestion"
                        />
                        <Question v-if="item.type === 'question'" :key="item.uuid" :item="item"
                                  :on-response-type-change="handleQuestionResponseTypeChange"
                                  :on-title-change="handleQuestionTitleChange"
                        />
                    </template>
                    <TButton :on-click="() => appendQuestion(page.uuid)">
                        [+] Add Question
                    </TButton>
                    <TButton :on-click="() => appendSection(page.uuid)"
                            style="">
                        [+] Add Section
                    </TButton>
                </div>
            </div>

            <div class="page" style="display: flex; align-items: center; justify-content: center; margin-top: 20px;">
                <TButton :on-click="appendPage"
                         style="">
                    [+] Add Page
                </TButton>
            </div>
        </div>
        <div class="line">
            <PrimaryButton type="button" :on-click="exportForm">Export</PrimaryButton>
            <form style="display: inline; border-left: 1px solid #e3e3e3; padding: 20px;">
                <input name="upload-input" type="file" ref="ufi"/>
                <SecondaryButton type="button" :on-click="importForm">Upload</SecondaryButton>
            </form>
        </div>
    </div>
</template>

<script>
    import uuid4 from 'uuid'
    import {FormJsonValidator, downloadJson} from "@/utils";
    import TButton from './components/TButton.vue'
    import Section from './components/Section.vue'
    import Question from './components/Question.vue'
    import PrimaryButton from './components/PrimaryButton.vue'
    import SecondaryButton from './components/SecondaryButton.vue'

    export default {
        name: 'app',
        data: () => ({
            form: {
                uuid: uuid4(),
                type: 'form',
                items: [
                    {
                        uuid: uuid4(),
                        type: 'page',
                        title: 'Page 1',
                        items: [],
                    },
                ],

            }
        }),
        methods: {
            handleQuestionResponseTypeChange: function (uuid, value) {
                this.form.items = this.modifyItemOnBranch(uuid, 'response_type', value, this.form.items)
            },
            handleQuestionTitleChange: function (uuid, value) {
                this.form.items = this.modifyItemOnBranch(uuid, 'title', value, this.form.items)
            },
            appendPage: function () {
                const uuid = uuid4()
                this.form.items = [...this.form.items, {
                    uuid: uuid,
                    title: `Unnamed Page`,
                    type: 'page',
                    items: [],
                }]
            },
            appendSection: function (parentUuid) {
                this.form.items = this.appendItemOnBranchByParentId(parentUuid, {
                    uuid: uuid4(),
                    type: 'section',
                    items: []
                }, this.form.items)
            },
            appendQuestion: function (parentUuid) {
                this.form.items = this.appendItemOnBranchByParentId(parentUuid, {
                    uuid: uuid4(),
                    type: 'question',
                    title: '',
                }, this.form.items)
            },
            appendItemOnBranchByParentId: function (parentUuid, newItem, branch) {
                return branch.map(item => {
                    if (item.uuid === parentUuid) {
                        return {...item, items: [...item.items, newItem]}
                    } else if (item.type === 'page' || item.type === 'section') {
                        return {
                            ...item,
                            items: this.appendItemOnBranchByParentId(parentUuid, newItem, item.items)
                        }
                    }

                    return item
                })
            },
            modifyItemOnBranch: function (uuid, key, value, branch) {
                return branch.map(item => {
                    if (item.uuid === uuid) {
                        return {...item, [key]: value}
                    }

                    if (item.type === 'page' || item.type === 'section') {
                        return {
                            ...item,
                            items: this.modifyItemOnBranch(uuid, key, value, item.items)
                        }
                    }

                    return item
                })
            },
            exportForm: function () {
                downloadJson(this.form)
            },
            importForm: function () {
                if (!window.FileReader) return;

                const uploadFileInput = this.$refs.ufi

                if (!uploadFileInput.files.length) {
                    alert('Please select an export first.')

                    return false;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    if (e.target.readyState != 2) return;
                    if (e.target.error) {
                        alert('Error while reading file');
                        return;
                    }

                    const content = e.target.result;

                    let parsedContent = {}
                    try {
                        parsedContent = JSON.parse(content)
                    } catch (e) {
                        alert('Please upload a valid form builder export.')

                        return false
                    }

                    if (!FormJsonValidator.validate(parsedContent)) {
                        alert('Please upload a valid form builder export.')

                        return false
                    }

                    this.form = parsedContent
                }.bind(this)

                reader.readAsText(uploadFileInput.files[0])
            }
        },
        components: {
            Question,
            Section,
            TButton,
            PrimaryButton,
            SecondaryButton,
        }
    }
</script>


<style>
    html, * {
        box-sizing: border-box;
    }

    body {
        background-color: #f8f8f8;
        color: #7c7c7c;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .line {
        padding: 10px;
        margin: 20px 0;
        background-color: #fff;
        border: 1px solid #e3e3e3;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .form .page {
        border-radius: 10px;
        border-style: solid;
        border-width: 1px;
        border-color: #e3e3e3;
        background-color: #ffffff;
        min-height: 100px;
        padding: 0 20px;
    }
</style>
