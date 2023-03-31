import React,{Component} from 'react';
import { variables } from './Variables';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

export class Department extends Component{
    
    changeDepartmenetName = (e) => {
        this.setState({US_NAME:e.target.value})
    }
    changeDepartmenetId = (e) => {
        this.setState({US_USER:e.target.value})
    }
    changeDepartmenetKbn = (e) => {
        this.setState({UR_KBN1:e.target.value})
    }

    addClick(){
        this.setState({
            modalTitle:"Add Departmenet",
            US_NAME:"",
            US_USER:"",
            UR_KBN1:""
        })
    }

    editClick(dep){
        this.setState({
            modalTitle:"Edit Departmenet",
            US_NAME:dep.US_NAME,
            US_USER:dep.US_USER,
            UR_KBN1:dep.UR_KBN1
        })
    }

    constructor(pros){
        super(pros);

        this.state={
            departments:[],
            modalTitle:"",
            US_NAME:"",
            US_USER:""
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch(variables.API_URL + 'Kubunparent')
        .then(response => response.json())
        .then(data=>{
            this.setState({departments:data});
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Kubunparent/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then((result) =>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }

    createClick(){
        fetch(variables.API_URL+'Kubunparent',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                US_USER:this.state.US_USER,
                US_NAME:this.state.US_NAME,
                UR_KBN1:this.state.UR_KBN1
            })
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    
    updateClick(){
        fetch(variables.API_URL+'Kubunparent',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                US_USER:this.state.US_USER,
                US_NAME:this.state.US_NAME,
                UR_KBN1:this.state.UR_KBN1
            })
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    render(){
        const{
            departments,
            modalTitle,
            US_NAME,
            US_USER,
            UR_KBN1
        }=this.state;
        
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        const CSVName = year + month + day + 'departments';
        return(
            <div>
                <button type='button' 
                className='btn btn-primary m-2 float-end'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Departmenet
                </button>
                <CSVLink
                    data={departments}
                    filename={CSVName}
                    target="_blank"
                >
                   <button 
                    type='button' 
                    className='btn btn-primary m-2 float-end'>
                    CSV Download
                    </button>
                </CSVLink>
                <Link to='/home'>
                        <button
                         type='button' 
                         className='btn btn-primary m-2 float-end'
                        >
                            Menu
                        </button>
                </Link>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                US_USER
                            </th>
                            <th>
                                US_NAME
                            </th>
                            <th>
                                UR_KBN1
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep=>
                            <tr key={dep.US_USER}>
                                <td>{dep.US_USER}</td>
                                <td>{dep.US_NAME}</td>
                                <td>{dep.UR_KBN1}</td>
                                <td>
                                    <button type='button'
                                    className='btn btn-light mr-1'
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal2"
                                    onClick={()=>this.editClick(dep)}>
                                        修正
                                    </button>
                                    <button type='button'
                                    className='btn btn-light mr-1'
                                    onClick={()=>this.deleteClick(dep.US_USER)}>
                                        削除
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='modal fade' id='exampleModal2' tabIndex="-1" aria-hidden="true">
                    <div className='modal-dialog modal-lg modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='moadl-header'>
                                <h5 className='modal-title'>{modalTitle}</h5>
                                <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='CLOSE'>

                                </button>
                            </div>
                            <div className='modal-body'>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetID</span>
                                    <input type="text" className='form-control'
                                    value={US_USER}
                                    readOnly
                                    />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetName</span>
                                    <input type="text" className='form-control'
                                    value={US_NAME}
                                    onChange={this.changeDepartmenetName}/>
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetKbn</span>
                                    <input type="text" className='form-control'
                                    value={UR_KBN1}
                                    onChange={this.changeDepartmenetKbn}/>
                                </div>
                                
                                   <button type='button'
                                    className='btn btn-primary float-start'
                                    onClick={()=>this.updateClick()}
                                    >
                                        Update
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='modal fade' id='exampleModal' tabIndex="-1" aria-hidden="true">
                    <div className='modal-dialog modal-lg modal-dialog-centered'>
                        <div className='modal-content'>
                            <div className='moadl-header'>
                                <h5 className='modal-title'>{modalTitle}</h5>
                                <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='CLOSE'>

                                </button>
                            </div>
                            <div className='modal-body'>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetID</span>
                                    <input type="text" className='form-control'
                                    value={US_USER}
                                    onChange={this.changeDepartmenetId}/>
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetName</span>
                                    <input type="text" className='form-control'
                                    value={US_NAME}
                                    onChange={this.changeDepartmenetName}/>
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetKBN</span>
                                    <input type="text" className='form-control'
                                    value={UR_KBN1}
                                    onChange={this.changeDepartmenetKbn}/>
                                </div>
                                    <button type='button'
                                    className='btn btn-primary float-start'
                                    onClick={()=> this.createClick()}>
                                        Create
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
