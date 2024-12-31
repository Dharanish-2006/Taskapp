import react from "react";
class Task extends react.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            values:[],
            taskname:'',
            taskstatus:false,
            editId:null,
        };
    }
    componentDidMount(){
        this.readDate();
    }
    handleCreate = async() =>{
        try{
            await fetch('http://localhost:8000/task/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    title:this.state.taskname,
                    completed:this.state.taskstatus,
                }),
                });
                this.readDate();
            }catch(error){
                console.error('Error creating item:',error);
            }
        };
        handleEdit =(id) => {
            const selectedItem = this.state.values.find(item => item.id === id);
            console.log(id);
            console.log(selectedItem);
            if(selectedItem){
                this.setState({
                    taskname:selectedItem.title,
                    taskstatus:selectedItem.completed,
                    editId:id,
                });
            }
        };
        readDate = async ()=>
        {
            fetch('https://localhost:8000/task/')
            .then((res)=>res.json())
            .then((data)=>this.setState({values:data}));
        };
        handleDelete = async (id) =>{
            try{
                await fetch(`http://hostlocal:8000/task/${id}/`,{
                    method:'DELETE',
                });
                this.readDate();
            }catch(error){
                console.error('Error deleting item:',error);
            }
        };
        handleUpdate = async () => {
            var editId =this.state.editId;
            console.log(this.state.taskstatus);
            if(editId){
                try{
                    await fetch(`http://localhost:8000/task/${editId}/`,{
                        method:'PUT',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        boby: JSON.stringify({
                            title:this.state.taskname,
                            completed:this.state.taskstatus,
                        }),
                    });
                    this.setState({taskname:'',taskstatus:false,editId:null});
                    this.readDate();
                }catch(error){
                    console.error('Error updating item:',error);
                }
            }
        };
        componentDidMount(){
            this.readDate();
        }
        render()
        {
            <div>
                <h1>Task App</h1>
                <div>
                    <form>
                        <table>
                            <tr>
                                <td colSpan={3}><h2>Create Item</h2></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" placeholder="Task Name" value={this.state.taskname}
                                    onChange={(e) =>this.setState({taskname:e.target.value})}/>
                                </td>
                                <td>
                                    <input type="checkbox" checked={this.state.taskstatus}
                                    onChange={(e)=>
                                    {
                                        this.setState({taskstatus:e.target.checked});
                                    }
                                    }/>
                                </td>
                                <td>
                                    {this.state.editId?(
                                        <button onClick={this.handleUpdate}>Update</button>
                                    ):(
                                        <button onClick={this.handleCreate}>Create</button>
                                    )}
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <h2>The following are......</h2>
                <table>
                    <tr>
                        <th colSpan={4}>Task Details</th>
                    </tr>
                    {this.state.values.map(
                        (item)=>
                            <tr>
                                <td>{item.title}</td>
                                <td>
                                    {item.completed ?
                                    ('Completed'):
                                    ("Pending")}
                                </td>
                                <td>
                                    <button onClick={()=>this.handleEdit(item.id)}>Edit</button>
                                </td>
                                <td>
                                <button onClick={() =>this.handleDelete(item.id)}>Delete</button>
                            </td>
                            </tr>)}
                            </table>
         </div>
         };
    }
export default Task