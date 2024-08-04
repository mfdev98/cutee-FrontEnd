import { createSelector } from "reselect";
import { AppRootState, ProductsPageState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage: ProductsPageState) => ProductsPage.restaurant
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage: ProductsPageState) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage: ProductsPageState) => ProductsPage.products
);
