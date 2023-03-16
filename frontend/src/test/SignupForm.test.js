import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SignupForm from '../components/SignupForm'

/* eslint-disable no-undef */
it('should display email placeholder', () => {
  const { getByPlaceholderText } = render(<SignupForm />)
  const inputPlaceholder = getByPlaceholderText('Entrez un email')
  expect(inputPlaceholder).toBeInTheDocument()
})

it('should display username placeholder', () => {
  const { getByPlaceholderText } = render(<SignupForm />)
  const inputPlaceholder = getByPlaceholderText('Entrez un nom d\'utilisateur')
  expect(inputPlaceholder).toBeInTheDocument()
})

it('should display password placeholder', () => {
  const { getByPlaceholderText } = render(<SignupForm />)
  const inputPlaceholder = getByPlaceholderText('Entrez un mot de passe')
  expect(inputPlaceholder).toBeInTheDocument()
})

it('should display button', () => {
  const { getByRole } = render(<SignupForm />)
  const button = getByRole('button')
  expect(button).toBeInTheDocument()
})

it('should display title', () => {
  const { getByTestId  } = render(<SignupForm />)
  const title = getByTestId('title')
  expect(title).toBeInTheDocument()
})

it('should display username value', () => {
  const name = 'Test name'
  const {
    queryByText, 
    getByPlaceholderText, 
    getByDisplayValue
  } = render(<SignupForm />)

  expect(queryByText(name)).toBeNull()
  fireEvent.change(getByPlaceholderText('Entrez un nom d\'utilisateur'), { target: { value: name } })
  expect(getByDisplayValue(name)).toBeInTheDocument()
})

it('should display email value', () => {
  const email = 'test@test.fr'
  const {
    queryByText, 
    getByPlaceholderText, 
    getByDisplayValue
  } = render(<SignupForm />)

  expect(queryByText(email)).toBeNull()
  fireEvent.change(getByPlaceholderText('Entrez un email'), { target: { value: email } })
  expect(getByDisplayValue(email)).toBeInTheDocument()
})

it('should display password value', () => {
  const password = '123'
  const {
    queryByText, 
    getByPlaceholderText, 
    getByDisplayValue
  } = render(<SignupForm />)

  expect(queryByText(password)).toBeNull()
  fireEvent.change(getByPlaceholderText('Entrez un mot de passe'), { target: { value: password } })
  expect(getByDisplayValue(password)).toBeInTheDocument()
})