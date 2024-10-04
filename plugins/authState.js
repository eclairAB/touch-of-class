// plugins/authState.client.ts
import { defineNuxtPlugin, useCookie, useState } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("authState", () => {
    const authState = useState("auth", () => null);

    const cookieAuthState = useCookie("authState", {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    if (cookieAuthState.value) {
      authState.value = cookieAuthState.value;
    }

    watch(authState, (newValue) => {
      cookieAuthState.value = newValue;
    });

    const setAuthToken = (token) => {
      authState.value = token;
    };

    const clearAuthToken = () => {
      authState.value = null;
      cookieAuthState.value = null;
    };

    return { authState, setAuthToken, clearAuthToken };
  });
});
