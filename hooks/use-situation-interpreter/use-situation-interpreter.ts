import { useMemo, useState } from 'react'

import { TSituation } from 'shared/types'
import { validate } from 'utils/dice'

export const useSituationInterpreter = ({
  situation,
}: {
  situation: TSituation
}): { expression: string; displayExpression: string; error: string | null } => {
  const { expression, variables = [], controls = [] } = situation

  const [error, setError] = useState<string | null>(null)
  const [displayExpression, setDisplayExpression] = useState('')

  const cleanExpression = (expr: string) => expr.replaceAll(' ', '')

  const getVariablesToReplace = (expr: string) =>
    Array.from(expr.matchAll(/\[(.*?)\]/g)).map(e => e[1])

  const getVariableValue = (targetKey: string) => {
    const foundKey = variables.find(
      ({ key }) => key.toLowerCase() === targetKey.toLowerCase(),
    )
    if (!foundKey) return null
    return foundKey.value
  }

  const preparedExpression = useMemo(() => {
    setError(null)

    const treatedExpression = cleanExpression(expression)
    const neededVariables = getVariablesToReplace(treatedExpression)

    let controlledExpression = treatedExpression
    controls.forEach(({ active, actionType, value }) => {
      if (!active) return

      if (actionType === 'substitute') controlledExpression = value
      else if (actionType === 'add')
        controlledExpression += `${
          value.charAt(0) === '+' || value.charAt(0) === '-' ? '' : '+'
        }${value}`
    })
    setDisplayExpression(controlledExpression)

    let builtExpression = controlledExpression
    for (const key of neededVariables) {
      const value = getVariableValue(key)

      if (!value) {
        setError(`Variável não encontrada (${key})`)
        return expression
      }

      builtExpression = builtExpression.replaceAll(`[${key}]`, value)
    }

    if (!validate(builtExpression)) {
      setError('Expressão inválida')
      return expression
    }

    return builtExpression
  }, [situation])

  return {
    expression: preparedExpression,
    displayExpression,
    error,
  }
}
