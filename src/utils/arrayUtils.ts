class ArrayUtils {
    static sortedDataFrom(arr: Array<any>, str: string) {
        const nowIndex = arr.findIndex((item) => item.time === str);

        if (nowIndex !== -1) {
            const beforeNow = arr.slice(0, nowIndex);
            const afterNow = arr.slice(nowIndex + 1);

            // 重新排列陣列，將 Now 放在第一位
            const reorderedArray = [arr[nowIndex], ...afterNow, ...beforeNow];

            return reorderedArray;
        }
    }
}

export default ArrayUtils;
