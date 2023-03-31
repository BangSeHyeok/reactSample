import React,{Component} from 'react';
import { variables } from '../Variables';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

export class Department extends Component{
    
    changeDepartmenetName = (e) => {
        this.setState({KP_CDLEN:e.target.value})
    }
    changeDepartmenetId = (e) => {
        this.setState({KP_KIND:e.target.value})
    }

    addClick(){
        this.setState({
            modalTitle:"Add Departmenet",
            KP_CDLEN:"",
            KP_KIND:""
        })
    }

    editClick(dep){
        this.setState({
            modalTitle:"Edit Departmenet",
            KP_CDLEN:dep.KP_CDLEN,
            KP_KIND:dep.KP_KIND
        })
    }

    constructor(pros){
        super(pros);

        this.state={
            departments:[],
            modalTitle:"",
            KP_CDLEN:"",
            KP_KIND:""
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
                KP_KIND:this.state.KP_KIND,
                KP_CDLEN:this.state.KP_CDLEN
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
                KP_KIND:this.state.KP_KIND,
                KP_CDLEN:this.state.KP_CDLEN
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
            KP_CDLEN,
            KP_KIND
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
                <Link to='/Home'>
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
                                KP_KIND
                            </th>
                            <th>
                                KP_CDLEN
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep=>
                            <tr key={dep.KP_KIND}>
                                <td>{dep.KP_KIND}</td>
                                <td>{dep.KP_CDLEN}</td>
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
                                    onClick={()=>this.deleteClick(dep.KP_KIND)}>
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
                                    value={KP_KIND}
                                    readOnly
                                    />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetName</span>
                                    <input type="text" className='form-control'
                                    value={KP_CDLEN}
                                    onChange={this.changeDepartmenetName}/>
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
                                    value={KP_KIND}
                                    onChange={this.changeDepartmenetId}/>
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'>DepartmenetName</span>
                                    <input type="text" className='form-control'
                                    value={KP_CDLEN}
                                    onChange={this.changeDepartmenetName}/>
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
