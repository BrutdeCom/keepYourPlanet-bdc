import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Footer from '../components/Footer'

/* eslint-disable no-undef */
it('should display app name', () => {
  const { getByText } = render(<Footer />)
  const privacyPolicy = getByText('Politique de confidentialité')
  expect(privacyPolicy).toBeInTheDocument()
})