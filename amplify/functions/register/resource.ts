import { defineFunction } from '@aws-amplify/backend';

export const register = defineFunction({
  name: 'register',
  entry: './handler.ts',
});