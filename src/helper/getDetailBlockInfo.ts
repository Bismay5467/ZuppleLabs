import { DETAIL_BLOCK_INFO_KEYS } from "../constants/constants";
import { TBlockDetail } from "../types";

const getDetailBlockInfo = (blockInfo: TBlockDetail) => {
  const detailBlockInfo = new Map<
    keyof TBlockDetail,
    string | number | undefined
  >();

  Object.values(DETAIL_BLOCK_INFO_KEYS).forEach((value) => {
    const correspondingValue = blockInfo[value as keyof typeof blockInfo] as
      | string
      | number
      | undefined;
    detailBlockInfo.set(value as keyof TBlockDetail, correspondingValue);
  });

  return detailBlockInfo;
};

export default getDetailBlockInfo;
