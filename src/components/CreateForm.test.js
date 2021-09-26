import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

describe('test CreateForm', () => {
  let component
  const handleCreateBlog = jest.fn()

  beforeEach(() => {
    component = render(<CreateForm onHandleCreate={handleCreateBlog} />)
  })

  test('received right detail when blog sumit', () => {
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'title blog' },
    })
    fireEvent.change(authorInput, {
      target: { value: 'author blog' },
    })
    fireEvent.change(urlInput, {
      target: { value: 'url blog' },
    })
    fireEvent.submit(form)
    expect(handleCreateBlog.mock.calls[0][0].title).toBe('title blog')
    expect(handleCreateBlog.mock.calls[0][0].author).toBe('author blog')
    expect(handleCreateBlog.mock.calls[0][0].url).toBe('url blog')
  })
})
