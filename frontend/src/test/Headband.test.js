import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Headband from '../components/Headband'

/* eslint-disable no-undef */
it('should display text', () => {
  const { getByText } = render(<Headband />)
  const text = getByText('Commencer à calculer mon impact')
  expect(text).toBeInTheDocument()
})