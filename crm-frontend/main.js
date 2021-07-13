// функция создания элемента
function elementCreator(classArray, type, text) {
  const element = document.createElement(type);
  element.classList.add(...classArray);
  element.innerText = text;
  return element;
};

// Классы для элементов
const headerClasses = ['header'];
const logoClasses = ['header__logo'];
const headerFormClasses = ['header__form', 'searchform'];
const headerInputClasses = ['searchform__input'];
const searchResponseContainerClasses = ['searchform__container'];
const responseLinkClasses = ['searchform__response', 'link'];

const mainClasses = ['main'];
const sectionClientsClasses = ['clients'];
const clientsContainerClasses = ['container', 'clients__container'];
const clientsHeadingClasses = ['heading2', 'clients__heading'];

const dummyClasses = ['maintable__dummy'];

const tableContainerClasses = ['clients__tablecontainer'];
const clientsTableClasses = ['clients__table', 'maintable'];
const clientsTableBodyClasses = ['maintable__tablebody'];
const tableHeadingRowClasses = ['maintable__headrow', 'headrow'];
const thIDClasses = ['headrow__cell', 'idcell', 'headcell'];
const idLinkClasses =['link', 'idcell__link'];
const thFioClasses = ['headrow__cell', 'fiocell', 'headcell'];
const thDateTimeClasses = ['headrow__cell', 'datetimecell', 'headcell'];
const thChangesClasses = ['headrow__cell', 'changescell', 'headcell'];
const thContactsClasses = ['headrow__cell', 'contactscell'];
const thActsClasses = ['headrow__cell', 'actscell'];
const tableRowClasses = ['maintable__row', 'regularrow'];
const regularIDCellClasses = ['regularrow__cell', 'regularID'];
const regularFIOCellClasses = ['regularrow__cell', 'regularFIO'];
const dateTimeCreationCellClasses = ['regularrow__cell', 'regulardate'];
const timeCreationSpanClasses = ['regulardate__span', 'regulartime'];
const regularContactsCellClasses = ['regularrow__cell', 'regularcontacts'];
const contactDivClasses = ['regularcontacts__contact',];
const contactTooltipClasses = ['regularcontacts__tooltip', 'tooltip'];
const moreContactsButtonClasses = ['regularcontacts__button', 'btn', 'morecontacts'];
const contactTooltipLinkClasses = ['tooltip__link'];
const regularActsCellClasses = ['regularrow__cell', 'regularacts'];
const changeButtonClasses = ['regularacts__button', 'change', 'btn'];
const deleteButtonClasses = ['regularacts__button', 'delete', 'btn'];
const regularContactsCellContainerClasses = ['regularcontacts__container'];
const cellSpanClasses = ['headcell__span'];

const addingButtonClasses = ['clients__button', 'btn'];

const addingClientCardClasses = ['clients__addingcard', 'addingcard'];
const clientAddingCardContainerClasses = ['addincard__container'];
const addingCardHeadingClasses = ['addincard__heading', 'heading3', 'cardheading'];
const clientAddingFormClasses = ['addingcard__form', 'addingform'];
const clientNameLabelClasses = ['addingform__label'];
const nameFormAddingClasses = ['addingform__name', 'inpt', 'form__input'];
const namePlaceholderClasses = ['addingform__placeholder', 'placeholder'];
const placeholderStarClasses = ['placeholder__star'];

const contactContainerClasses = ['addingcard__contactscontainer', 'contacts'];

const addingContactButtonClasses = ['contacts__add', 'btn'];
const saveContactButtonClasses = ['contacts__save', 'btn'];

const closeButtonClasses = ['addingcard__close', 'btn'];
const abortButtonClasses = ['addingcard__abort', 'btn'];
const deleteButtonClassesChange = ['addingcard__deletion', 'btn'];

const blockClasses = ['block'];

const contactGroupClasses = ['contacts__group', 'group'];
const selectClasses = ['group__select', 'select'];
const optionClasses = ['select__options'];
const inputContactClasses = ['group__input', 'inpt'];
const closeButtonContactClasses = ['group__closebutton', 'btn'];

const errorTextClasses = ['addingcard__errortext', 'paragraph'];

const clientErrorCardContainerClasses = ['errorcard__container'];
const clientErrorTextClasses = ['errorcard__errortext', 'paragraph'];

const changingCardHeadingIdClasses = ['cardheading__span'];

const clientDeletionCardContainerClasses = ['deletioncard__container'];
const deletionCardHeadingClasses = ['deletioncard__heading'];
const deletionCardTextClasses = ['deletioncard__text'];
const deletionCardClientNameClasses = ['deletioncard__client', 'deleteclient'];
const deletionCardClientIDClasses = ['deleteclient__span'];

// создание header
function createHeader() {
  const header = elementCreator(headerClasses, 'header', '');
  const logo = elementCreator(logoClasses, 'div', 'skb.');
  header.append(logo);
  const headerForm = elementCreator(headerFormClasses, 'form', '');
  header.append(headerForm);
  const headerInput = elementCreator(headerInputClasses, 'input', '');
  headerForm.append(headerInput);
  headerInput.placeholder = 'Введите запрос';
  const searchResponseContainer = elementCreator(searchResponseContainerClasses, 'div', '');
  headerForm.append(searchResponseContainer);
  headerForm.addEventListener('submit', function(target) {
    target.preventDefault();
  });
  let timer;
  headerInput.addEventListener('input', async function() {
    searchResponseContainer.innerHTML = '';
    clearTimeout(timer);
    if (headerInput.value.trim().length == 0) {
      return;
    };
    function searchClient() {
      let inputValue = headerInput.value;
      let data = fetchSearchList(inputValue);
      return data;
    };
    timer = setTimeout(async () => {
      const response = await searchClient(headerInput.value);
      for (let client of response) {
        const {name, surname, lastName, id} = client;
        const fullname = `${surname} ${name} ${lastName}`
        const responseLink = elementCreator(responseLinkClasses, 'a', fullname);
        responseLink.href = `#${id}`;
        responseLink.addEventListener('click', function() {
          document.querySelectorAll('.maintable__row').forEach(function(rows) {
            rows.classList.remove('maintable__row_active');
          });
          const target = document.getElementById(`${id}`);
          target.classList.add('maintable__row_active');
        });
        searchResponseContainer.append(responseLink);
      };
    },
    // задержка в мс
    300,
    );
  });
  return header;
};

// функция запроса поиска
async function fetchSearchList(searchText) {
  const response = await fetch(`http://localhost:3000/api/clients?search=${searchText}`);
  const data = await response.json();
  return data;
};

// создание main
function createMain() {
  const main = elementCreator(mainClasses, 'main', '');
  const section = createClients();
  main.append(section);
  return main;
};

// создание раздела clients
function createClients() {
  const sectionClients = elementCreator(sectionClientsClasses, 'section', '');
  const clientsContainer = elementCreator(clientsContainerClasses, 'div', '');
  sectionClients.append(clientsContainer);
  const clientsHeading = elementCreator(clientsHeadingClasses, 'h2', 'Клиенты');
  clientsContainer.append(clientsHeading);
  createClientsTable();
  return sectionClients;
};  

// создание заголовка таблицы
function createTableHeading(data) {
  const clientsTable = elementCreator(clientsTableClasses, 'table', '');

  const tableHeadingRow = elementCreator(tableHeadingRowClasses, 'thead', '');
  clientsTable.append(tableHeadingRow);
  const idCell = elementCreator(thIDClasses, 'th', 'ID');
  const idCellSpan = elementCreator(cellSpanClasses, 'span', '');
  idCell.append(idCellSpan);
  const fioCell = elementCreator(thFioClasses, 'th', 'Фамилия Имя Отчество');
  const fioCellSpan = elementCreator(cellSpanClasses, 'span', 'А-Я');
  fioCell.append(fioCellSpan);
  const dateAndTimeCell = elementCreator(thDateTimeClasses, 'th', 'Дата и время создания');
  const dateAndTimeCellSpan = elementCreator(cellSpanClasses, 'span', '');
  dateAndTimeCell.append(dateAndTimeCellSpan);
  const lastChangesCell = elementCreator(thChangesClasses, 'th', 'Последние изменения');
  const lastChangesCellSpan = elementCreator(cellSpanClasses, 'span', '');
  lastChangesCell.append(lastChangesCellSpan);
  let counter = 0;
  idCell.addEventListener('click', function() {
    if (counter % 2 == 0) {
      data.sort((a, b) => a.id > b.id ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      idCell.classList.remove('idcell_sorted');
      fioCell.classList.remove('fiocell_sorted');
      dateAndTimeCell.classList.remove('datetimecell_sorted');
      lastChangesCell.classList.remove('changescell_sorted');
      counter++;
    } else {
      data.sort((a, b) => a.id < b.id ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      idCell.classList.add('idcell_sorted');
      fioCell.classList.remove('fiocell_sorted');
      dateAndTimeCell.classList.remove('datetimecell_sorted');
      lastChangesCell.classList.remove('changescell_sorted');
      counter++;
    };
  });
  tableHeadingRow.append(idCell);
  fioCell.addEventListener('click', function() {
    if (counter % 2 == 0) {
      data.sort((a, b) => a.surname > b.surname ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      fioCell.classList.remove('fiocell_sorted');
      idCell.classList.remove('idcell_sorted');
      dateAndTimeCell.classList.remove('datetimecell_sorted');
      lastChangesCell.classList.remove('changescell_sorted');
      counter++;
    } else {
      data.sort((a, b) => a.surname < b.surname ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      fioCell.classList.add('fiocell_sorted');
      idCell.classList.remove('idcell_sorted');
      dateAndTimeCell.classList.remove('datetimecell_sorted');
      lastChangesCell.classList.remove('changescell_sorted');
      counter++;
    };
  });
  tableHeadingRow.append(fioCell);
  dateAndTimeCell.addEventListener('click', function() {
    if (counter % 2 == 0) {
      data.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      dateAndTimeCell.classList.remove('datetimecell_sorted');
      idCell.classList.remove('idcell_sorted');
      fioCell.classList.remove('fiocell_sorted');
      lastChangesCell.classList.remove('changescell_sorted');
      counter++;
    } else {
      data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      dateAndTimeCell.classList.add('datetimecell_sorted');
      idCell.classList.remove('idcell_sorted');
      fioCell.classList.remove('fiocell_sorted');
      lastChangesCell.classList.remove('changescell_sorted');
      counter++;
    };
  });
  tableHeadingRow.append(dateAndTimeCell);
  lastChangesCell.addEventListener('click', function() {
    if (counter % 2 == 0) {
      data.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      lastChangesCell.classList.remove('changescell_sorted');
      dateAndTimeCell.classList.remove('datetimecell_sorted');
      idCell.classList.remove('idcell_sorted');
      fioCell.classList.remove('fiocell_sorted');
      counter++
    } else {
      data.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1);
      const tableBody = document.querySelector('.maintable__tablebody');
      tableBody.remove();
      const newTableBody = createTableBody(data);
      clientsTable.append(newTableBody);
      lastChangesCell.classList.add('changescell_sorted');
      dateAndTimeCell.classList.remove('datetimecell_sorted');
      idCell.classList.remove('idcell_sorted');
      fioCell.classList.remove('fiocell_sorted');
      counter++
    };
  });
  tableHeadingRow.append(lastChangesCell);
  const contactsCell = elementCreator(thContactsClasses, 'th', 'Контакты');
  tableHeadingRow.append(contactsCell);
  const actsCell = elementCreator(thActsClasses,'th', 'Действия');
  tableHeadingRow.append(actsCell);
  const tableBody = createTableBody(data);
  clientsTable.append(tableBody);
  return clientsTable;
};

// создание тела таблицы
function createTableBody(data) {
  const clientsTableBody = elementCreator(clientsTableBodyClasses, 'tbody', '');
  for (let i = 0; i < data.length; i++) {
    const tableRow = elementCreator(tableRowClasses, 'tr', '');
    tableRow.id = `${data[i].id}`;
    tableRow.addEventListener('click', function() {
      tableRow.classList.remove('maintable__row_active');
    });
    clientsTableBody.append(tableRow);
    const regularIDCell = elementCreator(regularIDCellClasses, 'td', '');
    tableRow.append(regularIDCell);
    const idLink = elementCreator(idLinkClasses, 'a', `${data[i].id}`);
    idLink.href = `client.html?id=${data[i].id}`;
    idLink.setAttribute('target', '_blank');
    regularIDCell.append(idLink);
    const regularFIOCell = elementCreator(regularFIOCellClasses, 'td', `${data[i].surname + ' ' + data[i].name + ' ' + data[i].lastName}`);
    tableRow.append(regularFIOCell);
    const dateTimeCreationCell = elementCreator(dateTimeCreationCellClasses, 'td', `${data[i].createdAt.substr(8, 2) + '.' + data[i].createdAt.substr(5, 2) + '.' + data[i].createdAt.substr(0, 4)}`);
    tableRow.append(dateTimeCreationCell);
    const timeCreationSpan = elementCreator(timeCreationSpanClasses, 'span', `${' ' + data[i].createdAt.substr(11, 5)}`);
    dateTimeCreationCell.append(timeCreationSpan);
    const dateTimeUpdateCell = elementCreator(dateTimeCreationCellClasses, 'td', `${data[i].updatedAt.substr(8, 2) + '.' + data[i].updatedAt.substr(5, 2) + '.' + data[i].updatedAt.substr(0, 4)}`);
    tableRow.append(dateTimeUpdateCell);
    const timeUpdateSpan = elementCreator(timeCreationSpanClasses, 'span', `${' ' + data[i].updatedAt.substr(11, 5)}`);
    dateTimeUpdateCell.append(timeUpdateSpan);
    const regularContactsCell =  elementCreator(regularContactsCellClasses, 'td', '');
    tableRow.append(regularContactsCell);
    const regularContactsCellContainer = clientsContacts(data[i]);
    regularContactsCell.append(regularContactsCellContainer)
    const regularActsCell = elementCreator(regularActsCellClasses, 'td', '');
    tableRow.append(regularActsCell);
    const changeButton = elementCreator(changeButtonClasses, 'button', 'Изменить');
    changeButton.dataset.id = `${data[i].id}`;
    regularActsCell.append(changeButton);
    changeButton.addEventListener('click', function() {
      changeButton.classList.add('change__awaiting');
      const idNumber = changeButton.dataset.id;
      getClientForChanging(idNumber);
    });
    const deleteButton = elementCreator(deleteButtonClasses, 'button', 'Удалить');
    deleteButton.dataset.id = `${data[i].id}`;
    regularActsCell.append(deleteButton);
    deleteButton.addEventListener('click', function() {
      deleteButton.classList.add('delete__awaiting');
      const idNumber = deleteButton.dataset.id;
      getClientForDeletion(idNumber);
    });
  };
  return clientsTableBody;
};

// создание контактов клиента 
function clientsContacts(object) {
  const regularContactsCellContainer = elementCreator(regularContactsCellContainerClasses, 'div', '');
  if (object.contacts.length < 5) {
    for (let i = 0; i < object.contacts.length; i++) {
      const contactDiv = elementCreator(contactDivClasses, 'div', '');
      regularContactsCellContainer.append(contactDiv);
      const contactTooltip = elementCreator(contactTooltipClasses, 'div', '');
      contactDiv.append(contactTooltip);
      const contactTooltipLink = elementCreator(contactTooltipLinkClasses, 'a', `${object.contacts[i].value}`);
      contactTooltipLink.href = `${object.contacts[i].value}`;
      contactTooltip.append(contactTooltipLink);
      if (object.contacts[i].type == 'Телефон' || object.contacts[i].type == 'Доп. телефон') {
        contactDiv.classList.add('phone');
        contactTooltipLink.href = `${'tel:' + object.contacts[i].value}`;
      } else if (object.contacts[i].type == 'Email') {
        contactDiv.classList.add('email');
        contactTooltipLink.href = `${'mailto:' + object.contacts[i].value}`;
      } else if (object.contacts[i].type == 'Vk') {
        contactDiv.classList.add('vk');
        contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
        contactTooltipLink.setAttribute('target', '_blank');
      } else if (object.contacts[i].type == 'Facebook') {
        contactDiv.classList.add('facebook');
        contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
        contactTooltipLink.setAttribute('target', '_blank');
      } else {
        contactDiv.classList.add('other');
        contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
        contactTooltipLink.setAttribute('target', '_blank');
      };
    };
  } else {
    for (let i = 0; i < 4; i++) {
      const contactDiv = elementCreator(contactDivClasses, 'div', '');
      regularContactsCellContainer.append(contactDiv);
      const contactTooltip = elementCreator(contactTooltipClasses, 'div', '');
      contactDiv.append(contactTooltip);
      const contactTooltipLink = elementCreator(contactTooltipLinkClasses, 'a', `${object.contacts[i].value}`);
      contactTooltipLink.href = `${object.contacts[i].value}`;
      contactTooltip.append(contactTooltipLink);
      if (object.contacts[i].type == 'Телефон' || object.contacts[i].type == 'Доп. телефон') {
        contactDiv.classList.add('phone');
        contactTooltipLink.href = `${'tel:' + object.contacts[i].value}`;
      } else if (object.contacts[i].type == 'Email') {
        contactDiv.classList.add('email');
        contactTooltipLink.href = `${'mailto:' + object.contacts[i].value}`;
      } else if (object.contacts[i].type == 'Vk') {
        contactDiv.classList.add('vk');
        contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
        contactTooltipLink.setAttribute('target', '_blank');
      } else if (object.contacts[i].type == 'Facebook') {
        contactDiv.classList.add('facebook');
        contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
        contactTooltipLink.setAttribute('target', '_blank');
      } else {
        contactDiv.classList.add('other');
        contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
        contactTooltipLink.setAttribute('target', '_blank');
      };
    };
    const moreContactsButton = elementCreator(moreContactsButtonClasses, 'button', `${'+' + (object.contacts.length - 4)}`);
    regularContactsCellContainer.append(moreContactsButton);
    moreContactsButton.addEventListener('click', function() {
      moreContactsButton.remove();
      for (let i = 4; i < object.contacts.length; i++) {
        const contactDiv = elementCreator(contactDivClasses, 'div', '');
        regularContactsCellContainer.append(contactDiv);
        const contactTooltip = elementCreator(contactTooltipClasses, 'div', '');
        contactDiv.append(contactTooltip);
        const contactTooltipLink = elementCreator(contactTooltipLinkClasses, 'a', `${object.contacts[i].value}`);
        contactTooltipLink.href = `${object.contacts[i].value}`;
        contactTooltip.append(contactTooltipLink);
        if (object.contacts[i].type == 'Телефон' || object.contacts[i].type == 'Доп. телефон') {
          contactDiv.classList.add('phone');
          contactTooltipLink.href = `${'tel:' + object.contacts[i].value}`;
        } else if (object.contacts[i].type == 'Email') {
          contactDiv.classList.add('email');
          contactTooltipLink.href = `${'mailto:' + object.contacts[i].value}`;
        } else if (object.contacts[i].type == 'Vk') {
          contactDiv.classList.add('vk');
          contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
          contactTooltipLink.setAttribute('target', '_blank');
        } else if (object.contacts[i].type == 'Facebook') {
          contactDiv.classList.add('facebook');
          contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
          contactTooltipLink.setAttribute('target', '_blank');
        } else {
          contactDiv.classList.add('other');
          contactTooltipLink.href = `${'http://' + object.contacts[i].value}`;
          contactTooltipLink.setAttribute('target', '_blank');
        };
      };
    });
  };
  return regularContactsCellContainer
};

// создание таблицы
async function createClientsTable() {
  const state = {
    clients: [],
  };
  const dummy = elementCreator(dummyClasses, 'div', '');
  document.body.append(dummy);
  
  state.clients = await fetchList();
  
  if (state.clients.length) {
    dummy.remove();
    const clientsContainer = document.querySelector('.clients__container');
    const tableContainer = elementCreator(tableContainerClasses, 'div', '');
    clientsContainer.append(tableContainer);
    const tableHeadingRow = createTableHeading(state.clients);
    tableContainer.append(tableHeadingRow);
  };
};

// функция получения клиента по ID для удаления
async function getClientForDeletion(id) {
  const deleteButton = document.querySelector('.delete__awaiting')
  const response = await fetch(`http://localhost:3000/api/clients/${id}`,{
    method: 'GET',
    body: JSON.stringify()
  });

  const data = await response.json();
  if (data.id) {
    deleteButton.classList.remove('delete__awaiting');

    const name = data.name;
    const surname = data.surname;
    const lastName = data.lastName;
    const status = response.status;
    const idNumber = data.id;
  
    deletionClient(status, name, surname, lastName, idNumber);
  };
};

// функция получения клиента по ID для изменения
async function getClientForChanging(id) {
  const buttonChange = document.querySelector('.change__awaiting');
  const response = await fetch(`http://localhost:3000/api/clients/${id}`,{
    method: 'GET',
    body: JSON.stringify()
  });

  const data = await response.json();
  if (data.id) {
    buttonChange.classList.remove('change__awaiting');
    const name = data.name;
    const surname = data.surname;
    const lastName = data.lastName;
    const contacts = data.contacts;
    const status = response.status;
    const idNumber = data.id;
  
    changingClient(status, name, surname, lastName, contacts, idNumber);
  };
};

// функция создания карточки удаления
function deletionClient(status, name, surname, lastName, id) {
  const block = elementCreator(blockClasses, 'div', '')
  block.addEventListener('click', function(event) {
    if (event.target.className == 'block') {
      block.remove();
    };
  });
  document.body.append(block);
  const deletionClientCard = elementCreator(addingClientCardClasses, 'form', '');
  block.append(deletionClientCard);
  const closeButton = elementCreator(closeButtonClasses, 'button', '');
    closeButton.addEventListener('click', function() {
      block.remove();
    });
  const clientErrorCardContainer = elementCreator(clientErrorCardContainerClasses, 'div', '');

  // кнопка отмена
  const abortButton = elementCreator(abortButtonClasses, 'button', 'Отмена');
  abortButton.addEventListener('click', function() {
    block.remove();
  });

  // ответы сервера по удалению
  switch(status) {
    case 404:
      deletionClientCard.classList.add('errorcard');
      deletionClientCard.classList.remove('addingcard');
      deletionClientCard.append(clientErrorCardContainer);
      const clientErrorText = elementCreator(clientErrorTextClasses, 'p', 'Ошибка: Клиент не найден');
      clientErrorCardContainer.append(clientErrorText);
      deletionClientCard.append(closeButton);
      deletionClientCard.append(abortButton);
      break;
    case 200:
    case 201:
      deletionClientCard.classList.add('deletioncard');
      deletionClientCard.classList.remove('addingcard');
      const clientDeletionCardContainer = elementCreator(clientDeletionCardContainerClasses, 'div', '');
      deletionClientCard.append(clientDeletionCardContainer);
      deletionClientCard.append(closeButton);
      const deletionCardHeading = elementCreator(deletionCardHeadingClasses, 'h3', 'Удалить клиента');
      clientDeletionCardContainer.append(deletionCardHeading);
      const deletionCardText = elementCreator(deletionCardTextClasses, 'p', 'Вы действительно хотите удалить данного клиента?');
      clientDeletionCardContainer.append(deletionCardText);
      const deletionCardClientName = elementCreator(deletionCardClientNameClasses, 'p', `${surname} ${name} ${lastName} `);
      clientDeletionCardContainer.append(deletionCardClientName);
      const deletionCardClientID = elementCreator(deletionCardClientIDClasses, 'span', `ID:${id}`);
      deletionCardClientName.append(deletionCardClientID);
      const deletionCardButton = elementCreator(saveContactButtonClasses, 'input', 'Удалить');
      deletionCardButton.value = 'Удалить';
      deletionCardButton.type = 'submit';
      clientDeletionCardContainer.append(deletionCardButton);
      clientDeletionCardContainer.append(abortButton);
      // удаление клиента из сервера
      deletionClientCard.addEventListener('submit', function(deletion) {
        deletion.preventDefault();
        deleteClientInfo(id);
      });
      break
    case 500:
      deletionClientCard.classList.add('errorcard');
      deletionClientCard.classList.remove('addingcard');
      deletionClientCard.append(clientErrorCardContainer);
      const clientError500Text = elementCreator(clientErrorTextClasses, 'p', 'Ошибка: Странно, но сервер сломался');
      clientErrorCardContainer.append(clientError500Text);
      deletionClientCard.append(closeButton);
      break;
    default:
      deletionClientCard.classList.add('errorcard');
      deletionClientCard.classList.remove('addingcard');
      deletionClientCard.append(clientErrorCardContainer);
      const clientErrorOtherText = elementCreator(clientErrorTextClasses, 'p', 'Ошибка: Что-то пошло не так');
      clientErrorCardContainer.append(clientErrorOtherText);
      deletionClientCard.append(closeButton);
      break;
  };
};

// функция создания формы редактирования
function changingClient(status, name, surname, lastName, contacts, id) {
  const block = elementCreator(blockClasses, 'div', '')
  block.addEventListener('click', function(event) {
    if (event.target.className == 'block') {
      block.remove();
    };
  });
  document.body.append(block);
  const changingClientCard = elementCreator(addingClientCardClasses, 'form', '');
  block.append(changingClientCard);
  const closeButton = elementCreator(closeButtonClasses, 'button', '');
    closeButton.addEventListener('click', function() {
      block.remove();
    });
  const clientErrorCardContainer = elementCreator(clientErrorCardContainerClasses, 'div', '');

  switch(status) {
    case 404:
      changingClientCard.classList.add('errorcard');
      changingClientCard.classList.remove('addingcard');
      changingClientCard.append(clientErrorCardContainer);
      const clientErrorText = elementCreator(clientErrorTextClasses, 'p', 'Ошибка: Клиент не найден');
      clientErrorCardContainer.append(clientErrorText);
      changingClientCard.append(closeButton);
      break
    case 200:
    case 201:
      const clientChangingCardContainer = elementCreator(clientAddingCardContainerClasses, 'div', '');
      changingClientCard.append(clientChangingCardContainer);
      changingClientCard.append(closeButton);
      const changingCardHeading = elementCreator(addingCardHeadingClasses, 'h3', 'Изменить данные');
      clientChangingCardContainer.append(changingCardHeading);
      const changingCardHeadingId = elementCreator(changingCardHeadingIdClasses, 'span', `ID: ${id}`);
      changingCardHeading.append(changingCardHeadingId);
      const clientChangingForm = elementCreator(clientAddingFormClasses, 'form', '');
      clientChangingCardContainer.append(clientChangingForm);
      // фамилия
      const surnameInput = inputCreator('surname', surname, 'Фамилия', required = true);
      clientChangingForm.append(surnameInput);
      // имя
      const nameInput = inputCreator('name', name, 'Имя', required = true);
      clientChangingForm.append(nameInput);
      // отчество
      const patronimInput = inputCreator('lastName', lastName, 'Отчество', required = false, last = true);
      clientChangingForm.append(patronimInput);
      // контейнер добавления контактов
      const contactContainer = elementCreator(contactContainerClasses, 'div', '')
      changingClientCard.append(contactContainer);
      // добавление кнопки контактов
      const addingContactButton = elementCreator(addingContactButtonClasses, 'button', 'Добавить контакт');
      addingContactButton.type = 'button';
      contactContainer.append(addingContactButton);
      addingContactButton.addEventListener('click', function() {
        const contactQuantity = document.querySelectorAll('.contacts__group ');
        const contactGroup = elementCreator(contactGroupClasses, 'form', '');
        const selectContact = elementCreator(selectClasses, 'select', '');
        contactGroup.append(selectContact);
        const optionContactPhone = elementCreator(optionClasses, 'option', 'Телефон');
        selectContact.append(optionContactPhone);
        const optionContactOtherPhone = elementCreator(optionClasses, 'option', 'Доп. телефон');
        selectContact.append(optionContactOtherPhone);
        const optionContactEmail = elementCreator(optionClasses, 'option', 'Email');
        selectContact.append(optionContactEmail);
        const optionContactVk = elementCreator(optionClasses, 'option', 'Vk');
        selectContact.append(optionContactVk);
        const optionContactFacebook = elementCreator(optionClasses, 'option', 'Facebook');
        selectContact.append(optionContactFacebook);
        const optionContactOther = elementCreator(optionClasses, 'option', 'Другое'); 
        selectContact.append(optionContactOther);
        const inputContact = elementCreator(inputContactClasses, 'input', '');
        inputContact.placeholder = 'Введите данные контакта';
        contactGroup.append(inputContact);
        // обработчик кнопки закрытия контакта
        const closeButtonContact = elementCreator(closeButtonContactClasses, 'button', '');
        contactGroup.append(closeButtonContact);
        closeButtonContact.addEventListener('click', function(button) {
          button.preventDefault();
          contactGroup.remove();
          if (contactQuantity.length == 0) {
            contactContainer.classList.remove('addingcard__contactscontainer_open');
          };
          if (contactQuantity.length == 9) {
            contactContainer.append(addingContactButton);
          };
        });
        if (contactQuantity.length < 9) {
          addingContactButton.before(contactGroup);
        } else {
          addingContactButton.before(contactGroup);
          addingContactButton.remove();
        };
        contactContainer.classList.add('addingcard__contactscontainer_open');
      });
      // добавление контакта
      for (let i = 0; i < contacts.length; i++) {
        const contactGroup = elementCreator(contactGroupClasses, 'form', '');
        addingContactButton.before(contactGroup);
        const selectContact = elementCreator(selectClasses, 'select', '');
        contactGroup.append(selectContact);
        const optionContactPhone = elementCreator(optionClasses, 'option', 'Телефон');
        if (contacts[i].type == 'Телефон') {
          optionContactPhone.setAttribute('selected', '');
        };
        selectContact.append(optionContactPhone);
        const optionContactOtherPhone = elementCreator(optionClasses, 'option', 'Доп. телефон');
        if (contacts[i].type == 'Доп. телефон') {
          optionContactOtherPhone.setAttribute('selected', '');
        };
        selectContact.append(optionContactOtherPhone);
        const optionContactEmail = elementCreator(optionClasses, 'option', 'Email');
        if (contacts[i].type == 'Email') {
          optionContactEmail.setAttribute('selected', '');
        };
        selectContact.append(optionContactEmail);
        const optionContactVk = elementCreator(optionClasses, 'option', 'Vk');
        if (contacts[i].type == 'Vk') {
          optionContactVk.setAttribute('selected', '');
        };
        selectContact.append(optionContactVk);
        const optionContactFacebook = elementCreator(optionClasses, 'option', 'Facebook');
        if (contacts[i].type == 'Facebook') {
          optionContactFacebook.setAttribute('selected', '');
        };
        selectContact.append(optionContactFacebook);
        const optionContactOther = elementCreator(optionClasses, 'option', 'Другое'); 
        if (contacts[i].type == 'Другое') {
          optionContactOther.setAttribute('selected', '');
        };
        selectContact.append(optionContactOther);
        const inputContact = elementCreator(inputContactClasses, 'input', '');
        inputContact.value = contacts[i].value;
        contactGroup.append(inputContact);
        // обработчик кнопки закрытия контакта
        const closeButtonContact = elementCreator(closeButtonContactClasses, 'button', '');
        contactGroup.append(closeButtonContact);
        const contactQuantity = document.querySelectorAll('.contacts__group ');
        closeButtonContact.addEventListener('click', function(button) {
          button.preventDefault();
          contactGroup.remove();
          if (contactQuantity.length == 0) {
            contactContainer.classList.remove('addingcard__contactscontainer_open');
          };
          if (contactQuantity.length == 9) {
            contactContainer.append(addingContactButton);
          };
        });
        if (contactQuantity.length < 9) {
          addingContactButton.before(contactGroup);
        } else {
          addingContactButton.before(contactGroup);
          addingContactButton.remove();
        };
        contactContainer.classList.add('addingcard__contactscontainer_open');
      };

      // кнопка сохранить
      const saveContactButton = elementCreator(saveContactButtonClasses, 'input', 'Сохранить');
      saveContactButton.value = 'Сохранить';
      saveContactButton.type = 'submit';
      changingClientCard.append(saveContactButton);
      // сохранение информации о клиенте
      changingClientCard.addEventListener('submit', function(send) {
        send.preventDefault()
        const surname = document.querySelector('.surname');
        const name = document.querySelector('.name');
        const patronim = document.querySelector('.lastName');
        document.querySelectorAll('.addingcard__errortext').forEach(function(p) {
          p.remove()
        });
        let contactsArray = [];
        contactContainer.querySelectorAll('.contacts__group ').forEach(function(input) {
          const contactType = input.querySelector('.group__select').value.trim()
          const contactValue = input.querySelector('.group__input').value.trim()
          let contactObj = {
            type: contactType,
            value: contactValue,
          };
          if (contactValue.length > 0) {
            contactsArray.push(contactObj);
          };
        });
        let contactsObject = {
          name: `${inputNameProcessing(name)}`,
          surname: `${inputNameProcessing(surname)}`,
          lastName: `${inputNameProcessing(patronim)}`,
          contacts: contactsArray,
        };
        // вызываем функцию отправки на сервер
        changeClientInfo(id, contactsObject);
      });
      // кнопка удаления
      const deleteButton = elementCreator(deleteButtonClassesChange, 'button', 'Удалить клиента');
      changingClientCard.append(deleteButton);
      deleteButton.dataset.id = `${id}`;
      deleteButton.addEventListener('click', function() {
        deleteButton.classList.add('delete__awaiting');
        const idNumber = deleteButton.dataset.id;
        getClientForDeletion(idNumber);
      });
      deleteButton.addEventListener('click', function() {
        block.remove();
      });
      break;
    case 500:
      changingClientCard.classList.add('errorcard');
      changingClientCard.classList.remove('addingcard');
      changingClientCard.append(clientErrorCardContainer);
      const clientError500Text = elementCreator(clientErrorTextClasses, 'p', 'Ошибка: Странно, но сервер сломался');
      clientErrorCardContainer.append(clientError500Text);
      changingClientCard.append(closeButton);
      break;
    default:
      changingClientCard.classList.add('errorcard');
      changingClientCard.classList.remove('addingcard');
      changingClientCard.append(clientErrorCardContainer);
      const clientErrorOtherText = elementCreator(clientErrorTextClasses, 'p', 'Ошибка: Что0то пошло не так');
      clientErrorCardContainer.append(clientErrorOtherText);
      changingClientCard.append(closeButton);
      break;
  };  
};

// создание кнопки добавления клиента
function createClientAddingButton() {
  const clientAddingButton = elementCreator(addingButtonClasses, 'button', 'Добавить клиента');
  clientAddingButton.addEventListener('click', function() {
    createClientAddingForm();
  });
  return clientAddingButton;
};

// создание input
function inputCreator(classes, inputText, textPlaceholder, required, last) {
  const label = elementCreator(clientNameLabelClasses, 'label', '');
  const input = elementCreator(nameFormAddingClasses, 'input', '');
  input.value = inputText;
  input.type = 'text';
  input.setAttribute('pattern', '[А-Яа-яЁё ]+');
  input.setAttribute('name', `${classes}`);
  input.classList.add(classes);
  input.addEventListener('input', function() {
    input.classList.remove('addingform__name_error');
    const error = document.querySelector('.addingcard__errortext ');
    if (error) {
      error.remove();
    };
  });
  label.append(input);
  const placeholder = elementCreator(namePlaceholderClasses, 'div', '');
  placeholder.innerText = `${textPlaceholder}`;
  label.append(placeholder);
  if (input.value.length > 0) {
    input.classList.add('addingform__name_valid');
    placeholder.classList.add('addingform__placeholder_hidden');
  };
  if (required == true) {
    const placeholderStar = elementCreator(placeholderStarClasses, 'span', '*');
    placeholder.append(placeholderStar);
  };

  // сдвигаем кастомные плейсхолдеры (Вынести из функции?)
  input.addEventListener('input', function() {
    if (input.value.length > 0) {
      input.classList.add('addingform__name_valid');
      placeholder.classList.add('addingform__placeholder_hidden');
    } else {
      input.classList.remove('addingform__name_valid');
      placeholder.classList.remove('addingform__placeholder_hidden');
    };
  });

  // убираем маргин у последнего input
  if (last == true) {
    input.classList.add('addingform__name_last');
  };

  return label;
};

// создание формы добавления клиента
function createClientAddingForm() {
  const block = elementCreator(blockClasses, 'div', '')
  block.addEventListener('click', function(event) {
    if (event.target.className == 'block') {
      block.remove();
    };
  });
  document.body.append(block);
  const addingClientCard = elementCreator(addingClientCardClasses, 'form', '');
  block.append(addingClientCard);
  const clientAddingCardContainer = elementCreator(clientAddingCardContainerClasses, 'div', '');
  addingClientCard.append(clientAddingCardContainer);
  const addingCardHeading = elementCreator(addingCardHeadingClasses, 'h3', 'Новый клиент');
  clientAddingCardContainer.append(addingCardHeading);
  const clientAddingForm = elementCreator(clientAddingFormClasses, 'form', '');
  clientAddingCardContainer.append(clientAddingForm);

  // фамилия
  const surnameInput = inputCreator('surname', '', 'Фамилия', required = true);
  clientAddingForm.append(surnameInput);

  // имя
  const nameInput = inputCreator('name', '', 'Имя', required = true);
  clientAddingForm.append(nameInput);

  // отчество
  const patronimInput = inputCreator('lastName', '', 'Отчество', required = false, last = true);
  clientAddingForm.append(patronimInput);

  // контейнер добавления контактов
  const contactContainer = elementCreator(contactContainerClasses, 'div', '')
  addingClientCard.append(contactContainer);

  // добавление контакта
  const addingContactButton = elementCreator(addingContactButtonClasses, 'button', 'Добавить контакт');
  addingContactButton.type = 'button';
  contactContainer.append(addingContactButton);
  addingContactButton.addEventListener('click', function() {
    const contactQuantity = document.querySelectorAll('.contacts__group ');
    const contactGroup = elementCreator(contactGroupClasses, 'form', '');
    const selectContact = elementCreator(selectClasses, 'select', '');
    contactGroup.append(selectContact);
    const optionContactPhone = elementCreator(optionClasses, 'option', 'Телефон');
    selectContact.append(optionContactPhone);
    const optionContactOtherPhone = elementCreator(optionClasses, 'option', 'Доп. телефон');
    selectContact.append(optionContactOtherPhone);
    const optionContactEmail = elementCreator(optionClasses, 'option', 'Email');
    selectContact.append(optionContactEmail);
    const optionContactVk = elementCreator(optionClasses, 'option', 'Vk');
    selectContact.append(optionContactVk);
    const optionContactFacebook = elementCreator(optionClasses, 'option', 'Facebook');
    selectContact.append(optionContactFacebook);
    const optionContactOther = elementCreator(optionClasses, 'option', 'Другое'); 
    selectContact.append(optionContactOther);
    const inputContact = elementCreator(inputContactClasses, 'input', '');
    inputContact.placeholder = 'Введите данные контакта';
    contactGroup.append(inputContact);
    // обработчик кнопки закрытия контакта
    const closeButtonContact = elementCreator(closeButtonContactClasses, 'button', '');
    contactGroup.append(closeButtonContact);
    closeButtonContact.addEventListener('click', function(button) {
      button.preventDefault();
      contactGroup.remove();
      if (contactQuantity.length == 0) {
        contactContainer.classList.remove('addingcard__contactscontainer_open');
      };
      if (contactQuantity.length == 9) {
        contactContainer.append(addingContactButton);
      };
    });
    if (contactQuantity.length < 9) {
      addingContactButton.before(contactGroup);
    } else {
      addingContactButton.before(contactGroup);
      addingContactButton.remove();
    };
    contactContainer.classList.add('addingcard__contactscontainer_open');
  });

  // кнопка сохранить
  const saveContactButton = elementCreator(saveContactButtonClasses, 'input', 'Сохранить');
  saveContactButton.type = 'submit';
  addingClientCard.append(saveContactButton);

  // сохранение информации о клиенте
  addingClientCard.addEventListener('submit', function(send) {
    send.preventDefault()
    const surname = document.querySelector('.surname');
    const name = document.querySelector('.name');
    const patronim = document.querySelector('.lastName');
    document.querySelectorAll('.addingcard__errortext').forEach(function(p) {
      p.remove()
    });
    let contactsArray = [];
    contactContainer.querySelectorAll('.contacts__group ').forEach(function(input) {
      const contactType = input.querySelector('.group__select').value.trim()
      const contactValue = input.querySelector('.group__input').value.trim()
      let contactObj = {
        type: contactType,
        value: contactValue,
      };
      if (contactValue.length > 0) {
        contactsArray.push(contactObj);
      };
    });
    let contactsObject = {
      name: `${inputNameProcessing(name)}`,
      surname: `${inputNameProcessing(surname)}`,
      lastName: `${inputNameProcessing(patronim)}`,
      contacts: contactsArray,
    };
    // вызываем функцию отправки на сервер
    createClientInfo(contactsObject);
  });

  // кнопка закрыть
  const closeButton = elementCreator(closeButtonClasses, 'button', '');
  addingClientCard.append(closeButton);
  closeButton.addEventListener('click', function() {
    block.remove();
  });

  // кнопка отмена
  const abortButton = elementCreator(abortButtonClasses, 'button', 'Отмена');
  addingClientCard.append(abortButton);
  abortButton.addEventListener('click', function() {
    block.remove();
  });
};

// функция обработки значения инпута имён
function inputNameProcessing(input) {
  const inputNameNewValue = input.value.trim().toUpperCase().slice(0, 1) + input.value.trim().toLowerCase().substr(1);
  return inputNameNewValue;
}

// функция получения списка
async function fetchList() {
  const response = await fetch(`http://localhost:3000/api/clients`);
  const data = await response.json();
  return data;
};

// функция получения ответа от сервера при сохранении нового клиента
async function fetchCreateClient(client) {
  const response = await fetch(`http://localhost:3000/api/clients`,{
    method: 'POST',
    body: JSON.stringify(client)
  });

  const data = await response.json();

  return {
    status: response.status,
    data,
  };
};

// функция получения ответа от сервера при изменения клиента
async function fetchChangeClient(id, client) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(client)
  });

  const data = await response.json();
  return {
    status: response.status,
    data,
  };
};

// функция получения ответа от сервера при удалении клиента
async function fetchDeleteClient(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
    body: JSON.stringify()
  });

  const data = await response.json();
  return {
    status: response.status,
    data,
  };
};

// функция добавления клиента
async function createClientInfo(object) {
  const {status, data} = await fetchCreateClient(object);

  responseProcessor(status, data);
};

// функция изменения клиента
async function changeClientInfo(id, object) {
  const {status, data} = await fetchChangeClient(id, object);

  responseProcessor(status, data);
};

// функция удаления клиента
async function deleteClientInfo(id) {
  const {status,data} = await fetchDeleteClient(id);

  responseProcessor(status, data);
}

// функция обработки ответа
function responseProcessor(status, data) {
  const buttonSave = document.querySelector('.contacts__save');
  let errorText;
  switch(status) {
    case 200:
    case 201:
      const block = document.querySelector('.block');
      block.remove();
      const clients = document.querySelector('.clients');
      clients.remove()
      const newClients = createClients();
      const main = document.querySelector('.main');
      main.append(newClients);
      break;
    case 404:
      errorText = elementCreator(errorTextClasses, 'p', 'Ошибка 404: Клиент не найден');
      buttonSave.before(errorText);
      break;
    case 422:
      const errorLength = data.errors.length;
      let i = 0;
      while (i < errorLength) {
        errorText = elementCreator(errorTextClasses, 'p', `Ошибка: ${data.errors[i].message}` );
        document.querySelector(`.${data.errors[i].field}`).classList.add('addingform__name_error');
        buttonSave.before(errorText);
        i++;
      };
      break;
    case 500:
      errorText = elementCreator(errorTextClasses, 'p', 'Ошибка: Странно, но сервер сломался');
      buttonSave.before(errorText);
      break;
    default:
      errorText = elementCreator(errorTextClasses, 'p', 'Ошибка: Что-то пошло не так');
      buttonSave.before(errorText);
      break;
  };
};

// Сборка
function createApp() {
  const header = createHeader();
  document.body.append(header);
  const main = createMain();
  document.body.append(main);
  const button = createClientAddingButton()
  document.body.append(button);
};

// страница с клиентом
async function clientLayout() {
  const clientParams = new URLSearchParams(window.location.search);
  const clientID = clientParams.get('id');

  const responseClient = await getClient(clientID);
};

// Получение клиента с сервера
const getClient = async (idNumber) => {
  const response = await fetch(`http://localhost:3000/api/clients/${idNumber}`, {
    method: 'GET',
    body: JSON.stringify()
  });

  const info = await response.json();
  const name = info.name;
  const surname = info.surname;
  const lastName = info.lastName;
  const contacts = info.contacts;
  const id = info.id;
  
  changingClient(201, name, surname, lastName, contacts, id)
};
