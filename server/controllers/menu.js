"use strict";
const { Menu, Item, Table } = require("../models/menu");
const { generateQR } = require("../middlewares/generateQR");
module.exports = {
  create: (req, res, next) => {
    try {
      if (!req.body.username) {
        res.statusCode = 500;
        res.send({
          name: "usernameError",
          message: "username is required",
        });
      } else if (!req.body.name) {
        res.statusCode = 500;
        res.send({
          name: "nameError",
          message: "name is required",
        });
      } else if (!req.file) {
        res.statusCode = 500;
        res.send({
          name: "logoError",
          message: "logo is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            res.statusCode = 500;
            res.send({
              message: "you already have a menu",
            });
          } else {
            const newMenu = new Menu({
              businessID: req.user.workIn,
              username: req.body.username,
              name: req.body.name,
              logo: req.file.buffer,
              logoMimetype: req.file.mimetype,
              description: req.body.description,
            });
            // console.log(req.file.buffer);
            newMenu.save((err) => {
              if (err) {
                res.status(400).send({
                  message: err,
                  success: false,
                });
              } else {
                generateQR(req.body.username).then(async (qr) => {
                  // const x = qr.split(","); original code
                  // const base64string = x[1]; original code
                  // const buffer = Buffer.from(base64string, "base64"); original code
                  const x = qr.split(/[:;,]/); // improved
                  const buffer = Buffer.from(x[3], x[2]);
                  newMenu.qrImg = buffer;
                  newMenu.qrMimetype = x[1];
                  await newMenu.save();
                });
                res.status(200).send({
                  message: "Menu created successfully",
                  success: true,
                });
              }
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  info: (req, res, next) => {
    try {
      Menu.aggregate([
        {
          $match: {
            businessID: req.user.workIn,
          },
        },
        // ,
        // {
        //   $replaceRoot: {
        //     newRoot: "",
        //   },
        // },
      ])

        // Menu.findOne({ businessID: req.user.workIn })
        // .then((menu) => {
        //   // menu.logo = await menu.logo.toString("base64");
        //   // menu.logo = await menu.qrImg.toString("base64");
        //   menu.logo = "jello";
        //   menu.qrImg = "hello";
        //   return menu;
        // })
        .then((menu) => {
          // menu.logo = await Buffer.from(menu.logo.data).toString("base64");
          // menu.qrImg = await Buffer.from(menu.qrImg.data).toString("base64");
          if (menu) {
            res.status(200).send(menu[0]);
          } else {
            res.status(404).send({
              message: "you don't even have a menu 🙂",
            });
          }
        });
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  update: (req, res, next) => {
    try {
      Menu.findOne({ businessID: req.user.workIn }).then(async (menu) => {
        if (menu) {
          if (req.body.username) {
            menu.username = req.body.username;
            //this will remake QR with the updated username
            await generateQR(req.body.username).then(async (qr) => {
              const x = qr.split(/[:;,]/);
              const buffer = Buffer.from(x[3], x[2]);
              menu.qrImg = buffer;
              menu.qrMimetype = x[1];
              await menu.save();
            });
          }
          if (req.body.name) {
            menu.name = req.body.name;
          }
          if (req.body.state) {
            menu.state = req.body.state;
          }
          if (req.body.description) {
            menu.description = req.body.description;
          }
          if (req.body.status) {
            menu.status = req.body.status;
          }
          if (req.file) {
            menu.logo = req.file.buffer;
            menu.logoMimetype = req.file.mimetype;
          }

          menu.save((err) => {
            if (err) {
              res.status(400).send({
                message: err,
                success: false,
              });
            } else {
              res.status(200).send({
                message: "menu has been updated successfully",
                success: true,
              });
            }
          });
        } else {
          res.status(404).send({
            message: "you don't even have a menu 🙂",
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  delete: (req, res, next) => {
    try {
      if (!req.body.name) {
        // this just sure to prevent deleting by accident
        res.status(400).send({
          name: "menuNameError",
          message: "Menu name is required to verify deleteing Menu",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            if (menu.name !== req.body.name) {
              res.status(403).send({
                message:
                  "please enter the correct menu name to confirm deleting the menu",
                success: false,
              });
            } else {
              Item.deleteMany({ MenuID: menu._id }, (err, result) => {
                if (err) {
                  res.status(400).send({
                    message: err,
                    success: false,
                  });
                } else {
                  Table.deleteMany({ MenuID: menu._id }, (err, result) => {
                    if (err) {
                      res.status(400).send({
                        message: err,
                        success: false,
                      });
                    } else {
                      menu.remove((err, result) => {
                        if (err) {
                          res.status(400).send({
                            message: err,
                            success: false,
                          });
                        } else {
                          res.status(200).send({
                            message:
                              "Menu and related items, tables has been removed successfully",
                            success: true,
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          } else {
            res.status(404).send({
              message: "you don't have a menu 🙂",
              success: false,
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  addItem: (req, res, next) => {
    try {
      // if (!req.body.MenuID) { // not needed
      //   res.statusCode = 500;
      //   res.send({
      //     name: "MenuIDError",
      //     message: "Menu ID is required",
      //   });
      // } else if (!req.body.name) {
      // }
      if (!req.body.name) {
        res.statusCode = 500;
        res.send({
          name: "nameError",
          message: "name is required",
        });
      } else if (!req.file) {
        res.statusCode = 500;
        res.send({
          name: "logoError",
          message: "logo is required",
        });
      } else if (!req.body.price) {
        res.statusCode = 500;
        res.send({
          name: "priceError",
          message: "price is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            const newItem = new Item({
              MenuID: menu._id,
              name: req.body.name,
              img: req.file.buffer,
              imgMimetype: req.file.mimetype,
              price: req.body.price,
            });
            newItem.save((err) => {
              if (err) {
                res.status(400).send({
                  message: err,
                  success: false,
                });
              } else {
                res.status(200).send({
                  message: "Item added to the Menu successfully",
                  success: true,
                });
              }
            });
          } else {
            res.status(404).send({
              message: "you don't have menu",
              success: false,
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  getItem: (req, res, next) => {
    // There's no value for this but I did it anyways.
    try {
      if (!req.body.ID) {
        res.status(400).send({
          name: "IDError",
          message: "item ID is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            Item.findOne({ MenuID: menu._id, _id: req.body.ID }).then(
              (item) => {
                if (item) {
                  // this used for testing
                  // res.set("Content-Type", item.imgMimetype);
                  // res.write("<h1>This is the response #: " + i + "</h1>");
                  // res.status(200).end();
                  res.status(200).send(item);
                } else {
                  res.status(404).send({
                    message: "this item don't exist",
                  });
                }
              }
            );
          } else {
            res.status(404).send({
              message: "you don't even have a menu 🙂",
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  updateItem: (req, res, next) => {
    try {
      if (!req.body.ID) {
        res.status(400).send({
          name: "IDError",
          message: "item ID is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            Item.findOne({ MenuID: menu._id, _id: req.body.ID }).then(
              (item) => {
                if (item) {
                  if (req.body.name) {
                    item.name = req.body.name;
                  }
                  if (req.body.price) {
                    item.price = req.body.price;
                  }
                  if (req.body.state) {
                    item.state = req.body.state;
                  }
                  if (req.body.status) {
                    item.status = req.body.status;
                  }
                  if (req.file) {
                    item.img = req.file.buffer;
                    item.imgMimetype = req.file.mimetype;
                  }

                  item.save((err) => {
                    if (err) {
                      res.status(400).send({
                        message: err,
                        success: false,
                      });
                    } else {
                      res.status(200).send({
                        message: "Item has been updated successfully",
                        success: true,
                      });
                    }
                  });
                } else {
                  res.status(404).send({
                    message: "this item don't exist",
                  });
                }
              }
            );
          } else {
            res.status(404).send({
              message: "you don't even have a menu 🙂",
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  deleteItem: (req, res, next) => {
    try {
      if (!req.body.ID) {
        res.status(400).send({
          name: "IDError",
          message: "item ID is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            Item.findOne({ MenuID: menu._id, _id: req.body.ID }).then(
              (item) => {
                if (item) {
                  item.remove((err) => {
                    if (err) {
                      res.status(400).send({
                        message: err,
                        success: false,
                      });
                    } else {
                      res.status(200).send({
                        message: "Item has been removed successfully",
                        success: true,
                      });
                    }
                  });
                } else {
                  res.status(404).send({
                    message: "this item don't exist",
                  });
                }
              }
            );
          } else {
            res.status(404).send({
              message: "you don't even have a menu 🙂",
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  addTable: (req, res, next) => {
    try {
      if (!req.body.tableNumber) {
        res.statusCode = 500;
        res.send({
          name: "tableNumberError",
          message: "table Number is required",
        });
      } else if (!req.body.chairNumber) {
        res.statusCode = 500;
        res.send({
          name: "chairNumberError",
          message: "chair Number is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            Table.findOne({
              MenuID: menu._id,
              tableNumber: req.body.tableNumber,
            }).then((tableExists) => {
              if (tableExists) {
                res.send({
                  message: " this table Number already used",
                });
              } else {
                const table = new Table({
                  MenuID: menu._id,
                  tableNumber: req.body.tableNumber,
                  chairNumber: req.body.chairNumber,
                });
                table.save((err) => {
                  if (err) {
                    res.status(400).send({
                      message: err,
                      success: false,
                    });
                  } else {
                    res.status(200).send({
                      message: "table added to the Menu successfully",
                      success: true,
                    });
                  }
                });
              }
            });
          } else {
            res.status(404).send({
              message: "you don't have menu",
              success: false,
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  getTable: (req, res, next) => {
    try {
      if (!req.body.ID) {
        res.status(400).send({
          name: "IDError",
          message: "table ID is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            Table.findOne({ MenuID: menu._id, _id: req.body.ID }).then(
              (table) => {
                if (table) {
                  res.status(200).send(table);
                } else {
                  res.status(404).send({
                    message: "this table don't exist",
                  });
                }
              }
            );
          } else {
            res.status(404).send({
              message: "you don't even have a menu 🙂",
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  updateTable: (req, res, next) => {
    try {
      if (!req.body.ID) {
        res.status(400).send({
          name: "IDError",
          message: "table ID is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            Table.findOne({ MenuID: menu._id, _id: req.body.ID }).then(
              (table) => {
                if (table) {
                  if (req.body.tableNumber) {
                    // make check here for tableNumber if exists
                    Table.findOne({
                      MenuID: menu._id,
                      tableNumber: req.body.tableNumber,
                    }).then((tableExists) => {
                      if (tableExists) {
                        res.send({
                          message: " this table Number already used",
                        });
                      } else {
                        table.tableNumber = req.body.tableNumber;
                      }
                    });
                  }
                  if (req.body.chairNumber) {
                    table.chairNumber = req.body.chairNumber;
                  }
                  if (req.body.status) {
                    table.status = req.body.status;
                  }

                  table.save((err) => {
                    if (err) {
                      res.status(400).send({
                        message: err,
                        success: false,
                      });
                    } else {
                      res.status(200).send({
                        message: "table has been updated successfully",
                        success: true,
                      });
                    }
                  });
                } else {
                  res.status(404).send({
                    message: "this table don't exist",
                  });
                }
              }
            );
          } else {
            res.status(404).send({
              message: "you don't even have a menu 🙂",
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  deleteTable: (req, res, next) => {
    try {
      if (!req.body.ID) {
        res.status(400).send({
          name: "IDError",
          message: "table ID is required",
        });
      } else {
        Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
          if (menu) {
            Table.findOne({ MenuID: menu._id, _id: req.body.ID }).then(
              (table) => {
                if (table) {
                  table.remove((err) => {
                    if (err) {
                      res.status(400).send({
                        message: err,
                        success: false,
                      });
                    } else {
                      res.status(200).send({
                        message: "table has been removed successfully",
                        success: true,
                      });
                    }
                  });
                } else {
                  res.status(404).send({
                    message: "this table don't exist",
                  });
                }
              }
            );
          } else {
            res.status(404).send({
              message: "you don't even have a menu 🙂",
            });
          }
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  menuLogo: (req, res, next) => {
    Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
      if (menu) {
        const x = menu.logo;
        // console.log(x);
        res.set("Content-Type", menu.logoMimetype);
        res.send(menu.logo);
      } else {
        res.status(404).send({
          message: "logo not found",
        });
      }
    });
  },
  menuQR: (req, res, next) => {
    Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
      if (menu) {
        res.set("Content-Type", menu.qrMimetype);
        res.status(200).send(menu.qrImg);
      } else {
        res.status(404).send({
          message: "QR not found",
        });
      }
    });
  },
  fullmenu: (req, res, next) => {
    try {
      Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
        if (menu) {
          Item.find({ MenuID: menu._id }).then((item) => {
            if (item) {
              let m2i = { head: menu, body: item };
              // menu.items = item;
              // let x = { meow: "meow!🐱" };
              // x.items = item;
              // res.status(200).send(x.items[0]);
              res.status(200).send(m2i);
            } else {
              res.status(404).send({
                message: "this menu don't have items",
              });
            }
          });
        } else {
          res.status(404).send({
            message: "you don't even have a menu 🙂",
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
  menu: (req, res, next) => {
    try {
      Menu.findOne({ businessID: req.user.workIn }).then((menu) => {
        if (menu) {
          Item.aggregate([
            {
              $match: {
                MenuID: menu._id,
              },
            },
          ])
            // Item.find({ MenuID: menu._id })
            .then((item) => {
              if (item[0]) {
                // let m2i = { head: menu, body: item };
                // menu.items = item;
                // let x = { meow: "meow!🐱" };
                // x.items = item;
                // res.status(200).send(x.items[0]);
                res.status(200).send(item);
              } else {
                res.status(404).send({
                  message: "this menu don't have items",
                });
              }
            });
        } else {
          res.status(404).send({
            message: "you don't even have a menu 🙂",
          });
        }
      });
    } catch (error) {
      res.status(400).send({
        message: error,
        success: false,
      });
    }
  },
};
