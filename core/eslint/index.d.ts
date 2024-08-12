import { antfu } from '@antfu/eslint-config';

export type Config = ReturnType<typeof antfu>;

declare const configs: {
  next: {
    recommended: Config;
  };
};
