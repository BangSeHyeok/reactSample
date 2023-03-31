import { Link } from 'react-router-dom';

function Home() {
    const menu = [
        {
          "pageName": 'Login',
          "pageLink": '/login'
        },
        {
            "pageName": 'dep',
            "pageLink": '/dep'
        },
    ];
    return (
        <div>
            {menu.map((data,index) =>(
                <div key={index}>
                    <Link to={data.pageLink}>
                        <button>
                            {data.pageName}
                        </button>
                    </Link>
                </div>  
            ))}
        </div>
      
    );
  }
  
  export default Home;