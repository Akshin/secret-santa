const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const useValidation = () => {
  function validateEmail(email: string): { access: boolean; message: string } {
    if (!email) return { access: true, message: "" };
    const access = emailRegex.test(email);
    const message = access ? "" : "Неправильный формат почты";
    return { access, message };
  }

  return { validateEmail };
};
