import { render, screen, cleanup} from '@testing-library/react'
import NotFound from '../not-found'

afterEach(()=>{
    cleanup();
})

test('check text',()=>{
    render(<NotFound/>)
    const todoElement = screen.getByText('Hilang arah tanpa tujuan')
    expect(todoElement).toHaveTextContent('Hilang arah tanpa tujuan')
})

test('check number',()=>{
    render(<NotFound/>)
    const todoElement = screen.getByText('404')
    expect(todoElement).toHaveTextContent('404')
})