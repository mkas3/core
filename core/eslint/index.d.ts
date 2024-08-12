import { TypedFlatConfigItem } from '@antfu/eslint-config';

declare const configs: {
  next: {
    recommended: Promise<TypedFlatConfigItem[]>;
  };
};
