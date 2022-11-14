import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserView = () => {
  const { id } = useParams();
  const selectedUser = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!selectedUser) return null;

  return (
    <div>
      <h1>{selectedUser.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
