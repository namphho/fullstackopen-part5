import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('test blog', () => {
  let component
  const likeFunction = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'this is title',
      author: 'hnam',
      likes: 12,
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
    }

    component = render(<Blog blog={blog} handleLike={likeFunction} />)
  })

  test('render blog', () => {
    expect(component.container).toHaveTextContent('this is title')
    expect(component.container).toHaveTextContent('hnam')

    const button = component.getByText('view')
    expect(button).toBeDefined()
  })

  test('click show and render blog correctly', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('12')
    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16'
    )
    expect(component.container).toHaveTextContent('like')
  })

  test('click like button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(likeFunction.mock.calls).toHaveLength(2)
  })
})
