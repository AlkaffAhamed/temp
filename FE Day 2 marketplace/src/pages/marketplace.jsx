import * as React from "react";
import { ListingItem } from "../components/listing-item";
import { Button } from "../components/button";
import { useState, useEffect} from "react"

const getListings = () =>
  fetch("https://ecomm-service.herokuapp.com/marketplace").then((res) =>
    res.json()
  );

const deleteListing = (id) => 
{
  return fetch(`https://ecomm-service.herokuapp.com/marketplace/${id}`, {
    method: "DELETE",
  });
}

const addListing = (data) => 
{
  console.log("ADD")
  console.log(data)
  return fetch(`https://ecomm-service.herokuapp.com/marketplace`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

const editListing = (data) => 
{
  console.log("EDIT")
  console.log(data)
  return fetch(`https://ecomm-service.herokuapp.com/marketplace/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export const Marketplace = () => {
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [listings, setListings] = useState(undefined);
  const [listing, setListing] = useState({
    id: "",
    title: "",
    condition: "new",
    description: "",
    availability: "in-stock",
    imageUrl: "",
    numOfStock: "",
    price: "",
  });

  function resetListing() {
    setListing({
      id: "",
      title: "",
      condition: "new",
      description: "",
      availability: "in-stock",
      imageUrl: "",
      numOfStock: "",
      price: "",
    });
  }

  function loadListings() {
    getListings().then((data) => setListings(data));
  }

  useEffect(() => {
    loadListings();
  }, []);

  function handleDeleteListing(id)
  {
    deleteListing(id).then(() => loadListings())
  }

  function handleEditListingStart(listing)
  {
    setListing(listing)
    setIsEditing(true)
  }

  function handleEditListingEnd()
  {
    resetListing()
    setIsEditing(false)
  }

  function handleEditListingForm(listing)
  {
    editListing(listing)
    .then(() => loadListings())
    .then(() => handleEditListingEnd())
  }


  return (
    <div className="lg:flex bg-gray-50">
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-3 py-12 space-y-6">
          <div className="mb-8">
            <div>
              <h1 className="text-6xl mb-4 font-extrabold">Marketplace</h1>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
            {listings &&
              listings.map((i) => (
                <ListingItem
                  imageUrl={i.imageUrl}
                  title={i.title}
                  description={i.description}
                  price={i.price}
                  availableStock={i.numOfStock}
                  condition={i.condition}
                  onlyOne={i.availability === "single-item"}
                  key={i._id}
                  id={i._id}
                  onEdit={handleEditListingStart}
                  onDelete={handleDeleteListing}
                  onEditEnd={handleEditListingEnd}
                  isEditing={i._id === listing.id}
                />
              ))}
          </div>
          {!listings && (
            <div className="text-center">
              <Button
                onClick={() => {
                  setClicked(true);
                  getListings().then((result) => setListings(result));
                }}
              >
                {clicked ? "Loading..." : "Load Listing"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <ListingForm 
        listing={listing} 
        isEditing={isEditing}
        handleEdit={handleEditListingForm} />
    </div>
  );
};

const ListingForm = ({listing, isEditing, handleEdit}) => 
{
  const [isAdding, setIsAdding] = useState(false);
  //const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(listing.title);
  const [description, setDescription] = useState(listing.description);
  const [price, setPrice] = useState(listing.price);
  const [condition, setCondition] = useState(listing.condition);
  // const [imageUrl, setImageUrl] = useState(listing.imageUrl);
  const [availability, setAvailability] = useState(listing.availability);
  const [numOfStock, setNumOfStock] = useState(listing.numOfStock);

  useEffect(() => 
  {
    setTitle(listing.title);
    setDescription(listing.description);
    setPrice(listing.price);
    setCondition(listing.condition);
    //setImageUrl(listing.imageUrl);
    setAvailability(listing.availability);
    setNumOfStock(listing.numOfStock);
  }, [listing]);

  function handleAddListing() {
    addListing(
      {
      title,
      condition,
      description,
      availability,
      imageUrl: "",
      numOfStock: Number(numOfStock) || 0,
      price: Number(price),
    }).then(() => setIsAdding(false));
  }

  function handleEditListing() {
    console.log("EDIT HANDLE")
    console.log(listing, isAdding, isEditing, title, description, price, condition, availability, numOfStock)
    handleEdit({
      id: listing.id,
      title,
      condition,
      description,
      availability,
      imageUrl: "",
      numOfStock: Number(numOfStock) || 0,
      price: Number(price),
    })
    //.then(() => setIsEditing(false));
  }


  return (
    <div className="flex-initial bg-white w-full lg:max-w-md border-b border-gray-100">
      <form className="flex flex-col h-full" 
      onSubmit={(e) => 
      {
        e.preventDefault();
        console.log("FORM.ONSUBMIT(): isAdding, isEditing", isAdding, isEditing)
        if (!isEditing) setIsAdding(true);
        !isEditing ? handleAddListing() : handleEditListing();
      }}>
        <div className="py-6 px-4 bg-pink-700 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">New Listing</h2>
          </div>
          <div className="mt-1">
            <p className="text-sm text-pink-300">
              {isEditing 
              ? "Edit the selected listing and click \"Edit\"." 
              : "Get started by filling in the information below to create your new listing."}
            </p>
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-12">
          <div className="space-y-6 pt-6 pb-5">
            <Field label="Title">
              <input
                type="text"
                className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field label="Price">
              <input
                type="number"
                className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Field>
            <Field label="Description">
              <textarea
                className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
            <Field label="Condition">
              <select 
                className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md" 
                value={condition}
                onChange={(e) => setCondition(e.target.value)}>
                  <option value="new">New</option>
                  <option value="used_like-new">Used (like new)</option>
                  <option value="used_good">Used (good)</option>
                  <option value="used_fair">Used (fair)</option>
              </select>
            </Field>
            <Field label="Availability">
              <select 
              className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
              value={availability}
                onChange={(e) => setAvailability(e.target.value)}>
                <option value="in-stock">In Stock</option>
                <option value="single-item">Single Item</option>
              </select>
            </Field>
            <Field label="Number of Available Stock">
              <input
                type="number"
                className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md"
                value={numOfStock}
                min="1"
                max={availability === "single-item" ? "1" : "10000"}
                onChange={(e) => setNumOfStock(e.target.value)}
              />
            </Field>
          </div>
        </div>
        <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-200">
          <Button type="submit">
            {!isAdding && !isEditing && "ADD"}
            {isAdding && !isEditing && "ADDING..."}
            {isEditing && "EDIT"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const Field = ({ children, label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-900">{label}</label>
    <div className="mt-1">{children}</div>
  </div>
);
