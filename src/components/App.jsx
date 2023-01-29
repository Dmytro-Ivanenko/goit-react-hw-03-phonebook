import React, { Component } from 'react';
import uniqid from 'uniqid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';

class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
		filter: '',
	};

	// APP
	addContacts = (newContact) => {
		this.setState(({ contacts }) => {
			return { contacts: [...contacts, newContact] };
		});
	};

	removeContact = (idDelete) => {
		this.setState((prevState) => {
			return {
				contacts: prevState.contacts.filter(({ id }) => {
					return !(id === idDelete);
				}),
			};
		});
	};

	// FORM
	handleSubmitForm = ({ name, number }) => {
		// name check

		if (!this.isNameFree(name)) {
			return;
		}

		const newContact = {
			id: uniqid(),
			name: name.toLowerCase(),
			number,
		};

		// add new contact into state
		this.addContacts(newContact);
	};

	isNameFree = (nameToCheck) => {
		const result = this.state.contacts.filter(
			({ name }) => name.toLowerCase() === nameToCheck.toLowerCase()
		);

		if (result.length > 0) {
			Notify.warning(`${nameToCheck} is already in contacts.`);
			return false;
		}

		return true;
	};

	// FILTER
	onChangeFilter = (evn) => {
		this.setState({ filter: evn.target.value });
	};

	filteredList = (filterName) => {
		return this.state.contacts.filter(({ name }) => {
			return name.toLowerCase().includes(filterName.toLowerCase());
		});
	};

	// RENDER
	render() {
		const { filter, contacts } = this.state;
		return (
			<>
				<Section title="Phonebook">
					<ContactForm onSubmitForm={this.handleSubmitForm} />
				</Section>

				<Section title="Contacts">
					{this.state.contacts.length > 0 ? (
						<>
							<Filter onChangeFilter={this.onChangeFilter} value={filter} />
							<ContactList
								contactsArr={
									filter.length > 0 ? this.filteredList(filter) : contacts
								}
								deleteFunc={this.removeContact}
							/>
						</>
					) : (
						<Notification message="There is no contacts"></Notification>
					)}
				</Section>
			</>
		);
	}
}

export default App;
