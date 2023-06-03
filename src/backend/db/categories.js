import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Motivation",
    description:
      "Motivation books are guides for inciting action and getting things done.",
  },
  {
    _id: uuid(),
    categoryName: "Business",
    description:
      "Business books are practical guides to building and running successful enterprises.",
  },
  {
    _id: uuid(),
    categoryName: "Comics",
    description:
      "Comics books consists of comics art in the form of sequential juxtaposed panels that represent individual scenes.",
  },
];
