import { React } from 'react'
import { useSelector } from 'react-redux'

const UserView = () => {
  const users = useSelector((state) => state.users)
  console.log('user',users)
  //   Object.entries(groups).map((v) => {
  //     const userBlogs = v[1]

  //     console.log(v[1])
  //   })

  //   const generateRow = () => {
  //     groups.keys.forEach((value, key) => {
  //       console.log(value.lenght, '---', key)
  //     })
  //   }

  //   generateRow()

  return (
    <div>
      <h1>User</h1>
      <div>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <b>Blog Created</b>
              </td>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserView
