<template>
    <div>
        <div>
            <select
                @change="setTargetIndex($event.target.value)"
            >
                <option
                    v-for="(title, index) of options"
                    :key="index"
                    :value="index"
                >{{ title }}</option>
            </select>
        </div>

        <div class="transfer">
            <div class="box left-list">
                <h1 class="list-title"> {{ leftTitle }}</h1>
                <div>

                </div>
            </div>
            <div class="box button-group">
                <button>&lt;</button>
                <button>&gt;</button>
            </div>
            <div class="box right-list">
                <h1 class="list-title"> {{ rightTitle }}</h1>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import propsDefination from './extends/props'
    import { useTargetIndex, useComputedData } from './extends/hooks'

    const props = defineProps(propsDefination);
    const options =  props.data.map(({title}) => title);

    const [
        targetIndex,
        setTargetIndex
    ] = useTargetIndex(0);

    const {
        leftTitle
    } = useComputedData(props.data, targetIndex);

    

</script>

<style lang="scss">
.transfer {
    display: flex;
    width: 360px;
    height: 300px;
    border: 1px solid #ddd;

    .box {
        width: 120px;
        height: 100%;

        .list-title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 38px;
            font-weight: normal;
            font-size: 14px;
            margin: 0;
            color: #666;
            border-bottom: 1px solid #ddd;
            background-color: #efefef;
        }

        &.button-group {
            display: flex;
            justify-content: center;
            align-items: center;
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;

            button {
                border: none;
                outline: none;
                width: 38px;
                height: 38px;
                background-color: orange;
                color: #fff;
                border-radius: 5px;

                &:disabled {
                    opacity: .6;
                }

                &:nth-child(2) {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>