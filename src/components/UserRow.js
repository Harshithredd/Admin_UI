import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function UserRow({index, handelCheckboxChange, handleUserEdit, handleUserDelete,user,checkboxArray}) {
    return (
        <tr key={user.id} className={checkboxArray[index] ? "row row_active" : "row"} data-testid="user_row">
            <td className={"column"}>
                <input  type="checkbox" id={index} 
                        data-testid={`checkbox_${index}`}
                        checked={checkboxArray[index]} 
                        onChange={handelCheckboxChange} />
            </td>
            <td className="column">{user.name}</td>
            <td className="column">{user.email}</td>
            <td className="column">{user.role}</td>
            <td className="column"> 
                <div className="button" id={user.id} data-testid={`${user.id}_edit`}onClick={handleUserEdit}>
                    <EditIcon />
                </div> 
                <div className="button" id={user.id} data-testid={`${user.id}_delete`} onClick={handleUserDelete}>
                    <DeleteIcon />
                </div>
            </td>
        </tr>);
  }