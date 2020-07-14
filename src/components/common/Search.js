import React from 'react';
import {withRouter} from 'react-router-dom';
import {API_URL} from '../../config';
import {handleResponse} from '../../helpers';
import Loading from './Loading';
import './Search.css';


class Search extends React.Component{

    constructor(){
        super();

        this.state={
            searchResult:[],
            searchQuery:'',
            loading:false,
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    // handleSubmit(event){
    //     event.preventDefault();

    //     console.log(this.state);
    // }

    handleChange(event){

        // const inputName = event.target.name;
        const searchQuery = event.target.value;

        // this.setState({ [inputName]: inputValue});
        this.setState({ searchQuery: searchQuery});

        // if searchquery isn't present, dont send request to server.
        if (!searchQuery){
            return '';
        }

        this.setState({loading:true});

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then((result) => {

            this.setState({
                searchResult: result,
                loading: false,
            });
        });

    }

    handleRedirect(currencyId){

        // clear input value and close autocomplete container
        this.setState({
            searchQuery:'',
            searchResult:[],
        });

        this.props.history.push(`/currency/${currencyId}`)
    }

    renderSearchResult(){
        const {searchResult,searchQuery, loading} = this.state;

        if(!searchQuery){
            return '';
        }
        
        if (searchResult.length > 0){
            return(
                <div className='Search-result-container'>
                    {searchResult.map(result => (
                        <div
                            key = {result.id}
                            className='Search-result'
                            onClick={()=> this.handleRedirect(result.id)}
                        >
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            );
        }
        if (!loading){
            return(
                <div className="Search-result-container">
                    <div className="Search-no-container">
                        No results found
                    </div>
                </div>
            );
        }
    }


    render() {
        const {loading, searchQuery} = this.state
        return (
            <div className=" Search">{/*onSubmit={this.handleSubmit}*/}
                <span className="Search-icon"></span>
                <input 
                    type="text" 
                    placeholder="Currency name" 
                    className="Search-input" 
                    name='searchQuery' 
                    onChange={this.handleChange} 
                    value={searchQuery}
                    />
                <span className="Search-icon" ></span>
                { loading &&
                <div className="Search-loading">
                    <Loading
                        width='12px'
                        height='12px'
                    />
                </div>}
                {this.renderSearchResult() }
            </div>
        )
    }
}

export default withRouter(Search);