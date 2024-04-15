import type { IFormAgreementObject, IFormProps, IFormValidationErrors } from "@/types";
import { useVuelidate } from "@vuelidate/core";
import { computed, reactive, unref, watch } from "vue";
import { useDI } from "./useUI";

export const useForm = function (props: IFormProps) {
  const DI = useDI();

  const data = unref(props.data);
  const formData = reactive(data);

  const $v: any = useVuelidate(props.validation as any, formData);
  const formIsInvalid = computed<boolean>(() => $v.value.$invalid);

  const agreement = computed<IFormAgreementObject>(() => {
    if (!props.agreementLink) return { before: "", link: "", after: "" };
    if (!props.agreementText) return { before: "", link: props.agreementLink, after: "" };

    const beforeIndex = props.agreementText.indexOf("{");
    const afterIndex = props.agreementText.indexOf("}");
    const before = props.agreementText.substring(0, beforeIndex);
    const link = props.agreementText.substring(beforeIndex + 1, afterIndex);
    const after = props.agreementText.substring(afterIndex + 1, props.agreementText.length);
    return { before, link, after };
  });

  const errors = computed<IFormValidationErrors>(() => {
    const result: IFormValidationErrors = {};

    for (const fieldName in data) {
      const fieldVal = $v.value[fieldName];
      if (!fieldVal) continue;

      const errors = fieldVal.$errors;
      if (!errors || !errors.length) continue;

      result[fieldName] = [];

      errors.forEach((error: any) => {
        result[fieldName].push(DI?.localize(`$error_${error.$validator}`, error.$params));
      });
    }

    return result;
  });

  watch(formData, $v.value.$touch, { deep: true });

  return {
    formData,
    formIsInvalid,
    errors,
    agreement
  };
};
