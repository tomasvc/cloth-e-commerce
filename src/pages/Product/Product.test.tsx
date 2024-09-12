import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/userSlice";
import productReducer from "slices/productSlice";
import cartReducer from "slices/cartSlice";
import favoritesReducer from "slices/favoriteSlice";
import * as productApi from "api/getProduct";
import * as priceApi from "api/getProductPrice";
import * as alsoLikeApi from "api/getAlsoLike";
import * as buyTheLookApi from "api/getBuyTheLook";

jest.mock("api/getProduct");
jest.mock("api/getProductPrice");
jest.mock("api/getAlsoLike");
jest.mock("api/getBuyTheLook");

jest.mock("./components/ProductActions", () => ({
  ProductActions: () => (
    <div data-testid="product-actions">Product Actions</div>
  ),
}));
jest.mock("./components/ProductDetails", () => ({
  ProductDetails: () => (
    <div data-testid="product-details">Product Details</div>
  ),
}));
jest.mock("./components/ProductGallery", () => ({
  ProductGallery: () => (
    <div data-testid="product-gallery">Product Gallery</div>
  ),
}));
jest.mock("./components/ProductGrid", () => ({
  ProductGrid: () => <div data-testid="product-grid">Product Grid</div>,
}));

const mockStore = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

describe("Product Component", () => {
  const mockProduct = {
    data: {
      id: "1",
      name: "Test Product",
      gender: "unisex",
      media: { images: [{ colour: "red" }] },
    },
  };

  const mockPrice = {
    data: [{ productPrice: { current: { value: 99.99, text: "$99.99" } } }],
  };

  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    (productApi.useProduct as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false,
    });
    (priceApi.useProductPrice as jest.Mock).mockReturnValue({
      data: mockPrice,
      isLoading: false,
    });
    (alsoLikeApi.useAlsoLike as jest.Mock).mockReturnValue({
      data: { data: { data: [] } },
    });
    (buyTheLookApi.useBuyTheLook as jest.Mock).mockReturnValue({
      data: { data: { data: { products: [] } } },
    });
  });

  it("renders the product page with all components", async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByTestId("product-gallery");
    await screen.findByTestId("product-details");
    await screen.findByTestId("product-actions");
  });

  it("displays loading state when data is being fetched", () => {
    (productApi.useProduct as jest.Mock).mockReturnValue({ isLoading: true });
    (priceApi.useProductPrice as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays error message when product data is not found", async () => {
    (productApi.useProduct as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Details of this product could not be found.")
      ).toBeInTheDocument();
    });
  });
});
