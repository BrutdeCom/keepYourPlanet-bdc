import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SigninForm from '../components/SigninForm'

/* eslint-disable no-undef */
it('should display username placeholder', () => {
  const { getByPlaceholderText } = render(<SigninForm />)
  const inputPlaceholder = getByPlaceholderText('Entrez votre nom d\'utilisateur')
  expect(inputPlaceholder).toBeInTheDocument()
})

it('should display password placeholder', () => {
  const { getByPlaceholderText } = render(<SigninForm />)
  const inputPlaceholder = getByPlaceholderText('Entrez votre mot de passe')
  expect(inputPlaceholder).toBeInTheDocument()
})

it('should display button', () => {
  const { getByRole } = render(<SigninForm />)
  const button = getByRole('button')
  expect(button).toBeInTheDocument()
})

it('should display title', () => {
  const { getByTestId  } = render(<SigninForm />)
  const title = getByTestId('title')
  expect(title).toBeInTheDocument()
})

it('should display username value', () => {
  const name = 'Test name'
  const {
    queryByText, 
    getByPlaceholderText, 
    getByDisplayValue
  } = render(<SigninForm />)

  expect(queryByText(name)).toBeNull()
  fireEvent.change(getByPlaceholderText('Entrez votre nom d\'utilisateur'), { target: { value: name } })
  expect(getByDisplayValue(name)).toBeInTheDocument()
})

it('should display password value', () => {
  const password = '123'
  const {
    queryByText, 
    getByPlaceholderText, 
    getByDisplayValue
  } = render(<SigninForm />)

  expect(queryByText(password)).toBeNull()
  fireEvent.change(getByPlaceholderText('Entrez votre mot de passe'), { target: { value: password } })
  expect(getByDisplayValue(password)).toBeInTheDocument()
})