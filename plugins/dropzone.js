import { useDropzone } from 'vue3-dropzone';

export default defineNuxtPlugin((nuxtApp) => {
  // Define a composable function that sets up the dropzone and returns FormData
  nuxtApp.provide('useDropzoneFormData', () => {
    const createFormData = (files) => {
      const formData = new FormData();
      for (let x = 0; x < files.length; x++) {
        formData.append('images[]', files[x]);
      }
      return formData;
    };

    const onDrop = (acceptedFiles, rejectedFiles) => {
      return createFormData(acceptedFiles);  // Return FormData for accepted files
    };

    const { getRootProps, getInputProps, ...dropzoneProps } = useDropzone({ onDrop });

    return {
      getRootProps,
      getInputProps,
      ...dropzoneProps,
      createFormData,  // Expose FormData creation function
    };
  });
});
