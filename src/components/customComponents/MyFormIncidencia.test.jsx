import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyFormIncidencia from './MyFormIncidencia'
import { postIncidencia } from '../../services/incidencias'

const setDrawerVisible = vi.fn()

vi.mock('../../services/incidencias', () => ({
  postIncidencia: vi.fn(),
  putIncidencia: vi.fn()
}))
vi.mock('../../context/UserContext', () => ({ useUser: () => ({ user: { username: 'enfermera' } }) }))
vi.mock('../../context/PatientContext', () => ({
  usePatient: () => ({ patient: { nhc: '6192', nombre: 'PACIENTE PRUEBA', programa: 'UHE', cama: '320B' } })
}))
vi.mock('../../context/PlantaContext', () => ({ usePlanta: () => ({ planta: '3B' }) }))
vi.mock('../../context/IncidenciaContext', () => ({
  useIncidencia: () => ({
    incidenciaEdited: null,
    setIncidenciaEdited: vi.fn(),
    setDrawerVisible,
    startDay: new Date()
  })
}))

const bloqueo = {
  label: 'BLOQUEO',
  key: 'bloqueo',
  fields: [{ type: 'Input', label: 'Responsable', name: 'responsable' }]
}

const guardar = () => screen.getByRole('button', { name: /guardar/i })

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

describe('MyFormIncidencia', () => {
  test('si el guardado falla avisa al usuario y no cierra el formulario', async () => {
    postIncidencia.mockRejectedValue(new Error('Request failed with status code 500'))
    const user = userEvent.setup()
    render(<MyFormIncidencia fieldList={bloqueo} />)

    await user.type(screen.getByLabelText('Responsable'), 'SUPERVISORA')
    await user.click(guardar())

    expect(await screen.findByText(/no se ha podido guardar la incidencia/i)).toBeTruthy()
    expect(setDrawerVisible).not.toHaveBeenCalled()
  })

  test('mientras se guarda no permite enviar la incidencia otra vez', async () => {
    let terminarGuardado
    postIncidencia.mockReturnValue(new Promise((resolve) => { terminarGuardado = resolve }))
    const user = userEvent.setup()
    render(<MyFormIncidencia fieldList={bloqueo} />)

    await user.type(screen.getByLabelText('Responsable'), 'SUPERVISORA')
    await user.click(guardar())
    await waitFor(() => expect(postIncidencia).toHaveBeenCalledTimes(1))
    await user.click(guardar())

    expect(postIncidencia).toHaveBeenCalledTimes(1)

    terminarGuardado({ mensaje: 'Incidencia creada con éxito' })
    await waitFor(() => expect(setDrawerVisible).toHaveBeenCalledWith(false))
  })
})
