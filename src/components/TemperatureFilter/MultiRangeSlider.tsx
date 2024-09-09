import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { TemperatureContext } from '../../context/TemperatureContext'
import styles from './MultiRangeSlider.module.css'

const MultiRangeSlider: React.FC = () => {
  const { minValue, maxValue, setMinValue, setMaxValue } =
    useContext(TemperatureContext)

  const minValRef = useRef(minValue)
  const maxValRef = useRef(maxValue)
  const range = useRef<any>(null)

  const getPercent = useCallback(
    (value: number) => Math.round(((value - -50) / (50 - -50)) * 100),
    [],
  )

  useEffect(() => {
    const minPercent = getPercent(minValue)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minValue, getPercent])

  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxValue)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxValue, getPercent])

  return (
    <div className={styles.container}>
      <input
        type='range'
        min='-50'
        max='50'
        value={minValue}
        onChange={event => {
          const value = Math.min(Number(event.target.value), maxValue - 1)
          setMinValue(value)
          minValRef.current = value
        }}
        className={`${styles.thumb} ${styles.thumbLeft}`}
        style={{ zIndex: minValue > 50 - 100 ? '5' : undefined }}
      />
      <input
        type='range'
        min='-50'
        max='50'
        value={maxValue}
        onChange={event => {
          const value = Math.max(Number(event.target.value), minValue + 1)
          setMaxValue(value)
          maxValRef.current = value
        }}
        className={`${styles.thumb} ${styles.thumbRight}`}
      />

      <div className={styles.slider}>
        <div className={styles.sliderTrack} />
        <div ref={range} className={styles.sliderRange} />
        <div className={styles.sliderLeftValue}>{minValue}°C</div>
        <div className={styles.sliderRightValue}>{maxValue}°C</div>
      </div>
    </div>
  )
}

export default MultiRangeSlider
