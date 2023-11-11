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

## Hospital Management Model

1. Doctor
   - name
   - salary
   - qualifications
   - experienceInYears
   - worksInHospital [List of hospitals]
2. Patient
   - name
   - diagnosedWith
   - age
   - gender
   - address
   - blood group
   - admitted In (Hospital ref)
3. Hospital
   - name
   - addressLine1
   - addressLine2
   - city
   - pincode
   - specializedIn (Array of String)
4. Medical Records
   - patient (ref patient)
   - illness ( illness name and description ) Array
