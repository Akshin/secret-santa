import type { IFieldProps } from "@/types";
import { uuid4 } from "@/utils/uuid";
import { computed, reactive } from "vue";

export const useFieldProps = (props: IFieldProps) => {
  const id = "input_" + uuid4();

  const isDisabled = computed(() => props.readonly || props.disabled);

  const classes = computed(() => ({
    disabled: props.disabled,
    loading: props.loading,
    readonly: props.readonly,
    clearable: props.clearable,
    "has-errors": props.errors?.length,
    "has-prepend-icon": !!props.prependIcon,
    "has-append-icon": !!props.appendIcon
  }));

  const showClearableButton = computed(() => {
    const clearable =
      props.clearable && props.modelValue && props.modelValue.length && !isDisabled.value;
    return !!clearable;
  });

  const showErrors = computed(() => !!props.errors?.length && !isDisabled.value);

  return reactive({
    id,
    isDisabled,
    classes,
    showClearableButton,
    showErrors
  });
};

export const useFieldsEmits = (emits: any) => {
  function onClear() {
    emits("update:modelValue", "");
  }

  function onInput(e: any) {
    const value = e?.target?.value;
    emits("update:modelValue", value);
  }

  function onBlur() {
    emits("blur");
  }

  function onEsc() {
    emits("onEsc");
  }

  return {
    onClear,
    onInput,
    onBlur,
    onEsc
  };
};
