// hooks/usePasswordStrength.ts

import { useState, useEffect } from "react";

export const checkPasswordStrength = (pw: string) => {
  const minLength = 8;
  const checks = [
    { re: /[a-z]/, label: "حرف صغير" },
    { re: /[A-Z]/, label: "حرف كبير" },
    { re: /[0-9]/, label: "رقم" },
    { re: /[^A-Za-z0-9]/, label: "رمز خاص" },
  ];
  const passed = checks.reduce((acc, c) => acc + (c.re.test(pw) ? 1 : 0), 0);
  if (pw.length < minLength) {
    return { strong: false, message: `ضعيفة — يجب ألا تقل عن ${minLength} حروف` };
  }
  if (passed < 3) {
    return { strong: false, message: "متوسطة — أضف أحرف كبيرة/أرقام/رموز" };
  }
  return { strong: true, message: "قوية ✅" };
};

export const usePasswordStrength = (password: string) => {
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState<string>("");
  const [passwordStrong, setPasswordStrong] = useState(false);

  useEffect(() => {
    const { strong, message } = checkPasswordStrength(password);
    setPasswordStrengthMsg(message);
    setPasswordStrong(strong);
  }, [password]);

  return { passwordStrengthMsg, passwordStrong };
};