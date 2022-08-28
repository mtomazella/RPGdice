import { useCallback, useEffect, useMemo, useState } from 'react'

import RpgRoller from 'roll'

const rpgRoller = new RpgRoller()

type UseDieRollParams = {
  expression?: string
  duration?: number // ms
}

export const useDieRoll = ({
  expression: rawExpression = '1d20',
  duration = 2000,
}: UseDieRollParams) => {
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState<number | undefined>(undefined)
  const [error, setError] = useState<string>()

  const expression = useMemo(
    () => (!rawExpression ? '1d20' : rawExpression),
    [rawExpression]
  )

  const roll = useCallback(() => {
    if (!rpgRoller.validate(expression)) {
      setIsRolling(false)
      return
    }

    setError(undefined)
    setIsRolling(true)
    setTimeout(() => {
      setResult(rpgRoller.roll(expression).result)
      setIsRolling(false)
    }, duration)
  }, [expression, duration])

  // useEffect(() => {
  //   roll()
  // }, [])

  return {
    roll,
    isRolling,
    result,
    error,
  }
}
