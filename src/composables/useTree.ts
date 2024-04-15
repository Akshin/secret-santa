import { useImage } from "@/composables/useImage";
import { useCommonStore } from "@/stores/common.store";
import { computed } from "vue";

export const useTree = () => {
  const storeCommon = useCommonStore();
  const { getImage } = useImage();

  const totalScore = storeCommon.totalScore;
  const progressData = storeCommon.propgressData;

  const nextScoreIdx = computed<number>(() => {
    for (let i = 0; i < progressData.length; i++) {
      if (totalScore < progressData[i]) {
        const _totalScore = i === 0 ? totalScore : totalScore - progressData[i - 1];
        const _progressData = i === 0 ? progressData[i] : progressData[i] - progressData[i - 1];
        const k = Math.floor((_totalScore * 100) / _progressData) / 100;
        return i + k;
      }
    }

    return progressData.length;
  });

  const treeProgress = computed<number>(() => {
    return nextScoreIdx.value;
    // const isAllScored: boolean = nextScoreIdx.value >= progressData.length;
    // if (isAllScored) {
    //   return { progress: 100, text: "Все игрушки собраны" };
    // }

    // const nextToy: number = progressData[nextScoreIdx.value];
    // const untilNextToy: number = nextToy - totalScore;
    // const progress: number = (totalScore * 100) / nextToy;
    // const text = `${untilNextToy} ${sklonenie(untilNextToy, ["игрушек", "игрушки", "игрушек"])}`;
    // return { progress, text };
  });

  const treeImageSrc = computed<string>(() => {
    return getImage(`Tree_stage${Math.floor(nextScoreIdx.value)}`);
  });

  return { treeProgress, treeImageSrc };
};
