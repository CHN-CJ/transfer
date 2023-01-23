import { computed, reactive, ref } from "vue";

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

export function useCheckedData() {
    const checkedData = reactive({
        left: [],
        right: []
    });

    function addCheckedData(leftOrRigth, item) {
        switch (leftOrRigth) {
            case 'left':
                checkedData.left.push(item);
                console.log(checkedData.left);
                break;
            case 'right':
                checkedData.right.push(item);
                break;
            default:
                break;
        }
    }

    function removeCheckedData(leftOrRigth, id) {
        switch (leftOrRigth) {
            case 'left':
                checkedData.left = checkedData.left.filter(item => item.id !== id);
                console.log(checkedData.left);
                break;
            case 'right':
                checkedData.right = checkedData.right.filter(item => item.id !== id);
                break;
            default:
                break;
        }
    }

    return [
        checkedData,
        addCheckedData,
        removeCheckedData
    ]
}

export function useRightListData(initialData, checkedData) {
    const rightListData = ref(initialData);

    //newData type Array
    function addRightListData(newData) {
        rightListData.value = [
            ...rightListData.value,
            ...newData
        ];

        console.log(rightListData.value);

        checkedData.left = [];
    }

    function removeRightListData(newData) {
        newData.forEach(newItem => {
            rightListData.value = rightListData.value.filter(item => item.id !== newItem.id);
        })
        console.log(rightListData.value);

        checkedData.right = []
    }

    return [
        rightListData,
        addRightListData,
        removeRightListData
    ]
}

export function useComputedData(data, targetIndex, rightListData, checkedData) {
    const leftTitle = computed(() => data[targetIndex.value].title);

    const leftListData = computed(() => {
        const { data: currentData } = data[targetIndex.value];

        return currentData.filter(item => {
            if (!rightListData.value.find(({ id }) => item.id === id))
                return item;
        })
    })

    const transferButtonDisabled = computed(() => ({
        left: checkedData.right.length === 0,
        right: checkedData.left.length === 0
    }))

    return {
        leftTitle,
        leftListData,
        transferButtonDisabled
    }
}