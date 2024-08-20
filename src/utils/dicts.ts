import { GenderEnum } from "#/enums/entity";
import { UsableStatusEnum } from "#/enums/sys";

export const dicts = {
  "gender": {
    [GenderEnum.MALE]: "男",
    [GenderEnum.FEMALE]: "女",
    [GenderEnum.UNKNOWN]: "未知",
  },

  "usable-status": {
    [UsableStatusEnum.ENABLE]: "启用",
    [UsableStatusEnum.DISABLE]: "禁用",
  },
};
