import React, { useEffect } from "react";
import "./AssetSummary.scss";

import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_WINDOWS_ASSETS,
  CALC_MACINTOSH_ASSETS,
  selectWindowsAssetsCount,
  selectMacintoshAssetsCount,

} from "../../../redux/features/asset/assetSlice";

// Icons
const assetIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;



const AssetSummary = ({ assets }) => {
  const dispatch = useDispatch();
  const windowsAssetsCount = useSelector(selectWindowsAssetsCount);
  const macintoshAssetsCount = useSelector(selectMacintoshAssetsCount);

  useEffect(() => {
    dispatch(CALC_WINDOWS_ASSETS(assets));
    dispatch(CALC_MACINTOSH_ASSETS(assets));
  }, [dispatch, assets]);

  return (
    <div className="asset-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={assetIcon}
          title={"Total Assets"}
          count={assets.length}
          bgColor="card1"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Total Windows Assets"}
          count={windowsAssetsCount}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Total Macintosh Assets"}
          count={macintoshAssetsCount}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default AssetSummary;
