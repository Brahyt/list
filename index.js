'use strict';
let STORE = [
  {id: cuid(), name: 'fruit', checked: false},
  {id: cuid(), name: 'apple', checked: false},
  {id: cuid(), name: 'banana', checked: false},
  {id: cuid(), name: 'cherry', checked: true},
  {id: cuid(), name: 'pear', checked: false},
  {id: cuid(), name: 'cherry', checked: false},
  {id: cuid(), name: 'cherry', checked: true}
];
function createStringWith(item, index){
  return `
  	<li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}
function listItemsString(list) {
  let mapOfStuff = list.map((e, i) => createStringWith(e, i));
  return mapOfStuff;
}
function renderShoppingList() {
  let shoppingItemsString = listItemsString(STORE); 
  $('.js-shopping-list').html(shoppingItemsString);
}
function handleNewItemSubmit() {
  $('#js-shopping-list-form button').on('click', e => {
    e.preventDefault();
    let newItem = $('input').val();
    STORE.push({id: cuid(), name: newItem, checked: false});
    renderShoppingList();
  });
}
function toggleCheck(idOfLi){
  return STORE.find(e => {
    if (e.id === idOfLi){
      e.checked = !e.checked;
    }
  });
}
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', e => {
    let idOfItem = $(e.currentTarget).closest('li').data('item-id');
    toggleCheck(idOfItem); 
    renderShoppingList();
  });
}
function toggleDelete(idOfLi){
  return STORE.find((e, i)  => {
    if (e.id === idOfLi){
      STORE.splice(i, 1);
      renderShoppingList();
    }
  });
}
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', e => {
    let idOfItem = $(e.currentTarget).closest('li').data('item-id');
    toggleDelete(idOfItem); 
  });
}
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}
$(handleShoppingList);
