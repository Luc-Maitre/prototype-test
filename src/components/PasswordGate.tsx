import { useState, useEffect, type FormEvent } from 'react'
import { Button } from '@spark-ui/components/button'
import { Input } from '@spark-ui/components/input'
import { FormField } from '@spark-ui/components/form-field'

const PASSWORD = import.meta.env.VITE_PROTOTYPE_PASSWORD
const STORAGE_KEY = 'prototype_access'

interface PasswordGateProps {
  children?: React.ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!PASSWORD) {
      setUnlocked(true)
      return
    }
    if (localStorage.getItem(STORAGE_KEY) === PASSWORD) {
      setUnlocked(true)
    }
  }, [])

  if (!PASSWORD || unlocked) {
    return <>{children}</>
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, PASSWORD)
      setUnlocked(true)
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-lg">
      <div className="flex flex-col gap-xl w-full max-w-xs">
        <div className="flex flex-col gap-sm text-center">
          <h1 className="text-headline-1 text-on-background">Prototype</h1>
          <p className="text-body-2 text-on-background/dim-1">
            Ce contenu est réservé aux participants du test.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <FormField name="password" state={error ? 'error' : undefined}>
            <FormField.Label>Mot de passe</FormField.Label>
            <Input
              type="password"
              value={value}
              onChange={e => {
                setValue(e.target.value)
                setError(false)
              }}
              placeholder="Entrer le mot de passe"
              autoFocus
            />
            {error && (
              <FormField.ErrorMessage>Mot de passe incorrect.</FormField.ErrorMessage>
            )}
          </FormField>

          <Button type="submit" className="w-full">
            Accéder au prototype
          </Button>
        </form>
      </div>
    </div>
  )
}
