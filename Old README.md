# **Talabk**

---

## back-end

### Todo

- [ ] update all api url schema to be lowercase and to be all standard.
- [ ] update all functions with trycatch Statement
  - [ ] and HTTP response status codes to be standardized.
  - [ ] and standardize error massage .

### In Progress

### Done ✓

- [x] check order import in customer controlle.

- [x] prevent the menu from displaying any manu/item/table if status are false.

- [x] ~~prevent the business from doing any action before verifing.~~

  - done ✔, business can't create menu or deal with orders without being verified or active.

- [x] update and review business controller.

- [x] fix isValidObjID and use on the needed routes.

- [x] add tables item controller to the menu.

- [x] ~~add regex to all api that's take objectID.~~
  - **created middleware to use in any objID route**
- [x] ~~solve mongoose uniqueValidator problem with login in multi users.~~
  - **solved by editing the package index.js file**
- [x] remove the uniqe from branchID.
- [x] ~~looking for better alternative to "menu branchID" unique property~~
  - **done by adding quick check with regex to branchID**

---

## front-end

### Todo
