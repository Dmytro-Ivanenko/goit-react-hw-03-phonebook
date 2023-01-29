import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import styles from './contactForm.module.scss';

class ContactForm extends Component {
	state = {
		name: '',
		number: '',
	};

	static propTypes = { onSubmitForm: PropTypes.func.isRequired };

	onChangeInput = (evn) => {
		this.setState({
			[evn.target.name]: evn.target.value,
		});
	};

	handleSubmit = (evn) => {
		evn.preventDefault();
		this.props.onSubmitForm(this.state);
		evn.target.reset();
	};

	render() {
		return (
			<form className={styles.form} onSubmit={this.handleSubmit}>
				<label className={styles.label} htmlFor="name">
					Name
				</label>
				<input
					className={styles.input}
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					onChange={this.onChangeInput}
					required
				/>

				<label className={styles.label} htmlFor="number">
					Number
				</label>
				<input
					className={styles.input}
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					onChange={this.onChangeInput}
					required
				/>

				<Button type="submit">Add contact</Button>
			</form>
		);
	}
}

// ContactForm.propTypes = {
//   onSubmitForm: PropTypes.func.isRequired,
// };

export default ContactForm;
