# Data Modeling

## Todos Model

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
