CartItem example:
```jsx

const Demo = () => 
{
  const l1 = 
  {
    title: "Coca-cola",
    price: "2.50",
    imageUrl: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80"
  };
  
  const l2 = 
  {
    title: "Stylish Shoe",
    price: "600",
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80"
  }
  
  return(
    <div className="grid md:grid-cols-1 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
      <CartItem
        listing={l1}
        quantity={20}
      />
      <CartItem
        listing={l2}
        quantity={1}
      />
    </div>
  );
}

<Demo />

// <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
//   <CartItem
//     listing={{
//       imageUrl:"https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80", 
//       title:"Coca-cola", 
//       price:{"2.5"}
//     }}
//     quantity="1"
//   />
//   <CartItem
//     listing={{
//       imageUrl:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80", 
//       title:"Stylish Shoe", 
//       price:{"600"}
//     }}
//     quantity="1"
//   />
// </div>

```
