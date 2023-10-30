import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./AssetList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_ASSETS,
  selectFilteredAssets,
} from "../../../redux/features/asset/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteAsset,
  getAssets,
} from "../../../redux/features/asset/assetSlice";
import { Link } from "react-router-dom";

const AssetList = ({ assets, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredAssets = useSelector(selectFilteredAssets);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delAsset = async (id) => {
    console.log(id);
    await dispatch(deleteAsset(id));
    await dispatch(getAssets());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Asset",
      message: "Are you sure you want to delete this asset.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delAsset(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredAssets.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredAssets.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredAssets]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredAssets.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  useEffect(() => {
    dispatch(FILTER_ASSETS({ assets, search }));
  }, [assets, search, dispatch]);

  return (
    <div className="asset-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && assets.length === 0 ? (
            <p>-- No asset found, please add an asset...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((asset, index) => {
                  const { _id, name, category, price, quantity } = asset;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/asset-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-asset/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default AssetList;
