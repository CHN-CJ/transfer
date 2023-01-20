import { computed, ref } from "vue";

export function useTargetIndex(initialIndex) {
    const targetIndex = ref(initialIndex);

    function setTargetIndex(newIndex) {
        targetIndex.value = Number(newIndex);
        console.log(targetIndex.value);
    }

    return [
        targetIndex,
        setTargetIndex
    ]
}

export function useComputedData(data, targetIndex) {
    const leftTitle = computed(() => data[targetIndex.value].title);

    return {
        leftTitle
    }
}