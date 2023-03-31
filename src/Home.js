import { Link } from 'react-router-dom';

function Home() {
    const menu = [
        {
            "pageName": 'Department',
            "pageLink": '/dep',
            "onclick" : function depClick(){
            } 
        },
        {
            "pageName": 'Logout',
            "pageLink": '/login',
            "onclick":function logoutClick(){
                localStorage.clear();
            }
        },
    ];
    return (
        <div>
            {menu.map((data,index) =>(
                <div key={index}>
                    <Link to={data.pageLink}>
                        <button onClick={data.onclick}  className='btn btn-primary m-2 float-center'>
                            {data.pageName}
                        </button>
                    </Link>
                </div>  
            ))}
        </div>
      
    );
  }
  
  export default Home;