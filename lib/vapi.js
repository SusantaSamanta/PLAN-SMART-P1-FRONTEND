import Vapi from '@vapi-ai/web';

// console.log('vapi');

// export const vapi = new Vapi('3b46ca27-50d7-43d1-a556-dfe6d3d01f46');  // pervious account
export const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY);
