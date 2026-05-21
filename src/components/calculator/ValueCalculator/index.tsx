'use client'

import React from 'react'
import { ValueCalculatorProvider } from '../../../context/ValueCalculatorContext'
import Calculator from './Calculator'

const ValueCalculator: React.FC = () => (
  <ValueCalculatorProvider>
    <Calculator />
  </ValueCalculatorProvider>
)

export default ValueCalculator
