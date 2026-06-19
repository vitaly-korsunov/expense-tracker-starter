import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the heading and seeded summary data', () => {
    render(<App />)

    expect(screen.getByText('Finance Tracker')).toBeInTheDocument()
    expect(screen.getByText('Track your income and expenses')).toBeInTheDocument()
  })
})
