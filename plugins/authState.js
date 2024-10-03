// plugins/authState.client.ts
import { defineNuxtPlugin, useCookie, useState } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("authState", () => {
    // Create the state and sync it with a cookie
    const authState = useState("auth", () => null);

    // Sync with cookie
    const cookieAuthState = useCookie("authState", {
      sameSite: "strict", // CSRF protection
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
    });

    // Set initial state from the cookie
    if (cookieAuthState.value) {
      authState.value = cookieAuthState.value;
    }

    // Watch for state changes and sync to cookie
    watch(authState, (newValue) => {
      cookieAuthState.value = newValue;
    });

    // Method to set the auth token
    const setAuthToken = (token) => {
      authState.value = token;
    };

    // Method to clear the auth token (e.g., on logout)
    const clearAuthToken = () => {
      authState.value = null;
      cookieAuthState.value = null; // Clear the cookie
    };

    return { authState, setAuthToken, clearAuthToken };
  });
});
