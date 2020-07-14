import React from 'react';
import {API_URL} from '../../config';
import {handleResponse} from '../../helpers'
import Loading from '../common/Loading';
import Table from './Table'
import Pagination from './Pagination'


class List extends React.Component{

    constructor(){
        super();

        this.state={
            loading:false,
            currencies:[],
            error:null,
            totalPages:0,
            page:1,
        }

        this.handlePaginationClick = this.handlePaginationClick.bind(this)
    }

    componentDidMount(){
        this.fetchCurrencies()
        
    }
    fetchCurrencies(){
        this.setState({ loading: true });

        const{ page } = this.state
    
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, totalPages} = data
            this.setState({
            currencies: currencies,
            loading: false,
            totalPages:totalPages
            
            });
        })
        .catch((error) => {
            this.setState({
            error: error.errorMessage,
            loading: false,
            });
        });
    }

    // renderChangePercent(percent) {
    //     if (percent > 0) {
    //       return <span className="percent-raised">{percent}% &uarr;</span>
    //     } else if (percent < 0) {
    //       return <span className="percent-fallen">{percent}% &darr;</span>
    //     } else {
    //       return <span>{percent}</span>
    //     }
    //   }

    handlePaginationClick(direction){
        let nextpage = this.state.page;

        nextpage = direction === 'next' ? nextpage +1 : nextpage - 1;
        
        this.setState({page: nextpage}, () => {
            this.fetchCurrencies()
        });
    }

    render() {

        const { loading, error, currencies, page, totalPages } = this.state;

        // render only loading component, if loading state is set to true
        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }
    
        // render only error message, if error occurred while fetching data
        if (error) {
            return <div className="error">{error}</div>
        }
        return (
            <div className="Table-container">
                <Table 
                currencies={currencies}/>                

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;