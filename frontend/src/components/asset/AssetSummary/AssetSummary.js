import React, { useEffect } from "react";
import "./AssetSummary.scss";

import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  selectCategory,
  selectOutOfStock,

} from "../../../redux/features/asset/assetSlice";

// Icons
const assetIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;



const AssetSummary = ({ assets }) => {
  const dispatch = useDispatch();
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_OUTOFSTOCK(assets));
    dispatch(CALC_CATEGORY(assets));
  }, [dispatch, assets]);

  return (
    <div className="asset-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={assetIcon}
          title={"Total Assigned Assets"}
          count={assets.length}
          bgColor="card1"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Total Lease Assets"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Total Loan Assets"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default AssetSummary;
