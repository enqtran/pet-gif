import React, { Component } from 'react';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data_gif: []
        }
    }

    componentDidMount() {
        this.load_data(20);
    }

    load_data(limit) {
        let offset = this.randomNumber(0, 4000);
        let api_key = 'd8fc43ee93534900864d1e73cab1dd48';
        let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + api_key + '&q=dog&limit=' + limit + '&offset=' + offset + '&rating=G&lang=en';

        fetch(url)
            .then(res => res.json())
            .then((respons) => {
                if (respons.meta.msg === 'OK') {
                    this.setState({
                        data_gif: respons.data,
                        loading: false,
                        pagination: respons.pagination
                    })
                }
            })
            .catch(err => console.log(err));
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    reload() {
        window.location.reload();
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="container">
                    <div className="text-center">Loading</div>
                </div>
            );
        }
        return (
            <div className="wrapper">
                <header>
                    <nav className="navbar navbar-inverse">
                        <div className="container">
                            <div className="row">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                    <a className="navbar-brand" href="index.html">PET GIF</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <div>
                                    {
                                        this.state.data_gif.map((content, index) => {
                                            return (
                                                <div className="item-pet" key={index}>
                                                    <img src={content.images.original.url} className="img-responsive img-full" alt={content.id} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                                <div className="reload-btn">
                                    <button onClick={this.reload}>Reload</button>
                                </div>
                            </div>
                            <div className="col-sm-4">

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
