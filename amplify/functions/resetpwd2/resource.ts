import { defineFunction } from '@aws-amplify/backend';

export const resetpwd2 = defineFunction({
  name: 'resetpwd2',
  entry: './handler.ts',
});