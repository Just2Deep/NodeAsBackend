# Data Modeling

## Todos Model

A Simple Todo App with grouped todo lists

1. User
   - username
   - email
   - password
2. Todo
   - title
   - color
   - createdBy - (User)
   - complete
   - sub_todos - [ {sub-todo}, ]
3. Sub-Todo
   - content
   - completed
   - createdBy

## Ecommerce Model

A simple ecommerce app with a range of product and categories

1. User
   - username
   - email
   - password
2. Category
   - name
   - createdBy (ref - User)
3. Product
   - name
   - description
   - productImage (url of the data/image)
   - price
   - stock/quantity
   - category (ref - Category)
   - owner (ref - User)
4. Order
   - amount
   - customer
   - orderItems (list of products and quantities)
   - address
