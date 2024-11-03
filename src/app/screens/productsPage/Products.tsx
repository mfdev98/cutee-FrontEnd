import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /* HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.page = 1;
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <div className={"avatar-big-box"}>
        <Stack className={"top-text"}>
          <Stack className={"single-search-big-box"}>
            <input
              type={"search"}
              className={"single-search-input"}
              name={"singleResearch"}
              placeholder={"Type here"}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProductHandler();
                }
              }}
            />
            <Button
              className={"single-button-search"}
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={searchProductHandler}
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </div>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  sx={{
                    backgroundColor: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#acdee7"
                        : "#ff9689", // primary일 때 빨간색, secondary일 때 흰색
                    color: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "white"
                        : "white", // primary일 때 텍스트는 흰색, secondary일 때는 검은색
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  sx={{
                    backgroundColor: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.DESSERT
                        ? "#acdee7"
                        : "#ff9689", // primary일 때 빨간색, secondary일 때 흰색
                    color: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.DESSERT
                        ? "white"
                        : "white", // primary일 때 텍스트는 흰색, secondary일 때는 검은색
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  HEALTH
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  sx={{
                    backgroundColor: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "#acdee7"
                        : "#ff9689", // primary일 때 빨간색, secondary일 때 흰색
                    color: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "white"
                        : "white", // primary일 때 텍스트는 흰색, secondary일 때는 검은색
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  TOYS
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  sx={{
                    backgroundColor: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.SALAD
                        ? "#acdee7"
                        : "#ff9689", // primary일 때 빨간색, secondary일 때 흰색
                    color: (theme) =>
                      productSearch.productCollection ===
                      ProductCollection.SALAD
                        ? "white"
                        : "white", // primary일 때 텍스트는 흰색, secondary일 때는 검은색
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  ESSENTIALS
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  sx={{
                    backgroundColor: (theme) =>
                      productSearch.productCollection === ProductCollection.DISH
                        ? "#acdee7"
                        : "#ff9689", // primary일 때 빨간색, secondary일 때 흰색
                    color: (theme) =>
                      productSearch.productCollection === ProductCollection.DISH
                        ? "white"
                        : "white", // primary일 때 텍스트는 흰색, secondary일 때는 검은색
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  CLOTHING
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litre"
                      : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        {/* <div className={"product-sale"}>{sizeVolume}</div> */}
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6299.170850055071!2d127.73903477871889!3d37.86998976321526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e5c841815175%3A0x641f3d5ba99eaf6b!2z6rCV7JuQ64yA7ZWZ6rWQIOy2mOyynOy6oO2NvOyKpA!5e0!3m2!1sko!2skr!4v1720920250944!5m2!1sko!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
