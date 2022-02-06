export type TItem = {
  _id: string,
  name: string,
  type: TItemType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
};

export type TItemType = 'bun' | 'sauce' | 'main';

export type TTab = {
  id: TItemType,
  title: string,
}