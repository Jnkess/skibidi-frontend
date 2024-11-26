import { defineFunction } from '@aws-amplify/backend';

export const resetpwd = defineFunction({
  name: 'resetpwd',
  entry: './handler.ts',
});