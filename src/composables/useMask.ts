import { MaskInput } from "maska";
import { onBeforeUnmount, onMounted } from "vue";

export const useMask = (
  elementId: string,
  mask?: string,
  preProcess?: (value: string) => string,
  postProcess?: (value: string) => string
) => {
  if (!elementId || !mask || !mask.length) return;

  let maskInput: any = null;

  const options: any = {
    mask,
    tokens: {
      N: { pattern: /\d/, repeated: true }
    }
  };

  if (preProcess) options.preProcess = preProcess;
  if (postProcess) options.postProcess = postProcess;

  onMounted(() => {
    maskInput = new MaskInput(`#${elementId}`, options);
  });

  onBeforeUnmount(() => maskInput.destroy());
};
