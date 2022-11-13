/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import CreateBlogForm from './CreateBlogForm';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

let blog = {
  title: 'test blog',
  author: 'test author',
  url: 'test url',
  likes: 0,
};

describe('<Blog />', () => {
  let container;
  let mockOnLikeHandler;

  beforeEach(() => {
    mockOnLikeHandler = jest.fn();

    container = render(
      <Blog blog={blog} onLike={mockOnLikeHandler}></Blog>
    ).container;
  });

  test('displays title and author only', () => {
    expect(container).toHaveTextContent(blog.title);
    expect(container).toHaveTextContent(blog.author);

    const detailsContainer = screen.getByTestId('details');
    expect(detailsContainer).toHaveStyle('display: none');
  });

  test('renders details when show button is clicked', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const detailsContainer = screen.getByTestId('details');
    expect(detailsContainer).toHaveStyle('display: block');
    expect(detailsContainer).not.toHaveStyle('display: none');
  });

  test('like event handler is called', async () => {
    const user = userEvent.setup();
    const likeButton = screen.getByText('like', { selector: 'button' });
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockOnLikeHandler.mock.calls).toHaveLength(2);
  });
});

describe('<CreateBlogForm />', () => {
  let container;
  let mockOnSubmitHandler;

  beforeEach(() => {
    mockOnSubmitHandler = jest.fn();

    container = render(
      <CreateBlogForm onCreate={mockOnSubmitHandler} />
    ).container;
  });

  test('blog form submits to handler with title, author, and url', async () => {
    const user = userEvent.setup();
    const titleInput = screen.getByPlaceholderText('title');
    const authorInput = screen.getByPlaceholderText('author');
    const urlInput = screen.getByPlaceholderText('url');
    const submitButton = screen.getByText('create', { selector: 'button' });

    await user.type(titleInput, 'test title');
    await user.type(authorInput, 'test author');
    await user.type(urlInput, 'test url');
    await user.click(submitButton);

    const args = mockOnSubmitHandler.mock.calls[0];
    expect(args).toBeDefined();

    const passedObject = args[0];
    expect(passedObject.title).toBe('test title');
    expect(passedObject.author).toBe('test author');
    expect(passedObject.url).toBe('test url');
  });
});
