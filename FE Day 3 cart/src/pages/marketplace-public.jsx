import { LoginForm, useAuthState } from "domains/auth";
import { ListingItem, useListings, CartItem, useCartItems} from "domains/marketplace";
import { getPriceString } from 'lib/price-string';
import * as React from "react";

const addToCart = (listingId, token) =>
  fetch("https://ecomm-service.herokuapp.com/marketplace/cart/items", {
    method: "POST",
    body: JSON.stringify({
      quantity: 1,
      listingId,
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });

  
const removeFromCart = (listingId, token) =>
  fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items/${listingId}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
  
const CartItemList = ({items, token, reload}) => (
  <div>
    <ul id="cart-item-list" className="divide-y divide-gray-200">
      { items.map(item => (
        <CartItem
          listing={item.listing}
          quantity={item.quantity}
          handleRemoveFromCart={() => removeFromCart(item.listing._id, token).then(reload)}
          key={item._id}  
          />
      )) }
    </ul>
  </div>
);

const CartTotal = ({items}) => (
  <div className="
      flex-shrink-0
      px-4
      py-4
      flex
      justify-end
      border-t border-gray-200
    ">
    <span>Total <span className="text-3xl">$<span>{ getPriceString(items.reduce((sum, item) => sum += item.listing.price * item.quantity, 0)) }</span></span></span>
  </div>
);

const CartEmpty = () => (
  <div className="pt-6 pb-5">
    <div id="no-cart-item-message">
      <p className="text-center text-gray-500">
        There is no item in your shopping cart.
      </p>
    </div>
  </div>
);


export const MarketplacePublic = () => {
  const { listings } = useListings();
  const auth = useAuthState();
  const { cartItems, loadCartItems } = useCartItems([]);

  const cartSection = [];
  if (cartItems && cartItems.length > 0) {
    cartSection.push(
      <CartItemList items={cartItems} token={auth.accessToken} reload={loadCartItems} key="cart-item-list" />,
    );
  }
  else {
    cartSection.push(<CartEmpty key="cart-empty" />);
  }

  return (
    <div className="w-full flex flex-row">
      <div className="w-3/4 mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {auth.status === "anonymous" && (
          <LoginForm
            onSuccess={(accessToken) => {
              auth.login(accessToken);
            }}
          />
        )}
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
          {listings &&
            listings.map((item) => (
              <ListingItem
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                price={item.price}
                availableStock={item.numOfStock}
                onlyOne={item.availability === "single-item"}
                onAddToCart={
                  auth.status === "authenticated"
                    ? () => addToCart(item._id, auth.accessToken).then(loadCartItems)
                    : undefined
                }
                key={item._id}
              />
            ))}
        </div>
      </div>
      <div className="w-1/4">
          <div className="bg-pink-800 text-xl text-white text-center p-4">
            <p> Shopping Cart</p>
          </div>
          <div>
            {/* <CartItem listing={{imgurl:"aa", name:"aaa", price:"111"}} quantity="aaa" handleRemoveFromCart="123" /> */}
            {cartSection}
          </div>
        </div>
    </div>
  );
};
